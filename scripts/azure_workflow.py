#!/usr/bin/env python3
"""Consume BlueHeart from Azure Repos at one immutable commit per job."""
from __future__ import annotations

import argparse
import base64
from functools import lru_cache
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
from urllib.error import HTTPError, URLError
from urllib.parse import quote, unquote, urlencode, urlsplit
from urllib.request import Request, build_opener

import github_workflow as shared

ORGANIZATION = 'devcontpaqi'
PROJECT = 'DiseñoUX-UI'
REPOSITORY = 'Blueheart Design System'
BASE = 'https://dev.azure.com/' + ORGANIZATION + '/' + quote(PROJECT, safe='')
REPO_URL = BASE + '/_git/' + quote(REPOSITORY, safe='')
API = BASE + '/_apis/git/repositories/' + quote(REPOSITORY, safe='')
RESOURCE = '499b84ac-1321-427f-aa17-267ca6975798'
SKILLS = tuple('azure-' + name for name in shared.SKILLS)


class AccessError(ValueError):
    def __init__(self, code, message):
        super().__init__(message)
        self.code = code


def gcm_oauth(git_binary):
    env = {**os.environ, 'GIT_TERMINAL_PROMPT': '0', 'GCM_INTERACTIVE': 'Never',
           'GCM_AZREPOS_CREDENTIALTYPE': 'oauth', 'GCM_TRACE_SECRETS': '0'}
    result = subprocess.run([git_binary, 'credential-manager', 'get'],
        input='url=' + REPO_URL + '\n\n', capture_output=True, text=True,
        timeout=30, env=env, check=False)
    fields = dict(line.split('=', 1) for line in result.stdout.splitlines() if '=' in line)
    token = fields.get('credential') or fields.get('password')
    if result.returncode == 0 and token and fields.get('authtype', 'bearer').lower() == 'bearer':
        return 'Bearer ' + token
    return ''


@lru_cache(maxsize=1)
def authorization():
    """Keep secrets in process memory; never log them or put them in URLs."""
    token = os.environ.get('BLUEHEART_AZURE_TOKEN', '')
    pat = os.environ.get('AZURE_DEVOPS_EXT_PAT', '')
    if token and pat:
        raise ValueError('Configure only one Azure token environment variable')
    if token:
        value = 'Bearer ' + token
    elif pat:
        value = 'Basic ' + base64.b64encode((':' + pat).encode()).decode('ascii')
    else:
        value = ''
        git_binary = shutil.which('git')
        if git_binary:
            try:
                value = gcm_oauth(git_binary)
            except (OSError, subprocess.TimeoutExpired):
                pass
        az_binary = shutil.which('az')
        if not value and az_binary:
            try:
                result = subprocess.run(
                    [az_binary, 'account', 'get-access-token', '--resource', RESOURCE,
                     '--query', 'accessToken', '--output', 'tsv'],
                    capture_output=True, text=True, timeout=30, check=False)
                if result.returncode == 0 and result.stdout.strip():
                    value = 'Bearer ' + result.stdout.strip()
            except (OSError, subprocess.TimeoutExpired):
                pass
        if not value and git_binary:
            env = {**os.environ, 'GIT_TERMINAL_PROMPT': '0', 'GCM_INTERACTIVE': 'Never',
                   'GCM_AZREPOS_CREDENTIALTYPE': 'oauth', 'GCM_TRACE_SECRETS': '0'}
            try:
                result = subprocess.run([git_binary, 'credential', 'fill'],
                    input='url=' + REPO_URL + '\n\n', capture_output=True, text=True,
                    timeout=15, env=env, check=False)
                fields = dict(line.split('=', 1) for line in result.stdout.splitlines() if '=' in line)
                secret = fields.get('credential') or fields.get('password')
                if result.returncode == 0 and secret:
                    if fields.get('authtype', '').lower() == 'bearer':
                        value = 'Bearer ' + secret
                    elif not fields.get('authtype') or fields['authtype'].lower() == 'basic':
                        raw = (fields.get('username', '') + ':' + secret).encode()
                        value = 'Basic ' + base64.b64encode(raw).decode('ascii')
            except (OSError, subprocess.TimeoutExpired):
                pass
        if not value:
            raise AccessError('AUTH_UNAVAILABLE',
                'Azure authentication required after checking Git Credential Manager OAuth, '
                'Azure CLI and configured tokens. Check the trusted local copy of the requested commit '
                'before blocking source consumption. Authentication stays in the official sign-in tools.')
    if '\r' in value or '\n' in value:
        raise ValueError('Invalid Azure credential')
    return value


