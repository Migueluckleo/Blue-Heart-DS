"""Publication gates must still reject invalid data with Python optimization."""
import importlib.util
from pathlib import Path
import subprocess
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]


@unittest.skipUnless(importlib.util.find_spec('graphify'), 'Requires the registered Graphify runtime')
class OptimizedGraphGatesTests(unittest.TestCase):
    def run_gate(self, body):
        setup = """
import json, sys, tempfile
from pathlib import Path
sys.path.insert(0, 'scripts')
import ds_graph_engine as engine
with tempfile.TemporaryDirectory(prefix='security-optimized-graph-') as temporary:
    run = Path(temporary)
    engine.initialize(run)
"""
        code = setup + '\n'.join('    ' + line for line in body.splitlines())
        result = subprocess.run([sys.executable, '-O', '-B', '-c', code], cwd=ROOT,
                                capture_output=True, text=True, timeout=30)
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_missing_semantic_coverage_blocks_optimized_assembly(self):
        self.run_gate("""engine.dump(run / 'detection.json', {'files': {'code': []}})
engine.dump(run / 'semantic-plan.json', {'chunks': [[str(engine.ROOT / 'README.md')]]})
engine.dump(run / 'chunk-00.json', {'nodes': [], 'edges': [], 'hyperedges': []})
try:
    engine.assemble()
except ValueError as error:
    if 'Incomplete semantic coverage' not in str(error): raise
else:
    raise RuntimeError('Missing coverage was accepted under -O')""")

    def test_failed_verification_blocks_optimized_manifest_publication(self):
        self.run_gate("""engine.dump(run / 'detection.json', {'files': {}})
engine.dump(run / 'semantic-plan.json', {'chunks': []})
engine.dump(engine.OUT / 'graph.json', {})
engine.dump(run / 'verification.json', {'status': 'FAIL'})
try:
    engine.manifest()
except ValueError as error:
    if 'without PASS verification' not in str(error): raise
else:
    raise RuntimeError('FAIL verification was accepted under -O')
if (engine.OUT / 'manifest.json').exists():
    raise RuntimeError('Rejected graph published a manifest')""")


if __name__ == '__main__':
    unittest.main()
