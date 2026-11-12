"""Fail-closed preflight and Figma readback gates. No network or Figma mutations."""
from __future__ import annotations
import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import sys
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


def file_roles(reader, plan):
    path = 'config/figma-links.json'
    raw = safe(reader.snapshot, path).read_bytes()
    need(sha(raw) == reader.manifest['files'][path], 'Figma roles differ from the verified catalog')
    config = parse(raw)
    master = (config.get('master_destination') or {}).get('file_key')
    source = (config.get('root_source') or {}).get('file_key')
    destination = plan.get('destination_file_key')
    need(master and source and master != source, 'Distinct BlueHeart source and master required')
    need(isinstance(destination, str) and re.fullmatch(r'[A-Za-z0-9]+', destination)
         and destination not in {master, source}, 'Use a prototype file separate from the BlueHeart master and root')
    configured = (config.get('consumption_sandbox') or {}).get('file_key')
    if destination != configured:
        url = plan.get('destination_url', '')
        match = re.fullmatch(r'https://(?:www\.)?figma\.com/design/([A-Za-z0-9]+)(?:/branch/([A-Za-z0-9]+))?(?:[/?#].*)?', url)
        need(match and (match[2] or match[1]) == destination, 'Include the authorized Figma prototype URL matching the destination key')
    return master, destination


def preflight(runtime, plan, base):
    reader = Reader(runtime)  # Verifies pinned remote manifest/receipt, even without optional graph.
    need(plan.get('schema_version') == SCHEMA, 'Unsupported plan schema')
    need(plan.get('snapshot') == reader.identity, 'Plan snapshot differs from verified catalog')
    master, destination = file_roles(reader, plan)
    screens = plan.get('screens')
    need(isinstance(screens, list) and screens and all(isinstance(s, str) and s for s in screens)
         and len(screens) == len(set(screens)), 'Unique logical screens required')
    requirements = plan.get('requirements')
    need(isinstance(requirements, list) and all(isinstance(s, str) for s in requirements)
         and len(requirements) == len(set(requirements)), 'Unique family requirements required')
    uses = unique(plan.get('uses'), 'id', 'uses')
    need(bool(uses), 'Empty scope cannot pass')
    components = unique(reader.manifest['components'], 'id', 'components')
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
            for run in rows(node.get('text_runs'), 'source text ranges'):
                need(isinstance(run.get('path'), str) and isinstance(run.get('style_keys'), list)
                     and all(k is None or isinstance(k, str) for k in run['style_keys'])
                     and isinstance(run.get('font_metrics'), list), 'Malformed source text ranges')
            need(len({r['path'] for r in node['text_runs']}) == len(node['text_runs']), 'Duplicate source text path')
            source_nodes[node_id] = node
    out = {'schema_version': SCHEMA, 'stage': 'preflight', 'status': 'BLOCKED', 'findings': [],
           'plan_sha256': sha(canonical(plan)), 'snapshot': reader.identity,
           'destination_file_key': destination, 'validator_sha256': sha(Path(__file__).read_bytes()),
           'source_readbacks': {p: r['sha256'] for p, r in source_refs.items()}}
    known = set()
    for use_id, use in uses.items():
        need(use.get('screen') in screens, 'Unknown screen: ' + use_id)
        kind = use.get('kind')
        family = use.get('family')
        if family in components:
            known.add(family)
            if kind != 'ds-instance':
                issue(out, 'EXISTING_FAMILY_REQUIRES_INSTANCE', family, use_id)
                continue
            component = components[family]
            # Original roots remain authoritative; a graph label is not an approval.
            texts = []
            for path in [component['contract'], *component['amendments']]:
                raw = safe(reader.snapshot, path).read_bytes()
                need(sha(raw) == reader.manifest['files'][path], 'Contract integrity: ' + path)
                text = raw.decode('utf-8'); texts.append(text)
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
            labels = {norm(s) for s in [source.get('name', ''), source.get('parent_name', '')] if s}
            aliases = {norm(s) for s in [component.get('name', ''), component.get('slug', ''), *component.get('exports', [])] if s}
            locators = [source['id']]
            if source.get('parent_type') == 'COMPONENT_SET' and isinstance(source.get('parent_id'), str):
                locators.append(source['parent_id'])
            locator = any(re.search(r'(?<![\w:])' + re.escape(value) + r'(?![\w:])', '\n'.join(texts)) for value in locators if value)
            if not labels.intersection(aliases) and not locator:
                issue(out, 'FAMILY_SOURCE_MISMATCH', family + ': neither name nor documented locator agrees', use_id)
            expected = use.get('variant_properties', {})
            need(isinstance(expected, dict), 'variant_properties must be object')
            if any(source.get('variant_properties', {}).get(k) != v for k, v in expected.items()):
                issue(out, 'UNSUPPORTED_VARIANT', family, use_id)
        elif family is not None or kind == 'ds-instance':
            issue(out, 'UNKNOWN_FAMILY', str(family), use_id)
        elif kind == 'local-content':
            need(isinstance(use.get('reason'), str) and bool(use['reason'].strip()), 'Local content needs reason')
            if use.get('decoration_of') is not None:
                owner = uses.get(use['decoration_of'])
                need(owner is not None and owner.get('kind') == 'ds-instance' and owner.get('screen') == use['screen'], 'Decoration needs a DS owner in the same screen')
        elif kind == 'local-composition':
            need(isinstance(use.get('reason'), str) and bool(use['reason'].strip()), 'Composition needs reason')
            dependencies = use.get('composition_of')
            need(isinstance(dependencies, list) and dependencies and all(d in uses and d != use_id for d in dependencies), 'Composition needs mapped dependencies')
        else:
            issue(out, 'INVALID_USE_KIND', str(kind), use_id)
    for family in requirements:
        if family not in components or family not in known:
            issue(out, 'MISSING_FAMILY_COVERAGE', family)
    # Composition relationships must terminate and cannot hide missing mappings.
    def visit(use_id, trail):
        need(use_id not in trail, 'Cyclic local composition')
        for child in uses[use_id].get('composition_of', []):
            visit(child, trail | {use_id})
    for use_id in uses:
        visit(use_id, set())
    out['status'] = 'PASS' if not out['findings'] else 'BLOCKED'
    out['generated_at'] = datetime.now(timezone.utc).isoformat()
    return out, source_nodes


