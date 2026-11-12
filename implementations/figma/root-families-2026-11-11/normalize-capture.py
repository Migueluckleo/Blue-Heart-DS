"""Resolve a native source capture against the previously verified target variable map."""
import hashlib
import json
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[3]
slug, source_version, expected_count = sys.argv[1:]
source = root / 'sources/figma-snapshots/root-families-2026-11-11'
packed_capture = (source / f'{slug}.sets.json').is_file()
if packed_capture:
    parts = sorted(source.glob(f'{slug}-*.packed.json'))
else:
    parts = sorted(source.glob(f'{slug}-*.detail.json'), key=lambda path: int(path.name.split('-')[-1].split('.')[0]))
items = [json.loads(path.read_text()) for path in parts]
if packed_capture:
    source_sets = json.loads((source / f'{slug}.sets.json').read_text())['sets']
    set_ids = {entry['id'] for entry in source_sets}
    selected = [(path,item) for path,item in zip(parts,items) if item['setId'] in set_ids]
    parts, items = zip(*selected)
    for item in items:
        def unpack(row):
            node = {}
            for i, value in zip(row[::2], row[1::2]):
                field = item['fields'][i]
                node[field] = [unpack(child) for child in value] if field == 'children' else item['pool'][value]
            return node

        item['variants'] = [unpack(row) for row in item['packed']]
norm_slug = {'sidebar-help':'sidebar','dropdown-scrollbar':'dropdown-menu'}.get(slug,slug)
norm = source / f'{norm_slug}.{source_version}.md.txt'
map_path = root / 'implementations/figma/variables-2026-11-11/id-map.json'
names = {entry['sourceId']: entry for entry in json.loads(map_path.read_text())['variables']}
manifest_path = root / 'implementations/web/src/generated/tokens.manifest.json'
manifest = {entry['name']: entry for entry in json.loads(manifest_path.read_text())['tokens']}
tokens = {}
nested_path = source / {'header-actions':'header-actions-nested-glyphs.json',
                        'section-header':'section-header-settings-glyph.json',
                        'floating-actions':'floating-actions-nested-glyphs.json',
                        'inline-notification':'inline-notification-nested-glyphs.json',
                        'pagination':'pagination-nested-glyphs.json'}.get(slug,'sidebar-nested-glyphs.json')
nested_glyphs = json.loads(nested_path.read_text())['instances'] if slug in (
    'sidebar','sidebar-help','header-actions','section-header','pagination','floating-actions','inline-notification') else {}
group_path = source / 'avatar-group-fills.json'
group_fills = json.loads(group_path.read_text())['overrides'] if slug == 'avatar-group' else {}

def bindings(node):
    mapped = {}
    for field, alias in node.get('boundVariables', {}).items():
        if isinstance(alias, list):
            if len(alias) != 1:
                raise ValueError(f'Unsupported multiple aliases on {field}')
            alias = alias[0]
        vid = alias['id']
        target = names[vid]
        name = target['targetPath']
        kind = 'STRING' if field in ('fontFamily', 'fontStyle') else 'COLOR' if field in ('fills', 'strokes') else 'FLOAT'
        tokens[vid] = dict(name=name, targetId=target['targetId'], css=manifest[name]['css'], type=kind)
        mapped[field] = vid
    return mapped

