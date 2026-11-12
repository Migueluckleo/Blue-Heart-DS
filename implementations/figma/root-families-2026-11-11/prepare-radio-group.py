import json
from pathlib import Path

here = Path(__file__).resolve().parent
root = here.parents[2]
data = json.loads((root / 'specs/data/radio-group.v1.0.0.json').read_text())
contract = (root / 'specs/components/radio-group.contract.v1.0.0.md').read_text()
receipts = [json.loads(p.read_text()) for p in here.glob('radio-*.mutation.json')]
fields = set(('id name type x y width height layoutMode primaryAxisSizingMode counterAxisSizingMode '
              'primaryAxisAlignItems counterAxisAlignItems paddingTop paddingBottom paddingLeft paddingRight '
              'itemSpacing clipsContent layoutSizingHorizontal layoutSizingVertical visible fontName characters '
              'textAutoResize textStyleId fills b refs main instanceProperties').split())

def compact(node):
    return {**{key: value for key, value in node.items() if key in fields},
            'children': [compact(child) for child in node['children']]}

data['variants'] = [compact(node) for node in data['variants']]
data.update(targetFileKey=receipts[0]['fileKey'], pageId=receipts[0]['pageId'], pageName='Radio Buttons',
            radioId=receipts[0]['setId'], radioNodes={k:v for r in receipts for k,v in r['nodes'].items()},
            guide=f"https://www.figma.com/design/{data['sourceFileKey']}?node-id=634-52",
            description=contract.split('## Description exacta')[1].split('##')[0].strip())
print('const DATA = ' + json.dumps(data, separators=(',', ':')) + ';')
print((here / 'build-native-set.js').read_text().split('const fields =')[0])
print((here / 'build-radio-group.js').read_text())
