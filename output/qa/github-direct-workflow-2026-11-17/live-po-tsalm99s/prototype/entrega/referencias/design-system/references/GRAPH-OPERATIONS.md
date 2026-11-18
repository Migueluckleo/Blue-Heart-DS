# Graphify: referencia operativa local

Entrada operativa mantenida desde 2026-10-13: [scripts/ds y guía de cierre](PROJECT-TOOLING.md). Verificar con scripts/ds check; preparar/cerrar lotes con scripts/ds graph. Implementa los gates inferiores con respaldo, semántica del delta y readback; los scripts fechados bajo graphify-out se conservan como evidencia histórica.

Vigencia 2026-10-08: [DEC-GRAPH-CONTINUOUS-SYNC-001](../registry/DEC-GRAPH-CONTINUOUS-SYNC-001.md) autoriza la sincronización local continua por lote. [P05 0.2.4](../protocols/05-SELF-DOCUMENTATION-AND-TRACEABILITY.md) exige GRAPH-SYNC-01–04: delta completo, extracción estructural y semántica, outputs concordantes y manifiesto final comprobado. No nuevas instalaciones, automatizaciones ni servicios externos.

Esta referencia conserva las reglas locales de autodocumentación del grafo anteriores a la migración 0.2.0. Complementa [P01](../protocols/01-ENVIRONMENT-AND-TOOLS.md) y [P05](../protocols/05-SELF-DOCUMENTATION-AND-TRACEABILITY.md); no es un protocolo activo. Su ejecución requiere autorización conforme a P01 y a la solicitud del usuario.

## Purpose

Keep the repository knowledge graph current, inspectable and reproducible so
agents can navigate project state without treating generated relationships as
canonical Design System intent.

This reference covers Graphify runs, graph artifacts, provenance, refresh
triggers, verification and persistent environment records. P05 remains
the authority for explicit registries and implementation traceability.

## Authority and evidence

Repository specifications and the authority order in `AGENTS.md` govern.
Graphify outputs are derived navigation artifacts, never sources of truth.

Graph extraction confidence must remain visible:

- `EXTRACTED`: explicitly supported by a source;
- `INFERRED`: derived by Graphify or an extraction agent;
- `AMBIGUOUS`: uncertain graph relationship requiring caution.

These Graphify confidence tags do not replace the repository evidence labels.
An `INFERRED` or `AMBIGUOUS` graph relationship never becomes canonical without
approval and supporting repository evidence. A graph observation cannot resolve
a `CONFLICT` or fill a contract gap.

## Graph artifacts

Required primary outputs live under `graphify-out/`:

- `graph.html`: interactive navigation view;
- `GRAPH_REPORT.md`: generated summary, communities and suggested questions;
- `graph.json`: queryable graph data.

Supporting outputs may include the manifest, cost record, community labels,
health diagnostics, extraction cache and interpreter/root metadata. Generated
outputs must not be ingested as canonical specifications or registered as
contracts.

Optional exports such as wiki, Obsidian, GraphML, SVG, Neo4j, FalkorDB or MCP
are created only when required by the task. External pushes and long-running
watchers require explicit authority and verified destinations.

## Graph state

Use the following operational states:

`MISSING → GENERATING → GENERATED → CHECKING → CURRENT`

Exceptional states are `STALE`, `BLOCKED` and `FAILED`.

- `MISSING`: no usable graph exists.
- `STALE`: authoritative or traceability-relevant repository content changed
  after the last successful graph run.
- `GENERATED`: outputs were written but have not passed readback and health
  checks.
- `CURRENT`: outputs were read back, verified and reflect the intended corpus.

A successful command or the presence of `graph.json` alone does not establish
`CURRENT`.

## Refresh triggers

Mark the graph `STALE` after meaningful changes to:

- contracts or canonical structured data;
- amendments, decisions or authoritative references;
- registries or lineage;
- Figma/web implementation records;
- QA records, accepted deviations or validation status;
- protocols, architecture or environment configuration;
- files that add, remove or materially change project entities or relations.

Temporary files, chat history and generated graph outputs are not independent
sources and must not trigger recursive graph ingestion.

Prefer an incremental update when a verified graph and manifest exist. Run a
full build when the graph is missing, incompatible, corrupt, intentionally
re-scoped or cannot be safely updated. Do not force past shrink protection or
overwrite a known-good graph with an incomplete extraction without first
confirming that the reduction is intentional.

## Required workflow

1. Confirm Graphify is `READY` in `registry/environment.md`.
2. Identify the repository root and intended corpus.
3. Check for an existing graph and whether it is current.
4. Detect supported files and report sensitive or unexpectedly skipped files.
5. Preserve source paths and `EXTRACTED`/`INFERRED`/`AMBIGUOUS` provenance.
6. Run structural and semantic extraction according to the installed official
   Graphify skill. Missing optional API keys must not be invented or recorded.
7. Build or incrementally merge the graph without silently dropping prior valid
   content.
8. Generate the required primary outputs.
9. Read back `graph.json`, `GRAPH_REPORT.md` and `graph.html`.
10. Run graph health diagnostics and a scoped query smoke test.
11. Record environment/run facts and surface warnings or incomplete coverage.
12. Mark the graph `CURRENT` only after all applicable checks pass.

On partial failure, stop dependent steps, inspect actual outputs, preserve the
last known-good graph when possible and record `BLOCKED` or `FAILED`. Never
describe a partial graph as current.

## Query discipline

When a current `graphify-out/graph.json` exists, begin repository discovery with
a scoped `graphify query`, `graphify path` or `graphify explain` request. Use
`GRAPH_REPORT.md` for broad orientation only when scoped queries are
insufficient. Return to canonical source files before making an authoritative
decision.

Graph answers must retain source locations and confidence. If a result is
missing, ambiguous or conflicts with a source, inspect the source and apply the
authority hierarchy; do not repair the specification from the graph.

## Required self-documentation

`registry/environment.md` must record at least:

- Graphify and runtime versions;
- installation method and scope;
- official source and verification date;
- repository root and integration location;
- Codex-specific configuration;
- primary output paths;
- verification commands and result;
- graph counts when useful;
- skipped content, health warnings or known coverage limits;
- final state: `READY`, `BLOCKED` or `FAILED` for the tool environment.

Material human decisions about graph scope, exclusions, external publication or
accepted integrity limitations belong in `registry/decisions.md`. Graph-backed
QA evidence belongs in `registry/qa.md` only when a QA run explicitly uses it;
the graph does not replace requirement-level evidence.

## Validation gate

The graph is `CURRENT` only when:

- the intended corpus was detected;
- required extraction completed without unreported failed chunks;
- `graph.json` parses and contains the expected non-empty structure;
- `GRAPH_REPORT.md` and `graph.html` exist and correspond to that graph;
- health diagnostics expose no unresolved corruption, or limitations are
  explicitly recorded and accepted;
- a scoped query returns source-linked results;
- the manifest reflects the final repository state;
- environment documentation is current and contains no secrets.

Graph currency is not Design System validation. Contracts and implementations
continue through their own lifecycle and the P06 QA gate.
