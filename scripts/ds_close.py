"""One resumable, measured local closure. Never commits, pushes or publishes remotely."""
from __future__ import annotations
import json
import os
from pathlib import Path
import time
from ds_core import ROOT, read_json, dump, corpus, paths_of, yaml_documents
from ds_core import generate_status, render_status, documentation_check
from ds_session import Session, writer_lock, Busy


def usage_observation(path):
    if path is None:
        return {'status': 'UNAVAILABLE', 'reason': 'No account usage observation supplied'}
    value = read_json(path)
    allowed = ('observed_at', 'source', 'limit_id', 'used_percent', 'window_minutes',
               'resets_at', 'scope', 'concurrent_activity')
    result = {k: value[k] for k in allowed if k in value}
    if not isinstance(result.get('used_percent'), (int, float)) or not 0 <= result['used_percent'] <= 100:
        raise ValueError('Invalid usage observation')
    result['scope'] = 'ACCOUNT_SHARED_NOT_TASK_ATTRIBUTABLE'
    return result


def close(args):
    import ds_graph
    # Validate before constructing any output path.
    ds_graph.run_path(args.run)
    path = ROOT / 'output/closures' / (args.run + '.json')
    prior = read_json(path) if path.exists() else {}
    report = {'schema_version': 1, 'run': args.run, 'status': 'RUNNING',
              'started': time.time(), 'invocations': prior.get('invocations', 0) + 1,
              'retry_attempts': prior.get('retry_attempts', 0) + int(prior.get('status') == 'BLOCKED'),
              'previous_attempts': prior.get('previous_attempts', []) +
                  ([{k: prior.get(k) for k in ('started', 'elapsed_seconds', 'status', 'phases')}] if prior else []),
              'phases': [], 'usage_start': prior.get('usage_start') or usage_observation(args.usage_start),
              'usage_end': usage_observation(args.usage_end),
              'agent_tokens': 'UNAVAILABLE', 'agent_tool_calls': 'UNAVAILABLE',
              'command_phase_calls': 0, 'publication': 'NOT_RUN'}

    def step(name, fn):
        started = time.monotonic()
        report['command_phase_calls'] += 1
        try:
            value = fn()
            if isinstance(value, dict) and value.get('status') in {'FAIL', 'FAILED', 'BLOCKED', 'STALE'}:
                raise ValueError(name + ': ' + json.dumps(value))
        except Exception as error:
            report['phases'].append({'name': name, 'seconds': round(time.monotonic() - started, 3),
                                     'status': 'BLOCKED', 'error': str(error)[:2000]})
            raise
        report['phases'].append({'name': name, 'seconds': round(time.monotonic() - started, 3),
                                 'status': 'PASS', 'result': value})
        dump(path, report)
        print(json.dumps({'milestone': name, 'status': 'PASS'}, ensure_ascii=False), flush=True)
        return value

    def documents(config):
        timings = {}
        def measured(name, fn):
            started = time.monotonic()
            value = fn()
            timings[name] = round(time.monotonic() - started, 3)
            return value
        detection = measured('inventory', lambda: corpus(config=config))
        paths = paths_of(detection)
        parsed = measured('metadata', lambda: yaml_documents(paths))
        state = measured('status', lambda: generate_status(parsed, paths, config))
        qa = measured('validation', lambda: documentation_check(parsed, paths, state, config))
        if qa['status'] != 'PASS':
            dump(path.with_suffix('.documents.json'), qa)
            raise ValueError('QA documental FAIL; ver comprobante documents.json')
        dump(ROOT / 'registry/generated/project-status.json', state)
        target = ROOT / 'registry/generated/project-status.md'
        text = render_status(state)
        if not target.exists() or target.read_text() != text:
            target.write_text(text)
        return {'status': 'PASS', 'files': len(paths), 'findings': len(qa['findings']), 'timings': timings}

    session = None
    try:
        with writer_lock(ROOT, args.run), Session(ROOT) as session:
            config = read_json(ROOT / 'config/ds-project.json')
            step('documents', lambda: documents(config))
            graph = step('graph_plan', lambda: ds_graph.prepare(config, args.run))
            if graph['status'] != 'CURRENT_NO_CHANGES':
                run = ds_graph.run_path(graph['run'])
                plan = read_json(run / 'semantic-plan.json')
                missing = [f'chunk-{i:02d}.json' for i in range(len(plan['chunks']))
                           if not (run / f'chunk-{i:02d}.json').exists()]
                if missing:
                    bump_option = '' if args.bump == 'patch' else ' --bump ' + args.bump
                    report.update(status='WAITING_FOR_SEMANTICS' if graph['status'] == 'PREPARED_SHARED'
                                  else 'NEEDS_SEMANTICS', graph_run=run.name, missing=missing,
                                  next_command='scripts/ds close --run ' + args.run + bump_option)
                    return report
                step('graph', lambda: ds_graph.close(config, run.name))
            import ds_consumption, ds_remote, ds_skills
            def consumption():
                try:
                    return {'status': 'CURRENT', 'operation': 'REUSED',
                            'bytes': len(ds_consumption.prepared(ROOT))}
                except (OSError, ValueError, KeyError):
                    return ds_consumption.prepare(ROOT)
            step('consumption', consumption)
            def catalog():
                result = ds_remote.check_catalog(ROOT)
                if result['status'] == 'CURRENT':
                    return {**result, 'operation': 'REUSED'}
                return ds_remote.build(ROOT)
            step('catalog', catalog)
            # sync already exports immutable ZIPs; a second export repeats sync.
            step('skills_sync_export', lambda: ds_skills.sync(ROOT, bump=args.bump))
            step('skills_integrity', lambda: ds_skills.check(ROOT))
            if args.install:
                step('installation', lambda: ds_skills.install(ROOT))
            else:
                report['installation'] = 'NOT_REQUESTED; portable packages verified'
            metadata = yaml_documents(sorted(ds_skills.source_inputs(ROOT)['files']), ROOT)
            report['publication_holds'] = [p for p, row in metadata.items()
                if isinstance(row.get('value'), dict)
                and str(row['value'].get('publication_policy', '')).startswith('HOLD')]
            step('source_integrity', lambda: (session.verify() or {'status': 'PASS'}))
            step('graph_integrity', lambda: ds_graph.check_graph(config))
            report.update(status='COMPLETE_LOCAL', reuse=session.counts,
                          hash_reads=session.hash_reads, source_fingerprint=session.initial)
    except Busy as error:
        report.update(status='BUSY', error=str(error))
    except Exception as error:
        report.update(status='BLOCKED', error=str(error)[:2000])
    finally:
        report['elapsed_seconds'] = round(time.time() - report['started'], 3)
        report['concurrent_attempts'] = 0
        events = ROOT / 'output/closures/contention.jsonl'
        if events.exists():
            for line in events.read_text().splitlines():
                try:
                    report['concurrent_attempts'] += int(json.loads(line)['time'] >= report['started'])
                except (ValueError, KeyError):
                    continue
        if session is not None:
            report.update(reuse=session.counts, hash_reads=session.hash_reads)
        if report['status'] == 'BUSY':
            path = path.with_name(args.run + '.busy-' + str(os.getpid()) + '-' + str(time.time_ns()) + '.json')
        dump(path, report)
    return report