def request(url, limit=16 * 1024 * 1024):
    parsed = urlsplit(url)
    api_path = urlsplit(API).path
    if (parsed.scheme != 'https' or parsed.netloc != 'dev.azure.com'
            or not (parsed.path == api_path or parsed.path.startswith(api_path + '/'))):
        raise ValueError('Unexpected Azure origin')
    req = Request(url, headers={'User-Agent': 'BlueHeart-Azure-Workflow',
                  'Authorization': authorization(), 'Cache-Control': 'no-cache',
                  'X-TFS-FedAuthRedirect': 'Suppress'})
    try:
        with build_opener(shared.NoRedirect).open(req, timeout=45) as response:
            if response.status != 200:
                raise ValueError('Azure did not return HTTP 200; check repository access')
            if 'text/html' in response.headers.get('Content-Type', '').lower():
                raise ValueError('Azure returned a sign-in page instead of repository content')
            data = response.read(limit + 1)
    except HTTPError as error:
        code = 'AUTH_REJECTED' if error.code == 401 else 'ACCESS_DENIED' if error.code == 403 else 'HTTP_ERROR'
        raise AccessError(code, 'Azure HTTP ' + str(error.code) + '; check authentication and repository permissions') from None
    except URLError as error:
        denied = 'no rule allows host' in str(error.reason).lower()
        code = 'NETWORK_POLICY_DENIED' if denied else 'NETWORK_UNAVAILABLE'
        raise AccessError(code, 'Azure network access is restricted by the environment' if denied
                          else 'Azure network request failed; authentication validity is not established') from None
    if len(data) > limit:
        raise ValueError('Azure response exceeds limit')
    return data


class AzureDevOps:
    session_file = 'assets/azure-session.json'
    repository = REPO_URL
    delivery = 'azure-direct-v1'
    engine = 'AZURE'
    identity_prefix = 'azure-'
    shared = (*shared.SHARED, 'scripts/azure_workflow.py')

    def __init__(self, commit=None, get=None):
        self.get = get or request
        self.requests = 0
        self.bytes = 0
        if commit is None:
            branch = self.api('').get('defaultBranch')
            if not isinstance(branch, str) or not branch.startswith('refs/heads/'):
                raise ValueError('Azure repository has no default branch')
            rows = self.api('/refs', filter=branch.removeprefix('refs/'))['value']
            matches = [row for row in rows if row.get('name') == branch]
            if len(matches) != 1:
                raise ValueError('Azure default branch is missing or ambiguous')
            commit = matches[0]['objectId']
        if not isinstance(commit, str) or not shared.SHA.fullmatch(commit) or commit == '0' * 40:
            raise ValueError('Expected immutable Azure commit')
        self.commit = commit

    def read(self, url):
        data = self.get(url)
        self.requests += 1
        self.bytes += len(data)
        return data

    def api_url(self, endpoint, **params):
        return API + endpoint + '?' + urlencode({'api-version': '7.1', **params})

    def api(self, endpoint, **params):
        return json.loads(self.read(self.api_url(endpoint, **params)))

    def version(self):
        return {'versionDescriptor.version': self.commit, 'versionDescriptor.versionType': 'commit'}

    def url(self, path):
        return self.api_url('/items', path='/' + shared.relative(path), download='true', **self.version())

    def raw(self, path):
        return self.read(self.url(path))

    def workflow_files(self, skill):
        path = '/workflows/skills/' + skill
        item = self.api('/items', path=path, **{'$format': 'json', **self.version()})
        if item.get('gitObjectType') != 'tree' or not shared.SHA.fullmatch(item.get('objectId', '')):
            raise ValueError('Azure workflow directory is missing')
        tree = self.api('/trees/' + item['objectId'], recursive='true')
        if tree.get('truncated') or tree.get('objectId') != item['objectId']:
            raise ValueError('Incomplete Azure workflow tree')
        files = {}
        for row in tree['treeEntries']:
            if row['gitObjectType'] == 'tree':
                continue
            if row['gitObjectType'] != 'blob' or str(row['mode']) != '100644':
                raise ValueError('Unsupported Azure workflow member')
            name = shared.relative(row['relativePath'])
            if not shared.SHA.fullmatch(row['objectId']) or name in files:
                raise ValueError('Invalid Azure workflow tree entry')
            if not name.startswith('scripts/test-'):
                files[name] = row['objectId']
        if 'WORKFLOW.md' not in files:
            raise ValueError('Missing Azure workflow')
        return files


