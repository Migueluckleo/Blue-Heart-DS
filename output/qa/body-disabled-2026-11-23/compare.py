"""Read-only comparison of the effective delegated inventory and Figma capture."""
import collections
import hashlib
import json
import math
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
expected = json.loads((HERE / 'effective-inventory.json').read_text())
observed = json.loads((HERE / 'figma-variables.json').read_text())
normalize = lambda c: 'primitives' if c == 'primitive' else c
logical = lambda c, n: normalize(c) + '::' + n
et = {logical(v['collection'], v['name']): v for v in expected['tokens']}
ecid = {i: logical(*k) for i, k in expected['ids'].items()}
ac = {c['id']: c for c in observed['collections']}
at = {logical(ac[v['variableCollectionId']]['name'], v['name']): v for v in observed['variables']}
aid = {v['id']: k for k, v in at.items()}
differences, failures = [], []
precision = []

def value_equal(a, b, where):
    if isinstance(a, dict) and isinstance(b, dict):
        return set(a) == set(b) and all(value_equal(a[k], b[k], where + '/' + k) for k in a)
    if isinstance(a, list) and isinstance(b, list):
        return len(a) == len(b) and all(value_equal(x, y, where) for x, y in zip(a, b))
    if isinstance(a, (int, float)) and isinstance(b, (int, float)) and not isinstance(a, bool):
        if a == b:
            return True
        if abs(a - b) <= 1e-7:
            precision.append({'field': where, 'expected': a, 'actual': b, 'delta': abs(a-b)})
            return True
    return a == b

def target(value):
    for field in ['id', 'targetId']:
        if value.get(field) in ecid:
            return ecid[value[field]]
    for field in ['primitive_name', 'name', 'primitiveName']:
        if value.get(field) is not None:
            key = logical('primitives', value[field])
            if key in et:
                return key
    raise ValueError('Unresolved canonical alias: ' + str(value))

def normalized_values(v, side):
    if side == 'expected':
        source = v['values']
    else:
        modes = {m['modeId']: m['name'] for m in ac[v['variableCollectionId']]['modes']}
        source = {modes.get(k, 'UNKNOWN:' + k): value for k, value in v['valuesByMode'].items()}
    result = {}
    for mode, value in source.items():
        if isinstance(value, dict) and value.get('type') == 'VARIABLE_ALIAS':
            dest = target(value) if side == 'expected' else aid.get(value['id'], 'UNRESOLVED:' + value['id'])
            result[mode] = {'type': 'VARIABLE_ALIAS', 'target': dest}
        else:
            result[mode] = value
    return result

ev = {k: normalized_values(v, 'expected') for k, v in et.items()}
av = {k: normalized_values(v, 'actual') for k, v in at.items()}
for key in sorted(set(et) & set(at)):
    e, a = et[key], at[key]
    fields = {
        'resolvedType': (e['resolvedType'], a['resolvedType']),
        'description': (e.get('description', ''), a['description']),
        'codeSyntax': (e.get('codeSyntax', {}), a['codeSyntax']),
        'scopes': (sorted(e.get('scopes', [])), sorted(a['scopes'])),
        'values': (ev[key], av[key]),
    }
    for field in ['hiddenFromPublishing', 'remote']:
        if field in e:
            fields[field] = e[field], a[field]
    if e.get('targetId'):
        fields['targetId'] = e['targetId'], a['id']
    for field, (x, y) in fields.items():
        if not value_equal(x, y, key + '/' + field):
            differences.append({'token': key, 'field': field, 'expected': x, 'actual': y, 'source': e['source']})

identity = json.loads((ROOT / 'implementations/figma/variables-2026-11-11/id-map.json').read_text())
identity_errors = []
for record in identity['variables']:
    if record['targetId'] not in aid:
        identity_errors.append({'targetId': record['targetId'], 'error': 'MISSING_DESTINATION'})
        continue
    actual = at[aid[record['targetId']]]
    for field, expected_value, actual_value in [
        ('key', record['targetKey'], actual['key']),
        ('path', record['targetPath'], actual['name']),
        ('collection', record['targetCollectionId'], actual['variableCollectionId']),
    ]:
        if expected_value != actual_value:
            identity_errors.append({'targetId': record['targetId'], 'field': field, 'expected': expected_value, 'actual': actual_value})

