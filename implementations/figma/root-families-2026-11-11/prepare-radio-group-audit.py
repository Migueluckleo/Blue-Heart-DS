import contextlib
import io
import json
from pathlib import Path

here = Path(__file__).resolve().parent
captured = io.StringIO()
with contextlib.redirect_stdout(captured):
    exec((here / 'prepare-radio-group.py').read_text(), {'__file__': __file__})
data = json.loads(captured.getvalue().splitlines()[0].removeprefix('const DATA = ').removesuffix(';'))
data.update(json.loads((here / 'radio-group.mutation.json').read_text()))
print('const DATA = ' + json.dumps(data, separators=(',', ':')) + ';')
print((here / 'audit-radio-group.js').read_text())
