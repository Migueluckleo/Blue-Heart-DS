#!/usr/bin/env python3
"""TOKEN-QA-03: coteja lecturas reales Figma y el manifest efectivo de web."""
import argparse
import copy
import hashlib
import json
from pathlib import Path
from token_visibility import desired_scopes

ROOT = Path(__file__).resolve().parents[3]


def audit(evidence):
    read = lambda name: json.loads((evidence / name).read_text())
    before, after = read('before.json'), read('after.json')
    assert before['collections'] == after['collections'], 'Cambios de colecciones/modos/publicabilidad'
    old = {v['id']: v for v in before['variables']}
    new = {v['id']: v for v in after['variables']}
    assert old.keys() == new.keys(), 'Cambios de IDs'
    collections = {c['id']: c for c in after['collections']}
    policy = json.loads((ROOT / 'specs/tokens/visibility.body-only.correction.json').read_text())['selectorVisibilityPolicy']
    changed, visible, aliases = [], [], 0
    for identity, variable in new.items():
        assert {k:v for k,v in old[identity].items() if k != 'scopes'} == {k:v for k,v in variable.items() if k != 'scopes'}, identity
        collection = collections[variable['variableCollectionId']]['name']
        assert variable['scopes'] == desired_scopes(collection, variable['name'], variable['resolvedType'], policy), identity
        if variable['scopes']: visible.append(identity)
        if variable['scopes'] != old[identity]['scopes']: changed.append(identity)
        for mode, value in variable['valuesByMode'].items():
            if isinstance(value, dict) and value.get('type') == 'VARIABLE_ALIAS':
                aliases += 1
                target = new[value['id']]
                assert variable['resolvedType'] == target['resolvedType'], identity
                target_collection = collections[target['variableCollectionId']]['name']
                if collection == 'component': assert target_collection == 'semantic', identity
                if collection == 'semantic': assert target_collection == 'primitives', identity
            else:
                assert collection == 'primitives', 'Literal en capa de aliases: ' + identity
    assert set(changed) == set(read('mutation.json')['changedIds'])
    assert read('styles-before.json') == read('styles-after.json'), 'Cambios de estilos Body'
    bindings = read('bindings-after.json')
    assert bindings == read('bindings-before.json'), 'Cambios de bindings/paints/estilos por página'
    assert bindings['selfTest'] == hashlib.sha256(b'abc').hexdigest()
    manifest = json.loads((ROOT / 'implementations/web/src/generated/tokens.manifest.json').read_text())
    effective = {(v['collection'], v['name']):copy.deepcopy(v) for v in manifest['tokens']}
    # El manifest no repite tipos: recuperar los tipos de los roles Body declarados.
    types = {t['name']:t['resolvedType'] for t in policy['bodyTokens']}
    for (collection, name), token in effective.items():
        assert token['scopes'] == desired_scopes(collection, name, types.get(name), policy)
    # Casos de frontera: coincidencia exacta, sin coincidencias por subcadena/colección/case.
    for collection, name in [('semantic','body/color/text/primary'),('component','table/font/cell-body'),('component','section-header/font/body'),('component','Body/color/text/primary'),('component','bodyguard/color/text')]:
        assert desired_scopes(collection, name, 'COLOR', policy) == []
    for bad_name, bad_policy in [('body/new-role',policy),('body/color/text/primary',copy.deepcopy(policy))]:
        if bad_name != 'body/new-role': bad_policy['bodyTokens'][0]['scopes'] = ['ALL_SCOPES']
        try:
            desired_scopes('component',bad_name,'COLOR',bad_policy)
        except ValueError:
            pass
        else:
            raise AssertionError('La validación debe bloquear roles no declarados o scopes generales')
    pages = bindings['pages']
    return {'status':'PASS','control':'TOKEN-QA-03','variables':len(new),'changed_scopes':len(changed),
            'visible_body':len(visible),'hidden_internal':len(new)-len(visible),'alias_values_preserved':aliases,
            'all_other_variable_fields_preserved':True,'collections_modes_publication_preserved':True,
            'body_text_styles_preserved':len(read('styles-after.json')),'pages':len(pages),
            'nodes_fingerprinted':sum(p['nodes'] for p in pages),'bound_nodes':sum(p['boundNodes'] for p in pages),
            'page_binding_sha256_equal':True,'web_tokens':len(effective),
            'web_visible_body':sum(bool(t['scopes']) for t in effective.values()),
            'tested_types':sorted({v['resolvedType'] for v in new.values()}),
            'unsupported_types_observed':[], 'untested_absent_types':['BOOLEAN'],
            'boundary_cases':'PASS','unavailable_usage_metrics':'UNAVAILABLE'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--evidence', type=Path, required=True)
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    result = audit(args.evidence)
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps(result,ensure_ascii=False))
