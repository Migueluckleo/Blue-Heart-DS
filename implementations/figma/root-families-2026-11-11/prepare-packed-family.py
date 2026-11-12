"""Prepare bounded native mutations and independent reads from the delegated family."""
import json
import sys
from pathlib import Path

here = Path(__file__).resolve().parent
root = here.parents[2]
part, operation, start, limit = sys.argv[1:]
start, limit = int(start), int(limit)
icon_button = part.startswith('icon-button-')
input_field = part in ('input-empty','input-filled')
chip = part.startswith('chip-')
stepper = part in ('stepper-item','stepper-line')
table_cell = part in ('table-cell-actions','table-capture-cell','table-cell')
table_scrollbar = part in ('table-scrollbar-thumb','table-scrollbar-medium')
table_main = part == 'table-main'
table = table_cell or table_scrollbar or table_main
linked = icon_button or input_field or chip or stepper or table or part in ('avatar','avatar-group','company-selector','user-selector','header-actions','header',
                                 'section-header','app-shell','pagination-item','pagination','tab','tabs','text-area',
                                 'dropdown-item','dropdown-scrollbar','dropdown-menu',
                                 'floating-actions','inline-notification',
                                 'badge','file-upload','checkbox','search','breadcrumb-item','breadcrumb',
                                 'menu-item','top-bar','sidebar-help','sidebar')
slug = 'icon-button' if icon_button else 'input' if input_field else 'chip' if chip else 'stepper' if stepper else 'table-cell' if table_cell else 'table' if table_scrollbar or table_main else part if linked else 'linear-progress'
spec = json.loads((root / f'specs/data/{slug}.v1.0.0.json').read_text())
contract_slug = {'sidebar-help':'sidebar','dropdown-scrollbar':'dropdown-menu'}.get(part,slug)
contract = (root / f'specs/components/{contract_slug}.contract.v1.0.0.md').read_text()
receipt_pattern = f'{slug}-[0-9]*.mutation.json' if linked and not (icon_button or input_field or chip) else f'{slug}-*.mutation.json'
if table:
    receipt_pattern = 'table-*.mutation.json'
if stepper:
    receipt_pattern = 'stepper-*-*.mutation.json'
receipts = [json.loads(path.read_text()) for path in here.glob(receipt_pattern)
            if not table or path.name.removesuffix('.mutation.json').rsplit('-',1)[-1].isdigit()]
set_name = {'badge':'Badge','file-upload':'File Upload','checkbox':'Checkbox','search':'Search','breadcrumb-item':'Breadcrumb item','breadcrumb':'Breadcrumb','menu-item':'Menu item',
            'avatar':'Avatar','avatar-group':'Avatar group','company-selector':'Company selector','user-selector':'User selector',
            'header-actions':'Header actions','header':'Header','section-header':'Section Header','app-shell':'App Shell',
            'pagination-item':'Pagination item','pagination':'Pagination','tab':'Tab','tabs':'Tabs','text-area':'Text Area',
            'dropdown-item':'Dropdown item','dropdown-scrollbar':'__Dropdown/Scrollbar small vertical','dropdown-menu':'Dropdown menu',
            'floating-actions':'Floating Actions','inline-notification':'Inline Notification',
            'top-bar':'Top bar','sidebar-help':'__Sidebar/Help','sidebar':'Sidebar',
            'table-cell-actions':'__Table/Cell actions','table-capture-cell':'Table capture cell','table-cell':'Table cell',
            'table-main':'Table','table-scrollbar-thumb':'__Table/Scrollbar thumb','table-scrollbar-medium':'__Table/Scrollbar medium',
            'stepper-item':'Stepper','stepper-line':'__Stepper/Progress line',
            'helper':'__Linear Progress/Indeterminate'}.get(part,f'Linear Progress Bar/{part}')
if icon_button:
    set_name = 'Icon Button/' + part.removeprefix('icon-button-')
if input_field:
    set_name = 'Input/' + part.removeprefix('input-')
if chip:
    set_name = 'Chip/' + part.removeprefix('chip-')
