import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
import htmlParser from 'next/dist/compiled/node-html-parser/index.js';
import postcss from 'postcss';
import {verifyComponentPlan,verifyComponentSourceReceipt} from './component-plan.mjs';

export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const read = file => JSON.parse(readFileSync(file, 'utf8'));
const own = (node, key) => node.getAttribute(key);
const normalized = value => value?.trim().replace(/\s+/g, ' ');
const firstElement = node => node?.childNodes?.find(child => child.tagName);

export function webComponents(manifest) {
  return manifest.components.filter(row => row.consumption_targets?.includes('web') ?? true);
}

export function componentCatalog(manifest) {
  const families = new Map(webComponents(manifest).map(row => [row.id, row.exports ?? [row.exportName]]));
  return {families, specs:new Set(manifest.components.map(row=>row.id)), sources:manifest.files, ds_digest:manifest.ds_digest};
}

export function usagePlan(brief, catalog, coverage) {
  const findings = [];
  const declared = new Map();
  const requirements = new Map();
  const specs = coverage ? new Set(coverage.families.map(row=>row.componentId)) : catalog.specs;
  const add = (code, id, detail) => findings.push({code, id, detail});
  for (const entry of brief.components ?? []) {
    if (declared.has(entry.instanceId)) add('DUPLICATE_INSTANCE', entry.instanceId, 'ID repetido en el inventario.');
    declared.set(entry.instanceId, entry);
    if (entry.kind === 'ds' && !catalog.families.get(entry.componentId)?.includes(entry.exportName)) {
      add('UNKNOWN_EXPORT', entry.instanceId, `${entry.componentId} / ${entry.exportName} no pertenece al corte.`);
    }
    if (entry.exception) {
      const {componentIds, reason, source} = entry.exception;
      if (entry.kind !== 'local-composition' || !Array.isArray(componentIds) || !componentIds.length
        || componentIds.some(id => !specs.has(id)) || typeof reason !== 'string' || !reason.trim()
        || !Object.hasOwn(catalog.sources, source ?? '') || !Array.isArray(entry.compositionOf) || (!coverage && !entry.compositionOf.length)
        || entry.compositionOf.some(id => !catalog.families.has(id))) {
        add('INVALID_EXCEPTION', entry.instanceId, 'La excepción requiere familias del catálogo, composición, motivo y ruta de evidencia del corte.');
      }
    }
  }
  const mapped = new Set(coverage?.controls.map(entry=>entry.instanceId));
  if (coverage) for (const entry of declared.values()) {
    if ((entry.kind === 'ds' || entry.kind === 'local-composition' || entry.exception) && !mapped.has(entry.instanceId)) {
      add('UNPLANNED_CONTROL', entry.instanceId, 'Incluye este control en el mapa previo del brief.');
    }
  }
  for (const requirement of coverage?.controls ?? brief.componentRequirements ?? brief.component_requirements ?? []) {
    const {instanceId, componentId} = requirement;
    const entry = declared.get(instanceId);
    const expected = requirements.get(instanceId) ?? new Set();
    expected.add(componentId);
    requirements.set(instanceId, expected);
    if (coverage) {
      if (!entry) add('UNKNOWN_REQUIREMENT', instanceId, 'El control del mapa carece de instancia implementada.');
      else if (requirement.coverage === 'COMPATIBLE') {
        if (entry.kind !== 'ds' || entry.componentId !== componentId || entry.exportName !== requirement.exportName) {
          add('COMPONENT_SUBSTITUTED', instanceId, `Usa el export compatible ${requirement.exportName} de ${componentId}.`);
        }
      } else if (entry.kind !== 'local-composition' || !Array.isArray(entry.compositionOf) || entry.reason !== requirement.reason
        || (requirement.coverage === 'NO_SPEC' ? entry.exception !== undefined
          : entry.exception?.componentIds?.length !== 1 || !entry.exception.componentIds.includes(componentId)
            || entry.exception.reason !== requirement.reason || entry.exception.source !== requirement.evidence.path)) {
        add('UNVERIFIED_EXCEPTION', instanceId, 'La excepción implementada debe coincidir con el motivo y la evidencia del mapa.');
      }
    } else if (!catalog.families.has(componentId) || !entry) {
      add('UNKNOWN_REQUIREMENT', instanceId, `Requisito sin instancia o familia del catálogo: ${componentId}.`);
    } else if (!uses(entry, componentId)) {
      add('COMPONENT_SUBSTITUTED', instanceId, `El brief requiere ${componentId}; se declaró ${entry.componentId}.`);
    }
    if (!(brief.screens ?? []).some(screen => screen.states.some(state => state.nodes?.includes(instanceId)))) {
      add('REQUIREMENT_NOT_EXERCISED', instanceId, 'Incluye la instancia requerida en un estado de captura.');
    }
  }
  return {declared, requirements, findings};
}

