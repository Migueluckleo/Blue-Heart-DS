"""Derive the Stepper recipes from the captured source and existing BlueHeart palette."""
import hashlib
import json
from pathlib import Path

root = Path(__file__).resolve().parents[3]
snapshots = root/'sources/figma-snapshots/root-families-2026-11-11'
source = snapshots/'stepper-source.json'
icons = snapshots/'phosphor-stepper.json'
raw = json.loads(source.read_text())
official = json.loads(icons.read_text())
foundation = root/'specs/tokens/blueheart-variables.v0.1.2.json'
base = json.loads(foundation.read_text())
semantic = {v['name']:v for c in base['collections'] if c['name']=='semantic' for v in c['variables']}
base_by_id = {v['id']:v for c in base['collections'] for v in c['variables']}
modes = ('Contable','Administrativo','Servicios','Personas')
prefixes = ('brand','brand-administrativo','brand-servicios','brand-personas')
glyphs = {key:owner['anatomy'][0][0] for owner in official['sets'] for _,key in owner['variants']}
assert official['fileKey']=='xZSksKpcQTp5H3C4dZApBL' and len(glyphs)==2

def file_hash(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def resolved(v):
    entry, = v['valuesByMode'].values()
    return resolved(base_by_id[entry['id']]) if isinstance(entry,dict) and entry.get('type')=='VARIABLE_ALIAS' else entry

def hex_color(value):
    return ''.join(f'{round(value[channel]*255):02x}' for channel in 'rgb')

def role(name, source_rgb, scopes, aliases, description):
    values = {m:{'type':'VARIABLE_ALIAS','id':semantic[a]['id']} for m,a in zip(modes,aliases)}
    assert hex_color(resolved(semantic[aliases[0]]))==source_rgb
    return {'name':f'stepper/color/{name}','resolvedType':'COLOR','valuesByMode':values,
            'codeSyntax':{'WEB':f'var(--stepper-color-{name})'},'scopes':scopes,'description':description}

roles = {
    '3255f7': role('brand','3255f7',['FRAME_FILL','SHAPE_FILL'],[p+'-default' for p in prefixes],
                   'Superficie de la marca actual y glifo de comprobación sobre acento.'),
    'bfcefe': role('accent','bfcefe',['FRAME_FILL','SHAPE_FILL'],[p+'-accent' for p in prefixes],
                   'Superficie del paso completado y tramo del conector con acento.'),
    'e2e8f0': role('muted','e2e8f0',['FRAME_FILL','SHAPE_FILL'],['neutral-muted']*4,
                   'Superficie inactiva y tramo neutro del conector.'),
    '64748b': role('medium','64748b',['SHAPE_FILL','TEXT_FILL'],['neutral-medium']*4,
                   'Texto principal, etiqueta de paso y glifo inactivo.'),
    '94a3b8': role('caption','94a3b8',['TEXT_FILL'],['neutral-soft']*4,
                   'Texto complementario Caption.'),
    'ffffff': role('base','ffffff',['FRAME_FILL','SHAPE_FILL'],['neutral-base']*4,
                   'Glifo sobre marca y superficie base del terminal horizontal.'),
}
line_size = 'stepper/size/line-inline'
line_examples = {line['id']:line['anatomy']['children'][0] for line in raw['evidence']['lines']}
colored_example = next(layer['fills'][0]['color'] for layer in line_examples.values()
                       if hex_color(layer['fills'][0]['color'])=='bfcefe')
tokens = {'collection':'component','variables':[
    *roles.values(),{'name':line_size,'resolvedType':'FLOAT','valuesByMode':dict.fromkeys(modes,80),
        'codeSyntax':{'WEB':'var(--stepper-size-line-inline)'},'scopes':['WIDTH_HEIGHT'],
        'description':'Longitud horizontal de 80 px observada en el conector.'}]}
legacy = {
    '5164:0':'spacing-none','5164:1':'spacing-xs','5164:2':'spacing-sm',
    '5164:6':'size-3xl','5164:13':line_size,'4317:267':'radius-none',
    '4317:269':'radius-md','4317:272':'radius-full','4360:12':'size-lg',
    '5165:698':'font-size-1xs','8394:4':'font-weight-regular','8394:2':'font-family-base',
    '3639:862':'font-size-sm','8394:8':'font-weight-semibold',
}
fields = set(('id name type x y width height rotation visible layoutMode layoutPositioning '
    'layoutSizingHorizontal layoutSizingVertical primaryAxisSizingMode counterAxisSizingMode '
    'primaryAxisAlignItems counterAxisAlignItems paddingTop paddingRight paddingBottom paddingLeft itemSpacing '
    'strokesIncludedInLayout clipsContent cornerRadius strokeWeight strokeAlign constraints characters '
    'fontName fontSize lineHeight letterSpacing textDecoration textAlignHorizontal textAlignVertical '
    'textAutoResize textTruncation maxLines fills strokes vectorPaths main').split())

def paint_role(paints):
    if len(paints)!=1 or paints[0]['type']!='SOLID':
        raise ValueError(f'Unsupported Stepper paint {paints}')
    return roles[hex_color(paints[0]['color'])]['name']

def normalize(node):
    out = {k:v for k,v in node.items() if k in fields}
    for field in ('fills','strokes'):
        out[field] = [{k:v for k,v in paint.items() if k!='boundVariables'} for paint in node.get(field,[])]
    for paint, original in zip(out['fills'],node.get('fills',[])):
        if (node['name']=='Step bar' and
            original.get('boundVariables',{}).get('color',{}).get('id','').endswith('/6075:76')):
            paint['color'] = colored_example
    bindings = {}
    for field, alias in node.get('boundVariables',{}).items():
        if field not in ('fills','strokes'):
            value = alias[0] if isinstance(alias,list) else alias
            bindings[field] = legacy[value['id'].split('/')[-1]]
    for field in ('fills','strokes'):
        if out[field]:
            bindings[field]=paint_role(out[field])
    out['b'] = bindings
    if node.get('componentPropertyReferences'):
        out['refs'] = node['componentPropertyReferences']
    if node.get('reactions'):
        raise ValueError(f'Unhandled interaction at {node["id"]}')
    if 'children' in node:
        out['children']=[normalize(c) for c in node['children']]
    if node['type']=='INSTANCE':
        main=dict(node['main'])
        if main['owner']=='Progress line':
            main['remote']=False
            layer = line_examples[node['id']]
            paints = [{k:v for k,v in p.items() if k!='boundVariables'} for p in layer['fills']]
            out['linkedFills']=[{'path':[layer['name']],'fills':paints,'b':{'fills':paint_role(paints)}}]
        else:
            name= glyphs[main['key']]
            [(old_name, paints, strokes, _)] = node['vectors']
            assert not strokes
            out['vectorFills']=[{'name':name,'fills':paints,'b':{'fills':paint_role(paints)}}]
        out['main']=main
        out['instanceProperties']={}
    return out

data = {'sourceFileKey':raw['fileKey'],'sourcePageId':raw['pageId'],
        'sourceParts':{str(p.relative_to(root)):file_hash(p) for p in (source,icons,foundation)},
        'sets':[],'styles':{},'swaps':{}}
for owner in raw['owners']:
    props={k:{a:b for a,b in v.items() if a!='preferredCount'} for k,v in owner['props'].items()}
    variants=[normalize(v) for v in owner['variants']]
    data['sets'].append({**owner,'pageName':'Steppers','props':props,'variants':variants})
    for key, prop in props.items():
        if prop['type']=='INSTANCE_SWAP':
            options=[child['main'] for variant in variants for mark in variant['children'] for holder in mark.get('children',[])
                for child in holder.get('children',[]) if child.get('main',{}).get('id')==prop['defaultValue']]
            data['swaps'][key]=options[0]
assert [len(s['variants']) for s in data['sets']]==[18,8]
for name,value in [('stepper.tokens.v1.0.0.json',tokens),('stepper.v1.0.0.json',data)]:
    p=root/'specs/data'/name
    p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
    print(p.name,file_hash(p))
