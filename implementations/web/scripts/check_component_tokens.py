"""Check component references against the canonical token manifest used in the build."""
import json
import re

REFERENCE = re.compile(r'(--[A-Za-z][\w-]*)(\$\{)?')


def check_component_tokens(web, output):
    manifest = json.loads(output['src/generated/tokens.manifest.json'])
    layers = {token['css']: token['collection'] for token in manifest['tokens']}
    paths = sorted((web / 'src/components').rglob('*'))
    sources = {'src/styles.css': (web / 'src/styles.css').read_text()}
    sources.update({str(path.relative_to(web)): path.read_text() for path in paths
                    if path.suffix in {'.css', '.ts', '.tsx', '.js', '.jsx'}})
    sources.update({name: content for name, content in output.items()
                    if name.startswith('src/generated/') and '-recipes.' in name})
    non_component = sorted(token for token, layer in layers.items() if layer != 'component')
    failures = []
    for name, source in sources.items():
        for line_number, line in enumerate(source.splitlines(), 1):
            for match in REFERENCE.finditer(line):
                token, interpolated = match.groups()
                if interpolated:
                    if any(candidate.startswith(token) for candidate in non_component):
                        failures.append(f'{name}:{line_number} prefijo ambiguo {token}')
                elif token in non_component:
                    failures.append(f'{name}:{line_number} {token} ({layers[token]})')
    if failures:
        raise ValueError('Consumo directo fuera de component:\n' + '\n'.join(failures))
    return len(sources)