function uses(entry, family) {
  return entry?.kind === 'ds' && entry.componentId === family
    || entry?.kind === 'local-composition' && entry.exception?.componentIds?.includes(family);
}

const roles = {
  button:'BUTTON-001', checkbox:'CHECKBOX-001', combobox:'DROPDOWN-MENU-001',
  listbox:'DROPDOWN-MENU-001', menuitem:'MENU-ITEM-001', progressbar:'LINEAR-PROGRESS-001', radio:'RADIO-001',
  radiogroup:'RADIO-GROUP-001', searchbox:'SEARCH-001', switch:'TOGGLE-001',
  tab:'TAB-001', tablist:'TABS-001', table:'TABLE-001', cell:'TABLE-CELL-001', gridcell:'TABLE-CELL-001', textbox:'INPUT-001', tooltip:'TOOLTIP-001'
};
const inputTypes = {
  button:'BUTTON-001', submit:'BUTTON-001', reset:'BUTTON-001', checkbox:'CHECKBOX-001',
  file:'FILE-UPLOAD-001', radio:'RADIO-001', search:'SEARCH-001'
};
const tags = {button:'BUTTON-001', textarea:'TEXT-AREA-001', select:'DROPDOWN-MENU-001', table:'TABLE-001', td:'TABLE-CELL-001', th:'TABLE-CELL-001'};

function isAncestor(ancestor,node) {
  for (let cursor=node; cursor; cursor=cursor.parentNode) if (cursor === ancestor) return true;
  return false;
}

function semanticFamily(node) {
  const tag = node.tagName;
  const type = own(node, 'type');
  const role = own(node,'role');
  if (tag === 'NAV' || own(node,'role') === 'navigation') {
    const label = (own(node,'aria-label') ?? '').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
    if (/paginat|paginac/.test(label)) return 'PAGINATION-001';
    if (/breadcrumb|migas de pan|ruta de navegacion/.test(label)) return 'BREADCRUMB-001';
  }
  if (tag === 'INPUT') return type === 'hidden' ? undefined : inputTypes[type] ?? 'INPUT-001';
  return roles[role] ?? tags[tag?.toLowerCase()];
}

export function inspectComponentMarkup(html, catalog, plan) {
  const document = htmlParser.parse(html);
  const findings = [];
  const add = (code, id, detail) => findings.push({code, id, detail});
  const trusted = new Set();
  const entries = document.querySelectorAll('[data-ds-node]');
  const scope = node => node.closest('[data-ds-node]');
  for (const node of entries) {
    const id = own(node, 'data-ds-node');
    const family = own(node, 'data-ds-component');
    const entry = plan.declared.get(id);
    const exported = own(node, 'data-ds-export');
    if (!entry || entry.componentId !== family) {
      add('UNKNOWN_INSTANCE', id, `Marcador ${family} sin correspondencia en el inventario.`);
      continue;
    }
    if (entry.kind === 'ds') {
      if (entry.exportName !== exported || !catalog.families.get(family)?.includes(exported)) {
        add('UNVERIFIED_EXPORT', id, `Falta evidencia de importación para ${family} / ${entry.exportName}.`);
      } else trusted.add(node);
    }
  }

  const local = node => {
    const owner = scope(node);
    return owner && plan.declared.get(own(owner,'data-ds-node'));
  };
  const reportRole = (node, family) => {
    if (!catalog.families.has(family)) return;
    const entry = local(node);
    if (uses(entry, family)) return;
    const id = entry?.instanceId ?? own(node,'id') ?? node.tagName;
    add('COMPONENT_SUBSTITUTED', id, `La estructura renderizada requiere ${family}.`);
  };
  const isLibrary = node => node.closest('[data-blueheart]')
    || trusted.has(scope(node)) && firstElement(scope(node)) === node;
  for (const control of document.querySelectorAll('button,input,textarea,select,table,td,th,nav,[role]')) {
    const family = semanticFamily(control);
    if (family && (own(control,'data-ds-authored') === 'true' || !isLibrary(control))) reportRole(control, family);
  }

  let sidebar = document.querySelector('[data-blueheart="sidebar"],[data-ds-component="SIDEBAR-001"]');
  const globalHeader = document.querySelector('[data-blueheart="header"],[role="banner"]')
    ?? document.querySelectorAll('header').find(node => !node.closest('main,section,article,aside,nav,[role="dialog"]'));
  // Legacy markup sometimes uses a div for the global bar.
  const session = document.querySelector('[data-blueheart="company-selector"],[data-blueheart="user-selector"]');
  let header = globalHeader;
  if (!header && session && !session.closest('main')) {
    const wrapper = scope(session)?.parentNode?.closest('[data-ds-node]');
    header = firstElement(wrapper);
  }
  if (header && own(header,'data-blueheart') !== 'header') reportRole(header, 'HEADER-001');
  const main = document.querySelector('main,[role="main"]');
  if (header && main && !sidebar) {
    sidebar = document.querySelectorAll('nav,[role="navigation"]').find(node =>
      !isAncestor(main,node) && !isAncestor(header,node)
      && node.parentNode && isAncestor(node.parentNode,main));
    if (sidebar) reportRole(sidebar,'SIDEBAR-001');
  }
  if (header && sidebar && main
    && !document.querySelector('[data-blueheart="app-shell"]') && catalog.families.has('APP-SHELL-001')) {
    let shell = sidebar.parentNode;
    while (shell && !(uses(local(shell), 'APP-SHELL-001') && isAncestor(shell,header))) shell = shell.parentNode;
    if (!shell) add('COMPONENT_SUBSTITUTED', 'app-shell',
      'Hay navegación global y contenido de pantalla sin AppShell ni excepción de composición.');
  }
  return {findings, header, sidebar, document};
}

