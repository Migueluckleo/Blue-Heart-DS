import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))

from ds_consumption import declared_dependency_targets


class DeclaredDependencyTargetsTests(unittest.TestCase):
    def setUp(self):
        self.base = 'specs/components/notification.contract.md'
        self.cta = 'specs/components/notification.cta.amendment.md'
        self.layout = 'specs/components/notification.layout.amendment.md'
        self.components = [{
            'id': 'NOTIFICATION',
            'contract': self.base,
            'amendments': [self.cta, self.layout],
        }]
        self.texts = {
            self.base: '# Notification\n',
            self.cta: 'dependencies: [NOTIFICATION]\n',
            self.layout: 'dependencies: [NOTIFICATION-CTA]\n',
        }
        self.metadata = {
            self.base: {'value': {'contract_id': 'NOTIFICATION'}},
            self.cta: {'value': {
                'contract_id': 'NOTIFICATION-CTA', 'dependencies': ['NOTIFICATION'],
            }},
            self.layout: {'value': {
                'contract_id': 'NOTIFICATION-LAYOUT', 'dependencies': ['NOTIFICATION-CTA'],
            }},
        }

    def test_amendment_can_depend_on_selected_amendment(self):
        references = declared_dependency_targets(self.texts, self.metadata, self.components)
        self.assertEqual(references[self.layout], {(1, self.cta)})
        self.assertEqual(references[self.cta], {(1, self.base)})

    def test_unselected_amendment_does_not_resolve_dependency(self):
        self.components[0]['amendments'] = [self.layout]
        with self.assertRaisesRegex(ValueError, 'Unresolved declared dependency NOTIFICATION-CTA'):
            declared_dependency_targets(self.texts, self.metadata, self.components)

    def test_duplicate_amendment_identity_is_ambiguous(self):
        duplicate = 'specs/components/notification.other.amendment.md'
        self.components[0]['amendments'].append(duplicate)
        self.metadata[duplicate] = {'value': {'amendment_id': 'NOTIFICATION-CTA'}}
        self.texts[duplicate] = '# Duplicate\n'
        with self.assertRaisesRegex(ValueError, 'Ambiguous declared dependency NOTIFICATION-CTA'):
            declared_dependency_targets(self.texts, self.metadata, self.components)

    def test_shared_base_identity_preserves_selected_base(self):
        self.metadata[self.layout]['value']['contract_id'] = 'NOTIFICATION'
        references = declared_dependency_targets(self.texts, self.metadata, self.components)
        self.assertEqual(references[self.cta], {(1, self.base)})


if __name__ == '__main__':
    unittest.main()