family_set = next(item for item in spec['sets'] if item['name'] == set_name)
target_key = 'yZsIpXywybsPDytjolwcP4'
ids = {entry['setName']: entry['setId'] for entry in receipts}
nodes = {src: dst for entry in receipts for src, dst in entry['nodes'].items()}
styles = {src: dst for entry in receipts for src, dst in entry['styles'].items()}
description_section = contract.split('## Description exacta')[1].split('##')[0].strip()
description = description_section if linked and part not in ('sidebar','sidebar-help','dropdown-menu','dropdown-scrollbar') and not (icon_button or input_field or chip or stepper or table) else next(
    row.split(' | ')[1] for row in description_section.splitlines() if row.startswith(f'| {set_name} |')
).removesuffix(' |')
guide = {'badge':'332-234','file-upload':'477-12','checkbox':'382-12','search':'648-20','breadcrumb-item':'363-67','breadcrumb':'363-67','menu-item':'754-153',
         'avatar':'161-281','avatar-group':'161-281','company-selector':'503-195','user-selector':'503-195','header-actions':'503-195','header':'503-195',
         'top-bar':'754-153','sidebar-help':'754-153','sidebar':'754-153','section-header':'893-69',
         'app-shell':'941-1319','pagination-item':'594-34','pagination':'594-34',
         'tab':'82-2','tabs':'111-461','text-area':'665-10',
         'dropdown-item':'403-33','dropdown-scrollbar':'403-33','dropdown-menu':'403-33',
         'floating-actions':'914-12185','inline-notification':'571-28'}.get(part,'448-14')
if icon_button:
    source_page = spec['sourcePageId'].replace(':','-')
    guide = next(node_id.replace(':','-') for node_id,name,kind in json.loads(
        (root/f'sources/figma-snapshots/root-families-2026-11-11/page-{source_page}.json').read_text()
    )['children'] if kind=='FRAME' and 'guía' in name.lower())
if input_field:
    guide = '287-44'
if chip:
    guide = '434-2'
if table:
    guide = '846-2773'
if stepper:
    guide = '1020-589'
links = [{'uri': f"https://www.figma.com/design/{spec['sourceFileKey']}?node-id={guide}"}]
page_name = family_set.get('pageName') or (set_name if linked else 'Linear Progress Bar')
if stepper:
    ledger = json.loads((here.parent/'variables-2026-11-11/id-map.json').read_text())
    foundation = json.loads((root/'specs/tokens/blueheart-variables.v0.1.2.json').read_text())
    resolved = {v['targetPath']:v['targetId'] for v in ledger['variables']}
    spec['tokens'] = {v['name']:dict(name=v['name'],targetId=resolved[v['name']],type=v['resolvedType'])
                      for c in foundation['collections'] if c['name']=='semantic' for v in c['variables']}
    receipt = json.loads((here/'stepper-variables.readback.json').read_text())
    spec['tokens'].update({name:dict(name=name,targetId=v['id'],type=v['type']) for name,v in receipt['variables'].items()})
data = dict(targetFileKey=target_key, fileKey=target_key, pageName=page_name,
            pageId=receipts[0]['pageId'] if receipts else None, setName=set_name, setId=ids.get(set_name),
            allowedSiblingIds=list(ids.values()), description=description, links=links, tokens=spec['tokens'],
            styles=spec['styles'] if operation == 'build' else styles, properties=family_set['props'],
            setGeometry={key: family_set[key] for key in ('x', 'y', 'width', 'height')}, dependencies=dict(nodes))
data['ownerType'] = family_set.get('type','COMPONENT_SET')
if 'layout' in family_set:
    data['setLayout'] = family_set['layout']

