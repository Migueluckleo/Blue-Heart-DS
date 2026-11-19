"""Fail-closed preflight and Figma readback gates. No network or Figma mutations."""
from __future__ import annotations
import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import sys
from urllib.parse import parse_qs, urlparse
from consumer_graph import Reader, canonical, sha, parse, safe, explicit_status

SCHEMA = 1


def norm(value):
    return re.sub(r'[^a-z0-9]', '', value.lower()).removesuffix('s')


def need(condition, message):
    if not condition:
        raise ValueError(message)


def timestamp(value):
    need(isinstance(value, str), 'Timestamp required')
    parsed = datetime.fromisoformat(value[:-1] + '+00:00' if value.endswith('Z') else value)
    need(parsed.tzinfo is not None, 'Timezone required')
    return parsed


def rows(value, label):
    need(isinstance(value, list), label + ': expected list')
    need(all(isinstance(v, dict) for v in value), label + ': expected objects')
    return value


def unique(items, field, label):
    result = {}
    for item in rows(items, label):
        key = item.get(field)
        need(isinstance(key, str) and bool(key) and key not in result, label + ': missing/duplicate ' + field)
        result[key] = item
    return result


def read(path):
    value = parse(Path(path).read_bytes())
    need(isinstance(value, dict), 'Expected object: ' + str(path))
    return value


def artifact(base, ref):
    need(isinstance(ref, dict), 'Expected evidence reference')
    path = safe(base, ref['path'])
    raw = path.read_bytes()
    need(sha(raw) == ref['sha256'], 'Evidence hash mismatch: ' + ref['path'])
    value = parse(raw)
    need(isinstance(value, dict) and value.get('schema_version') == SCHEMA, 'Unsupported evidence')
    return value


def issue(out, code, message, use=None, node=None):
    out['findings'].append({'code': code, 'usage_id': use, 'node_id': node, 'message': message})


def contract_text(reader, path):
    need(path in reader.manifest['files'], 'Contract outside verified catalog: ' + path)
    raw = reader.source(path)
    need(sha(raw) == reader.manifest['files'][path], 'Contract integrity: ' + path)
    return raw.decode('utf-8')


def component_catalog(reader):
    components = unique(reader.manifest['components'], 'id', 'components')
    specs = {}
    for path in reader.manifest['files']:
        if not re.fullmatch(r'specs/components/[^/]+\.contract\.[^/]+\.md', path):
            continue
        text = contract_text(reader, path)
        frontmatter = re.match(r'^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)', text)
        match = re.search(r'^contract_id:[ \t]*([\w-]+)[ \t]*$', frontmatter[1], re.M) if frontmatter else None
        need(match, 'Missing component ID in spec: ' + path)
        specs.setdefault(match[1], []).append(path)
    for family, component in components.items():
        need(component['contract'] in specs.get(family, []), 'Manifest family lacks its spec: ' + family)
    for family, paths in specs.items():
        if family not in components:
            need(len(paths) == 1, 'Ambiguous spec outside the component index: ' + family)
            components[family] = {'id': family, 'name': family, 'contract': paths[0], 'amendments': [], 'exports': []}
    return components


def family_tracking(plan, components):
    tracking = unique(plan.get('family_tracking'), 'family', 'family_tracking')
    missing = sorted(set(components) - set(tracking))
    foreign = sorted(set(tracking) - set(components))
    need(not missing and not foreign, f'Family tracking differs from catalog; missing={missing}; foreign={foreign}')
    for family, row in tracking.items():
        need(row.get('applicability') in {'APPLIES', 'NOT_APPLICABLE'}
             and isinstance(row.get('reason'), str) and row['reason'].strip(), 'Give applicability and reason for ' + family)
    return tracking


