"""Declared dependencies must survive extraction and gate CURRENT independently of hashes."""
import copy
import hashlib
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))

import ds_graph
import ds_graph_engine as engine
from ds_dependencies import dependency_coverage


class GraphDependencyCoverageTests(unittest.TestCase):
    def setUp(self):
        self.source = 'specs/components/notification.contract.md'
        self.target = 'specs/components/button.contract.md'
        self.source_id = engine.artifact_id(self.source)
        self.target_id = engine.artifact_id(self.target)
        self.references = {self.source: {(8, self.target)}}
        self.nodes = [
            {'id': self.source_id, 'source_file': self.source, 'sha256': 'source-hash'},
            {'id': self.target_id, 'source_file': self.target, 'sha256': 'target-hash'},
        ]
        self.edge = {
            'source': self.source_id, 'target': self.target_id,
            'relation': 'depends_on', 'confidence': 'EXTRACTED', 'confidence_score': 1.0,
            'source_file': self.source, 'source_location': 'L8', 'declared_dependency': True,
        }

    def test_missing_direct_edge_is_reported_despite_indirect_path(self):
        graph = {'nodes': self.nodes + [{'id': 'registry'}], 'links': [
            {'source': self.source_id, 'target': 'registry'},
            {'source': 'registry', 'target': self.target_id},
        ]}
        result = dependency_coverage(graph, self.references)
        self.assertEqual(result['verified'], 0)
        self.assertEqual(result['missing'], [
            {'source': self.source, 'target': self.target, 'line': 8},
        ])

    def test_merged_undirected_edge_preserves_declaration_evidence(self):
        merged = {
            'source': self.target_id, 'target': self.source_id,
            'relation': 'references', 'evidence_records': [self.edge],
        }
        result = dependency_coverage({'nodes': self.nodes, 'links': [merged]}, self.references)
        self.assertEqual(result, {'status': 'PASS', 'declared': 1, 'verified': 1, 'missing': []})

    def test_file_root_normalization_preserves_dependency_alongside_semantic_citations(self):
        from graphify.build import build_from_json
        semantic_id = 'notification_document'
        nodes = [{**n, 'label': Path(n['source_file']).name, '_origin': 'ast'} for n in self.nodes]
        nodes.append({'id': semantic_id, 'label': Path(self.source).name,
                      'source_file': self.source, 'file_type': 'document', '_origin': 'semantic'})
        citation = {'source': semantic_id, 'target': self.target_id,
                    'relation': 'cites', 'confidence': 'EXTRACTED', 'confidence_score': 1.0,
                    'source_file': self.source, 'source_location': 'L9'}
        raw = {'nodes': nodes, 'edges': [self.edge, citation], 'hyperedges': []}
        normalized, mapping = engine.normalize_file_artifacts(raw)
        self.assertEqual(mapping, {semantic_id: self.source_id})
        self.assertEqual(raw['edges'][1]['source'], semantic_id)
        merged = {**self.edge, 'evidence_records': normalized['edges']}
        graph = build_from_json({**normalized, 'edges': [merged]}, root=str(engine.ROOT))
        records = list(graph.edges(data=True))[0][2]['evidence_records']
        self.assertEqual({r['relation'] for r in records}, {'depends_on', 'cites'})
        self.assertEqual(records[1]['original_source'], semantic_id)
        exported = {'nodes': normalized['nodes'], 'links': [
            {'source': a, 'target': b, **attrs} for a, b, attrs in graph.edges(data=True)]}
        self.assertEqual(dependency_coverage(exported, self.references)['status'], 'PASS')

    def test_unverifiable_declaration_evidence_fails(self):
        changes = [
            {'relation': 'references'},
            {'confidence': 'INFERRED', 'confidence_score': 0.95},
            {'source_file': self.target},
            {'source_location': 'L9'},
            {'source': self.target_id, 'target': self.source_id},
        ]
        for change in changes:
            with self.subTest(change=change):
                edge = {**self.edge, **change}
                result = dependency_coverage({'nodes': self.nodes, 'links': [edge]}, self.references)
                self.assertEqual(result['status'], 'FAIL')

    def test_equal_basenames_use_exact_source_and_ambiguous_mentions_stay_distinct(self):
        nodes = [
            {'id': 'a_file', 'label': 'WORKFLOW.md', 'source_file': 'a/WORKFLOW.md', 'sha256': 'a', '_origin': 'ast'},
            {'id': 'b_file', 'label': 'WORKFLOW.md', 'source_file': 'b/WORKFLOW.md', 'sha256': 'b', '_origin': 'ast'},
            {'id': 'a_semantic', 'label': 'WORKFLOW.md', 'source_file': 'a/WORKFLOW.md', '_origin': 'semantic'},
            {'id': 'mention', 'label': 'WORKFLOW.md', 'source_file': 'README.md', '_origin': 'semantic'},
        ]
        normalized, mapping = engine.normalize_file_artifacts({'nodes': nodes, 'edges': [], 'hyperedges': []})
        self.assertEqual(mapping, {'a_semantic': 'a_file'})
        self.assertIn('mention', {n['id'] for n in normalized['nodes']})

    def test_current_rejects_missing_dependency_even_with_matching_output_hash(self):
        with tempfile.TemporaryDirectory() as directory:
            live = Path(directory)
            graph = {'nodes': self.nodes, 'links': [self.edge]}
            delta = {'new': [], 'changed': [], 'deleted_or_excluded': [],
                     'corpus_files': 2, 'config_sha256': 'config-hash'}
            with patch.object(ds_graph, 'LIVE', live), \
                    patch.object(ds_graph, 'plan', return_value=(delta, None)), \
                    patch.object(ds_graph, 'dependency_references', return_value=self.references):
                for present in [True, False]:
                    with self.subTest(dependency_present=present):
                        graph['links'] = [self.edge] if present else []
                        raw = json.dumps(graph).encode()
                        (live / 'graph.json').write_bytes(raw)
                        closure = {'status': 'CURRENT', 'output_sha256': {
                            'graph.json': hashlib.sha256(raw).hexdigest(),
                        }}
                        (live / 'ds-closure.json').write_text(json.dumps(closure))
                        result = ds_graph.check_graph({})
                        self.assertEqual(result['status'], 'CURRENT' if present else 'STALE')
                        self.assertEqual(result['declared_dependencies']['verified'], int(present))

    def test_incremental_supplement_replaces_stale_declarations_from_unchanged_sources(self):
        with tempfile.TemporaryDirectory() as directory:
            run = Path(directory)
            paths = {path: str(engine.ROOT / path) for path in [self.source, self.target]}
            engine.dump(run / 'detection.json', {'files': {'document': list(paths.values())}})
            stale = {**self.edge, 'source_location': 'L7'}
            prior_edges = [stale, {**self.edge, 'relation': 'references', 'declared_dependency': False}]
            seed = ([], copy.deepcopy(self.nodes), prior_edges, [])
            with patch.object(engine, 'RUN', run), \
                    patch('ds_incremental.supplement_seed', return_value=seed), \
                    patch.object(engine, 'dependency_references', return_value=self.references):
                engine.supplement()
            supplement = engine.read(run / 'structural-supplement.json')
            declarations = [e for e in supplement['edges'] if e.get('declared_dependency')]
            self.assertEqual(len(declarations), 1)
            self.assertEqual(declarations[0]['source_location'], 'L8')
            self.assertEqual(dependency_coverage(supplement, self.references)['status'], 'PASS')
            self.assertEqual(len(supplement['edges']), 2)


if __name__ == '__main__':
    unittest.main()