if linked:
    avatar_header = ('avatar','avatar-group','company-selector','user-selector','header-actions','header')
    icon_capture = 'avatar-header' if part in avatar_header else 'chip' if chip else 'stepper' if stepper else 'table' if table else {
        'badge':'badge','file-upload':'file-upload-checkbox','checkbox':'file-upload-checkbox',
        'input-empty':'input','input-filled':'input','section-header':'section-header',
        'pagination-item':'pagination','pagination':'pagination','tab':'tabs','tabs':'tabs','text-area':'text-area',
        'dropdown-item':'dropdown','dropdown-scrollbar':'dropdown','dropdown-menu':'dropdown',
        'floating-actions':'actions-notification','inline-notification':'actions-notification',
    }.get(part,'search-navigation')
    evidence = root / f'sources/figma-snapshots/root-families-2026-11-11/phosphor-{icon_capture}.json'
    library = json.loads(evidence.read_text())
    assert library['fileKey'] == 'xZSksKpcQTp5H3C4dZApBL'
    data['remoteKeys'] = [key for icon in library['sets'] for _,key in icon['variants']]
    data['applyInstanceOverrides'] = True
    if part in ('floating-actions','inline-notification'):
        for path in here.glob('icon-button-ghost-[0-9]*.mutation.json'):
            data['dependencies'].update(json.loads(path.read_text())['nodes'])
        if part == 'floating-actions':
            for path in here.glob('dot-[0-9]*.mutation.json'):
                data['dependencies'].update(json.loads(path.read_text())['nodes'])
            buttons = json.loads((here.parent/'buttons-loader-2026-11-11/button-text.mutation.json').read_text())
            data['dependencies'].update({v['sourceId']:v['id'] for group in buttons['sets'] for v in group['variants']})
            data['effectStyles'] = spec['effectStyles']
            if operation == 'audit':
                data['effectStyleIds'] = {src:dst for entry in receipts for src,dst in entry['effectStyles'].items()}
    if chip or stepper or table_cell:
        data['swaps'] = spec['swaps']
    if stepper:
        data['ignoreVariantOptionOrder'] = ['type','state','position']
    if part == 'table-cell':
        for family in ('avatar','checkbox','toggle','badge'):
            for path in here.glob(f'{family}-[0-9]*.mutation.json'):
                data['dependencies'].update(json.loads(path.read_text())['nodes'])
        data['ignoreVariantOptionOrder'] = ['item','type','state']
        data['overrideLocalInstanceDimensions'] = True
    if table_main:
        for path in here.glob('pagination-[0-9]*.mutation.json'):
            data['dependencies'].update(json.loads(path.read_text())['nodes'])
        data['overrideLocalInstanceDimensions'] = True
        data['auditRowsSeparately'] = True
    if table_scrollbar and part == 'table-scrollbar-medium':
        data['overrideLocalInstanceDimensions'] = True
        data['slotPreferredId'] = ids['__Table/Scrollbar thumb']
        data['slotPreferredType'] = 'COMPONENT'
        data['sharedSlots'] = [key for key,prop in family_set['props'].items() if prop['type']=='SLOT']
    if part == 'dropdown-item':
        data['swaps'] = spec['swaps']
        data['auditHiddenDescription'] = True
    if part in ('dropdown-menu','dropdown-scrollbar'):
        items = [json.loads(path.read_text()) for path in here.glob('dropdown-item-[0-9]*.mutation.json')]
        data['pageId'] = items[0]['pageId']
        data['allowedSiblingIds'].append(items[0]['setId'])
        if part == 'dropdown-menu':
            data['slotPreferredId'] = items[0]['setId']
            data['effectStyles'] = spec['effectStyles']
            helper = json.loads((here/'dropdown-scrollbar-0.mutation.json').read_text())
            data['allowedSiblingIds'].append(helper['setId'])
            for entry in [*items,helper]:
                data['dependencies'].update(entry['nodes'])
            if operation == 'audit':
                data['effectStyleIds'] = {src:dst for entry in receipts for src,dst in entry['effectStyles'].items()}
    if part in ('tab','tabs'):
        data['effectStyles'] = spec['effectStyles']
    if part == 'tab':
        data['swaps'] = spec['swaps']
        for path in here.glob('dot-[0-9]*.mutation.json'):
            data['dependencies'].update(json.loads(path.read_text())['nodes'])
        if operation == 'audit':
            data['effectStyleIds'] = {src:dst for entry in receipts for src,dst in entry['effectStyles'].items()}
    if part == 'tabs':
        items = [json.loads(path.read_text()) for path in here.glob('tab-[0-9]*.mutation.json')]
        data['restoreAbsoluteOffsets'] = True
        data['pageId'] = items[0]['pageId']
        data['allowedSiblingIds'].append(items[0]['setId'])
        data['slotPreferredId'] = items[0]['setId']
        data['sharedSlots'] = [key for key,prop in family_set['props'].items() if prop['type']=='SLOT']
        data['effectStyleIds'] = {src:dst for entry in items for src,dst in entry['effectStyles'].items()}
        for entry in items:
            data['dependencies'].update(entry['nodes'])
    if part == 'pagination-item':
        data['swaps'] = spec['swaps']
    if part == 'pagination':
        items = [json.loads(path.read_text()) for path in here.glob('pagination-item-[0-9]*.mutation.json')]
        data['overrideLocalInstanceWidth'] = True
        data['pageId'] = items[0]['pageId']
        data['allowedSiblingIds'].append(items[0]['setId'])
        data['slotPreferredId'] = items[0]['setId']
        data['sharedSlots'] = [key for key,prop in family_set['props'].items() if prop['type']=='SLOT']
        for entry in items:
            data['dependencies'].update(entry['nodes'])
        for path in here.glob('input-filled-[0-9]*.mutation.json'):
            data['dependencies'].update(json.loads(path.read_text())['nodes'])
    if part == 'app-shell':
        for prefix in ('header','sidebar','section-header'):
            for path in here.glob(f'{prefix}-[0-9]*.mutation.json'):
                data['dependencies'].update(json.loads(path.read_text())['nodes'])
        data['sharedSlots'] = [key for key,prop in family_set['props'].items() if prop['type']=='SLOT']
    if input_field:
        data['swaps'] = spec['swaps']
        data['effectStyles'] = spec['effectStyles']
        badges = [json.loads(path.read_text()) for path in here.glob('badge-[0-9]*.mutation.json')]
        data['dependencies'].update({src:dst for entry in badges for src,dst in entry['nodes'].items()})
        if operation == 'audit':
            data['effectStyleIds'] = {src:dst for entry in receipts for src,dst in entry['effectStyles'].items()}
    if part == 'section-header':
        for pattern in ('breadcrumb-[0-9]*.mutation.json','badge-[0-9]*.mutation.json',
                        'input-empty-*.mutation.json','icon-button-secondary-*.mutation.json'):
            for path in here.glob(pattern):
                data['dependencies'].update(json.loads(path.read_text())['nodes'])
        buttons = json.loads((here.parent/'buttons-loader-2026-11-11/button-primary.mutation.json').read_text())
        data['dependencies'].update({v['sourceId']:v['id'] for group in buttons['sets'] for v in group['variants']})
    if part == 'badge':
        data['swaps'] = spec['swaps']
    if part == 'avatar':
        data['swaps'] = spec['swaps']
        data['deferImages'] = operation == 'build'
        dot = [json.loads(path.read_text()) for path in here.glob('dot-[0-9]*.mutation.json')]
        data['dependencies'].update({src:dst for entry in dot for src,dst in entry['nodes'].items()})
    if part == 'avatar-group':
        avatars = [json.loads(path.read_text()) for path in here.glob('avatar-[0-9]*.mutation.json')]
        data['pageId'] = avatars[0]['pageId']
        data['allowedSiblingIds'].append(avatars[0]['setId'])
        data['slotPreferredId'] = avatars[0]['setId']
        data['sharedSlots'] = [key for key,prop in family_set['props'].items() if prop['type']=='SLOT']
        data['dependencies'].update({src:dst for entry in avatars for src,dst in entry['nodes'].items()})
    header_parts = ('company-selector','user-selector','header-actions','header')
    if part in header_parts:
        for sibling in header_parts:
            if sibling == part:
                continue
            existing = [json.loads(path.read_text()) for path in here.glob(f'{sibling}-[0-9]*.mutation.json')]
            if existing:
                data['pageId'] = existing[0]['pageId']
                data['allowedSiblingIds'].append(existing[0]['setId'])
                data['dependencies'].update({src:dst for entry in existing for src,dst in entry['nodes'].items()})
        if part == 'user-selector':
            avatars = [json.loads(path.read_text()) for path in here.glob('avatar-[0-9]*.mutation.json')]
            data['dependencies'].update({src:dst for entry in avatars for src,dst in entry['nodes'].items()})
        if part == 'header-actions':
            ghost = [json.loads(path.read_text()) for path in here.glob('icon-button-ghost-*.mutation.json')]
            data['dependencies'].update({src:dst for entry in ghost for src,dst in entry['nodes'].items()})
            glyphs = json.loads(evidence.with_name('phosphor-header-actions.json').read_text())
            assert glyphs['fileKey']=='xZSksKpcQTp5H3C4dZApBL'
            data['remoteKeys'].extend(glyph['key'] for glyph in glyphs['glyphs'])
        if part == 'header':
            badges = [json.loads(path.read_text()) for path in here.glob('badge-[0-9]*.mutation.json')]
            data['dependencies'].update({src:dst for entry in badges for src,dst in entry['nodes'].items()})
            logo = json.loads(evidence.with_name('header-brand.json').read_text())
            assert logo['fileKey']==spec['sourceFileKey']
            data['remoteKeys'].append(logo['logo']['mainKey'])
            presentation = json.loads(evidence.with_name('phosphor-badge.json').read_text())
            data['remoteKeys'].extend(key for item in presentation['sets'] for _,key in item['variants'])
    if part == 'menu-item':
        data['swaps'] = spec['swaps']
        data['effectStyles'] = spec['effectStyles']
        data['ignoreVariantOptionOrder'] = ['type']
        tooltip = [json.loads(path.read_text()) for path in here.glob('tooltip-[0-9]*.mutation.json')]
        data['dependencies'].update({src:dst for entry in tooltip for src,dst in entry['nodes'].items()})
        hover = next(v for v in family_set['variants'] if 'type=collapsed, status=hover' in v['name'])
        natural = next(child for child in hover['children'] if child['name']=='Tooltip')
        for variant in family_set['variants']:
            for child in variant.get('children',[]):
                if child['name']=='Tooltip':
                    child.update({key:natural[key] for key in ('width','height','y')})
                    child['keepNaturalSize'] = True
        if operation == 'audit':
            data['effectStyleIds'] = {src:dst for entry in receipts for src,dst in entry['effectStyles'].items()}
    if part in ('top-bar','sidebar-help','sidebar') or icon_button:
        extra = evidence.with_name('phosphor-sidebar-icon-buttons.json')
        library = json.loads(extra.read_text())
        assert library['fileKey'] == 'xZSksKpcQTp5H3C4dZApBL'
        data['remoteKeys'].extend(key for icon in library['sets'] for _,key in icon['variants'])
    if part in ('top-bar','sidebar-help','sidebar'):
        menu = [json.loads(path.read_text()) for path in here.glob('menu-item-[0-9]*.mutation.json')]
        data['pageId'] = menu[0]['pageId']
        data['slotPreferredId'] = menu[0]['setId']
        data['dependencies'].update({src:dst for entry in menu for src,dst in entry['nodes'].items()})
        for other in ('menu-item','top-bar','sidebar-help','sidebar'):
            if other != part:
                other_receipts = [json.loads(path.read_text()) for path in here.glob(f'{other}-[0-9]*.mutation.json')]
                if other_receipts:
                    data['allowedSiblingIds'].append(other_receipts[0]['setId'])
                    data['dependencies'].update({src:dst for entry in other_receipts for src,dst in entry['nodes'].items()})
        if part == 'sidebar-help':
            data['overrideInstanceReactions'] = True
        if part == 'sidebar':
            ghost = [json.loads(path.read_text()) for path in here.glob('icon-button-ghost-*.mutation.json')]
            data['dependencies'].update({src:dst for entry in ghost for src,dst in entry['nodes'].items()})
    if icon_button:
        data['swaps'] = spec['swaps']
        dot = [json.loads(path.read_text()) for path in here.glob('dot-[0-9]*.mutation.json')]
        data['dependencies'].update({src:dst for entry in dot for src,dst in entry['nodes'].items()})
    if part == 'breadcrumb':
        items = [json.loads(path.read_text()) for path in here.glob('breadcrumb-item-*.mutation.json')]
        data['pageId'] = items[0]['pageId']
        data['allowedSiblingIds'].append(items[0]['setId'])
        data['dependencies'].update({src:dst for entry in items for src,dst in entry['nodes'].items()})
    if part == 'file-upload':
        button = here.parent / 'buttons-loader-2026-11-11/button-secondary.mutation.json'
        button_variants = json.loads(button.read_text())['sets'][0]['variants']
        data['dependencies'].update({v['sourceId']:v['id'] for v in button_variants})
        for path in here.glob('linear-progress-large-*.mutation.json'):
            data['dependencies'].update(json.loads(path.read_text())['nodes'])

