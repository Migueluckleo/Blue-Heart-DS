"""Prepare the verified Table Rows and nested scrollbar instances for Figma."""
import hashlib
import json
import sys
from pathlib import Path

here = Path(__file__).resolve().parent
root = here.parents[2]
operation = sys.argv[1]
if operation not in ('build','audit'):
    raise ValueError(operation)
spec = json.loads((root/'specs/data/table.v1.0.0.json').read_text())
receipts = [json.loads(path.read_text()) for path in here.glob('table-[a-z]*-[0-9]*.mutation.json')]
table = next(receipt for receipt in receipts if receipt['setName']=='Table')
nodes = {source: target for receipt in receipts for source,target in receipt['nodes'].items()}

def source(path):
    value = (root/path).read_bytes()
    if hashlib.sha256(value).hexdigest() != spec['sourceParts'][path]:
        raise ValueError(f'Hash distinto para {path}')
    return json.loads(value)

rows = source(spec['rowsSource'])['rows']
prefix = str(Path(spec['rowsSource']).parent)
paints = {row['id']:row for row in source(prefix+'/table-main-row-paints.json')['rows']}
extras = source(prefix+'/table-main-overrides.json')['found']
thumb = nodes['841:2760']
data = dict(fileKey=table['fileKey'], pageId=table['pageId'], tableId=table['setId'], slotId=nodes['827:101'],
            cellSet=next(r['setId'] for r in receipts if r['setName']=='Table cell'),
            thumb=thumb, thickness=next(t['targetId'] for t in spec['tokens'].values() if t['name']=='table/size/scrollbar-thumb'),
            rows=[], bars=[], pagination={})
for row in rows:
    if paints[row['id']] != {'id':row['id'],'fills':[],'strokes':[],'opacity':1,'bindings':{}}:
        raise ValueError('Unexpected paints on '+row['id'])
    geometry = {key:row[key] for key in ('width','height','layoutMode','primaryAxisSizingMode','counterAxisSizingMode',
        'layoutSizingHorizontal','layoutSizingVertical','primaryAxisAlignItems','counterAxisAlignItems',
        'paddingLeft','paddingTop','paddingRight','paddingBottom','itemSpacing','clipsContent')}
    cells = [[sid,nodes[main],width,props,nested] for sid,main,width,props,nested in row['cells']]
    data['rows'].append([row['id'],row['name'],geometry,cells])
for entry in extras:
    node=entry['instance']
    if node['name']=='Pagination':
        pages=node['children'][1]
        input_props=node['children'][2]['properties']
        data['pagination']=dict(id=nodes[node['id']],count=len(pages['children']),
            names=[p['name'] for p in pages['children']], inputText=input_props['Placeholder'],inputWidth=node['children'][2]['width'])
    else:
        glyph=node['children'][0]['children'][0]
        axis='height' if node['name'].startswith('Vertical') else 'width'
        data['bars'].append([nodes[node['id']],axis,glyph['width'],glyph['height']])
data['operation'] = operation
print('const DATA = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';')
print((here/'table-main-rows.js').read_text())
