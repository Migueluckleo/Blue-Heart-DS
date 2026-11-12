import json
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from ds_core import corpus, paths_of
from ds_graph import runtime_gate


class BootstrapTests(unittest.TestCase):
    def test_runtime_and_corpus_isolation(self):
        config = json.loads((ROOT / 'config/ds-project.json').read_text())
        runtime_gate(config)
        files = paths_of(corpus(config=config))
        self.assertEqual(sum(path.startswith('protocols/') for path in files), 9)
        self.assertFalse(any(path.startswith(('graphify-out/', 'catalog/', 'output/')) for path in files))

    def test_source_and_destination_are_distinct(self):
        roles = json.loads((ROOT / 'config/figma-links.json').read_text())
        self.assertEqual(roles['root_source']['role'], 'READ_ONLY_SOURCE')
        self.assertNotEqual(roles['root_source']['file_key'], roles['master_destination']['file_key'])
        self.assertIsNone(roles['master_destination']['default_page_id'])