class LocalAzureTransport:
    """Read immutable Git objects from an explicitly supplied trusted Azure clone."""
    def __init__(self, repository, commit):
        if not isinstance(commit, str) or not shared.SHA.fullmatch(commit) or commit == '0' * 40:
            raise AccessError('COMMIT_REQUIRED', 'A trusted local copy requires the exact requested commit SHA')
        self.repository = Path(repository).resolve(strict=True)
        self.commit = commit
        self.cache = {}
        self.trees = {}
        self.reads = 0
        self.bytes = 0
        if self.git('cat-file', '-t', commit).strip() != b'commit':
            raise AccessError('LOCAL_COMMIT_MISSING', 'The requested SHA is not a local commit')
        remotes = self.git('remote').decode().splitlines()
        if not any(self.azure_origin(self.git('remote', 'get-url', name).decode().strip()) for name in remotes):
            raise AccessError('LOCAL_ORIGIN_MISMATCH', 'The local copy must identify the same Azure repository')

    @staticmethod
    def azure_origin(url):
        expected = '/' + ORGANIZATION + '/' + PROJECT + '/_git/' + REPOSITORY
        parsed = urlsplit(url)
        if parsed.scheme == 'https' and parsed.hostname == 'dev.azure.com' and not parsed.password:
            return unquote(parsed.path).rstrip('/') == unquote(expected)
        prefix = 'git@ssh.dev.azure.com:v3/'
        return url.startswith(prefix) and unquote(url[len(prefix):]).rstrip('/') == (
            ORGANIZATION + '/' + unquote(PROJECT) + '/' + REPOSITORY)

    def git(self, *args):
        env = {**os.environ, 'GIT_TERMINAL_PROMPT': '0', 'GIT_NO_LAZY_FETCH': '1',
               'GIT_NO_REPLACE_OBJECTS': '1'}
        try:
            return subprocess.run(['git', '-c', 'protocol.allow=never', '--no-replace-objects', '-C', str(self.repository), *args],
                capture_output=True, timeout=30, check=True, env=env).stdout
        except (OSError, subprocess.SubprocessError):
            raise AccessError('LOCAL_GIT_UNAVAILABLE',
                'The requested Git object is unavailable in the supplied local copy') from None

    def raw(self, path):
        shared.relative(path)
        if path not in self.cache:
            self.cache[path] = self.git('cat-file', 'blob', self.commit + ':' + path)
            self.reads += 1
            self.bytes += len(self.cache[path])
        return self.cache[path]

    def workflow_files(self, skill):
        path = 'workflows/skills/' + skill
        object_id = self.git('rev-parse', self.commit + ':' + path).decode().strip()
        if self.git('cat-file', '-t', object_id).strip() != b'tree':
            raise ValueError('Local workflow directory is not a tree')
        rows = []
        for entry in self.git('ls-tree', '-r', '-z', object_id).split(b'\0'):
            if not entry:
                continue
            metadata, name = entry.split(b'\t', 1)
            mode, kind, oid = metadata.decode().split()
            relative = shared.relative(name.decode())
            if mode != '100644' or kind != 'blob':
                raise ValueError('Unsupported local workflow member')
            rows.append({'mode': mode, 'gitObjectType': kind, 'objectId': oid,
                         'relativePath': relative})
        if not any(row['relativePath'] == 'WORKFLOW.md' for row in rows):
            raise ValueError('Local workflow is missing')
        self.trees[object_id] = rows
        return object_id

    def __call__(self, url):
        parsed = urlsplit(url)
        base = urlsplit(API)
        if parsed.scheme != base.scheme or parsed.netloc != base.netloc:
            raise ValueError('Unexpected local Azure origin')
        from urllib.parse import parse_qs
        query = parse_qs(parsed.query)
        if parsed.path == base.path + '/items':
            if query.get('versionDescriptor.version') != [self.commit] or query.get('versionDescriptor.versionType') != ['commit']:
                raise ValueError('Local source must use the exact requested commit')
            path = query['path'][0].removeprefix('/')
            if query.get('$format') == ['json']:
                prefix = 'workflows/skills/'
                if not path.startswith(prefix) or path[len(prefix):] not in shared.SKILLS:
                    raise ValueError('Unexpected local workflow directory')
                return shared.encoded({'gitObjectType': 'tree',
                    'objectId': self.workflow_files(path[len(prefix):])})
            return self.raw(path)
        prefix = base.path + '/trees/'
        if parsed.path.startswith(prefix) and parsed.path[len(prefix):] in self.trees:
            object_id = parsed.path[len(prefix):]
            return shared.encoded({'objectId': object_id, 'treeEntries': self.trees[object_id],
                                   'truncated': False})
        raise ValueError('Unexpected local Azure request')

    def verify(self):
        pointer = json.loads(self.raw('catalog/current.json'))
        identity = pointer['manifest_sha256']
        if pointer.get('schema_version') != 1 or pointer.get('manifest') != 'catalog/releases/' + identity + '/manifest.json':
            raise ValueError('Unsupported local catalog identity')
        raw = self.raw(shared.relative(pointer['manifest']))
        manifest = json.loads(raw)
        canonical = json.dumps(manifest['files'], sort_keys=True, separators=(',', ':'), ensure_ascii=False).encode()
        if shared.sha(raw) != identity or shared.sha(canonical) != manifest['ds_digest'] or pointer['ds_digest'] != manifest['ds_digest']:
            raise ValueError('Local catalog integrity failure')
        for path, expected in manifest['files'].items():
            if shared.sha(self.raw(path)) != expected:
                raise ValueError('Local source integrity failure: ' + path)
        for skill in shared.SKILLS:
            oid = self.workflow_files(skill)
            for row in self.trees[oid]:
                data = self.raw('workflows/skills/' + skill + '/' + row['relativePath'])
                blob = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
                if blob != row['objectId']:
                    raise ValueError('Local workflow integrity failure')
        for path in AzureDevOps.shared:
            self.raw(path)
        return {'status': 'PASS', 'repository': REPO_URL, 'commit': self.commit,
                'manifest_sha256': identity, 'ds_digest': manifest['ds_digest'],
                'files_verified': len(manifest['files'])}


