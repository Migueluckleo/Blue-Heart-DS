#!/usr/bin/env python3
"""Build/check the versioned Azure skill channel without installation."""
from __future__ import annotations
import argparse
import json
import os
from pathlib import Path
import shutil
import tempfile

from ds_core import ROOT
from ds_session import writer_lock
from ds_skills import SEMVER, compact, digest, encoded, inspect_tree, safe, zip_bytes


def expected(root):
    config = json.loads(safe(root, 'config/azure-consumption.json').read_bytes())
    if config.get('schema_version') != 1 or not SEMVER.fullmatch(config.get('version', '')) or config.get('delivery') != 'azure-direct-v1':
        raise ValueError('Unsupported Azure launcher channel')
    if set(config['skills']) != {'azure-contpaqi-figma-screens', 'azure-contpaqi-po-prototypes'} or len(config['skills']) != 2:
        raise ValueError('Both companion launchers are required')
    files, packages, templates = {}, {}, {}
    for name in config['skills']:
        directory = safe(root, config['templates'] + '/' + name)
        entries = {}
        for path in directory.rglob('*'):
            relative = path.relative_to(directory).as_posix()
            safe(directory, relative)
            if path.is_file():
                entries[relative] = path.read_bytes()
        if set(entries) != {'SKILL.md'}:
            raise ValueError('Azure launcher must contain only SKILL.md: ' + name)
        for helper in ('azure_workflow.py', 'github_workflow.py'):
            entries['scripts/' + helper] = safe(root, 'scripts/' + helper).read_bytes()
        templates[name] = {p: digest(data) for p, data in entries.items()}
        archive_name = name + '-' + config['version'] + '.zip'
        archive = zip_bytes(name, entries)
        files.update({name + '/' + p: data for p, data in entries.items()})
        files[archive_name] = archive
        packages[name] = {'files': templates[name], 'archive': archive_name,
                          'sha256': digest(archive), 'bytes': len(archive)}
    fingerprint = {'config': config, 'templates': templates}
    manifest = {'schema_version': 1, 'version': config['version'], 'delivery': config['delivery'],
                'repository': config['repository'], 'branch': config['branch'], 'ds_digest': 'REMOTE',
                'input_digest': digest(compact(fingerprint)), 'packages': packages,
                'authority': 'Launcher packaging only; remote integration requires authenticated published sources'}
    files['manifest.json'] = encoded(manifest)
    pointer = {'schema_version': 1, 'version': config['version'],
               'manifest': config['version'] + '/manifest.json', 'manifest_sha256': digest(files['manifest.json'])}
    return config, files, pointer


def package(root=ROOT, *, check=False):
    root = Path(root).resolve()
    with writer_lock(root, 'azure-skills'):
        config, files, pointer = expected(root)
        out = safe(root, config['output'])
        target = safe(out, config['version'])
        current = out / 'current.json'
        if target.exists():
            errors = inspect_tree(target, files)
            if errors:
                raise ValueError('Immutable Azure release differs: ' + '; '.join(errors))
            operation = 'UNCHANGED'
        elif check:
            raise ValueError('Azure release is missing; run ds_azure.py build')
        else:
            out.mkdir(parents=True, exist_ok=True)
            stage = Path(tempfile.mkdtemp(prefix='.staging-azure-', dir=out))
            try:
                for name, data in files.items():
                    path = safe(stage, name)
                    path.parent.mkdir(parents=True, exist_ok=True)
                    path.write_bytes(data)
                if inspect_tree(stage, files):
                    raise ValueError('Azure staging failed integrity checks')
                if expected(root)[1] != files:
                    raise ValueError('Azure launcher sources changed during packaging')
                stage.rename(target)
            finally:
                if stage.exists():
                    shutil.rmtree(stage)
            operation = 'CREATED'
        if check:
            if not current.is_file() or json.loads(current.read_bytes()) != pointer:
                raise ValueError('Azure current.json differs from release manifest')
        else:
            temp = out / '.current.tmp'
            temp.write_bytes(encoded(pointer))
            os.replace(temp, current)
        return {'status': 'PASS', 'operation': 'CHECKED' if check else operation, 'version': config['version'],
                'delivery': config['delivery'], 'directory': str(target),
                'archives': [str(target / p) for p in files if p.endswith('.zip')],
                'remote_integration': 'NOT_RUN', 'installation': 'NOT_REQUESTED'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=('build', 'check'))
    args = parser.parse_args()
    try:
        result = package(check=args.action == 'check')
    except (OSError, ValueError, KeyError, TypeError) as error:
        result = {'status': 'BLOCKED', 'error': str(error)}
    print(json.dumps(result, ensure_ascii=False))
    return int(result['status'] != 'PASS')


if __name__ == '__main__':
    raise SystemExit(main())
