import {readFileSync,writeFileSync} from 'node:fs';
import {auditComponentHtml} from './component-enforcer.mjs';

const [htmlPath='render.html', briefPath='brief.json', snapshotPath='references/snapshot-manifest.json', reportPath] = process.argv.slice(2);
const read = path => readFileSync(path,'utf8');
const rawBrief = read(briefPath);
const brief = JSON.parse(briefPath.endsWith('.md')
  ? [...rawBrief.matchAll(/^```json\s*\n([\s\S]*?)^```/gm)].at(-1)?.[1] ?? ''
  : rawBrief);
const report = auditComponentHtml(readFileSync(htmlPath), brief, JSON.parse(read(snapshotPath)));
if (reportPath) writeFileSync(reportPath, JSON.stringify(report,null,2)+'\n');
const grouped = new Map();
for (const finding of report.findings) {
  const group = grouped.get(finding.code) ?? [];
  group.push(finding);
  grouped.set(finding.code, group);
}
console.log(`Componentes BlueHeart: ${report.status}. ${report.family_count} familias, ${report.export_count} exports en el corte.`);
for (const [code, findings] of grouped) {
  console.log(`- ${code} (${findings.length}): ${findings[0].id} · ${findings[0].detail}`);
}
for (const observation of report.observations) console.log(`- ${observation.code}: ${observation.detail}`);
if (report.status !== 'PASS') process.exitCode = 1;