def diagnose(commit=None, repository=None):
    if commit is not None and (not shared.SHA.fullmatch(commit) or commit == '0' * 40):
        raise ValueError('Use the full requested commit SHA')
    try:
        client = AzureDevOps(commit)
        if client.api('/commits/' + client.commit).get('commitId') != client.commit:
            raise ValueError('Azure did not confirm the requested commit')
        remote = {'status': 'PASS', 'commit': client.commit}
    except (OSError, ValueError, KeyError, TypeError) as error:
        remote = {'status': 'BLOCKED', 'code': getattr(error, 'code', 'REMOTE_CHECK_FAILED'),
                  'detail': str(error)}
    pinned = commit or remote.get('commit')
    local = {'status': 'NOT_PROVIDED', 'detail': 'No trusted local repository path was supplied'}
    if repository is not None:
        try:
            local = LocalAzureTransport(repository, pinned).verify()
        except (OSError, ValueError, KeyError, TypeError) as error:
            local = {'status': 'BLOCKED', 'code': getattr(error, 'code', 'LOCAL_CHECK_FAILED'),
                     'detail': str(error)}
    ready = 'REMOTE' if remote['status'] == 'PASS' else 'LOCAL_GIT' if local['status'] == 'PASS' else None
    return {'status': 'PASS' if ready else 'BLOCKED', 'repository': REPO_URL,
            'commit': pinned, 'selected_source': ready, 'remote': remote, 'local': local,
            'commit_required': repository is not None and pinned is None,
            'credential_values_logged': False}


