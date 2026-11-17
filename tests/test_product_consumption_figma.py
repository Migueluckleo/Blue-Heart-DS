import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from consumer_graph import canonical, sha

spec = importlib.util.spec_from_file_location('consumption_figma', ROOT / 'workflows/skills/contpaqi-figma-screens/scripts/verify_figma_usage.py')
gate = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gate)


class ConsumptionTests(unittest.TestCase):
    """Synthetic, isolated preflight/readback cases. No claim of live Figma QA."""
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='figma-consumption-test-')
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.runtime = self.base / 'runtime'
        self.components = []
        texts = {}
        for i, (family, name) in enumerate([('APP-SHELL-001', 'AppShell'), ('BUTTON-001', 'Button'), ('LINEAR-PROGRESS-001', 'LinearProgress')]):
            path = 'specs/components/' + family.lower() + '.contract.v1.0.0.md'
            texts[path] = f'---\ncontract_id: {family}\nstatus: DELEGATED_FOR_BUILD\n---\n# {name}\n'.encode()
            self.components.append({'id': family, 'name': name, 'slug': name, 'exports': [name], 'contract': path, 'amendments': []})
        for path in ['config/figma-links.json', 'specs/foundations/product-consumption.contract.v1.0.0.md', 'specs/policies/product-consumption.v1.0.0.json', 'specs/tokens/body.v1.0.0.json']:
            texts[path] = (ROOT / path).read_bytes()
        files = {p: sha(b) for p, b in texts.items()}
        manifest = {'schema_version': 1, 'components': self.components, 'files': files, 'ds_digest': sha(canonical(files))}
        raw = json.dumps(manifest).encode()
        for path, data in texts.items():
            self.write('runtime/assets/design-system/' + path, data)
        self.write('runtime/assets/snapshot-manifest.json', raw)
        self.write('runtime/assets/remote-receipt.json', json.dumps({'manifest_sha256': sha(raw), 'ds_digest': manifest['ds_digest']}).encode())
        master = json.loads(texts['config/figma-links.json'])['master_destination']['file_key']
        self.sources = []
        self.uses = []
        for i, component in enumerate(self.components):
            use_id = ['shell', 'action', 'progress'][i]
            node_id = f'20:{i+1}'
            self.sources.append({'id': node_id, 'name': component['name'], 'type': 'COMPONENT', 'key': 'official-' + use_id,
                                 'binding_fields': [], 'text_style_keys': [], 'text_runs': [], 'layout_mode': 'VERTICAL'})
            self.uses.append({'id': use_id, 'screen': 'product', 'family': component['id'], 'kind': 'ds-instance', 'source_node_id': node_id, 'component_key': 'official-' + use_id})
        source = {'schema_version': 1, 'kind': 'source', 'file_key': master, 'observed_at': '2026-11-17T12:00:00Z', 'complete': True, 'nodes': self.sources}
        raw_source = json.dumps(source).encode()
        self.write('source.json', raw_source)
        self.uses += [
            {'id': 'card', 'screen': 'product', 'family': None, 'kind': 'local-composition', 'reason': 'Synthetic product module fixture',
             'molecule_type': 'card', 'host_usage': 'shell', 'slot': 'body', 'composition_of': ['action', 'progress', 'title'],
             'body_bindings': [{'property': 'itemSpacing', 'token': 'body/spacing/md'}]},
            {'id': 'title', 'screen': 'product', 'family': None, 'kind': 'local-content', 'reason': 'Synthetic editable product title',
             'molecule_owner': 'card', 'body_bindings': [{'property': 'fills.0.color', 'token': 'body/color/text/primary'}]},
        ]
        self.plan = {'schema_version': 1, 'snapshot': sha(raw), 'destination_file_key': 'SyntheticTestPrototype',
                     'destination_url': 'https://www.figma.com/design/SyntheticTestPrototype', 'screens': ['product'],
                     'requirements': [c['id'] for c in self.components], 'family_tracking': [{'family': c['id'], 'applicability': 'APPLIES', 'reason': 'Synthetic fixture uses this family'} for c in self.components],
                     'source_readbacks': [{'path': 'source.json', 'sha256': sha(raw_source)}], 'uses': self.uses}

    def write(self, path, data):
        p = self.base / path
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_bytes(data)

    def preflight(self, plan=None):
        return gate.preflight(self.runtime, plan or self.plan, self.base)[0]

    def test_accepts_official_shell_progress_button_and_body_molecule(self):
        self.assertEqual(self.preflight()['status'], 'PASS')

    def test_visibility_overrides_require_supported_boolean_and_keep_visible_text_checks(self):
        label = {'path': 'label', 'visibility_controls': ['Show label#1'], 'style_keys': ['label-style'], 'font_metrics': []}
        field = {'path': 'value', 'visibility_controls': [], 'style_keys': ['field-style'], 'font_metrics': []}
        source = {'component_properties': {'Show label#1': {'type': 'BOOLEAN', 'value': True}}, 'text_runs': [label, field]}
        self.assertEqual(gate.configured_text_runs(source, {}), [label, field])
        self.assertEqual(gate.configured_text_runs(source, {'component_properties': {'Show label#1': False}}), [field])
        self.assertEqual(gate.configured_text_runs(source, {'component_properties': {'Show label#1': True}}), [label, field])
        for invalid in [{'Show label#1': 'false'}, {'Guessed visibility': False}]:
            with self.assertRaises(ValueError):
                gate.configured_text_runs(source, {'component_properties': invalid})

    def test_documented_set_requires_exact_spec_table_and_family_namespace(self):
        component = {'name': 'Linear Progress Bar', 'exports': ['LinearProgress']}
        source = {'parent_type': 'COMPONENT_SET', 'parent_name': 'Linear Progress Bar/small'}
        table = '| Linear Progress Bar/small | public |'
        self.assertTrue(gate.documented_set_matches(component, source, [table]))
        self.assertFalse(gate.documented_set_matches(component, source, ['Mention Linear Progress Bar/small']))
        self.assertFalse(gate.documented_set_matches(component, source, ['| Linear Progress Bar/smallish | public |']))
        self.assertFalse(gate.documented_set_matches({'name': 'Button'}, source, [table]))

    def test_playground_requires_explicit_scope_and_exact_configured_page(self):
        reader = gate.Reader(self.runtime)
        config = json.loads(reader.source('config/figma-links.json'))
        plan = copy.deepcopy(self.plan)
        plan['destination_file_key'] = config['master_destination']['file_key']
        plan['destination_url'] = 'https://www.figma.com/design/' + plan['destination_file_key'] + '/QA?node-id=203-93'
        plan['qa_scope'] = {'mode': 'ISOLATED_PLAYGROUND_QA', 'authorization': 'EXPLICIT_USER_REQUEST',
                            'page_id': '203:93', 'new_nodes_only': True, 'preserve_canonical': True,
                            'container_name': 'QA Skills fixture'}
        with self.assertRaisesRegex(ValueError, 'explicit authorized Playground'):
            gate.file_roles(reader, plan)
        self.assertEqual(gate.preflight(self.runtime, plan, self.base, '203:93')[0]['status'], 'PASS')
        with self.assertRaises(ValueError):
            gate.file_roles(reader, plan, '203:94')
        for field, value in [('new_nodes_only', False), ('preserve_canonical', False), ('container_name', 'Other')]:
            bad = copy.deepcopy(plan)
            bad['qa_scope'][field] = value
            with self.assertRaises(ValueError):
                gate.file_roles(reader, bad, '203:93')
        plan['destination_url'] = plan['destination_url'].replace('203-93', '203-94')
        with self.assertRaisesRegex(ValueError, 'authorized page'):
            gate.file_roles(reader, plan, '203:93')

    def test_rejects_screen_without_official_appshell(self):
        plan = copy.deepcopy(self.plan)
        plan['uses'] = [u for u in plan['uses'] if u['id'] != 'shell']
        with self.assertRaisesRegex(ValueError, 'AppShell'):
            self.preflight(plan)

    def test_rejects_local_atom_and_non_body_token(self):
        for field, value in [('family', 'LINEAR-PROGRESS-001'), ('molecule_type', 'atom'),
                             ('body_bindings', [{'property': 'itemSpacing', 'token': 'button/spacing/md'}])]:
            plan = copy.deepcopy(self.plan)
            plan['uses'][3][field] = value
            with self.assertRaises(ValueError):
                self.preflight(plan)

    def test_readback_checks_actual_body_variable_and_shell_ancestry(self):
        receipt = self.preflight()
        nodes = []
        placements = {u['id']: f'30:{i+1}' for i, u in enumerate(self.uses)}
        for i, use in enumerate(self.uses):
            node = {'id': placements[use['id']], 'type': 'INSTANCE' if i < 3 else 'FRAME' if i == 3 else 'TEXT',
                    'main_component_key': use.get('component_key'), 'layout_mode': 'VERTICAL', 'binding_fields': [],
                    'text_style_keys': [], 'text_runs': [], 'ancestor_ids': [] if i == 0 else [placements['shell'], placements['card']],
                    'binding_details': [{**b, 'collection': 'component'} for b in use.get('body_bindings', [])]}
            if i == 4:
                node['text_runs'] = [{'font_metrics': [{'fontSize': 20}], 'style_keys': [], 'path': 'title'}]
            nodes.append(node)
        readback = {'schema_version': 1, 'kind': 'target', 'file_key': self.plan['destination_file_key'], 'screen': 'product',
                    'complete': True, 'observed_at': receipt['generated_at'], 'plan_sha256': sha(canonical(self.plan)),
                    'root_id': placements['shell'], 'nodes': nodes, 'placements': placements, 'candidates': [],
                    'instance_ids': list(placements.values())[:3]}
        result = gate.verify(self.runtime, self.plan, self.base, receipt, [readback])
        self.assertEqual(result['status'], 'PASS', result)
        nodes[3]['binding_details'][0]['token'] = 'button/spacing/md'
        result = gate.verify(self.runtime, self.plan, self.base, receipt, [readback])
        self.assertEqual(result['status'], 'BLOCKED')
        self.assertTrue(any(f['code'] == 'BODY_BINDING_MISSING' for f in result['findings']))

        # Exercise the isolated live-QA authorization path with synthetic evidence.
        nodes[3]['binding_details'][0]['token'] = 'body/spacing/md'
        master = json.loads((self.runtime / 'assets/design-system/config/figma-links.json').read_text())['master_destination']['file_key']
        plan = copy.deepcopy(self.plan)
        plan.update(destination_file_key=master, destination_url='https://www.figma.com/design/' + master + '/QA?node-id=203-93',
                    qa_scope={'mode': 'ISOLATED_PLAYGROUND_QA', 'authorization': 'EXPLICIT_USER_REQUEST', 'page_id': '203:93',
                              'new_nodes_only': True, 'preserve_canonical': True, 'container_name': 'QA Skills fixture'})
        receipt = gate.preflight(self.runtime, plan, self.base, '203:93')[0]
        readback.update(file_key=master, page_id='203:93', observed_at=receipt['generated_at'], plan_sha256=sha(canonical(plan)),
                        root_ancestor_ids=['90:1', '203:93'], qa_root={'id': '90:1', 'name': 'QA Skills fixture', 'type': 'SECTION', 'parent_id': '203:93'})
        for node in nodes:
            node['ancestor_ids'].append('90:1')
        after = {'kind': 'source', 'complete': True, 'file_key': master, 'observed_at': receipt['generated_at'], 'nodes': copy.deepcopy(self.sources)}
        self.assertEqual(gate.verify(self.runtime, plan, self.base, receipt, [readback], '203:93', [after])['status'], 'PASS')
        with self.assertRaisesRegex(ValueError, 'every used canonical'):
            gate.verify(self.runtime, plan, self.base, receipt, [readback], '203:93', [])
        readback['qa_root']['parent_id'] = '203:94'
        with self.assertRaisesRegex(ValueError, 'isolated Playground container'):
            gate.verify(self.runtime, plan, self.base, receipt, [readback], '203:93', [after])
        readback['qa_root']['parent_id'] = '203:93'
        after['nodes'][0]['name'] = 'Changed principal'
        with self.assertRaisesRegex(ValueError, 'Canonical principal changed'):
            gate.verify(self.runtime, plan, self.base, receipt, [readback], '203:93', [after])


if __name__ == '__main__':
    unittest.main()