def verify_exception(reader, use, components):
    exception = use.get('functional_exception')
    need(isinstance(exception, dict), 'Functional exception required for ' + use['id'])
    for field in ('purpose', 'search'):
        need(isinstance(exception.get(field), str) and exception[field].strip(), 'Missing exception ' + field)
    candidates = unique(exception.get('candidates'), 'family', 'exception candidates')
    need(use['family'] is None or use['family'] in candidates, 'Assess the family covered by the exception')
    evidence = []
    for family, candidate in candidates.items():
        need(family in components, 'Unknown Figma alternative: ' + family)
        gap = candidate.get('gap')
        need(gap != 'COMPATIBLE', 'Use the compatible Figma component: ' + family)
        need(gap in {'PURPOSE', 'BEHAVIOR', 'STATE'}, 'Assess a functional gap for ' + family)
        unmet = candidate.get('unmet')
        need(isinstance(unmet, str) and unmet.strip(), 'Describe the specific unmet need for ' + family)
        ref = candidate.get('evidence')
        need(isinstance(ref, dict), 'Missing evidence for ' + family)
        path, excerpt = ref.get('path'), ref.get('excerpt')
        component = components[family]
        need(path in [component['contract'], *component['amendments']], 'Evidence must be a spec or amendment of ' + family)
        text = contract_text(reader, path)
        need(isinstance(excerpt, str) and excerpt.strip() and ' '.join(excerpt.split()) in ' '.join(text.split()),
             'Evidence excerpt missing from the pinned spec: ' + path)
        need(explicit_status(text) in {'APPROVED', 'DELEGATED_FOR_BUILD'}, 'Ineligible exception evidence: ' + path)
        evidence.append({'family': family, 'gap': gap, 'unmet': unmet, 'path': path,
                         'excerpt': excerpt, 'sha256': reader.manifest['files'][path]})
    return {'purpose': exception['purpose'], 'search': exception['search'], 'candidates': evidence}


def documented_set_matches(component, source, texts):
    """Accept only exact set names explicitly listed in the family's spec table."""
    name = source.get('parent_name', '')
    if source.get('parent_type') != 'COMPONENT_SET' or '/' not in name:
        return False
    aliases = {norm(s) for s in [component.get('name', ''), component.get('slug', ''), *component.get('exports', [])] if s}
    if norm(name.split('/', 1)[0]) not in aliases:
        return False
    return any(re.search(r'^\|\s*' + re.escape(name) + r'\s*\|', text, re.M) for text in texts)


def configured_text_runs(source, use):
    properties = use.get('component_properties', {})
    need(isinstance(properties, dict), 'component_properties must be object')
    for key, value in properties.items():
        definition = source.get('component_properties', {}).get(key, {})
        need(definition.get('type') == 'BOOLEAN' and isinstance(value, bool),
             'Declare only verified supported boolean properties: ' + key)
    return [run for run in source['text_runs'] if not any(properties.get(key) is False for key in run.get('visibility_controls', []))]


def missing_internal_bindings(source, node):
    # Library imports can change variable IDs; the canonical role and collection
    # must stay the same, including when a Body token has the same numeric value.
    return [binding for binding in source['binding_details'] if not any(
        all(actual.get(key) == binding.get(key) for key in ('property', 'token', 'collection'))
        for actual in node.get('binding_details', []))]


def file_roles(reader, plan, qa_page_id=None):
    path = 'config/figma-links.json'
    raw = reader.source(path)
    need(sha(raw) == reader.manifest['files'][path], 'Figma roles differ from the verified catalog')
    config = parse(raw)
    master = (config.get('master_destination') or {}).get('file_key')
    source = (config.get('root_source') or {}).get('file_key')
    destination = plan.get('destination_file_key')
    need(master and source and master != source, 'Distinct BlueHeart source and master required')
    need(isinstance(destination, str) and re.fullmatch(r'[A-Za-z0-9]+', destination)
         and destination != source, 'Use a prototype file separate from the historical root')
    if destination == master:
        scope = plan.get('qa_scope', {})
        allowed = config.get('qa_playgrounds', [])
        need(qa_page_id is not None and any(row.get('file_key') == master and row.get('page_id') == qa_page_id for row in allowed),
             'Use a prototype file separate from the BlueHeart master and root; an explicit authorized Playground QA flag is required')
        need(scope.get('mode') == 'ISOLATED_PLAYGROUND_QA' and scope.get('authorization') == 'EXPLICIT_USER_REQUEST'
             and scope.get('page_id') == qa_page_id and scope.get('new_nodes_only') is True
             and scope.get('preserve_canonical') is True and isinstance(scope.get('container_name'), str)
             and scope['container_name'].startswith('QA Skills'), 'Declare the bounded, explicitly authorized Playground QA scope')
        need(parse_qs(urlparse(plan.get('destination_url', '')).query).get('node-id') in [[qa_page_id], [qa_page_id.replace(':', '-')]],
             'Playground URL must identify the authorized page')
    else:
        need(qa_page_id is None, 'Playground QA flag is only valid for the configured master Playground')
    configured = (config.get('consumption_sandbox') or {}).get('file_key')
    if destination != configured:
        url = plan.get('destination_url', '')
        match = re.fullmatch(r'https://(?:www\.)?figma\.com/design/([A-Za-z0-9]+)(?:/branch/([A-Za-z0-9]+))?(?:[/?#].*)?', url)
        need(match and (match[2] or match[1]) == destination, 'Include the authorized Figma prototype URL matching the destination key')
    return master, destination