def start(skill, output, commit=None, get=None, repository=None):
    # Installed Azure names are distinct; workflow directories remain shared.
    # Accept old entrypoints so previously distributed launchers still start.
    if skill in SKILLS:
        skill = skill.removeprefix('azure-')
    if repository is not None:
        local = LocalAzureTransport(repository, commit)
        verified = local.verify()
        output = Path(output).absolute()
        if output.exists() or output.is_symlink():
            raise ValueError('Use a new work session folder')
        output.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(prefix='.azure-local-', dir=output.parent) as directory:
            runtime = Path(directory) / 'runtime'
            result = shared.start(skill, runtime, commit, local, client_type=AzureDevOps)
            manifest = json.loads((runtime / 'assets/snapshot-manifest.json').read_bytes())
            for path in manifest['files']:
                shared.source(runtime, path, local)
            receipt = {'source_mode': 'LOCAL_GIT', 'offline_fallback': True,
                       'local_verification': verified}
            for path in (AzureDevOps.session_file, 'assets/release.json'):
                shared.write(runtime, path, shared.encoded({**json.loads((runtime / path).read_bytes()), **receipt}))
            if output.exists() or output.is_symlink():
                raise ValueError('Output appeared during local verification')
            runtime.rename(output)
        return {**result, **receipt, 'runtime': str(output), 'network': {'requests': 0, 'bytes': 0},
                'local_reads': {'objects': local.reads, 'bytes': local.bytes}}
    return shared.start(skill, output, commit, get, client_type=AzureDevOps)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='action', required=True)
    commands.add_parser('head')
    diagnosis = commands.add_parser('diagnose')
    diagnosis.add_argument('--commit')
    diagnosis.add_argument('--repository', type=Path, help='Trusted local Azure clone for the same commit')
    new = commands.add_parser('start')
    new.add_argument('--skill', choices=(*SKILLS, *shared.SKILLS), required=True)
    new.add_argument('--output', type=Path, required=True)
    new.add_argument('--commit')
    new.add_argument('--repository', type=Path, help='Use a verified local copy of this exact commit')
    fetch = commands.add_parser('read')
    fetch.add_argument('--runtime', type=Path, required=True)
    fetch.add_argument('--path', required=True)
    web = commands.add_parser('web')
    web.add_argument('--runtime', type=Path, required=True)
    args = parser.parse_args()
    try:
        if args.action == 'diagnose':
            result = diagnose(args.commit, args.repository)
        elif args.action == 'head':
            client = AzureDevOps()
            result = {'status': 'PASS', 'repository': REPO_URL, 'commit': client.commit}
        elif args.action == 'start':
            result = start(args.skill, args.output, args.commit, repository=args.repository)
        else:
            # Explicitly reject a session from another provider.
            if not (args.runtime / AzureDevOps.session_file).is_file():
                raise ValueError('Expected Azure runtime')
            if args.action == 'web':
                result = shared.materialize_web(args.runtime)
            else:
                data = shared.source(args.runtime, args.path)
                result = {'status': 'PASS', 'path': args.path, 'sha256': shared.sha(data), 'text': data.decode('utf-8')}
    except (OSError, ValueError, KeyError, TypeError, StopIteration) as error:
        result = {'status': 'BLOCKED', 'error': str(error), 'offline_fallback': False}
    print(json.dumps(result, ensure_ascii=False))
    return int(result['status'] == 'BLOCKED')


if __name__ == '__main__':
    raise SystemExit(main())
