"""Process-scoped, content-keyed reuse and an OS-owned repository writer lock.

No cached result survives a source fingerprint change. Published evidence still
passes the existing integrity gates. The lock file is never unlinked (inode race).
"""
from __future__ import annotations
from contextlib import contextmanager
from contextvars import ContextVar
from copy import deepcopy
from functools import wraps
import hashlib
import json
import os
import inspect
from pathlib import Path
import time

ACTIVE = ContextVar('ds_session', default=None)
HELD = ContextVar('ds_locks', default=frozenset())
SKIP = {'.git', 'node_modules', '.next', '.pnpm-store', '__pycache__',
        'graphify-out', 'output', 'catalog', 'tmp', '.codex-build', '.codex-finalizer'}


class Busy(RuntimeError):
    pass


@contextmanager
def writer_lock(root, owner):
    import fcntl
    root = Path(root).resolve()
    key = str(root)
    if key in HELD.get():
        yield
        return
    directory = root / 'graphify-out'
    directory.mkdir(parents=True, exist_ok=True)
    path = directory / '.ds-writer.lock'
    with path.open('a+') as handle:
        try:
            fcntl.flock(handle, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            handle.seek(0)
            detail = handle.read(2048)
            events = root / 'output/closures/contention.jsonl'
            events.parent.mkdir(parents=True, exist_ok=True)
            with events.open('a') as log:
                log.write(json.dumps({'time': time.time(), 'requester': owner,
                                      'holder': detail, 'status': 'BUSY'}) + '\n')
            raise Busy('Cierre activo; reutiliza su resultado. ' + detail)
        handle.seek(0)
        handle.truncate()
        handle.write(json.dumps({'pid': os.getpid(), 'owner': owner, 'started': time.time()}))
        handle.flush()
        token = HELD.set(HELD.get() | {key})
        try:
            yield
        finally:
            HELD.reset(token)
            fcntl.flock(handle, fcntl.LOCK_UN)


class Session:
    def __init__(self, root):
        self.root = Path(root).resolve()
        self.files = {}
        self.cache = {}
        self.counts = {}
        self.hash_reads = 0
        self.initial = None

    def fingerprint(self, force=False):
        current = {}
        for directory, dirs, names in os.walk(self.root, followlinks=False):
            base = Path(directory)
            dirs[:] = sorted(d for d in dirs if d not in SKIP and not (base / d).is_symlink()
                             and (base / d).relative_to(self.root).as_posix() not in {
                                 'registry/generated', 'implementations/web/out',
                                 'implementations/web/test-results', 'implementations/web/playwright-report'})
            for name in sorted(names):
                p = base / name
                if name in {'.DS_Store', 'next-env.d.ts'} or name.endswith(('.pyc', '.tmp', '.tsbuildinfo')):
                    continue
                rel = p.relative_to(self.root).as_posix()
                st = p.lstat()
                sig = (st.st_ino, st.st_size, st.st_mtime_ns, st.st_ctime_ns, st.st_mode)
                old = self.files.get(rel)
                if force or old is None or old[0] != sig:
                    data = os.readlink(p).encode() if p.is_symlink() else p.read_bytes()
                    value = hashlib.sha256(data).hexdigest()
                    self.hash_reads += 1
                else:
                    value = old[1]
                current[rel] = (sig, value)
        self.files = current
        return hashlib.sha256(json.dumps({p: v[1] for p, v in sorted(current.items())},
                                         sort_keys=True).encode()).hexdigest()

    def __enter__(self):
        self.initial = self.fingerprint(force=True)
        self.token = ACTIVE.set(self)
        return self

    def verify(self):
        if self.fingerprint(force=True) != self.initial:
            raise ValueError('Fuentes cambiaron durante el cierre; no declarar CURRENT. Reanudar con un corte nuevo.')

    def __exit__(self, *exc):
        ACTIVE.reset(self.token)

    def call(self, namespace, key, fn):
        entry = (namespace, key)
        counter = self.counts.setdefault(namespace, {'executed': 0, 'reused': 0})
        if entry not in self.cache:
            self.cache[entry] = deepcopy(fn())
            counter['executed'] += 1
        else:
            counter['reused'] += 1
        return deepcopy(self.cache[entry])


def cached(fn):
    """Reuse within one command, keyed by actual sources and function arguments."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        session = ACTIVE.get()
        if session is None:
            return fn(*args, **kwargs)
        key = (session.fingerprint(), json.dumps([args, kwargs], sort_keys=True, default=str))
        return session.call(fn.__module__ + '.' + fn.__name__, key, lambda: fn(*args, **kwargs))
    return wrapper


def coordinated(fn):
    """All legacy writers participate in the same lock as `ds close`."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        bound = inspect.signature(fn).bind(*args, **kwargs)
        bound.apply_defaults()
        root = bound.arguments.get('root', fn.__globals__.get('ROOT'))
        with writer_lock(root, fn.__module__ + '.' + fn.__name__):
            return fn(*args, **kwargs)
    return wrapper