// Fast checks for exported and legacy files. Geometry and keyboard are checked in Chromium.
export function inspectComponentHtml(html, catalog, plan) {
  const {findings, header, sidebar, document} = inspectComponentMarkup(html, catalog, plan);
  const host = sidebar?.parentNode?.closest('[data-ds-node]')?.parentNode ?? sidebar?.parentNode;
  const selectors = node => new Set(node ? [...node.classList.values()].map(name => '.'+name) : []);
  const headerSelectors = selectors(header);
  const hostSelectors = selectors(host);
  const observations = [];
  const checkBackground = (id, declaration) => {
    if (!/^background(?:-color)?$/.test(declaration.prop)) return;
    const value = normalized(declaration.value);
    if (value !== 'var(--header-color-bg-default)') findings.push({code:'HEADER_BACKGROUND', id,
      detail:`Fondo ${value}; usa var(--header-color-bg-default).`});
  };
  const inline = header && own(header,'style');
  if (inline) postcss.parse(`header{${inline}}`).walkDecls(decl => checkBackground('header', decl));
  for (const tag of document.querySelectorAll('style,link[rel="stylesheet"]')) {
    if (!headerSelectors.size && !hostSelectors.size) break;
    const href = own(tag,'href') ?? '';
    const css = tag.tagName === 'STYLE' ? tag.rawText : href.startsWith('data:text/css;base64,')
      ? Buffer.from(href.slice(href.indexOf(',')+1),'base64').toString('utf8') : '';
    if (!css) continue;
    postcss.parse(css).walkRules(rule => {
      for (const selector of rule.selectors.map(value => value.trim())) {
        if (headerSelectors.has(selector)) rule.walkDecls(decl => checkBackground(selector, decl));
        if (hostSelectors.has(selector)) rule.walkDecls('align-items', decl => {
          if (decl.value === 'flex-start') observations.push({code:'SIDEBAR_HOST_ALIGNMENT', id:selector,
            detail:'El host alinea Sidebar arriba; comprobar altura y posición de Ayuda en navegador.'});
        });
      }
    });
  }
  return {findings, observations};
}

const unique = values => [...new Map(values.map(value => [JSON.stringify(value), value])).values()];

export function auditComponentHtml(html, brief, manifest, coverage) {
  const catalog = componentCatalog(manifest);
  const plan = usagePlan(brief, catalog, coverage);
  const markup = inspectComponentHtml(html.toString(), catalog, plan);
  const findings = [...plan.findings, ...markup.findings];
  return {schema_version:1, status:findings.length ? 'FAIL' : 'PASS',
    html_sha256:sha256(html), ds_digest:catalog.ds_digest, family_count:catalog.families.size,
    export_count:[...catalog.families.values()].flat().length, catalog_families:Object.fromEntries(catalog.families), findings:unique(findings), observations:unique(markup.observations)};
}

export function projectComponentAudit(html, brief, recordBuild = false) {
  const coverage = verifyComponentPlan(brief);
  const source = verifyComponentSourceReceipt(coverage);
  const report = {...auditComponentHtml(html, brief, read('references/snapshot-manifest.json'), coverage),
    plan_sha256:source.plan_sha256,source_sha256:sha256(JSON.stringify(source))};
  const stamp = {html_sha256:report.html_sha256,plan_sha256:report.plan_sha256,source_sha256:report.source_sha256};
  const path = 'references/component-build.json';
  if (recordBuild && report.status === 'PASS') writeFileSync(path,JSON.stringify(stamp,null,2)+'\n');
  if (!recordBuild && JSON.stringify(read(path)) !== JSON.stringify(stamp)) {
    throw new Error('DS_PLAN: El HTML, el mapa o el código difieren del build aprobado. Ejecuta npm run build y repite captura.');
  }
  return report;
}
