import importlib.util
from pathlib import Path
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from ds_skills import release_version


class ReleaseLineTests(unittest.TestCase):
    def test_continues_one_zero_history_without_overwriting_one_one(self):
        with tempfile.TemporaryDirectory() as folder:
            out = Path(folder)
            for version in ['1.0.8', '1.0.9', '1.1.0', '1.1.1', '.staging-x']:
                (out / version).mkdir()
            self.assertEqual(release_version({'release_line': '1.0'}, {'version': '1.1.1'}, out, 'patch'), '1.0.10')
            (out / '1.0.10').mkdir()
            self.assertEqual(release_version({'release_line': '1.0'}, {'version': '1.0.10'}, out, 'patch'), '1.0.11')
            with self.assertRaises(ValueError):
                release_version({'release_line': '1.0'}, {'version': '1.0.10'}, out, 'minor')


if __name__ == '__main__':
    unittest.main()
