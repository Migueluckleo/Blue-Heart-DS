import path from 'node:path';
import babelTraverse from 'next/dist/compiled/babel/traverse.js';

const traverse = babelTraverse.default;
const nativeControls = new Set(['button','input','textarea','select','table','td','th']);
const literal = node => node?.type === 'StringLiteral' ? node.value
  : node?.type === 'JSXExpressionContainer' ? literal(node.expression) : undefined;

export function verifyComponentSource(ast, file, root, catalog) {
  const evidenceModule = path.join(root, 'app/evidence');
  if (path.resolve(file).replace(/\.[jt]sx?$/, '') === evidenceModule) return [];
  const libraryModule = path.join(root, 'ui/index');
  const edits = [];
  const imports = (scope, name, module) => {
    const binding = scope.getBinding(name)?.path;
    if (!binding?.isImportSpecifier() || binding.parent.importKind === 'type'
      || binding.node.importKind === 'type') return;
    const specifier = binding.parent.source.value;
    const source = specifier === '@contpaqi/ui' ? libraryModule : specifier.startsWith('.')
      ? path.resolve(path.dirname(path.resolve(file)), specifier).replace(/\.[jt]sx?$/, '') : null;
    if (source === module || module === libraryModule && source === path.dirname(module)) {
      return binding.node.imported.name ?? binding.node.imported.value;
    }
  };
  const fail = (node, message) => {
    throw new Error(`DS_SOURCE ${file}:${node.loc.start.line}: ${message}`);
  };

  traverse(ast, {
    JSXOpeningElement({node, scope, parent}) {
      const attributes = node.attributes.filter(attribute => attribute.type === 'JSXAttribute');
      if (attributes.some(attribute => attribute.name.name === 'data-ds-export'
        || attribute.name.name === 'data-ds-authored' || attribute.name.name === 'data-blueheart' || attribute.name.name === 'verifiedExport')) fail(node, 'La procedencia la genera el enforcer.');
      const name = node.name.name;
      if (node.name.type === 'JSXIdentifier' && /^[a-z]/.test(name)
        && (nativeControls.has(name) || attributes.some(attribute => attribute.name.name === 'role'))) {
        edits.push({start:node.name.end,end:node.name.end,text:' data-ds-authored="true"'});
      }
      if (node.name.type !== 'JSXIdentifier' || imports(scope, name, evidenceModule) !== 'DSNode') return;
      const family = literal(attributes.find(attribute => attribute.name.name === 'component')?.value);
      if (!family) fail(node, 'DSNode requiere un component literal del catálogo o una identidad local.');
      if (family === 'local' || family.startsWith('LOCAL-')) return;
      const children = parent.children.filter(child => child.type !== 'JSXText' || child.value.trim())
        .filter(child => child.type !== 'JSXExpressionContainer' || child.expression.type !== 'JSXEmptyExpression');
      const child = children.length === 1 && children[0].openingElement;
      const exported = child?.name.type === 'JSXIdentifier' && imports(scope, child.name.name, libraryModule);
      if (!catalog.families.get(family)?.includes(exported)) {
        fail(node, `${family} requiere como hijo directo uno de sus exports de ../ui: ${catalog.families.get(family)?.join(', ') ?? 'identidad desconocida'}.`);
      }
      // This wrapper already exists in the starter. Preserve the DOM of the library itself.
      edits.push({start:node.name.end,end:node.name.end,text:` verifiedExport="${exported}"`});
    }
  });
  return edits;
}
