import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch
from urllib.parse import parse_qs, urlsplit
from urllib.error import URLError

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
import azure_workflow as azure
import github_workflow as shared
from consumer_graph import Reader
from ds_azure import package


class Origin:
    """Local Azure REST wire fixture using the real unpublished repository files."""
    def __init__(self):
        self.head = '1' * 40
        self.branch = 'refs/heads/stable'
        self.calls = []
        self.override = {}
        self.truncated = False

    def get(self, url):
        self.calls.append(url)
        self.assert_origin(url)
        parsed = urlsplit(url)
        query = parse_qs(parsed.query)
        endpoint = parsed.path[len(urlsplit(azure.API).path):]
        if not endpoint:
            return shared.encoded({'defaultBranch': self.branch})
        if endpoint == '/refs':
            return shared.encoded({'value': [{'name': self.branch + '-other', 'objectId': '3' * 40},
                                             {'name': self.branch, 'objectId': self.head}]})
        if endpoint.startswith('/commits/'):
            return shared.encoded({'commitId': endpoint.split('/')[-1]})
        if endpoint == '/items':
            if query.get('versionDescriptor.versionType') != ['commit']:
                raise AssertionError('Unpinned read')
            if query.get('versionDescriptor.version') not in [['1' * 40], ['2' * 40]]:
                raise AssertionError('Unknown commit')
            path = query['path'][0].removeprefix('/')
            if '$format' in query:
                name = path.split('/')[-1]
                return shared.encoded({'gitObjectType': 'tree', 'objectId': self.tree_id(name)})
            return self.override.get(path, (ROOT / path).read_bytes())
        if endpoint.startswith('/trees/'):
            name = next(n for n in shared.SKILLS if self.tree_id(n) == endpoint.split('/')[-1])
            rows = []
            base = ROOT / 'workflows/skills' / name
            for path in sorted(base.rglob('*')):
                if not path.is_file() or '__pycache__' in path.parts:
                    continue
                relative = path.relative_to(base).as_posix()
                raw = path.read_bytes()
                blob = hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()
                rows.append({'relativePath': relative, 'mode': '100644', 'gitObjectType': 'blob', 'objectId': blob})
            return shared.encoded({'objectId': self.tree_id(name), 'treeEntries': rows, 'truncated': self.truncated})
        raise AssertionError('Unexpected endpoint: ' + url)

    @staticmethod
    def assert_origin(url):
        if not url.startswith(azure.API + '?') and not url.startswith(azure.API + '/'):
            raise AssertionError('Request escaped Azure: ' + url)

    @staticmethod
    def tree_id(name):
        return hashlib.sha1(name.encode()).hexdigest()


class AzureWorkflowTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='azure-workflow-test-')
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.origin = Origin()
        patcher = patch.object(azure, 'request', self.origin.get)
        patcher.start()
        self.addCleanup(patcher.stop)

    def start(self, name='azure-contpaqi-figma-screens', folder='runtime'):
        result = azure.start(name, self.base / folder)
        self.assertEqual(result['status'], 'PASS')
        self.assertEqual(result['delivery'], 'azure-direct-v1')
        return Path(result['runtime']), result

    def test_both_workflows_use_one_azure_catalog_without_bundle(self):
        identities = []
        for name in azure.SKILLS:
            runtime, result = self.start(name, name)
            identities.append(result['manifest_sha256'])
            self.assertEqual(result['skill_name'], name)
            release = json.loads((runtime / 'assets/release.json').read_bytes())
            self.assertEqual(release['companion_skill'], next(n for n in azure.SKILLS if n != name))
            self.assertTrue((runtime / 'assets/azure-session.json').is_file())
            self.assertFalse((runtime / 'assets/github-session.json').exists())
            self.assertTrue((runtime / 'scripts/azure_workflow.py').is_file())
            self.assertEqual(result['graph']['mode'], 'graph')
            self.assertFalse(result['bundle_used'])
            self.assertFalse(result['installed_resources_used'])
        self.assertEqual(len(set(identities)), 1)
        self.assertFalse(any('data.tar.gz' in u or 'graphify-out/' in u for u in self.origin.calls))

    def test_resolves_exact_default_branch_and_pins_queries(self):
        runtime, result = self.start()
        self.origin.head = '2' * 40
        query = {'schema_version': 1, 'component': 'BUTTON-001', 'intent': 'dependencies'}
        answer = Reader(runtime).query(query)
        self.assertEqual(answer['status'], 'PASS', answer)
        self.assertTrue(answer['documents'])
        calls = len(self.origin.calls)
        self.assertEqual(Reader(runtime).query(query)['status'], 'PASS')
        self.assertEqual(len(self.origin.calls), calls)
        for url in self.origin.calls:
            params = parse_qs(urlsplit(url).query)
            if '/items?' in url:
                self.assertEqual(params['versionDescriptor.version'], [result['commit']])
        _, next_result = self.start(folder='next-job')
        self.assertEqual(next_result['commit'], '2' * 40)

    def test_diagnosis_confirms_remote_commit_without_requiring_a_local_copy(self):
        report = azure.diagnose()
        self.assertEqual(report['status'], 'PASS')
        self.assertEqual(report['commit'], self.origin.head)
        self.assertEqual(report['selected_source'], 'REMOTE')
        self.assertEqual(report['local']['status'], 'NOT_PROVIDED')

    def test_figma_sparse_verifier_and_source_tampering(self):
        runtime, _ = self.start()
        spec = importlib.util.spec_from_file_location('azure_verify_snapshot', runtime / 'scripts/verify_snapshot.py')
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        result = module.verify(runtime)
        self.assertEqual(result['status'], 'PASS', result)
        self.assertEqual(result['checked_files'], 3)
        path = 'specs/foundations/body.contract.v1.0.0.md'
        shared.source(runtime, path)
        (runtime / 'assets/design-system' / path).write_bytes(b'tampered')
        with self.assertRaisesRegex(ValueError, 'integrity'):
            shared.source(runtime, path)
        for path in ('../outside', '/outside', 'a/../outside', 'a\\outside'):
            with self.assertRaises(ValueError):
                shared.source(runtime, path)

    def test_web_sources_initialize_po_project_without_changing_provider(self):
        runtime, _ = self.start('azure-contpaqi-po-prototypes')
        receipt = shared.materialize_web(runtime)
        self.assertEqual(receipt['status'], 'PASS')
        target = self.base / 'prototype'
        result = subprocess.run(['node', str(runtime / 'scripts/init.mjs'), str(target)],
                                capture_output=True, text=True, timeout=30)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertTrue((target / 'prototype/page.tsx').is_file())
        self.assertTrue((target / 'references/snapshot-manifest.json').is_file())

    def test_integrity_network_and_ambiguous_sessions_fail_closed(self):
        self.origin.truncated = True
        with self.assertRaisesRegex(ValueError, 'Incomplete'):
            self.start(folder='truncated')
        self.assertFalse((self.base / 'truncated').exists())
        self.origin.truncated = False
        name = 'workflows/skills/contpaqi-figma-screens/WORKFLOW.md'
        self.origin.override[name] = b'corrupted workflow'
        with self.assertRaisesRegex(ValueError, 'integrity'):
            self.start(folder='tampered')
        self.origin.override.clear()
        runtime, _ = self.start()
        with patch.object(azure, 'request', side_effect=OSError('offline')):
            with self.assertRaises(OSError):
                shared.source(runtime, 'specs/tokens/body.v1.0.0.json')
        (runtime / 'assets/github-session.json').write_bytes((runtime / 'assets/azure-session.json').read_bytes())
        with self.assertRaisesRegex(ValueError, 'exactly one'):
            shared.source(runtime, 'config/figma-links.json')


