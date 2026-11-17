import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
import github_workflow as github
from consumer_graph import Reader
from ds_skills import inputs, package_files


class Origin:
    """Exercise the GitHub wire interface with unpublished workflow sources."""
    def __init__(self):
        self.head = '1' * 40
        self.calls = []
        self.override = {}

    def tree(self, name):
        base = ROOT / 'workflows/skills' / name
        rows = []
        for p in sorted(base.rglob('*')):
            if not p.is_file() or '__pycache__' in p.parts:
                continue
            rel = p.relative_to(base).as_posix()
            raw = self.override.get('workflows/skills/' + name + '/' + rel, p.read_bytes())
            blob = hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()
            rows.append({'path': rel, 'mode': '100644', 'type': 'blob', 'sha': blob})
        return rows

    def get(self, url):
        self.calls.append(url)
        parsed = urlparse(url)
        path = unquote(parsed.path)
        if parsed.hostname == 'api.github.com':
            if path.endswith('/git/ref/heads/main'):
                return github.encoded({'object': {'sha': self.head}})
            if path.endswith('/contents/workflows/skills'):
                return github.encoded([{'name': n, 'type': 'dir', 'sha': n} for n in github.SKILLS])
            if '/git/trees/' in path:
                return github.encoded({'truncated': False, 'tree': self.tree(path.split('/')[-1])})
        prefix = '/Migueluckleo/Blue-Heart-DS/'
        if parsed.hostname != 'raw.githubusercontent.com' or not path.startswith(prefix):
            raise OSError('Unexpected origin: ' + url)
        commit, name = path[len(prefix):].split('/', 1)
        if commit not in {'1' * 40, '2' * 40}:
            raise OSError('Unknown commit')
        return self.override.get(name, (ROOT / name).read_bytes())


class WorkflowTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='github-workflow-test-')
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.origin = Origin()
        self.patch = patch.object(github, 'request', self.origin.get)
        self.patch.start()
        self.addCleanup(self.patch.stop)

    def start(self, name='contpaqi-figma-screens', folder='session'):
        result = github.start(name, self.base / folder)
        self.assertEqual(result['status'], 'PASS')
        return Path(result['runtime']), result

    def test_both_workflows_start_without_installed_engine_or_bundle(self):
        identities = []
        for name in github.SKILLS:
            runtime, result = self.start(name, name)
            identities.append(result['manifest_sha256'])
            self.assertFalse(result['installed_resources_used'])
            self.assertFalse(result['bundle_used'])
            self.assertEqual(result['graph']['mode'], 'graph')
            files = [p for p in (runtime / 'assets/design-system').rglob('*') if p.is_file()]
            self.assertEqual(len(files), 3)  # Figma identity and the primordial consumption contract/data.
        self.assertEqual(len(set(identities)), 1)
        self.assertFalse(any('data.tar.gz' in url or 'graphify-out/' in url for url in self.origin.calls))

    def test_graph_query_reads_selected_github_sources_once_per_job(self):
        runtime, _ = self.start()
        result = Reader(runtime).query({'schema_version': 1, 'component': 'BUTTON-001', 'intent': 'dependencies'})
        self.assertEqual(result['status'], 'PASS', result)
        self.assertGreater(result['metrics']['nodes_visited'], 0)
        files = [p for p in (runtime / 'assets/design-system').rglob('*') if p.is_file()]
        self.assertLess(len(files), 40)
        self.assertTrue(all(d['sha256'] for d in result['documents']))
        calls = len(self.origin.calls)
        self.assertEqual(Reader(runtime).query({'schema_version': 1, 'component': 'BUTTON-001', 'intent': 'dependencies'})['status'], 'PASS')
        self.assertEqual(len(self.origin.calls), calls)

    def test_remote_workflow_update_does_not_change_launcher_package(self):
        state = inputs(ROOT)
        before = state['input_digest']
        launchers = {n: {p: v.read_bytes() for p, v in package_files(state, '2.0.0', n).items()} for n in github.SKILLS}
        runtime1, result1 = self.start(folder='one')
        path = 'workflows/skills/contpaqi-figma-screens/WORKFLOW.md'
        self.origin.head = '2' * 40
        self.origin.override[path] = (ROOT / path).read_bytes() + b'\nRemote workflow update\n'
        runtime2, result2 = self.start(folder='two')
        self.assertNotEqual(result1['commit'], result2['commit'])
        self.assertNotEqual((runtime1 / 'WORKFLOW.md').read_bytes(), (runtime2 / 'WORKFLOW.md').read_bytes())
        self.assertEqual(before, inputs(ROOT)['input_digest'])
        for name, files in launchers.items():
            self.assertEqual(set(files), {'SKILL.md'})
            self.assertEqual(files, {p: v.read_bytes() for p, v in package_files(inputs(ROOT), '2.0.0', name).items()})

    def test_integrity_and_no_offline_fallback(self):
        runtime, _ = self.start()
        path = 'specs/foundations/body.contract.v1.0.0.md'
        data = github.source(runtime, path)
        self.assertIn(b'body/', data)
        (runtime / 'assets/design-system' / path).write_bytes(b'altered')
        with self.assertRaisesRegex(ValueError, 'integrity'):
            github.source(runtime, path)
        with patch.object(github, 'request', side_effect=OSError('offline')):
            with self.assertRaises(OSError):
                github.start(github.SKILLS[0], self.base / 'offline')
            with self.assertRaises(OSError):
                github.source(runtime, 'specs/tokens/body.v1.0.0.json')

    def test_fresh_head_is_fixed_for_entire_job(self):
        runtime, result = self.start()
        self.origin.head = '2' * 40
        github.source(runtime, 'specs/tokens/body.v1.0.0.json')
        self.assertIn('/' + result['commit'] + '/specs/tokens/body.', self.origin.calls[-1])
        for bad in ('../outside', '/outside', 'specs/../outside', 'specs\\outside'):
            with self.assertRaises(ValueError):
                github.source(runtime, bad)

    def test_sparse_figma_integrity_reports_coverage_and_detects_tampering(self):
        runtime, _ = self.start()
        spec = importlib.util.spec_from_file_location('verify_sparse', runtime / 'scripts/verify_snapshot.py')
        verifier = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(verifier)
        result = verifier.verify(runtime)
        self.assertEqual(result['status'], 'PASS')
        self.assertEqual(result['checked_files'], 3)
        self.assertGreater(result['catalog_files'], result['checked_files'])
        (runtime / 'assets/design-system/config/figma-links.json').write_bytes(b'{}')
        self.assertEqual(verifier.verify(runtime)['status'], 'FAIL')


if __name__ == '__main__':
    unittest.main()