def verify(runtime, plan, base, receipt, readbacks):
    current, sources = preflight(runtime, plan, base)
    out = {**current, 'stage': 'readback', 'scope': 'Mapped components and named controls in declared screen roots; full visual/interaction/semantic QA remains required'}
    if current['status'] != 'PASS':
        return out
    need(receipt.get('status') == 'PASS' and receipt.get('stage') == 'preflight', 'Passing preflight receipt required')
    for field in ('plan_sha256', 'snapshot', 'destination_file_key', 'validator_sha256', 'source_readbacks'):
        need(receipt.get(field) == current[field], 'Preflight invalidated: ' + field)
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
        if use['kind'] == 'ds-instance':
            source = sources[use['source_node_id']]
            if node.get('type') != 'INSTANCE':
                issue(out, 'REBUILT_COMPONENT', 'Expected official instance, observed ' + str(node.get('type')), use_id, node_id)
            elif node.get('main_component_key') != use['component_key']:
                issue(out, 'MAIN_COMPONENT_MISMATCH', 'Main component key differs from verified source', use_id, node_id)
            if node.get('layout_mode') != source.get('layout_mode'):
                issue(out, 'LAYOUT_MISMATCH', 'Layout differs from source', use_id, node_id)
            for field, code in [('binding_fields', 'BINDINGS_MISSING'), ('text_style_keys', 'STYLES_MISSING')]:
                need(isinstance(node.get(field), list), 'Incomplete constraint readback: ' + field)
                if not set(source[field]) <= set(node[field]):
                    issue(out, code, ', '.join(sorted(set(source[field]) - set(node[field]))), use_id, node_id)
            expected_runs = source['text_runs']
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
            if node.get('layout_mode') not in {'HORIZONTAL', 'VERTICAL', 'GRID'}:
                issue(out, 'LOCAL_LAYOUT_MISSING', 'Structural composition requires Auto Layout', use_id, node_id)
            for child in use['composition_of']:
                child_node = nodes.get(placements.get(child), {})
                if node_id not in child_node.get('ancestor_ids', []):
                    issue(out, 'COMPOSITION_CHILD_MISSING', child, use_id, node_id)
    out['status'] = 'PASS' if not out['findings'] else 'BLOCKED'
    return out


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('stage', choices=['preflight', 'verify', 'collect'])
    parser.add_argument('--runtime', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--plan', type=Path, required=True)
    parser.add_argument('--receipt', type=Path)
    parser.add_argument('--readback', type=Path, action='append', default=[])
    parser.add_argument('--request', type=Path, help='Collector request JSON; see figma-usage-gates reference')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    try:
        plan = read(args.plan)
        if args.stage == 'collect':
            need(args.request is not None, 'Collector request required')
            request = read(args.request)
            reader = Reader(args.runtime)
            master, sandbox = file_roles(reader, plan)
            request['master_file_key'] = master
            need(request.get('file_key') == (master if request.get('kind') == 'source' else sandbox), 'Request does not match configured file role')
            request['plan_sha256'] = sha(canonical(plan))
            request['official_component_keys'] = [u['component_key'] for u in plan.get('uses', []) if u.get('kind') == 'ds-instance' and isinstance(u.get('component_key'), str)]
            manifest = read(args.runtime / 'assets/snapshot-manifest.json')
            request['families'] = [{k: c.get(k) for k in ('id', 'name', 'slug', 'exports')} for c in manifest['components']]
            code = 'const request = ' + json.dumps(request, ensure_ascii=False) + ';\n' + Path(__file__).with_name('collect_figma_usage.js').read_text()
            if args.output: args.output.write_text(code)
            else: print(code)
            return 0
        if args.stage == 'preflight':
            result, _ = preflight(args.runtime, plan, args.plan.resolve().parent)
        else:
            need(args.receipt is not None and bool(args.readback), 'Preflight receipt and target readbacks required')
            result = verify(args.runtime, plan, args.plan.resolve().parent, read(args.receipt), [read(p) for p in args.readback])
    except (ValueError, OSError, KeyError, TypeError, AttributeError, IndexError) as error:
        result = {'schema_version': SCHEMA, 'stage': args.stage, 'status': 'BLOCKED', 'findings': [{'code': 'INVALID_EVIDENCE', 'message': str(error)}]}
    text = json.dumps(result, ensure_ascii=False, indent=2) + '\n'
    if args.output: args.output.write_text(text)
    print(text)
    return 0 if result['status'] == 'PASS' else 1


if __name__ == '__main__':
    raise SystemExit(main())
