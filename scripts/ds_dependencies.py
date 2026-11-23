"""Resolve declared contract dependencies and verify their graph evidence."""
from pathlib import Path
import re

from consumer_graph import PUBLIC_ROOTS
from ds_core import yaml_documents


def declared_dependency_targets(texts, metadata, components):
    """Resolve explicit IDs against selected bases, foundations and amendments."""
    targets = {c['id']: c['contract'] for c in components}
    for path, row in metadata.items():
        meta = row.get('value') or {}
        if path.startswith('specs/foundations/') and meta.get('contract_id'):
            targets[meta['contract_id']] = path
    amendment_targets = {}
    amendment_paths = {path for component in components for path in component['amendments']}
    for path in amendment_paths:
        meta = metadata.get(path, {}).get('value') or {}
        identity = meta.get('contract_id') or meta.get('amendment_id')
        if identity:
            amendment_targets.setdefault(identity, set()).add(path)
    references = {}
    for path, row in metadata.items():
        dependencies = (row.get('value') or {}).get('dependencies', [])
        if not dependencies:
            continue
        match = re.search(r'^dependencies\s*:', texts[path], re.M)
        if not isinstance(dependencies, list) or match is None:
            raise ValueError('Invalid contract dependencies: ' + path)
        line = texts[path].count('\n', 0, match.start()) + 1
        for dependency in dependencies:
            if not isinstance(dependency, str):
                raise ValueError('Invalid contract dependency ID: ' + path)
            target = targets.get(dependency)
            if target is None:
                candidates = amendment_targets.get(dependency, set())
                if len(candidates) > 1:
                    raise ValueError(f'Ambiguous declared dependency {dependency} in {path}')
                target = next(iter(candidates), None)
            if target not in texts:
                raise ValueError(f'Unresolved declared dependency {dependency} in {path}')
            references.setdefault(path, set()).add((line, target))
    return references


def dependency_references(root):
    """Read the same canonical document selection used by the consumption index."""
    from ds_skills import source_inputs
    root = Path(root)
    state = source_inputs(root)
    paths = sorted(path for path in state['files']
                   if path.startswith(PUBLIC_ROOTS) and path.endswith(('.md', '.json', '.yaml')))
    metadata = yaml_documents(paths, root)
    if any(row.get('errors') for row in metadata.values()):
        raise ValueError('Invalid contract dependency metadata')
    texts = {path: (root / path).read_text() for path in paths}
    return declared_dependency_targets(texts, metadata, state['components'])


def dependency_coverage(graph, references):
    """Require direct file edges with explicit, source-owned declaration evidence."""
    artifacts = {node['source_file']: node['id'] for node in graph['nodes']
                 if node.get('source_file') and node.get('sha256')}
    evidence = set()
    for edge in graph.get('links', graph.get('edges', [])):
        endpoints = {edge['source'], edge['target']}
        for record in edge.get('evidence_records', [edge]):
            if (record.get('relation') == 'depends_on'
                    and record.get('confidence') == 'EXTRACTED'
                    and record.get('confidence_score') == 1.0
                    and {record.get('source'), record.get('target')} == endpoints):
                evidence.add((record.get('source'), record.get('target'),
                              record.get('source_file'), record.get('source_location')))
    missing = []
    total = 0
    for source, targets in sorted(references.items()):
        for line, target in sorted(targets):
            total += 1
            expected = (artifacts.get(source), artifacts.get(target), source, 'L' + str(line))
            if expected[0] is None or expected[1] is None or expected not in evidence:
                missing.append({'source': source, 'target': target, 'line': line})
    return {'status': 'FAIL' if missing else 'PASS', 'declared': total,
            'verified': total - len(missing), 'missing': missing}
