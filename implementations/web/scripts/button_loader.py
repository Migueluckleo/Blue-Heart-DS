"""Project web recipes from the same data used by the Figma reconstruction."""
import json
from tokens import ROOT


def build_recipes():
    result = {}
    for slug in ('buttons', 'loader'):
        data = json.loads((ROOT / f'specs/data/{slug}.v1.0.0.json').read_text())
        def css(fields):
            return {key: data['tokens'][identity]['css'] for key, identity in fields.items()}
        if slug == 'buttons':
            rows = {}
            for group in data['sets']:
                for variant in group['variants']:
                    key = f'{group["kind"]}/{variant["size"]}/{variant["state"]}'
                    parts = {p['name']: p for p in variant['children']}
                    label = parts['Label']
                    icons = [parts[n] for n in ('Left icon', 'Right icon') if n in parts]
                    focus = parts.get('Focus ring')
                    loader = parts.get('Loader')
                    rows[key] = {'root': css(variant['b']), 'label': css(label['b']),
                                 'icons': [{'size': css(icon['b'])['width'], 'color': css(icon['vector'])['fills']} for icon in icons],
                                 'focus': css(focus['b']) if focus else None,
                                 'loader': loader['main'] if loader else None,
                                 'underline': label['font'][4] == 'UNDERLINE'}
        else:
            rows = {}
            for v in data['sets'][-1]['variants']:
                size, color = [f.split('=')[1] for f in v['name'].split(', ')]
                track, arc = v['children']
                assert track['name'] == 'Track' and arc['name'] == 'Arc'
                rows[f'{size}/{color}'] = {'id': v['id'], 'diameter': css(v['b'])['width'],
                                            'weight': css(arc['b'])['strokeWeight'],
                                            'track': css(track['b'])['strokes'], 'arc': css(arc['b'])['strokes'],
                                            'trackOpacity': round(track['opacity'], 4)}
        result[f'src/generated/{slug}-recipes.json'] = json.dumps(rows, indent=2, ensure_ascii=False) + '\n'
    return result
