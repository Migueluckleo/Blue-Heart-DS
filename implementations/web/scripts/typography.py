"""Derivados tipográficos; las recetas y unidades pertenecen al JSON canónico."""
import argparse
from decimal import Decimal, InvalidOperation
import hashlib
import json
import re
import struct
from pathlib import Path

import tokens

SOURCE = tokens.CONFIG['typography_catalog']
ROOT, WEB = tokens.ROOT, tokens.WEB
WEIGHTS = {'Regular': 400, 'Medium': 500, 'SemiBold': 600, 'Semibold': 600, 'Bold': 700}
REF_FIELDS = {'fontFamily': 'font/family/', 'fontStyle': 'font/weight/', 'fontSize': 'font/size/', 'lineHeight': 'font/line-height/', 'letterSpacing': 'font/letter-spacing/'}


def number(value, label):
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f'{label}: se requiere un número')
    try:
        result = Decimal(str(value))
    except InvalidOperation as error:
        raise ValueError(f'{label}: número inválido') from error
    if not result.is_finite():
        raise ValueError(f'{label}: número no finito')
    return result


def decimal_text(value):
    result = format(value, 'f').rstrip('0').rstrip('.') if '.' in format(value, 'f') else format(value, 'f')
    return '0' if result in ('-0', '') else result


def css_measure(measure, kind):
    if not isinstance(measure, dict):
        raise ValueError(f'{kind}: falta unidad explícita')
    unit = measure.get('unit')
    if kind == 'lineHeight' and unit == 'AUTO':
        return 'normal'
    if unit not in ('PERCENT', 'PIXELS'):
        raise ValueError(f'{kind}: unidad no soportada {unit!r}')
    value = number(measure.get('value'), kind)
    if kind == 'lineHeight' and value <= 0:
        raise ValueError('lineHeight: debe ser positivo')
    if unit == 'PIXELS':
        return decimal_text(value) + 'px'
    return decimal_text(value / 100) + ('em' if kind == 'letterSpacing' else '')


def float32(value):
    return struct.unpack('f', struct.pack('f', value))[0]


def validate_derivation(style, styles):
    """Verify provenance; output already-materialized metrics without scaling again."""
    derived = style.get('derivedFrom')
    if derived is None:
        return
    sid = style['id']
    if not isinstance(derived, dict) or derived.get('numericEncoding') != 'FLOAT32_BASE_TIMES_FLOAT32_SCALE':
        raise ValueError(f'{sid}: codificación de escala no soportada')
    base_id = derived.get('baseStyleId')
    base = next((item for item in styles if item.get('id') == base_id), None)
    if not base or base_id == sid or base.get('derivedFrom'):
        raise ValueError(f'{sid}: baseStyleId debe identificar una receta base no derivada')
    ratio = derived.get('scaleRatio', {})
    numerator, denominator = ratio.get('numerator'), ratio.get('denominator')
    if any(isinstance(n, bool) or not isinstance(n, int) or n <= 0 for n in (numerator, denominator)):
        raise ValueError(f'{sid}: scaleRatio debe tener enteros positivos')
    factor = float(number(derived.get('scaleFactor'), sid + '.scaleFactor'))
    if factor <= 0 or factor != float32(numerator / denominator):
        raise ValueError(f'{sid}: scaleFactor no coincide con FLOAT32(scaleRatio)')
    if style['category'] != 'complementary' or not derived.get('reason'):
        raise ValueError(f'{sid}: derivación necesita categoría complementaria y razón')
    for field in ('fontFamily', 'fontStyle', 'fontWeight'):
        if style.get(field) != base.get(field):
            raise ValueError(f'{sid}: escala altera {field}')
    if style['fontSize'] != float32(base['fontSize'] * factor):
        raise ValueError(f'{sid}: fontSize no coincide con la escala materializada')
    for field in ('lineHeight', 'letterSpacing'):
        original, actual = base[field], style[field]
        expected = dict(original)
        if original['unit'] == 'PIXELS':
            expected['value'] = float32(original['value'] * factor)
        zero_tracking = field == 'letterSpacing' and original.get('value') == actual.get('value') == 0
        if actual != expected and not zero_tracking:
            raise ValueError(f'{sid}: {field} no coincide con la escala materializada')