def dispatch(args):
    result = close(args)
    print(json.dumps({k: result[k] for k in ('status', 'run', 'graph_run', 'missing', 'next_command',
                                            'elapsed_seconds', 'error') if k in result}, ensure_ascii=False))
    return 0 if result['status'] == 'COMPLETE_LOCAL' else 75 if result['status'] == 'BUSY' else 2


def record_metrics(args):
    from ds_graph import run_path
    run_path(args.run)
    path = ROOT / 'output/closures' / (args.run + '.json')
    with writer_lock(ROOT, 'metrics:' + args.run):
        record = read_json(path)
        record['usage_end'] = usage_observation(args.usage_end)
        start, end = record.get('usage_start', {}), record['usage_end']
        comparable = all(start.get(k) == end.get(k) and start.get(k) is not None
                         for k in ('limit_id', 'window_minutes', 'resets_at'))
        record['account_usage_delta_percentage_points'] = (
            end['used_percent'] - start['used_percent']
            if comparable and isinstance(start.get('used_percent'), (int, float)) else None)
        record['usage_attribution'] = 'ACCOUNT_SHARED; not exclusive task consumption; concurrent activity may contribute'
        dump(path, record)
    print(json.dumps({'status': 'RECORDED', 'run': args.run,
                      'account_delta': record['account_usage_delta_percentage_points']}))
    return 0
