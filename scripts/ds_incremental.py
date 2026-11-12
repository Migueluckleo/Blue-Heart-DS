"""Verified raw extraction reuse; dependency invalidation precedes assembly."""
from pathlib import Path
import hashlib
import json


def read(p):
    return json.loads(Path(p).read_text())


def sha(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()


def relative(root, path):
    p = Path(path)
    return p.resolve().relative_to(root.resolve()).as_posix() if p.is_absolute() else p.as_posix()


def tool_digest(root):
    names = ['scripts/ds_graph_engine.py', 'scripts/ds_incremental.py', 'config/ds-project.json']
    return hashlib.sha256(json.dumps({p: sha(root / p) for p in names}, sort_keys=True).encode()).hexdigest()


def prior(root, run):
    """Only consume raw artifacts covered by the last published closure."""
    try:
        closure = read(run / 'before/ds-closure.json')
        name = closure['run']
        if '/' in name or '..' in name or closure.get('extraction_tool_sha256') != tool_digest(root):
            return None
        previous = root / 'graphify-out/runs' / name
        hashes = closure['extraction_sha256']
        required = ['ast.json', 'structural-supplement.json', 'source-plan.json']
        if any(hashes.get(p) != sha(previous / p) for p in required):
            return None
        return {p: read(previous / p) for p in required}
    except (OSError, ValueError, KeyError):
        return None


def affected_sources(graph, changed):
    """Orient cross-file evidence by its owning source, including incoming callers."""
    owners = {n['id']: n.get('source_file') for n in graph['nodes']}
    reverse = {}
    for edge in graph.get('links', graph.get('edges', [])):
        for evidence in edge.get('evidence_records', [edge]):
            owner = evidence.get('source_file')
            if not owner:
                continue
            for endpoint in (edge['source'], edge['target']):
                target = owners.get(endpoint)
                if target and target != owner:
                    reverse.setdefault(target, set()).add(owner)
    affected = set(changed)
    pending = list(changed)
    while pending:
        for source in reverse.get(pending.pop(), set()):
            if source not in affected:
                affected.add(source)
                pending.append(source)
    return affected


def extract_ast(root, run, extractor, is_design_json):
    detection = read(run / 'detection.json')
    plan = read(run / 'source-plan.json')
    paths = {relative(root, p): Path(p) for p in detection['files']['code']}
    previous = prior(root, run)
    changed = set(plan['new'] + plan['changed'] + plan['deleted_or_excluded'])
    # New modules can resolve formerly unresolved imports without an old edge.
    # Re-extract conservatively in that case, or after a toolchain change.
    full = previous is None or bool(set(plan['new']) & set(paths))
    affected = set(paths) | changed if full else affected_sources(read(run / 'before/graph.json'), changed)
    selected = set(paths) & affected
    old = previous['ast.json'] if previous and not full else {'nodes': [], 'edges': []}
    keep = set(paths) - selected
    def owner(row):
        return relative(root, row['source_file']) if row.get('source_file') else None
    edges = [e for e in old.get('edges', []) if owner(e) in keep]
    endpoints = {e[k] for e in edges for k in ('source', 'target')}
    known_sources = set(paths) | set(plan['deleted_or_excluded'])
    if previous:
        known_sources.update(previous['source-plan.json'].get('source_sha256', {}))
    # External module nodes are owned by package names, not corpus files.
    # Preserve their identity when retained edges still reference them.
    nodes = [n for n in old['nodes'] if owner(n) in keep or
             (owner(n) not in known_sources and n['id'] in endpoints)]
    supplemental = [paths[p] for p in sorted(selected) if is_design_json(paths[p])]
    todo = [paths[p] for p in sorted(selected) if paths[p] not in supplemental]
    kwargs = {'cache_root': root}
    if not full:
        kwargs.update(root=root, resolution_context_nodes=nodes, resolution_context_edges=edges)
    fresh = extractor(todo, **kwargs) if todo else {'nodes': [], 'edges': [], 'failed_sources': [], 'extracted_sources': []}
    extracted = {relative(root, p) for p in fresh.get('extracted_sources', [])}
    extracted.update(relative(root, p) for p in supplemental)
    if fresh.get('failed_sources') or selected - extracted:
        raise ValueError('Incremental extraction incomplete: ' + str(fresh.get('failed_sources') or sorted(selected - extracted)))
    by_id = {n['id']: n for n in nodes}
    by_id.update({n['id']: n for n in fresh['nodes']})
    all_edges = edges + fresh.get('edges', [])
    # Missing targets are never silently blessed; dependents must be extracted.
    # The assembler may mint explicit external stubs, as in the full pipeline.
    result = {**fresh, 'nodes': list(by_id.values()), 'edges': all_edges,
              'extracted_sources': sorted(set(paths)), 'failed_sources': [],
              'supplemental_json_sources': sorted({relative(root, p) for p in supplemental} |
                  (set(old.get('supplemental_json_sources', [])) & keep)),
              'incremental': {'mode': 'FULL_SAFE_FALLBACK' if full else 'DEPENDENCY_DELTA',
                              'extracted_files': len(selected), 'reused_files': len(keep),
                              'affected_sources': sorted(affected)}}
    return result


def supplement_seed(root, run, paths):
    previous = prior(root, run)
    plan = read(run / 'source-plan.json')
    # Membership changes can make previously absent textual references resolve.
    if previous is None or plan['new'] or plan['deleted_or_excluded']:
        return list(paths), [], [], []
    changed = set(plan['changed'])
    old = previous['structural-supplement.json']
    keep = set(paths) - changed
    return (sorted(changed & set(paths)),
            [n for n in old['nodes'] if n.get('source_file') in keep],
            [e for e in old['edges'] if e.get('source_file') in keep],
            [b for b in old.get('broken_links', []) if b.get('source') in keep])