def flatten(node):
    yield node
    for child in node.get('children',[]):
        yield from flatten(child)

if operation == 'finalize':
    data['reactions'] = {}
    def collect(source):
        if source['type'] != 'INSTANCE' and source.get('reactions'):
            data['reactions'][nodes[source['id']]] = [
                {**reaction, 'actions': [{**a, 'destinationId': data['dependencies'][a['destinationId']]} for a in reaction['actions']]}
                for reaction in source['reactions']
            ]
        for child in source.get('children',[]):
            collect(child)

    for source in family_set['variants']:
        collect(source)
    data = {key:value for key,value in data.items()
            if key in ('fileKey','setId','setName','pageId','links','reactions')}
    if part == 'table-cell':
        data['variantOrder'] = [nodes[v['id']] for v in family_set['variants']]
    program = (here / 'finalize-native-set.js').read_text()
else:
    fields, pool, indexes = [], [], {}
    def pack(node):
        pairs = []
        for key, value in node.items():
            if key not in fields:
                fields.append(key)
            if key == 'children':
                encoded = [pack(child) for child in value]
            else:
                signature = json.dumps(value, separators=(',', ':'), ensure_ascii=False)
                if signature not in indexes:
                    indexes[signature] = len(pool)
                    pool.append(value)
                encoded = indexes[signature]
            pairs.extend((fields.index(key), encoded))
        return pairs

    selected = family_set['variants'][start:start + limit]
    if part == 'table-cell' and operation == 'build':
        missing = [variant for variant in family_set['variants'] if variant['id'] not in nodes]
        if start != len(family_set['variants']) - len(missing):
            raise ValueError('Table cell build offset does not match the existing master')
        selected = missing[:limit]
        if not selected:
            raise ValueError('No missing Table cell variants')
    flattened = [row for variant in selected for row in flatten(variant)]
    if stepper:
        used = {name for row in flattened for part in [row, *row.get('linkedFills',[]), *row.get('vectorFills',[])]
                for name in part.get('b',{}).values()}
        data['tokens'] = {name:spec['tokens'][name] for name in used}
        data['fonts'] = list({(row['fontName']['family'],row['fontName']['style']):row['fontName']
                              for row in flattened if row.get('fontName')}.values())
    required_ids = {row['id'] for row in flattened} | {variant['id'] for variant in family_set['variants']}
    external = {row['main']['id'] for row in flattened if row.get('main') and not row['main']['remote']}
    external.update(action['destinationId'] for row in flattened for reaction in row.get('reactions',[])
                    for action in reaction['actions'] if action.get('destinationId'))
    data['dependencies'] = {src:dst for src,dst in data['dependencies'].items() if src in external}
    if 'swaps' in data:
        data['swaps'] = {key:asset for key,asset in data['swaps'].items() if key in family_set['props']}
    if 'remoteKeys' in data:
        keys = {row['main']['key'] for row in flattened if row.get('main') and row['main']['remote']}
        keys.update(asset['key'] for row in flattened for asset in row.get('swapAssets',{}).values() if asset['remote'])
        keys.update(asset['key'] for asset in data.get('swaps',{}).values())
        data['remoteKeys'] = [key for key in data['remoteKeys'] if key in keys]
    data['packed'] = [pack(variant) for variant in selected]
    data.update(fields=fields, pool=pool)
    if operation == 'audit':
        data.update(nodes={src:dst for src,dst in nodes.items() if src in required_ids},
                    variantIds=[nodes[v['id']] for v in family_set['variants']])
    program = (here / ('build-native-set.js' if operation == 'build' else 'audit-native-set.js')).read_text()
    program = """function unpack(row) {
  const node = {};
  for (let i=0;i<row.length;i+=2) {
    const key=DATA.fields[row[i]], value=row[i+1];
    node[key]=key==='children'?value.map(unpack):DATA.pool[value];
  }
  return node;
}
DATA.variants=DATA.packed.map(unpack);
""" + program

print('const DATA = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';')
print(program)