def preflight(runtime, plan, base, qa_page_id=None):
    reader = Reader(runtime)  # Verifies pinned remote manifest/receipt, even without optional graph.
    need(plan.get('schema_version') == SCHEMA, 'Unsupported plan schema')
    need(plan.get('snapshot') == reader.identity, 'Plan snapshot differs from verified catalog')
    master, destination = file_roles(reader, plan, qa_page_id)
    screens = plan.get('screens')
    need(isinstance(screens, list) and screens and all(isinstance(s, str) and s for s in screens)
         and len(screens) == len(set(screens)), 'Unique logical screens required')
    requirements = plan.get('requirements')
    need(isinstance(requirements, list) and all(isinstance(s, str) for s in requirements)
         and len(requirements) == len(set(requirements)), 'Unique family requirements required')
    uses = unique(plan.get('uses'), 'id', 'uses')
    need(bool(uses), 'Empty scope cannot pass')
    components = component_catalog(reader)
    consumption_path = 'specs/foundations/product-consumption.contract.v1.0.0.md'
    consumption = None
    body_names = set()
    if consumption_path in reader.manifest['files']:
        contract_text(reader, consumption_path)
        consumption = parse(reader.source('specs/policies/product-consumption.v1.0.0.json'))
        body_config = consumption['body']
        body_sources = body_config.get('data_sources', [body_config['data']])
        need(isinstance(body_sources, list) and body_sources and all(isinstance(p, str) and p for p in body_sources)
             and len(body_sources) == len(set(body_sources)) and body_config['data'] in body_sources,
             'Declare the complete canonical Body source list')
        for path in body_sources:
            body = parse(reader.source(path))
            body_names.update(v['name'] for c in body['collections'] if c['name'] == body_config['collection']
                              for v in c['variables'] if v['name'].startswith(body_config['prefix']))
        for screen in screens:
            need(any(use.get('screen') == screen and use.get('kind') == 'ds-instance'
                     and use.get('family') == consumption['product_host']['family'] for use in uses.values()),
                 'Product screen requires official AppShell: ' + screen)
        for use_id, use in uses.items():
            if use.get('kind') == 'ds-instance':
                continue
            need(use.get('family') is None, 'BLOCKED_MISSING_DS_COVERAGE: local atoms cannot replace a DS family')
            bindings = rows(use.get('body_bindings'), 'Body bindings')
            need(bool(bindings) and all(b.get('property') and b.get('token') in body_names for b in bindings), 'Declare canonical Body bindings for ' + use_id)
            if use.get('kind') == 'local-composition':
                need(use.get('molecule_type') in consumption['molecule_types'], 'Only product molecules module/card/section are local')
                host = uses.get(use.get('host_usage'), {})
                need(host.get('kind') == 'ds-instance' and host.get('family') == consumption['product_host']['family']
                     and host.get('screen') == use.get('screen') and use.get('slot') == consumption['product_host']['content_region'], 'Molecule must use AppShell Body: ' + use_id)
            else:
                owner = uses.get(use.get('molecule_owner'), {})
                need(owner.get('kind') == 'local-composition' and owner.get('molecule_type') in consumption['molecule_types']
                     and owner.get('screen') == use.get('screen'), 'Local content requires a product molecule owner')
    tracking = family_tracking(plan, components)
    applicable = {family for family, row in tracking.items() if row['applicability'] == 'APPLIES'}
    need(set(requirements) == applicable, 'Requirements must match applicable family tracking')
    source_refs = unique(plan.get('source_readbacks'), 'path', 'source_readbacks')
    source_nodes = {}
    for path, ref in source_refs.items():
        evidence = artifact(base, ref)
        need(evidence.get('kind') == 'source' and evidence.get('file_key') == master, 'Source must be live BlueHeart master readback')
        need(evidence.get('complete') is True and evidence.get('observed_at'), 'Incomplete source readback')
        timestamp(evidence['observed_at'])
        for node_id, node in unique(evidence.get('nodes'), 'id', 'source nodes').items():
            need(node_id not in source_nodes, 'Duplicate source node')
            need(re.fullmatch(r'\d+:\d+', node_id) is not None, 'Expected actual source node ID')
            need(node.get('type') == 'COMPONENT' and isinstance(node.get('key'), str) and node['key'], 'Read actual component, not set or guessed key')
            for field in ('binding_fields', 'text_style_keys'):
                need(isinstance(node.get(field), list) and all(isinstance(v, str) for v in node[field]), 'Missing source ' + field)
            for binding in rows(node.get('binding_details'), 'source binding details'):
                need(all(isinstance(binding.get(key), str) and binding[key] for key in ('property', 'token', 'collection')),
                     'Unresolved source token role')
            for run in rows(node.get('text_runs'), 'source text ranges'):
                need(isinstance(run.get('path'), str) and isinstance(run.get('style_keys'), list)
                     and all(k is None or isinstance(k, str) for k in run['style_keys'])
                     and isinstance(run.get('font_metrics'), list), 'Malformed source text ranges')
            need(len({r['path'] for r in node['text_runs']}) == len(node['text_runs']), 'Duplicate source text path')
            source_nodes[node_id] = node
    out = {'schema_version': SCHEMA, 'stage': 'preflight', 'status': 'BLOCKED', 'findings': [],
           'plan_sha256': sha(canonical(plan)), 'snapshot': reader.identity,
           'destination_file_key': destination, 'validator_sha256': sha(Path(__file__).read_bytes()),
           'source_readbacks': {p: r['sha256'] for p, r in source_refs.items()}, 'functional_exceptions': {}}
    known = {family: [] for family in tracking}
    for use_id, use in uses.items():
        need(use.get('screen') in screens, 'Unknown screen: ' + use_id)
        kind = use.get('kind')
        need('family' in use, 'Declare family or null for ' + use_id)
        family = use['family']
        if family is not None:
            need(family in applicable, 'Use references an unknown or non-applicable family: ' + str(family))
            known[family].append(use_id)
        if kind == 'ds-instance' and family in components:
            component = components[family]
            # Original roots remain authoritative; a graph label is not an approval.
            texts = []
            for path in [component['contract'], *component['amendments']]:
                text = contract_text(reader, path); texts.append(text)
                status = explicit_status(text)
                if status is None:
                    m = re.search(r'^Estado:\s*[`*]*([A-Z_]+)', text, re.M)
                    status = m[1] if m else None
                if status in {'CONFLICT', 'REJECTED', 'SUPERSEDED', 'DRAFT', 'IN_REVIEW'}:
                    issue(out, 'INELIGIBLE_CONTRACT', path + ': ' + status, use_id)
            source = source_nodes.get(use.get('source_node_id'))
            if source is None:
                issue(out, 'UNAVAILABLE_EXISTING_COMPONENT', family + ': missing verified source', use_id)
                continue
            if use.get('component_key') != source['key']:
                issue(out, 'SOURCE_KEY_MISMATCH', family, use_id)
            configured_text_runs(source, use)
            labels = {norm(s) for s in [source.get('name', ''), source.get('parent_name', '')] if s}
            aliases = {norm(s) for s in [component.get('name', ''), component.get('slug', ''), *component.get('exports', [])] if s}
            locators = [source['id']]
            if source.get('parent_type') == 'COMPONENT_SET' and isinstance(source.get('parent_id'), str):
                locators.append(source['parent_id'])
            locator = any(re.search(r'(?<![\w:])' + re.escape(value) + r'(?![\w:])', '\n'.join(texts)) for value in locators if value)
            if not labels.intersection(aliases) and not locator and not documented_set_matches(component, source, texts):
                issue(out, 'FAMILY_SOURCE_MISMATCH', family + ': neither name nor documented locator agrees', use_id)
            expected = use.get('variant_properties', {})
            need(isinstance(expected, dict), 'variant_properties must be object')
            if any(source.get('variant_properties', {}).get(k) != v for k, v in expected.items()):
                issue(out, 'UNSUPPORTED_VARIANT', family, use_id)
        elif kind == 'ds-instance':
            issue(out, 'UNKNOWN_FAMILY', str(family), use_id)
        elif kind == 'local-content':
            need(family is None, 'Local content cannot stand in for ' + str(family))
            need(isinstance(use.get('reason'), str) and bool(use['reason'].strip()), 'Local content needs reason')
            if use.get('decoration_of') is not None:
                owner = uses.get(use['decoration_of'])
                need(owner is not None and owner.get('kind') == 'ds-instance' and owner.get('screen') == use['screen'], 'Decoration needs a DS owner in the same screen')
        elif kind == 'local-composition':
            need(isinstance(use.get('reason'), str) and bool(use['reason'].strip()), 'Composition needs reason')
            if consumption is None or use.get('functional_exception') is not None:
                out['functional_exceptions'][use_id] = verify_exception(reader, use, components)
            dependencies = use.get('composition_of')
            need(isinstance(dependencies, list) and (bool(dependencies) or consumption is not None)
                 and all(d in uses and d != use_id for d in dependencies), 'Composition needs mapped dependencies')
        else:
            issue(out, 'INVALID_USE_KIND', str(kind), use_id)
    for family in requirements:
        if not known[family]:
            issue(out, 'MISSING_FAMILY_COVERAGE', family)
    # Composition relationships must terminate and cannot hide missing mappings.
    def visit(use_id, trail):
        need(use_id not in trail, 'Cyclic local composition')
        for child in uses[use_id].get('composition_of', []):
            visit(child, trail | {use_id})
    for use_id in uses:
        visit(use_id, set())
    out['status'] = 'PASS' if not out['findings'] else 'BLOCKED'
    out['family_tracking'] = [{**tracking[family], 'contract': components[family]['contract'], 'uses': known[family],
                              'result': 'NOT_APPLICABLE' if family not in applicable else 'PENDING_READBACK'}
                             for family in sorted(tracking)]
    out['generated_at'] = datetime.now(timezone.utc).isoformat()
    out['qa_scope'] = plan['qa_scope'] if qa_page_id is not None else None
    return out, source_nodes


