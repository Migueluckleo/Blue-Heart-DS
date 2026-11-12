"""Adaptación determinista a CSS. Los valores editables siguen en los JSON del DS."""
import hashlib, json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[3]
WEB = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / 'config/web-inputs.json').read_text())
SOURCES = CONFIG['token_sources']
MODES = CONFIG['modes']
def css_name(collection, name):
    prefix = 'primitive-' if collection == 'primitive' else ''
    return '--ds-'+prefix+re.sub(r'[^a-zA-Z0-9-]', '-', name).lower()
def build():
    tokens, ids, hashes = {}, {}, {}
    mode_names = {m:m for m in MODES} | {'Value':'Value'}
    def add(v, collection, source):
        key=(collection,v['name'])
        v=dict(v,collection=collection,source=source)
        raw_values=v.get('valuesByMode') or {k:dict(x,type='VARIABLE_ALIAS',name=x.get('name',x.get('primitiveName'))) for k,x in v['aliasesByMode'].items()}
        v['values']={mode_names.get(k,k):x for k,x in raw_values.items()}
        syntax = v.get('codeSyntax', {}).get('WEB', '')
        match = re.fullmatch(r'var\((--[a-zA-Z0-9_-]+)\)', syntax)
        v['css'] = match[1] if match else css_name(collection, v['name'])
        tokens[key]=v
        for field in ['id','targetId']:
            if v.get(field): ids[v[field]]=key
    for entry in SOURCES:
        source = entry['path']
        raw=(ROOT/source).read_bytes(); hashes[source]=hashlib.sha256(raw).hexdigest();d=json.loads(raw)
        if hashes[source] != entry['sha256']:
            raise ValueError('Hash de tokens distinto al delegado: ' + source)
        if 'collections' in d:
            for c in d['collections']:
                mode_names.update({m['modeId']:m['name'] for m in c['modes']})
                for v in c['variables']: add(v,c['name'],source)
            continue
        coll=d.get('collection','semantic');coll=coll if isinstance(coll,str) else coll['name']
        for v in d.get('variables',[]): add(v,v.get('collection',coll),source)
        if 'variableName' in d:
            v=tokens['semantic',d['variableName']]
            if 'valuesByMode' in d: v['values'].update({mode_names[k]:x for k,x in d['valuesByMode'].items()})
            if 'newAlias' in d: v['values'][d['modeName']]=d['newAlias']
            if 'scopes' in d:v['scopes']=d['scopes']
            v.setdefault('amendments',[]).append(source)
        for override in d.get('scopeOverrides',[]):
            tokens['semantic',override['name']]['scopes']=override['scopes']
    def alias_key(value):
        if value.get('id') in ids:return ids[value['id']]
        name=value.get('primitive_name',value.get('name'))
        key=('primitive',name)
        if key in tokens:return key
        if value.get('targetId') in ids:return ids[value['targetId']]
        raise ValueError(f'Alias sin resolver: {value}')
    def resolve(key,mode,stack=()):
        if key in stack:raise ValueError(f'Ciclo de aliases: {stack}')
        v=tokens[key];value=v['values'].get(mode,v['values'].get('Value'))
        if value is None:raise ValueError(f'Modo ausente: {key}, {mode}')
        if isinstance(value,dict) and value.get('type')=='VARIABLE_ALIAS':
            target=alias_key(value);resolve(target,mode,stack+(key,))
            return 'var('+tokens[target]['css']+')'
        if v['resolvedType']=='COLOR':
            return 'rgb('+ ' '.join(f'{value[c]*255:.8f}'.rstrip('0').rstrip('.') for c in 'rgb')+' / '+str(value.get('a',1))+')'
        if v['resolvedType']=='FLOAT':
            # Preserve the scalar; consumers apply only their verified unit.
            return repr(value)
        if v['name'].startswith(('font/weight/', 'font-weight/')):
            return str({'regular':400,'medium':500,'semibold':600,'semi bold':600,'bold':700}[str(value).lower()])
        return json.dumps('Manrope Variable' if value == 'Manrope' else value,ensure_ascii=False)
    lines=['/* Generado por scripts/tokens.py. No editar; ver tokens.manifest.json. */']
    if len({v['css'] for v in tokens.values()}) != len(tokens):
        raise ValueError('Colisión de nombres CSS')
    fixed = [k for k in sorted(tokens) if set(tokens[k]['values']) == {'Value'}]
    themed = [k for k in sorted(tokens) if k not in set(fixed)]
    lines += [':root {'] + [f'  {tokens[k]["css"]}: {resolve(k, "Value")};' for k in fixed] + ['}']
    for mode in MODES:
        lines += [(':root, ' if mode == MODES[0] else '')+f'[data-ds-theme="{mode.lower()}"] {{']
        lines += [f'  {tokens[k]["css"]}: {resolve(k, mode)};' for k in themed] + ['}']
    manifest={'kind':'DERIVED_NOT_AUTHORITY','sources':hashes,'modes':MODES,'tokens':[dict(name=v['name'],collection=v['collection'],css=v['css'],source=v['source'],amendments=v.get('amendments',[]),description=v.get('description',''),scopes=v.get('scopes',[]),values=v['values']) for k,v in sorted(tokens.items())]}
    return {'src/generated/tokens.css':'\n'.join(lines)+'\n','src/generated/tokens.manifest.json':json.dumps(manifest,ensure_ascii=False,indent=2)+'\n'}
if __name__=='__main__':
    for path,content in build().items():
        p=WEB/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(content)
    print('Tokens CSS generados desde el inventario y sus enmiendas explícitas.')