class AuthTests(unittest.TestCase):
    def tearDown(self):
        azure.authorization.cache_clear()

    def test_entra_and_pat_are_headers_only_and_missing_auth_is_actionable(self):
        with patch.dict('os.environ', {'BLUEHEART_AZURE_TOKEN': 'example-entra', 'AZURE_DEVOPS_EXT_PAT': ''}):
            azure.authorization.cache_clear()
            self.assertEqual(azure.authorization(), 'Bearer example-entra')
        with patch.dict('os.environ', {'BLUEHEART_AZURE_TOKEN': '', 'AZURE_DEVOPS_EXT_PAT': 'example-pat'}):
            azure.authorization.cache_clear()
            self.assertTrue(azure.authorization().startswith('Basic '))
        with patch.dict('os.environ', {}, clear=True), patch.object(azure.shutil, 'which', return_value=None):
            azure.authorization.cache_clear()
            with self.assertRaisesRegex(ValueError, 'authentication required'):
                azure.authorization()

    def test_rejects_sign_in_responses_and_foreign_origins(self):
        class Response:
            status = 203
            headers = {'Content-Type': 'text/html'}
            def __enter__(self): return self
            def __exit__(self, *args): pass
        opener = unittest.mock.Mock()
        opener.open.return_value = Response()
        with patch.object(azure, 'authorization', return_value='Bearer example'), patch.object(azure, 'build_opener', return_value=opener):
            with self.assertRaisesRegex(ValueError, 'HTTP 200'):
                azure.request(azure.API + '?api-version=7.1')
            Response.status = 200
            with self.assertRaisesRegex(ValueError, 'sign-in page'):
                azure.request(azure.API + '?api-version=7.1')
            with self.assertRaisesRegex(ValueError, 'origin'):
                azure.request('https://other.invalid/content')
            with self.assertRaisesRegex(ValueError, 'origin'):
                azure.request(azure.API + '-other-repository?api-version=7.1')

    def test_gcm_oauth_works_without_token_variables_or_azure_cli(self):
        response = subprocess.CompletedProcess([], 0, 'authtype=bearer\ncredential=example-oauth\n', '')
        with patch.dict('os.environ', {}, clear=True), \
                patch.object(azure.shutil, 'which', side_effect=lambda name: '/usr/bin/git' if name == 'git' else None), \
                patch.object(azure.subprocess, 'run', return_value=response) as run:
            azure.authorization.cache_clear()
            self.assertEqual(azure.authorization(), 'Bearer example-oauth')
            self.assertEqual(run.call_args.args[0], ['/usr/bin/git', 'credential-manager', 'get'])
            self.assertEqual(run.call_args.kwargs['env']['GCM_AZREPOS_CREDENTIALTYPE'], 'oauth')
            self.assertEqual(run.call_args.kwargs['env']['GCM_TRACE_SECRETS'], '0')
            self.assertEqual(run.call_count, 1)

    def test_gcm_failure_still_allows_cli_and_legacy_bearer_credentials(self):
        failed = subprocess.CompletedProcess([], 1, '', 'example-secret-is-not-a-diagnostic')
        cli = subprocess.CompletedProcess([], 0, 'example-cli\n', '')
        with patch.dict('os.environ', {}, clear=True), patch.object(azure.shutil, 'which', side_effect=lambda name: name), \
                patch.object(azure.subprocess, 'run', side_effect=[failed, cli]):
            azure.authorization.cache_clear()
            self.assertEqual(azure.authorization(), 'Bearer example-cli')
        bearer = subprocess.CompletedProcess([], 0, 'authtype=bearer\npassword=example-helper\n', '')
        with patch.dict('os.environ', {}, clear=True), \
                patch.object(azure.shutil, 'which', side_effect=lambda name: 'git' if name == 'git' else None), \
                patch.object(azure.subprocess, 'run', side_effect=[failed, bearer]):
            azure.authorization.cache_clear()
            self.assertEqual(azure.authorization(), 'Bearer example-helper')

    def test_network_policy_failure_is_distinct_from_missing_authentication(self):
        opener = unittest.mock.Mock()
        opener.open.side_effect = URLError('no rule allows host; example-secret')
        with patch.object(azure, 'authorization', return_value='Bearer example'), \
                patch.object(azure, 'build_opener', return_value=opener):
            with self.assertRaises(azure.AccessError) as failure:
                azure.request(azure.API + '?api-version=7.1')
        self.assertEqual(failure.exception.code, 'NETWORK_POLICY_DENIED')
        self.assertNotIn('example-secret', str(failure.exception))


class LocalAzureTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='azure-local-test-')
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.repository = self.base / 'repository'
        self.repository.mkdir()
        self.git('init')
        self.git('remote', 'add', 'origin', azure.REPO_URL)
        sources = {
            'config/figma-links.json': shared.encoded({'master_destination': {'file_key': 'target'},
                                                    'root_source': {'file_key': 'source'}}),
            shared.CONSUMPTION: b'Fixture consumption contract',
            'specs/policies/product-consumption.v1.0.0.json': shared.encoded({}),
            'config/web-inputs.json': shared.encoded({'token_sources': []}),
            'implementations/web/src/index.ts': b'export {};',
        }
        files = {path: shared.sha(data) for path, data in sorted(sources.items())}
        ds_digest = shared.sha(json.dumps(files, sort_keys=True, separators=(',', ':')).encode())
        manifest = shared.encoded({'schema_version': 1, 'package_version': '0.0.0+ds.test',
                                  'files': files, 'ds_digest': ds_digest, 'components': []})
        identity = shared.sha(manifest)
        sources['catalog/current.json'] = shared.encoded({'schema_version': 1, 'ds_digest': ds_digest,
            'manifest_sha256': identity, 'manifest': 'catalog/releases/' + identity + '/manifest.json'})
        sources['catalog/releases/' + identity + '/manifest.json'] = manifest
        for name in shared.SKILLS:
            sources['workflows/skills/' + name + '/WORKFLOW.md'] = b'Fixture workflow'
        for path in azure.AzureDevOps.shared:
            sources[path] = (ROOT / path).read_bytes()
        for path, data in sources.items():
            file = self.repository / path
            file.parent.mkdir(parents=True, exist_ok=True)
            file.write_bytes(data)
        self.commit = self.commit_files()

    def git(self, *args):
        return subprocess.check_output(['git', '-C', str(self.repository), *args], stderr=subprocess.PIPE).decode().strip()

    def commit_files(self):
        self.git('add', '.')
        self.git('-c', 'user.name=Fixture', '-c', 'user.email=fixture@localhost', 'commit', '-m', 'fixture')
        return self.git('rev-parse', 'HEAD')

    def test_verified_same_commit_unblocks_diagnosis_without_remote_access(self):
        failure = azure.AccessError('AUTH_UNAVAILABLE', 'Git Credential Manager OAuth was checked')
        with patch.object(azure, 'authorization', side_effect=failure):
            report = azure.diagnose(self.commit, self.repository)
        self.assertEqual(report['status'], 'PASS')
        self.assertEqual(report['selected_source'], 'LOCAL_GIT')
        self.assertEqual(report['local']['commit'], self.commit)
        self.assertEqual(report['remote']['code'], 'AUTH_UNAVAILABLE')

    def test_missing_sha_or_copy_are_reported_without_guessing_local_head(self):
        with patch.object(azure, 'authorization', side_effect=azure.AccessError('AUTH_UNAVAILABLE', 'Unavailable')):
            no_commit = azure.diagnose(repository=self.repository)
            no_copy = azure.diagnose(self.commit)
        self.assertEqual(no_commit['status'], 'BLOCKED')
        self.assertTrue(no_commit['commit_required'])
        self.assertEqual(no_commit['local']['code'], 'COMMIT_REQUIRED')
        self.assertEqual(no_copy['local']['status'], 'NOT_PROVIDED')

    def test_both_local_runtimes_use_git_blobs_and_continue_without_network(self):
        original = (self.repository / shared.CONSUMPTION).read_bytes()
        (self.repository / shared.CONSUMPTION).write_bytes(b'uncommitted change')
        with patch.object(azure, 'authorization', side_effect=AssertionError('Local mode attempted authentication')):
            for name in azure.SKILLS:
                result = azure.start(name, self.base / name, self.commit, repository=self.repository)
                runtime = Path(result['runtime'])
                self.assertEqual(result['status'], 'PASS')
                self.assertEqual(result['network'], {'requests': 0, 'bytes': 0})
                self.assertEqual(shared.source(runtime, shared.CONSUMPTION), original)
                self.assertEqual(shared.materialize_web(runtime)['status'], 'PASS')
                session = json.loads((runtime / 'assets/azure-session.json').read_bytes())
                self.assertEqual(session['source_mode'], 'LOCAL_GIT')
                self.assertEqual(session['commit'], self.commit)
                self.assertEqual(session['repository'], azure.REPO_URL)

    def test_wrong_origin_commit_and_corrupt_catalog_are_rejected_without_output(self):
        with self.assertRaises(ValueError):
            azure.start(azure.SKILLS[0], self.base / 'missing', 'f' * 40, repository=self.repository)
        self.assertFalse((self.base / 'missing').exists())
        self.git('remote', 'set-url', 'origin', 'https://github.com/Migueluckleo/Blue-Heart-DS.git')
        with self.assertRaisesRegex(ValueError, 'same Azure repository'):
            azure.LocalAzureTransport(self.repository, self.commit)
        self.git('remote', 'set-url', 'origin', azure.REPO_URL)
        (self.repository / shared.CONSUMPTION).write_bytes(b'changed without catalog update')
        changed = self.commit_files()
        with self.assertRaisesRegex(ValueError, 'integrity failure'):
            azure.start(azure.SKILLS[0], self.base / 'corrupt', changed, repository=self.repository)
        self.assertFalse((self.base / 'corrupt').exists())


class AzurePackagingTests(unittest.TestCase):
    def test_repeatable_separate_release_and_immutable_corruption_detection(self):
        with tempfile.TemporaryDirectory(prefix='azure-package-test-') as temporary:
            root = Path(temporary)
            (root / 'config').mkdir()
            (root / 'config/azure-consumption.json').write_bytes((ROOT / 'config/azure-consumption.json').read_bytes())
            for name in azure.SKILLS:
                folder = root / 'skills-azure' / name
                folder.mkdir(parents=True)
                (folder / 'SKILL.md').write_bytes((ROOT / 'skills-azure' / name / 'SKILL.md').read_bytes())
            (root / 'scripts').mkdir()
            for name in ('azure_workflow.py', 'github_workflow.py'):
                (root / 'scripts' / name).write_bytes((ROOT / 'scripts' / name).read_bytes())
            first = package(root)
            self.assertEqual(first['operation'], 'CREATED')
            self.assertEqual(package(root)['operation'], 'UNCHANGED')
            self.assertEqual(package(root, check=True)['status'], 'PASS')
            self.assertFalse((root / 'output/skills/current.json').exists())
            archive = Path(first['archives'][0])
            archive.write_bytes(b'tampered')
            with self.assertRaisesRegex(ValueError, 'Immutable'):
                package(root)


if __name__ == '__main__':
    unittest.main()