def resolve(table, values, key, mode, chain=()):
    if key in chain:
        raise ValueError('Alias cycle ' + str(chain + (key,)))
    value = values[key].get(mode, values[key].get('Value'))
    if value is None:
        raise ValueError('Missing mode ' + key + '/' + mode)
    layer = key.split('::')[0]
    required = {'component': 'semantic', 'semantic': 'primitives'}.get(layer)
    if isinstance(value, dict) and value.get('type') == 'VARIABLE_ALIAS':
        dest = value['target']
        if dest not in table:
            raise ValueError('Missing alias target ' + dest)
        if required and dest.split('::')[0] != required:
            raise ValueError('Wrong alias layer ' + key + ' -> ' + dest)
        if table[dest]['resolvedType'] != table[key]['resolvedType']:
            raise ValueError('Wrong alias type ' + key + ' -> ' + dest)
        return resolve(table, values, dest, mode, chain + (key,))
    if required:
        raise ValueError('Literal at non-primitive layer ' + key)
    return value

resolved_count = 0
for key in sorted(set(et) & set(at)):
    modes = ['Contable', 'Administrativo', 'Servicios', 'Personas'] if key.startswith('component::') else ['Value']
    if set(ev[key]) != set(modes) or set(av[key]) != set(modes):
        failures.append({'token': key, 'error': 'MODE_MEMBERSHIP', 'expected': list(ev[key]), 'actual': list(av[key])})
    for mode in modes:
        try:
            x, y = resolve(et, ev, key, mode), resolve(at, av, key, mode)
            if not value_equal(x, y, key + '/resolved/' + mode):
                failures.append({'token': key, 'mode': mode, 'error': 'RESOLVED_VALUE_DIFF', 'expected': x, 'actual': y})
            resolved_count += 1
        except Exception as error:
            failures.append({'token': key, 'mode': mode, 'error': str(error)})

manifest_path = ROOT / 'implementations/web/src/generated/tokens.manifest.json'
manifest = json.loads(manifest_path.read_text())
manifest_diff = []
mt = {logical(t['collection'], t['name']): t for t in manifest['tokens']}
for key, e in et.items():
    m = mt.get(key)
    if not m:
        manifest_diff.append({'token': key, 'error': 'MISSING'})
        continue
    for field in ['description', 'scopes', 'css', 'source', 'amendments']:
        if m[field] != e.get(field, [] if field in ['scopes', 'amendments'] else ''):
            manifest_diff.append({'token': key, 'field': field})
    if m['values'] != e['values']:
        manifest_diff.append({'token': key, 'field': 'values'})

caution = []
for key in et:
    if 'caution' not in key:
        continue
    value = resolve(et, ev, key, 'Contable' if key.startswith('component::') else 'Value')
    caution.append({'token': key, 'id': at[key]['id'], 'key': at[key]['key'], 'values': ev[key], 'rgba': value,
                    'hex': '#' + ''.join(f'{round(value[c]*255):02X}' for c in 'rgb'), 'scopes': at[key]['scopes']})

result = {
    'kind': 'READ_ONLY_TOKEN_AUDIT', 'date': '2026-11-23', 'capture_kind': observed.get('kind'), 'capture_baseline': observed.get('baseline'), 'capture_delta': observed.get('delta'), 'authority': 'DELEGATED_BASE_PLUS_ORDERED_AMENDMENTS',
    'sources': expected['hashes'],
    'counts': dict(collections.Counter(normalize(v['collection']) for v in et.values())),
    'types': dict(collections.Counter(v['resolvedType'] for v in et.values())),
    'tokens_compared': len(set(et) & set(at)), 'mode_values_resolved': resolved_count,
    'body_visible': sum(bool(v['scopes']) for v in at.values()),
    'non_body_visible': [k for k, v in at.items() if v['scopes'] and not k.startswith('component::body/')],
    'all_scopes': [k for k, v in at.items() if 'ALL_SCOPES' in v['scopes']],
    'missing': sorted(set(et) - set(at)), 'extra': sorted(set(at) - set(et)),
    'differences': differences, 'alias_or_mode_failures': failures,
    'identity_checks': len(identity['variables']), 'identity_errors': identity_errors,
    'explicit_target_id_checks': sum(bool(v.get('targetId')) for v in et.values()),
    'precision': {'tolerance': 1e-7, 'within_tolerance_channels': len(precision), 'max_delta': max([x['delta'] for x in precision] or [0])},
    'manifest_missing': sorted(set(et)-set(mt)), 'manifest_extra': sorted(set(mt)-set(et)), 'manifest_differences': manifest_diff,
    'manifest_sha256': hashlib.sha256(manifest_path.read_bytes()).hexdigest(),
    'figma_capture_sha256': hashlib.sha256((HERE/'figma-variables.json').read_bytes()).hexdigest(),
    'caution': caution,
}
(HERE/'comparison.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({k: v for k, v in result.items() if k not in ['sources', 'differences', 'caution']}, ensure_ascii=False))
print('differences', len(differences), collections.Counter(x['field'] for x in differences))
for d in differences[:12]:
    print(json.dumps(d, ensure_ascii=False))