def normalize(node):
    scalar = set(('id name type x y width height visible layoutMode layoutPositioning layoutSizingHorizontal '
                  'layoutSizingVertical primaryAxisSizingMode counterAxisSizingMode primaryAxisAlignItems '
                  'counterAxisAlignItems paddingTop paddingRight paddingBottom paddingLeft itemSpacing minWidth '
                  'maxWidth minHeight maxHeight strokesIncludedInLayout clipsContent cornerRadius strokeWeight '
                  'strokeAlign rotation constraints fontName characters fontSize lineHeight letterSpacing textDecoration '
                  'textAlignHorizontal textAlignVertical textAutoResize textTruncation maxLines textStyleId effectStyleId vectorPaths '
                  'main instanceProperties instanceVisibility isExposedInstance swapAssets nestedTooltip reactions dashPattern cornerSmoothing').split())
    clean = {key: value for key, value in node.items() if key in scalar}
    if slug == 'section-header' and node.get('layoutWrap')=='WRAP':
        clean.update({key:node[key] for key in ('layoutWrap','counterAxisAlignContent','counterAxisSpacing') if key in node})
    if slug == 'app-shell':
        if node.get('layoutMode') == 'GRID':
            for axis in ('Row','Column'):
                for suffix in ('Count','Gap','Sizes'):
                    key = f'grid{axis}{suffix}'
                    clean[key] = node[key]
        if node.get('gridRowAnchorIndex',-1) >= 0:
            for axis in ('Row','Column'):
                for suffix in ('AnchorIndex','Span'):
                    key = f'grid{axis}{suffix}'
                    clean[key] = node[key]
            for axis in ('Horizontal','Vertical'):
                key = f'gridChild{axis}Align'
                clean[key] = node[key]
    if slug == 'menu-item' and node.get('itemReverseZIndex'):
        clean['itemReverseZIndex'] = True
    if 'reactions' in clean:
        clean['reactions'] = [{'trigger': reaction['trigger'], 'actions': reaction['actions']} for reaction in clean['reactions']]
    mixed = len(node.get('segments', [])) > 1
    for field in ('fills', 'strokes'):
        clean[field] = [{key: value for key, value in paint.items()
                         if key in ('type', 'color', 'opacity', 'visible', 'blendMode', 'gradientTransform', 'gradientStops',
                                    'imageHash', 'imageTransform', 'scaleMode', 'scalingFactor', 'rotation', 'filters')}
                        for paint in node.get(field, [])]
    gradient = any('gradientStops' in paint for paint in clean['fills'])
    layer_bindings = {key: value for key, value in node.get('boundVariables', {}).items()
                      if not (key == 'fills' and gradient or key == 'effects' and node.get('effectStyleId'))}
    clean['b'] = {} if mixed else bindings({'boundVariables':layer_bindings})
    if gradient:
        for paint in clean['fills']:
            for stop in paint.get('gradientStops', []):
                alias = stop.pop('boundVariables', {}).get('color')
                if alias:
                    stop['binding'] = bindings({'boundVariables':{'fills':alias}})['fills']
    if mixed:
        clean['segments'] = [
            {**{key: segment[key] for key in ('start','end','fontName','textStyleId')},
             'fills': [{key: value for key, value in paint.items()
                        if key in ('type','color','opacity','visible','blendMode')} for paint in segment['fills']],
             'b': bindings({**segment,'boundVariables':{
                 **segment['boundVariables'], 'fills':segment['fills'][0]['boundVariables']['color'],
             }})}
            for segment in node['segments']
        ]
    if 'vectorFills' in node:
        clean['vectorFills'] = [
            dict(name=vector['name'], b=bindings(vector),
                 fills=[{key:value for key,value in paint.items()
                         if key in ('type','color','opacity','visible','blendMode')} for paint in vector['fills']])
            for vector in node['vectorFills']
        ]
    if glyph := nested_glyphs.get(node['id']):
        paint = {key:value for key,value in glyph['paint'].items() if key != 'boundVariables'}
        identifier = glyph.get('alias')
        if not identifier:
            assert slug=='header-actions'
            icons = json.loads((root/'specs/data/icon-button.v1.0.0.json').read_text())
            main = next(v for owner in icons['sets'] for v in owner['variants'] if v['id']==node['main']['id'])
            default = next(child for child in main['children'] if child['name']=='Icon')
            inherited = default['vectorFills'][0]
            assert default['main']['key']==glyph['key'] and inherited['fills'][0]['color']==paint['color']
            identifier = inherited['b']['fills']
        alias = {'type':'VARIABLE_ALIAS','id':identifier}
        clean['nestedGlyph'] = dict(key=glyph['key'],name=glyph['name'],fills=[paint],
                                    b=bindings({'boundVariables':{'fills':alias}}))
        if glyph.get('badge') is not None:
            clean['nestedBadge'] = glyph['badge']
    if entries := group_fills.get(node['id']):
        clean['linkedFills'] = []
        for entry in entries:
            paint = {key:value for key,value in entry['paint'].items() if key != 'boundVariables'}
            alias = {'type':'VARIABLE_ALIAS','id':entry['alias']}
            clean['linkedFills'].append(dict(path=entry['path'],fills=[paint],
                b=bindings({'boundVariables':{'fills':alias}})))
    if node.get('componentPropertyReferences'):
        clean['refs'] = node['componentPropertyReferences']
    if 'children' in node:
        clean['children'] = [normalize(child) for child in node['children']]
        if slug == 'dropdown-item' and node['name'] == 'Content':
            for child in clean['children']:
                if child['name'] == 'Description':
                    child.update(width=node['width'], layoutSizingHorizontal='FILL', layoutSizingVertical='HUG')
    if slug == 'table' and 'overflowDirection' in node:
        clean['overflowDirection'] = node['overflowDirection']
    if slug == 'dropdown-menu' and node['type'] == 'SLOT':
        viewport = json.loads((source/'dropdown-viewport.json').read_text())[1]
        slot = next(child for child in viewport['children'] if child['id'] == node['id'])
        clean['overflowDirection'] = slot['overflow']
    return clean

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