def verify(runtime, plan, base, receipt, readbacks, qa_page_id=None, source_after=None):
    current, sources = preflight(runtime, plan, base, qa_page_id)
    out = {**current, 'stage': 'readback', 'scope': 'Mapped components and named controls in declared screen roots; full visual/interaction/semantic QA remains required'}
    if current['status'] != 'PASS':
        return out
    need(receipt.get('status') == 'PASS' and receipt.get('stage') == 'preflight', 'Passing preflight receipt required')
    for field in ('plan_sha256', 'snapshot', 'destination_file_key', 'validator_sha256', 'source_readbacks', 'family_tracking', 'functional_exceptions', 'qa_scope'):
        need(receipt.get(field) == current[field], 'Preflight invalidated: ' + field)
    if qa_page_id is not None:
        after_nodes = {}
        for evidence in source_after or []:
            need(evidence.get('kind') == 'source' and evidence.get('complete') is True
                 and evidence.get('file_key') == plan['destination_file_key'], 'Complete source readback after Playground QA required')
            need(timestamp(evidence['observed_at']) >= timestamp(receipt['generated_at']), 'Source preservation readback predates preflight')
            for key, node in unique(evidence.get('nodes'), 'id', 'source preservation nodes').items():
                need(key not in after_nodes, 'Duplicate source preservation node')
                after_nodes[key] = node
        need(set(after_nodes) == set(sources), 'Read back every used canonical principal after Playground QA')
        for key in sources:
            need(canonical(after_nodes[key]) == canonical(sources[key]), 'Canonical principal changed during Playground QA: ' + key)
        for evidence in readbacks:
            need(evidence.get('page_id') == qa_page_id, 'QA readback outside authorized Playground page')
            root = evidence.get('qa_root', {})
            need(root.get('parent_id') == qa_page_id and root.get('name') == plan['qa_scope']['container_name']
                 and root.get('type') in {'SECTION', 'FRAME'} and root.get('id') in evidence.get('root_ancestor_ids', []),
                 'QA screen outside its isolated Playground container')
            need(all(root['id'] in node.get('ancestor_ids', []) for node in evidence.get('nodes', [])), 'QA node outside isolated container')
    uses = unique(plan['uses'], 'id', 'uses')
    screens = set(); placements = {}; nodes = {}; candidates = []; instance_ids = set(); screen_of = {}
    for evidence in readbacks:
        need(evidence.get('schema_version') == SCHEMA and evidence.get('kind') == 'target'
             and evidence.get('file_key') == plan['destination_file_key'] and evidence.get('complete') is True, 'Invalid or incomplete destination readback')
        screen = evidence.get('screen')
        need(screen in plan['screens'] and screen not in screens, 'Missing/duplicate/unplanned screen')
        need(evidence.get('plan_sha256') == current['plan_sha256'], 'Readback belongs to another plan')
        need(timestamp(evidence['observed_at']) >= timestamp(receipt['generated_at']), 'Readback predates preflight')
        screens.add(screen)
        need(isinstance(evidence.get('placements'), dict), 'Missing placements')
        for use_id, node_id in evidence['placements'].items():
            need(use_id in uses and use_id not in placements and isinstance(node_id, str), 'Invalid/duplicate placement')
            need(uses[use_id]['screen'] == screen, 'Placement moved to another screen')
            placements[use_id] = node_id
        for node_id, node in unique(evidence.get('nodes'), 'id', 'target nodes').items():
            need(node_id not in nodes, 'Overlapping scope/node duplication')
            nodes[node_id] = node; screen_of[node_id] = screen
        candidates.extend(rows(evidence.get('candidates'), 'candidates'))
        ids = evidence.get('instance_ids')
        need(isinstance(ids, list) and all(isinstance(s, str) for s in ids), 'Instance inventory missing')
        instance_ids.update(ids)
    if screens != set(plan['screens']):
        issue(out, 'INCOMPLETE_SCREEN_COVERAGE', 'Missing screen readback')
    need(len(set(placements.values())) == len(placements), 'One node cannot stand for multiple uses')
    reverse = {v: k for k, v in placements.items()}
    for candidate in candidates:
        use_id = reverse.get(candidate.get('id'))
        decorative = False
        if use_id is not None:
            use = uses[use_id]; node = nodes.get(candidate.get('id'), {})
            owner = uses.get(use.get('decoration_of'), {})
            decorative = (use.get('kind') == 'local-content' and use.get('family') is None
                          and owner.get('family') == candidate.get('family')
                          and node.get('type') in {'RECTANGLE', 'VECTOR', 'ELLIPSE'}
                          and node.get('child_count') == 0 and node.get('reaction_count') == 0
                          and bool(node.get('binding_fields')))
        if not decorative and (use_id is None or uses[use_id].get('family') != candidate.get('family')):
            issue(out, 'UNMAPPED_CONTROL', str(candidate.get('family')), use_id, candidate.get('id'))
    for node_id in instance_ids:
        if node_id not in reverse:
            issue(out, 'UNMAPPED_INSTANCE', 'Unmapped top-level instance', node=node_id)
    for use_id, use in uses.items():
        node_id = placements.get(use_id); node = nodes.get(node_id)
        if node is None:
            issue(out, 'MISSING_READBACK', 'No actual node for planned use', use_id, node_id)
            continue
        if screen_of[node_id] != use['screen']:
            issue(out, 'READBACK_SCREEN_MISMATCH', 'Observed node belongs to a different screen', use_id, node_id)
        if use['kind'] == 'ds-instance':
            source = sources[use['source_node_id']]
            if node.get('type') != 'INSTANCE':
                issue(out, 'REBUILT_COMPONENT', 'Expected official instance, observed ' + str(node.get('type')), use_id, node_id)
            elif node.get('main_component_key') != use['component_key']:
                issue(out, 'MAIN_COMPONENT_MISMATCH', 'Main component key differs from verified source', use_id, node_id)
            if node.get('layout_mode') != source.get('layout_mode'):
                issue(out, 'LAYOUT_MISMATCH', 'Layout differs from source', use_id, node_id)
            expected_runs = configured_text_runs(source, use)
            for binding in missing_internal_bindings(source, node):
                issue(out, 'INTERNAL_TOKEN_CHANGED', str(binding), use_id, node_id)
            for key, value in use.get('component_properties', {}).items():
                actual_property = node.get('component_properties', {}).get(key, {})
                if actual_property.get('type') != 'BOOLEAN' or actual_property.get('value') is not value:
                    issue(out, 'COMPONENT_PROPERTY_MISMATCH', key, use_id, node_id)
            for field, code in [('binding_fields', 'BINDINGS_MISSING'), ('text_style_keys', 'STYLES_MISSING')]:
                need(isinstance(node.get(field), list), 'Incomplete constraint readback: ' + field)
                expected_values = ({k for run in expected_runs for k in run['style_keys'] if k}
                                   if field == 'text_style_keys' and use.get('component_properties') else set(source[field]))
                if not expected_values <= set(node[field]):
                    issue(out, code, ', '.join(sorted(expected_values - set(node[field]))), use_id, node_id)
            actual_runs = node.get('text_runs')
            need(isinstance(actual_runs, list), 'Missing target text ranges')
            by_path = {}
            for run in rows(actual_runs, 'target text ranges'):
                need(isinstance(run.get('path'), str) and run['path'] not in by_path
                     and isinstance(run.get('style_keys'), list) and isinstance(run.get('font_metrics'), list), 'Ambiguous target text ranges')
                by_path[run['path']] = run
            for run in expected_runs:
                target_run = by_path.get(run['path'], {})
                actual = target_run.get('style_keys')
                expected = run['style_keys']
                if actual is None or not set(k for k in expected if k) <= set(actual) or actual.count(None) > expected.count(None):
                    issue(out, 'TEXT_RANGE_STYLE_LOST', run['path'], use_id, node_id)
                if run['font_metrics'] and {canonical(metrics) for metrics in run['font_metrics']} != {
                    canonical(metrics) for metrics in target_run.get('font_metrics', [])
                }:
                    issue(out, 'TEXT_RANGE_METRICS_CHANGED', run['path'], use_id, node_id)
            for key, val in use.get('variant_properties', {}).items():
                if node.get('variant_properties', {}).get(key) != val:
                    issue(out, 'VARIANT_MISMATCH', key, use_id, node_id)
        elif use['kind'] == 'local-content':
            if node.get('type') not in {'TEXT', 'VECTOR', 'RECTANGLE', 'ELLIPSE'}:
                issue(out, 'INVALID_LOCAL_CONTENT', 'Content cannot hide a control/container', use_id, node_id)
            if node.get('type') == 'TEXT':
                runs = rows(node.get('text_runs'), 'local text ranges')
                if not runs or any(not run.get('font_metrics') for run in runs):
                    issue(out, 'LOCAL_TEXT_METRICS_MISSING', 'Read font metrics for editable local text', use_id, node_id)
        elif use['kind'] == 'local-composition':
            if node.get('type') not in {'FRAME', 'COMPONENT', 'INSTANCE'} or (
                node.get('type') == 'INSTANCE' and node.get('main_component_remote') is not False
            ):
                issue(out, 'INVALID_LOCAL_COMPOSITION', 'Expected an editable frame or local component', use_id, node_id)
            if node.get('layout_mode') not in {'HORIZONTAL', 'VERTICAL', 'GRID'}:
                issue(out, 'LOCAL_LAYOUT_MISSING', 'Structural composition requires Auto Layout', use_id, node_id)
            for child in use['composition_of']:
                child_node = nodes.get(placements.get(child), {})
                if node_id not in child_node.get('ancestor_ids', []):
                    issue(out, 'COMPOSITION_CHILD_MISSING', child, use_id, node_id)
        if use.get('body_bindings'):
            observed = node.get('binding_details', [])
            for binding in use['body_bindings']:
                if not any(b.get('property') == binding['property'] and b.get('token') == binding['token']
                           and b.get('collection') == 'component' for b in observed):
                    issue(out, 'BODY_BINDING_MISSING', str(binding), use_id, node_id)
        if use.get('host_usage'):
            host_id = placements.get(use['host_usage'])
            if host_id not in node.get('ancestor_ids', []):
                issue(out, 'APPSHELL_HOST_MISSING', 'Molecule outside its official AppShell', use_id, node_id)
    out['status'] = 'PASS' if not out['findings'] else 'BLOCKED'
    if out['status'] == 'PASS':
        for row in out['family_tracking']:
            if row['uses']:
                row['result'] = 'EXCEPTION' if any(use_id in out['functional_exceptions'] for use_id in row['uses']) else 'VERIFIED'
                row['nodes'] = {use_id: placements[use_id] for use_id in row['uses']}
    return out


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('stage', choices=['inventory', 'preflight', 'verify', 'collect'])
    parser.add_argument('--runtime', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--plan', type=Path)
    parser.add_argument('--receipt', type=Path)
    parser.add_argument('--readback', type=Path, action='append', default=[])
    parser.add_argument('--request', type=Path, help='Collector request JSON; see figma-usage-gates reference')
    parser.add_argument('--output', type=Path)
    parser.add_argument('--qa-playground-page', help='Only with an explicit user request for isolated QA in a configured Playground page')
    parser.add_argument('--source-after', type=Path, action='append', default=[], help='Mandatory post-QA source preservation readback in Playground mode')
    args = parser.parse_args()
    try:
        if args.stage == 'inventory':
            reader = Reader(args.runtime)
            components = component_catalog(reader)
            result = {'status': 'PASS', 'snapshot': reader.identity,
                      'family_tracking': [{'family': family, 'contract': component['contract'],
                                           'applicability': None, 'reason': ''}
                                          for family, component in sorted(components.items())]}
            payload = json.dumps(result, ensure_ascii=False, indent=2) + '\n'
            if args.output:
                args.output.write_text(payload)
            else:
                print(payload, end='')
            return 0
        need(args.plan is not None, 'Plan required')
        plan = read(args.plan)
        if args.stage == 'collect':
            need(args.request is not None, 'Collector request required')
            request = read(args.request)
            reader = Reader(args.runtime)
            master, sandbox = file_roles(reader, plan, args.qa_playground_page)
            request['master_file_key'] = master
            need(request.get('file_key') == (master if request.get('kind') == 'source' else sandbox), 'Request does not match configured file role')
            request['plan_sha256'] = sha(canonical(plan))
            request['official_component_keys'] = [u['component_key'] for u in plan.get('uses', []) if u.get('kind') == 'ds-instance' and isinstance(u.get('component_key'), str)]
            request['families'] = [{k: c.get(k) for k in ('id', 'name', 'slug', 'exports')} for c in component_catalog(reader).values()]
            code = 'const request = ' + json.dumps(request, ensure_ascii=False) + ';\n' + Path(__file__).with_name('collect_figma_usage.js').read_text()
            if args.output: args.output.write_text(code)
            else: print(code)
            return 0
        if args.stage == 'preflight':
            result, _ = preflight(args.runtime, plan, args.plan.resolve().parent, args.qa_playground_page)
        else:
            need(args.receipt is not None and bool(args.readback), 'Preflight receipt and target readbacks required')
            result = verify(args.runtime, plan, args.plan.resolve().parent, read(args.receipt), [read(p) for p in args.readback], args.qa_playground_page, [read(p) for p in args.source_after])
    except (ValueError, OSError, KeyError, TypeError, AttributeError, IndexError) as error:
        result = {'schema_version': SCHEMA, 'stage': args.stage, 'status': 'BLOCKED', 'findings': [{'code': 'INVALID_EVIDENCE', 'message': str(error)}]}
    text = json.dumps(result, ensure_ascii=False, indent=2) + '\n'
    if args.output: args.output.write_text(text)
    print(text)
    return 0 if result['status'] == 'PASS' else 1


if __name__ == '__main__':
    raise SystemExit(main())
