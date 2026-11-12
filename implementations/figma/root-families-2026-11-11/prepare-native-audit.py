import json
import sys
from pathlib import Path

slug, offset, size = sys.argv[1:]
here = Path(__file__).resolve().parent
root = here.parents[2]
spec = json.loads((root / f'specs/data/{slug}.v1.0.0.json').read_text())
contract = (root / f'specs/components/{slug}.contract.v1.0.0.md').read_text()
receipts = [json.loads(path.read_text()) for path in here.glob(f'{slug}-*.mutation.json')]
nodes = {src: dst for receipt in receipts for src, dst in receipt['nodes'].items()}
styles = {src: dst for receipt in receipts for src, dst in receipt['styles'].items()}
effects = {src: dst for receipt in receipts for src, dst in receipt.get('effectStyles', {}).items()}
links = json.loads((here / f'{slug}.links-reactions.json').read_text())['links']
start = int(offset)
variants = spec.pop('variants')
data = dict(spec, variants=variants[start:start + int(size)], fileKey=receipts[0]['fileKey'],
            setId=receipts[0]['setId'], pageId=receipts[0]['pageId'],
            pageName='Radio Buttons' if slug == 'radio' else slug.title(),
            description=contract.split('## Description exacta')[1].split('##')[0].strip(),
            links=links, nodes=nodes, styles=styles, effectStyleIds=effects, variantIds=[nodes[v['id']] for v in variants])
print('const DATA = ' + json.dumps(data, separators=(',', ':')) + ';')
print((here / 'audit-native-set.js').read_text())