variants = [normalize(variant) for item in items for variant in item['variants']]
assert len(variants) == int(expected_count) and len({variant['id'] for variant in variants}) == int(expected_count)
identity = items[0]
assert all(item['fileKey'] == identity['fileKey'] and item['pageId'] == identity['pageId'] for item in items)
styles = {
    key: {**{field: val for field, val in style.items() if field != 'boundVariables'}, 'b': bindings(style)}
    for item in items for key, style in item['styles'].items()
}
effects = {key: val for item in items for key, val in item.get('effectStyles', {}).items()}
for effect in effects.values():
    for shadow in effect['effects']:
        aliases = shadow.pop('boundVariables', {})
        if aliases:
            assert slug in ('input','dropdown-menu','floating-actions')
            shadow['bindings'] = {}
            for field, alias in aliases.items():
                kind = 'fills' if field == 'color' else 'radius'
                shadow['bindings'][field] = bindings({'boundVariables': {kind: alias}})[kind]
data = dict(family=slug, sourceFileKey=identity['fileKey'], sourcePageId=identity['pageId'],
            sourceSetId=identity['setId'], sourceNorm=str(norm.relative_to(root)), sourceNormSha256=digest(norm),
            sourceParts={str(path.relative_to(root)):digest(path) for path in parts}, properties=identity['properties'],
            variants=variants, styles=styles, tokens=tokens)
if nested_glyphs:
    data['sourceParts'][str(nested_path.relative_to(root))] = digest(nested_path)
if group_fills:
    data['sourceParts'][str(group_path.relative_to(root))] = digest(group_path)
if slug == 'dropdown-menu':
    viewport = source/'dropdown-viewport.json'
    data['sourceParts'][str(viewport.relative_to(root))] = digest(viewport)
if slug == 'table':
    rows = source/'table-main-continuation.json'
    data['rowsSource'] = str(rows.relative_to(root))
    data['sourceParts'][data['rowsSource']] = digest(rows)
    for name in ('table-main-overrides.json','table-main-row-paints.json'):
        evidence = source/name
        data['sourceParts'][str(evidence.relative_to(root))] = digest(evidence)
if effects:
    data['effectStyles'] = effects
if packed_capture:
    meta = source / f'{slug}.sets.json'
    by_id = {variant['id']: variant for variant in data.pop('variants')}
    data['sets'] = [{**{key: value for key, value in entry.items() if key != 'vars'},
                     'name': next(item['name'] for item in items if item['setId'] == entry['id']),
                     'variants': [by_id[vid] for vid, name in entry['vars']]} for entry in source_sets]
    data['sourceParts'][str(meta.relative_to(root))] = digest(meta)
    if swaps := json.loads(meta.read_text()).get('swaps'):
        data['swaps'] = swaps
    data.pop('sourceSetId')
    data.pop('properties')
else:
    assert all(item['setId'] == identity['setId'] and item['properties'] == identity['properties'] for item in items)
path = root / f'specs/data/{slug}.v1.0.0.json'
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print(digest(path))