def validate_formatting_derivation(style, styles):
    derived = style.get('derivedFormattingFrom')
    decoration = style.get('textDecoration', 'NONE')
    if decoration not in ('NONE', 'UNDERLINE'):
        raise ValueError(f'{style["id"]}: textDecoration no soportado')
    if derived is None:
        return
    base = next((item for item in styles if item.get('id') == derived.get('baseStyleId')), None)
    if not base or base['id'] == style['id'] or base.get('derivedFrom') or base.get('derivedFormattingFrom'):
        raise ValueError(f'{style["id"]}: baseStyleId de formato inválido')
    if derived.get('overrides') != {'textDecoration': 'UNDERLINE'} or not derived.get('reason'):
        raise ValueError(f'{style["id"]}: derivación de formato no soportada')
    if decoration != 'UNDERLINE' or base.get('textDecoration', 'NONE') != 'NONE' or style['category'] != 'complementary':
        raise ValueError(f'{style["id"]}: decoración derivada inválida')
    for field in ('fontFamily', 'fontStyle', 'fontWeight', 'fontSize', 'lineHeight', 'letterSpacing', 'tokenRefs'):
        if style.get(field) != base.get(field):
            raise ValueError(f'{style["id"]}: formato altera {field}')


def token_context(token_outputs):
    manifest = json.loads(token_outputs['src/generated/tokens.manifest.json'])
    variables = {}
    for name, value in re.findall(r'(--ds-[\w-]+)\s*:\s*([^;{}]+);', token_outputs['src/generated/tokens.css']):
        variables.setdefault(name, set()).add(value.strip())

    def resolve(name, stack=()):
        if name in stack:
            raise ValueError(f'Ciclo de alias tipográfico: {name}')
        if name not in variables:
            raise ValueError(f'Variable CSS tipográfica ausente: {name}')
        result = set()
        for value in variables[name]:
            alias = re.fullmatch(r'var\((--ds-[\w-]+)\)', value)
            result.update(resolve(alias[1], stack + (name,)) if alias else [value])
        return result

    result = {}
    for item in manifest['tokens']:
        if item['collection'] == 'semantic' and item['name'].startswith('font/'):
            values = resolve(item['css'])
            if len(values) != 1:
                raise ValueError(f'Token tipográfico cambia por tema: {item["name"]}')
            result[item['name']] = {'css': item['css'], 'value': next(iter(values)), 'source': item['source']}
    return result


def documentation(document, records, source_sha256):
    def cell(value):
        return str(value).replace('|', '\\|').replace('\n', '<br>')

    def measure(value):
        return 'AUTO' if value['unit'] == 'AUTO' else f'{value["value"]} {value["unit"]}'

    lines = [
        '# Tipografía BlueHeart', '',
        '**DERIVED_NOT_AUTHORITY · Generado por `scripts/typography.py`. No editar.**', '',
        f'Fuente única: [{SOURCE}](../../../{SOURCE}) · versión `{document["version"]}` · SHA-256 `{source_sha256}`.', '',
        'Los nombres, métricas y descripciones se editan en el JSON canónico. Esta tabla se regenera con `pnpm ds:generate`; no constituye otra aprobación del diseño.', '',
        'Importar `styles.css` una vez para cargar los tokens y recetas del corte. Los estilos base expresan la jerarquía general; los complementarios conservan usos de UI acotados en sus descripciones y evidencias. No elegir un complemento solo porque coincide el tamaño.', '',
        '```tsx',
        "import { typographyClass, typography, type TypographyId } from '@/index';",
        f"const titleStyle: TypographyId = '{next(iter(records))}';",
        '<h1 className={typographyClass(titleStyle)}>Título</h1>',
        '// typography[titleStyle] contiene la receta, referencias y descripción derivadas.',
        '```', '',
        'Cada receta exporta `--ds-type-ID-family`, `-weight`, `-size`, `-line-height`, `-tracking`, `-decoration` y `-font`. Para CSS de un componente, `font:var(--ds-type-ID-font)` consume la familia, peso, tamaño e interlineado; acompañarlo de `letter-spacing:var(--ds-type-ID-tracking)` y `text-decoration-line:var(--ds-type-ID-decoration)`. Las clases declaran `--ds-type-style-id` para inspección y handoff; el consumidor CSS debe declararlo también y comprobar métricas y decoración efectivas. Usar referencias individuales cuando la composición requiera herencia parcial. Conservar geometría y color.', '',
        'La conversión web conserva unidades: interlineado PERCENT → factor relativo; tracking PERCENT → em; PIXELS → px; interlineado AUTO → normal. La equivalencia visual de AUTO requiere comprobar la fuente cargada y el consumidor. Las referencias de tokens declaradas no acreditan por sí solas un binding Figma real.', '',
    ]
    for category, label in [('base', 'Estilos base'), ('complementary', 'Estilos complementarios')]:
        selected = [r for r in records.values() if r['category'] == category]
        lines += [f'## {label} · {len(selected)}', '']
        if not selected:
            lines += ['No hay estilos registrados en esta categoría.', '']
            continue
        lines += ['| Nombre | Fuente / peso | Tamaño | Interlineado | Tracking | Decoración | Uso | Tokens referenciados | Clase CSS |', '|---|---|---:|---|---|---|---|---|---|']
        for style in selected:
            refs = '<br>'.join(f'{field}: `{name}`' for field, name in style.get('tokenRefs', {}).items()) or 'Sin referencias declaradas'
            values = [style['name'], f'{style["fontFamily"]} {style["fontStyle"]} ({style["fontWeight"]})', f'{style["fontSize"]} px', measure(style['lineHeight']), measure(style['letterSpacing']), style.get('textDecoration', 'NONE'), style['description'], refs, '`' + style['cssClass'] + '`']
            lines.append('| ' + ' | '.join(cell(value) for value in values) + ' |')
        lines += ['']
    formatted = [r for r in records.values() if r.get('derivedFormattingFrom')]
    if formatted:
        lines += ['## Subrayado compartido', '', 'Las variantes de formato mantienen el enlace a la receta de origen. `derivedFormattingFrom` cambia exclusivamente textDecoration; familia, peso, tamaño, interlineado, tracking y tokens son idénticos a la receta de origen. El consumidor usa el ID terminado en `-underline`; el subrayado no se agrega como un formato ajeno a la identidad compartida.', '']
    derived = [r for r in records.values() if r.get('derivedFrom')]
    if derived:
        lines += ['## Recetas de escala materializada', '', 'Estos complementos conservan usos escalados existentes. Las métricas de la tabla ya incorporan la escala FLOAT32 indicada por `derivedFrom`; no volver a multiplicarlas ni añadir `transform:scale(...)` por ese dato. No sustituyen las recetas base en consumidores web sin correspondencia documentada.', '', '| Estilo | Receta de origen | Escala exacta | Motivo |', '|---|---|---|---|']
        for style in derived:
            source = style['derivedFrom']
            ratio = source['scaleRatio']
            lines.append('| ' + ' | '.join(cell(value) for value in [style['id'], source['baseStyleId'], f'{ratio["numerator"]}/{ratio["denominator"]} → FLOAT32 {source["scaleFactor"]}', source['reason']]) + ' |')
        lines += ['']
    return '\n'.join(lines)


