"""Política de selectores delegada: solo component/body/ tiene scopes públicos."""
COMPATIBLE = {
    'COLOR': {'FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL', 'STROKE_COLOR', 'EFFECT_COLOR'},
    'FLOAT': {'CORNER_RADIUS', 'WIDTH_HEIGHT', 'GAP', 'STROKE_FLOAT', 'EFFECT_FLOAT',
              'OPACITY', 'FONT_WEIGHT', 'FONT_SIZE', 'LINE_HEIGHT', 'LETTER_SPACING',
              'PARAGRAPH_SPACING', 'PARAGRAPH_INDENT'},
    'STRING': {'TEXT_CONTENT', 'FONT_FAMILY', 'FONT_STYLE'},
    'BOOLEAN': set(),
}


def desired_scopes(collection, name, resolved_type, policy):
    if policy['collection'] != 'component' or policy['namePrefix'] != 'body/' or policy['defaultScopes'] != []:
        raise ValueError('La interfaz pública debe ser exclusivamente component/body/')
    if collection != 'component' or not name.startswith('body/'):
        return []
    matches = [t for t in policy['bodyTokens'] if t['name'] == name]
    if len(matches) != 1:
        raise ValueError('Body requiere una declaración única de scopes por función: ' + name)
    token = matches[0]
    scopes = token['scopes']
    if token['resolvedType'] != resolved_type or not scopes or len(scopes) != len(set(scopes)):
        raise ValueError('Tipo/scopes Body inválidos: ' + name)
    if not set(scopes) <= COMPATIBLE.get(resolved_type, set()):
        raise ValueError('Scope incompatible o general: ' + name)
    return list(scopes)


def apply_visibility(tokens, policy, source):
    declared = [t['name'] for t in policy['bodyTokens']]
    actual = {name for collection, name in tokens if collection == 'component' and name.startswith('body/')}
    if len(declared) != len(set(declared)) or set(declared) != actual:
        raise ValueError('Inventario Body distinto a la política de scopes')
    for (collection, name), token in tokens.items():
        token['scopes'] = desired_scopes(collection, name, token['resolvedType'], policy)
        token.setdefault('amendments', []).append(source)
