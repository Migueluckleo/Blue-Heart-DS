#!/usr/bin/env python3
"""P07: una familia activa necesita export, API y ejemplo documentado y ejecutable."""
import argparse, hashlib, json, re, subprocess
from pathlib import Path
import tokens, typography
ROOT, WEB=tokens.ROOT,tokens.WEB

def build():
    rows=json.loads((WEB/'components.registry.json').read_text())
    status=json.loads(subprocess.check_output([str(ROOT/'scripts/ds'),'status','--json'],cwd=ROOT,text=True))
    active={f['id']:f for f in status['families'] if f['base'] and not f['id'].startswith(('FOUNDATIONS-','MIGRATION-','TOOLING-'))}
    ids=[r['id'] for r in rows]
    assert len(ids)==len(set(ids)),'IDs de familia duplicados'
    assert set(ids)==set(active),f'Cobertura P07 pendiente: {set(active)-set(ids)}; entradas obsoletas: {set(ids)-set(active)}'
    output=tokens.build()
    manifests=tokens.CONFIG['asset_manifest']
    for manifest in [manifests] if isinstance(manifests,str) else manifests or []:
        for asset in json.loads((ROOT/manifest).read_text())['assets']:
            source=(ROOT/asset['file']).resolve(strict=True)
            target=(WEB/'public/assets'/asset['name']).resolve()
            if not source.is_relative_to(ROOT/'sources/assets') or not target.is_relative_to(WEB/'public/assets'):
                raise ValueError('Ruta de asset fuera de su raíz autorizada')
            raw=source.read_bytes()
            if hashlib.sha256(raw).hexdigest()!=asset['sha256']:
                raise ValueError('Hash de asset distinto al delegado')
            output[target.relative_to(WEB).as_posix()]=raw
    output.update(typography.build(token_outputs=output))
    from button_loader import build_recipes
    output.update(build_recipes())
    icon_contract=ROOT/'specs/data/icon-button.v1.0.0.json'
    if icon_contract.is_file() and 'ICON-BUTTON-001' in active:
        data=json.loads(icon_contract.read_text())
        recipes={}
        css=lambda node, field: data['tokens'][node['b'][field]]['css'] if field in node['b'] else None
        for owner in data['sets']:
            variant=owner['name'].split('/')[-1]
            for row in owner['variants']:
                axes=dict(axis.split('=',1) for axis in row['name'].split(', '))
                icon, badge, *parts=row['children']
                focus=next((part for part in parts if part['name']=='Focus ring'),None)
                key='/'.join((variant,axes['size'],axes.get('selected','false'),axes['state']))
                recipes[key]=dict(control=css(row,'width'),radius=css(row,'topLeftRadius'),
                    fill=css(row,'fills'),stroke=css(row,'strokes'),strokeWidth=css(row,'strokeTopWeight'),
                    glyph=css(icon,'width'),glyphColor=css(icon['vectorFills'][0],'fills'),
                    badgeRight=row['width']-badge['x'],badgeTop=badge['y'],
                    focus=css(focus,'strokes') if focus else None,focusWidth=css(focus,'strokeTopWeight') if focus else None,
                    focusRadius=css(focus,'topLeftRadius') if focus else None)
        assert len(recipes)==90
        output['src/generated/icon-button-recipes.json']=json.dumps(recipes,ensure_ascii=False,indent=2)+'\n'
    menu_contract=ROOT/'specs/data/menu-item.v1.0.0.json'
    if menu_contract.is_file() and 'MENU-ITEM-001' in active:
        data=json.loads(menu_contract.read_text())
        recipes={}
        def descendants(node):
            yield node
            for child in node.get('children',[]):
                yield from descendants(child)
        def role(node, field):
            var=node['b'].get(field)
            return data['tokens'][var]['css'] if var else None
        for row in data['sets'][0]['variants']:
            axes=dict(axis.split('=',1) for axis in row['name'].split(', '))
            layers={node['name']:node for node in descendants(row)}
            key='/'.join(axes[field] for field in ('orientation','type','status','isActive'))
            recipe={}
            for name in ('Icon','CaretDown','Label','Background','Union'):
                node=layers.get(name)
                if node:
                    paint=node['vectorFills'][0] if node['type']=='INSTANCE' else node
                    recipe[name]=role(paint,'fills')
                else:
                    recipe[name]=None
            recipe.update(surface=role(row,'fills'),stroke=role(row,'strokes'),strokeWidth=role(row,'strokeTopWeight'))
            recipes[key]=recipe
        assert len(recipes)==22
        output['src/generated/menu-item-recipes.json']=json.dumps(recipes,ensure_ascii=False,indent=2)+'\n'
    if 'TAB-001' in active:
        data=json.loads((ROOT/'specs/data/tab.v1.0.0.json').read_text())
        def tab_role(node, field):
            identifier=node['b'].get(field)
            return data['tokens'][identifier]['css'] if identifier else None
        recipes={}
        for row in data['sets'][0]['variants']:
            axes=dict(axis.split('=',1) for axis in row['name'].split(', '))
            key='/'.join(axes[field] for field in ('type','selected','state'))
            icon,label,_,*parts=row['children']
            focus=next((part for part in parts if part['name']=='Focus ring'),None)
            shadow=None
            if style_id:=row.get('effectStyleId'):
                effect,=data['effectStyles'][style_id]['effects']
                assert effect['type']=='DROP_SHADOW'
                color=effect['color']
                channels=' '.join(str(round(color[c]*255)) for c in 'rgb')
                shadow=(f"{effect['offset']['x']:g}px {effect['offset']['y']:g}px "
                        f"{effect['radius']:g}px {effect['spread']:g}px rgb({channels} / {color['a']:g})")
            recipes[key]=dict(
                gap=tab_role(row,'itemSpacing'),inline=tab_role(row,'paddingLeft'),block=tab_role(row,'paddingTop'),
                radius=tab_role(row,'topLeftRadius'),background=tab_role(row,'fills'),underline=tab_role(row,'strokes'),
                underlineWidth=tab_role(row,'strokeBottomWeight'),label=tab_role(label,'fills'),
                weight=tab_role(label,'fontStyle'),icon=tab_role(icon['vectorFills'][0],'fills'),
                focus=tab_role(focus,'strokes') if focus else None,
                focusRadius=tab_role(focus,'topLeftRadius') if focus else None,
                focusWidth=tab_role(focus,'strokeTopWeight') if focus else None,
                focusOffset=focus['x'] if focus else None,shadow=shadow)
        assert len(recipes)==24
        output['src/generated/tab-recipes.json']=json.dumps(recipes,ensure_ascii=False,indent=2)+'\n'
    if 'CHIP-001' in active:
        data=json.loads((ROOT/'specs/data/chip.v1.0.0.json').read_text())
        states={'default':'', 'hover':':where(:hover)',
                'focus':':where(:focus-visible, :has(:focus-visible))',
                'pressed':':where(:active)', 'disabled':'[data-disabled="true"]'}
        rules=[]
        def chip_role(node, field, unit=False, fallback='transparent'):
            identifier=node['b'].get(field)
            if not identifier:
                return fallback
            value=f"var({data['tokens'][identifier]['css']})"
            return f'calc({value} * 1px)' if unit else value
        def chip_rule(selector, values):
            properties='; '.join(f'--bh-chip-{key}: {value}' for key,value in values.items())
            rules.append(f'  {selector} {{ {properties}; }}')
        for owner in data['sets']:
            matrix={}
            for row in owner['variants']:
                axes=dict(axis.split('=',1) for axis in row['name'].split(', '))
                matrix[axes['selected'],axes['state']]=row
            assert len(matrix)==10
            size=owner['name'].split('/')[-1]
            scope=f'.bh-chip[data-size="{size}"]'
            base=matrix['false','default']
            icon,label,counter,_,_=base['children']
            count,=counter['children']
            ring=matrix['false','focus']['children'][-1]
            chip_rule(scope,dict(
                height=chip_role(base,'height',True),radius=chip_role(base,'topLeftRadius',True),
                gap=chip_role(base,'itemSpacing',True),padding=chip_role(base,'paddingLeft',True),
                glyph=chip_role(icon,'width',True),font=chip_role(label,'fontFamily'),
                tracking=chip_role(label,'letterSpacing',True),
                label_size=chip_role(label,'fontSize',True),label_line=chip_role(label,'lineHeight',True),
                label_weight=chip_role(label,'fontStyle'),count_size=chip_role(count,'fontSize',True),
                count_line=chip_role(count,'lineHeight',True),count_weight=chip_role(count,'fontStyle'),
                count_padding=chip_role(counter,'paddingLeft',True),
                focus=chip_role(ring,'strokes'),focus_width=chip_role(ring,'strokeTopWeight',True),
                focus_offset=f"{-ring['x']-ring['strokeWeight']:g}px"))
            for selected in ('false','true'):
                for state,pseudo in states.items():
                    row=matrix[selected,state]
                    icon,label,counter,*_=row['children']
                    count,=counter['children']
                    chip_rule(f'{scope}[data-selected="{selected}"]{pseudo}',dict(
                        surface=chip_role(row,'fills'),border=chip_role(row,'strokes'),
                        border_width=chip_role(row,'strokeTopWeight',True,'0px'),
                        color=chip_role(label,'fills'),glyph_color=chip_role(icon['vectorFills'][0],'fills'),
                        count_surface=chip_role(counter,'fills'),count_color=chip_role(count,'fills')))
        output['src/generated/chip-recipes.css']='@layer components {\n'+'\n'.join(rules)+'\n}\n'
    if 'TABLE-CELL-001' in active:
        data=json.loads((ROOT/'specs/data/table-cell.v1.0.0.json').read_text())
        rules=[]
        def cell_role(node, field, unit=False, fallback='transparent'):
            key=node['b'].get(field) if node else None
            if not key:
                return fallback
            role=f"var({data['tokens'][key]['css']})"
            return f'calc({role} * 1px)' if unit else role
        matrices={owner['name']:owner['variants'] for owner in data['sets']}
        for family in ('Table cell','Table capture cell'):
            capture=family=='Table capture cell'
            for row in matrices[family]:
                axes=dict(axis.split('=',1) for axis in row['name'].split(', '))
                state=axes['state']
                parts=row['children']
                field=next((node for node in parts if node['name']=='tex-box'),None)
                label=next((node for node in (field or row)['children'] if node['name']=='Label'),None)
                divider=next((node for node in parts if node['name']=='divider'),None)
                if capture:
                    active_capture=str(axes['cell capture']=='on').lower()
                    scope=f'.bh-table-cell[data-capture="{active_capture}"]'
                else:
                    scope=f'.bh-table-cell[data-item="{axes["item"]}"][data-kind="{axes["type"]}"]'
                selectors=[f'{scope}[data-state="{state}"]']
                if state=='hover':
                    selectors.append(f'{scope}[data-state="default"]:where(:hover)')
                if state=='focus':
                    selectors.append(f'{scope}[data-state="default"]:where(:has(:focus-visible))')
                values=dict(surface=cell_role(row,'fills'),padding=cell_role(row,'paddingLeft',True),
                            gap=cell_role(row,'itemSpacing',True,'0px'),
                            text=cell_role(label,'fills',fallback='var(--table-cell-color-text-cell-default)'),
                            weight=cell_role(label,'fontStyle',fallback='var(--table-cell-font-cell-style-body)'),
                            divider=cell_role(divider,'fills'),focus=cell_role(row,'strokes'),
                            focus_width=cell_role(row,'strokeTopWeight',True,'0px'))
                if field:
                    values.update(field_fill=cell_role(field,'fills'),field_border=cell_role(field,'strokes'),
                                  field_width=cell_role(field,'strokeTopWeight',True,'0px'),
                                  field_gap=cell_role(field,'itemSpacing',True),
                                  field_padding=cell_role(field,'paddingLeft',True))
                properties='; '.join(f'--bh-cell-{key}: {value}' for key,value in values.items())
                rules.append(f'  {", ".join(selectors)} {{ {properties}; }}')
        assert len(rules)==38
        output['src/generated/table-cell-recipes.css']='@layer components {\n'+'\n'.join(rules)+'\n}\n'
    examples=(WEB/'src/examples.tsx').read_text()
    parts=re.split(r'// example: ([\w-]+)\n',examples)
    blocks={parts[i]:parts[i+1].strip() for i in range(1,len(parts),2)}
    assert set(blocks)=={r['slug'] for r in rows},'Ejemplos y familias no coinciden'
    catalogue=[]; map_lines=["'use client';", "import * as Examples from '../examples';", "import type { ComponentType } from 'react';",'export const examples: Record<string, ComponentType> = {']
    for row in rows:
        module=WEB/f'src/components/{row["module"]}.tsx';code=module.read_text()
        for name in row['exports']:assert f'export function {name}' in code or f'export const {name}' in code,f'Falta export {name}'
        assert row['base']==active[row['id']]['base']['path'],f'Base cambió: {row["id"]}'
        sources=[row['base']]+row['amendments']
        guide_source=row.get('usage_guide', row['base'])
        if guide_source not in sources:
            raise ValueError('La guía debe pertenecer al contrato o a una enmienda vigente')
        guide=re.search(r'^## Guía semántica normativa\s*\n(.*?)(?=^## |\Z)', (ROOT/guide_source).read_text(), re.M|re.S)
        if guide is None or not guide[1].strip():
            raise ValueError('Falta la guía semántica normativa: '+row['id'])
        hashes={p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in sources}
        apis={}
        for m in re.finditer(r'export (?:interface|type) (\w+)',code):
            end=code.find('\nexport ',m.end());apis[m.group(1)]=code[m.start():end if end>=0 else len(code)].strip().split('\nfunction ')[0].split('\ntype ')[0]
        needed={name+'Props' for name in row['exports']};previous=set()
        while previous!=needed:
            previous=set(needed)
            for key in apis:
                if any(re.search(r'\b'+re.escape(key)+r'\b',apis.get(n,'')) for n in needed):needed.add(key)
        api='\n\n'.join(apis[n] for n in apis if n in needed)
        assert api,'Falta API tipada '+row['name']
        block=blocks[row['slug']];function=re.search(r'export function (\w+)',block).group(1)
        map_lines.append(f'  {json.dumps(row["slug"])}: Examples.{function},')
        example=parts[0].replace("'./index'","'@/index'").strip()+'\n\n'+block+'\n'
        defaults=[]
        for name in row['exports']:
            m=re.search(r'export function '+name+r'(?:<[^\n]+?>)?\((.*?)\)\s*\{',code,re.S)
            if m:defaults.append(name+': '+m.group(1).strip())
        doc=f'''# {row['name']} · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `{row['id']}` · API local 0.1.0 · categoría {row['category']}.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../{guide_source}#guía-semántica-normativa).

{guide[1].strip()}

## Uso sin backend

{row['notes']}

```tsx
{example.rstrip()}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [{module.name}](../../src/components/{module.name}). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
{api}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
{chr(10).join(defaults)}
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **{row['slots']['status']}**. {row['slots']['reason'].rstrip('.') }. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

'''
        for path,digest in hashes.items(): doc+=f'- [{Path(path).name}](../../../../{path}) · SHA-256 `{digest}`.\n'
        doc+='\nLas enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.\n\n## Verificación\n\n`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../'+row.get('qa','qa/implementations/web.v0.1.0.review.md')+') identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.\n'
        output[f'docs/components/{row["slug"]}.md']=doc
        output[f'public/docs/{row["slug"]}.md']=doc
        catalogue.append(dict(row,hashes=hashes,api=api,example=example,defaults=defaults))
    map_lines.append('};\n');output['src/generated/example-map.tsx']='\n'.join(map_lines)
    output['src/generated/catalog.json']=json.dumps(catalogue,ensure_ascii=False,indent=2)+'\n'
    output['docs/components/README.md']='# Componentes web\n\nÍndice generado. Cada ficha contiene API, ejemplo ejecutable, Slots, fuentes y límites.\n\n'+'\n'.join(f'- [{r["name"]}]({r["slug"]}.md) · {r["id"]}' for r in rows)+'\n'
    return output

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args();changed=[]
    for name,content in build().items():
        path=WEB/name;raw=content if isinstance(content,bytes) else content.encode()
        if not path.exists() or path.read_bytes()!=raw:
            changed.append(name)
            if not args.check:path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(raw)
    if args.check and changed:raise SystemExit('Derivados desactualizados: '+', '.join(changed))
    families=len(json.loads((WEB/'components.registry.json').read_text()))
    print(f'P07: {families} familias cubiertas; {len(changed)} derivados '+('desactualizados' if args.check else 'actualizados')+'.')
if __name__=='__main__':main()