def render(document, context, source_sha256):
    if document.get('schema_version') != 1 or not document.get('id'):
        raise ValueError('Esquema o identidad de tipografía no soportados')
    if not isinstance(document.get('version'), str) or not document['version']:
        raise ValueError('Falta versión de la fuente tipográfica')
    if not isinstance(document.get('font_family'), str) or not document['font_family'].strip():
        raise ValueError('Falta la familia tipográfica canónica')
    styles = document.get('styles')
    if not isinstance(styles, list) or not styles:
        raise ValueError('La fuente tipográfica no contiene estilos')
    records, declarations, classes, seen = {}, [], [], set()
    for style in styles:
        sid = style.get('id', '')
        if not re.fullmatch(r'[a-z][a-z0-9]*(?:-[a-z0-9]+)*', sid) or sid in seen:
            raise ValueError(f'ID tipográfico inválido o duplicado: {sid!r}')
        seen.add(sid)
        if style.get('category') not in ('base', 'complementary'):
            raise ValueError(f'{sid}: categoría desconocida')
        for field in ('name', 'description'):
            if not isinstance(style.get(field), str) or not style[field].strip():
                raise ValueError(f'{sid}: falta {field}')
        if style.get('category') == 'complementary' and not style.get('evidence'):
            raise ValueError(f'{sid}: el complemento necesita evidencia explícita')
        if style.get('fontFamily') != document['font_family']:
            raise ValueError(f'{sid}: familia distinta de la fuente canónica')
        weight = number(style.get('fontWeight'), sid + '.fontWeight')
        if WEIGHTS.get(style.get('fontStyle')) != weight:
            raise ValueError(f'{sid}: fontStyle y fontWeight no coinciden')
        size = number(style.get('fontSize'), sid + '.fontSize')
        if size <= 0:
            raise ValueError(f'{sid}: fontSize debe ser positivo')
        validate_derivation(style, styles)
        validate_formatting_derivation(style, styles)
        refs = style.get('tokenRefs', {})
        if not isinstance(refs, dict) or set(refs) - set(REF_FIELDS):
            raise ValueError(f'{sid}: campos tokenRefs no soportados')
        family_ref = refs.get('fontFamily')
        for field, name in refs.items():
            if not isinstance(name, str) or not name.startswith(REF_FIELDS[field]) or name not in context:
                raise ValueError(f'{sid}: tokenRef inexistente o incompatible: {field}={name!r}')
            resolved = context[name]['value']
            expected = {'fontSize': decimal_text(size) + 'px', 'fontStyle': decimal_text(weight)}.get(field)
            if field in ('lineHeight', 'letterSpacing'):
                if style.get(field, {}).get('unit') != 'PIXELS':
                    raise ValueError(f'{sid}: {field} solo admite tokenRef para PIXELS')
                expected = css_measure(style[field], field)
            if expected is not None and resolved != expected:
                raise ValueError(f'{sid}: {name} resuelve {resolved}, no {expected}')
            if field == 'fontFamily' and resolved != json.dumps(style['fontFamily'], ensure_ascii=False):
                raise ValueError(f'{sid}: el token no resuelve la familia documentada')
        css = {
            'family': 'var(' + context[family_ref]['css'] + ')' if family_ref else json.dumps(style['fontFamily'], ensure_ascii=False),
            'weight': 'var(' + context[refs['fontStyle']]['css'] + ')' if 'fontStyle' in refs else decimal_text(weight),
            'size': 'var(' + context[refs['fontSize']]['css'] + ')' if 'fontSize' in refs else decimal_text(size) + 'px',
            'line-height': 'var(' + context[refs['lineHeight']]['css'] + ')' if 'lineHeight' in refs else css_measure(style.get('lineHeight'), 'lineHeight'),
            'tracking': 'var(' + context[refs['letterSpacing']]['css'] + ')' if 'letterSpacing' in refs else css_measure(style.get('letterSpacing'), 'letterSpacing'),
            'decoration': style.get('textDecoration', 'NONE').lower(),
        }
        prefix = '--ds-type-' + sid
        declarations.extend(f'  {prefix}-{key}: {value};' for key, value in css.items())
        declarations.append(f'  {prefix}-font: var({prefix}-weight) var({prefix}-size)/var({prefix}-line-height) var({prefix}-family);')
        classes.append(f'  .ds-type-{sid} {{ --ds-type-style-id:{sid}; font-family:var({prefix}-family); font-weight:var({prefix}-weight); font-size:var({prefix}-size); line-height:var({prefix}-line-height); letter-spacing:var({prefix}-tracking); text-decoration-line:var({prefix}-decoration); }}')
        records[sid] = dict(style, textDecoration=style.get('textDecoration', 'NONE'), cssClass='ds-type-' + sid, css=css)
    header = '/* Generado por scripts/typography.py; no editar. Fuente: ' + SOURCE + ' */'
    css_text = '\n'.join([header, ':root, [data-ds-theme] {', *declarations, '}', '@layer components {', *classes, '}', ''])
    ts_text = '\n'.join([
        '// Generado por scripts/typography.py; las recetas editables viven en ' + SOURCE,
        'export const typography = ' + json.dumps(records, ensure_ascii=False, indent=2) + ' as const;',
        'export type TypographyId = keyof typeof typography;',
        'export const typographyIds = ' + json.dumps(list(records), ensure_ascii=False) + ' as const;',
        'export const typographyClass = (id: TypographyId) => typography[id].cssClass;',
        '',
    ])
    manifest = {
        'kind': 'DERIVED_NOT_AUTHORITY', 'schema_version': 1,
        'id': document['id'], 'version': document['version'],
        'sources': {SOURCE: source_sha256},
        'style_count': len(records),
        'base_count': sum(s['category'] == 'base' for s in styles),
        'complementary_count': sum(s['category'] == 'complementary' for s in styles),
        'styles': records,
    }
    return {
        'src/generated/typography.css': css_text,
        'src/generated/typography.ts': ts_text,
        'src/generated/typography.manifest.json': json.dumps(manifest, ensure_ascii=False, indent=2) + '\n',
        'docs/TYPOGRAPHY.md': documentation(document, records, source_sha256),
    }


def build(token_outputs=None):
    if SOURCE is None:
        return {'src/generated/typography.css': '/* Sin catálogo tipográfico configurado. */\n'}
    raw = (ROOT / SOURCE).read_bytes()
    context = token_context(token_outputs if token_outputs is not None else tokens.build())
    return render(json.loads(raw), context, hashlib.sha256(raw).hexdigest())


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    changed = []
    for path, content in build().items():
        target = WEB / path
        if not target.exists() or target.read_text() != content:
            changed.append(path)
            if not args.check:
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(content)
    if args.check and changed:
        raise SystemExit('Tipografía derivada desactualizada: ' + ', '.join(changed))
    print(f'Tipografía: {len(changed)} derivados ' + ('desactualizados.' if args.check else 'actualizados.'))


if __name__ == '__main__':
    main()
