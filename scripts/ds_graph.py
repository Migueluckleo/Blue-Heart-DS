"""Graph operations with preparation, semantic gate, staged exports and rollback."""
from __future__ import annotations

import hashlib
import contextlib
import importlib.metadata
import json
import os
import re
import shutil
import sys
from pathlib import Path
from ds_session import coordinated

from ds_core import ROOT, corpus, paths_of, read_json, sha, dump, relative

LIVE = ROOT / "graphify-out"
OUTPUTS = ["graph.json", "graph.html", "GRAPH_REPORT.md", "manifest.json",
           ".graphify_health.json", ".graphify_labels.json", ".graphify_labels.json.sig", "cost.json"]


def runtime_gate(config):
    actual = importlib.metadata.version("graphifyy")
    if actual != config["runtime"]["graphifyy"]:
        raise RuntimeError("Graphify esperado " + config["runtime"]["graphifyy"] + "; instalado " + actual)
    if list(sys.version_info[:2]) != config["runtime"]["python_major_minor"]:
        raise RuntimeError("Runtime Python diferente del comprobado: " + sys.version.split()[0])


def plan(config, detection=None):
    runtime_gate(config)
    detection = detection or corpus(config=config)
    manifest = read_json(LIVE / "manifest.json") if (LIVE / "manifest.json").exists() else {}
    paths = paths_of(detection)
    semantic = {relative(p) for kind in ("document", "paper", "image", "video")
                for p in detection["files"].get(kind, [])}
    hashes = {p: sha(ROOT / p) for p in paths}
    changed = []
    for path in paths:
        digest = hashlib.md5((ROOT / path).read_bytes()).hexdigest()
        kind = "semantic_hash" if path in semantic else "ast_hash"
        if manifest.get(path, {}).get(kind) != digest:
            changed.append(path)
    return {
        "source_sha256": hashes, "config_sha256": sha(ROOT / "config/ds-project.json"),
        "new": sorted(set(paths) - set(manifest)),
        "changed": sorted(set(changed) & set(manifest)),
        "deleted_or_excluded": sorted(set(manifest) - set(paths)),
        "semantic_required": sorted(set(changed) & semantic),
        "code_changed": sorted(set(changed) - semantic),
        "corpus_files": len(paths),
    }, detection


def check_graph(config, detection=None):
    try:
        delta, _ = plan(config, detection)
        errors = []
        for key in ("new", "changed", "deleted_or_excluded"):
            if delta[key]:
                errors.append({key: delta[key]})
        graph = read_json(LIVE / "graph.json")
        nodes, edges = graph["nodes"], graph.get("links", graph.get("edges", []))
        ids = {n["id"] for n in nodes}
        if len(ids) != len(nodes):
            errors.append("duplicate IDs")
        if any(e["source"] not in ids or e["target"] not in ids for e in edges):
            errors.append("broken endpoints")
        closure_path = LIVE / "ds-closure.json"
        closure = read_json(closure_path) if closure_path.exists() else None
        if closure is None:
            # Compatibility with verified historical runs: match bytes, never pick latest date.
            for path in (LIVE / "runs").glob("*/closure.json"):
                item = read_json(path)
                hashes = item.get("output_sha256", item.get("outputSha256", {}))
                if hashes and all((LIVE / p).is_file() and sha(LIVE / p) == h for p, h in hashes.items()):
                    closure = item
                    break
        hashes = closure.get("output_sha256", closure.get("outputSha256", {})) if closure else {}
        if not hashes or not all((LIVE / p).is_file() and sha(LIVE / p) == h for p, h in hashes.items()):
            errors.append("output closure missing or mismatched")
        if closure and closure.get("status") != "CURRENT":
            errors.append("closure not CURRENT")
        if closure and closure.get("config_sha256") and closure["config_sha256"] != delta["config_sha256"]:
            errors.append("configuration changed since closure")
        return {"status": "STALE" if errors else "CURRENT", "errors": errors,
                "files": delta["corpus_files"], "nodes": len(nodes), "edges": len(edges),
                "scope": "Graph freshness/integrity, not Figma validation"}
    except (ValueError, OSError, KeyError) as error:
        return {"status": "BLOCKED", "errors": [str(error)]}


def run_path(name):
    if not name or not re.fullmatch(r"[a-z0-9][a-z0-9-]{0,79}", name):
        raise ValueError("Usa --run con un ID explícito, por ejemplo 2026-10-13-high-priorities")
    return LIVE / "runs" / name


@coordinated
def prepare(config, name):
    delta, detection = plan(config)
    if not (delta["new"] or delta["changed"] or delta["deleted_or_excluded"]):
        current = check_graph(config, detection)
        if current["status"] == "CURRENT":
            return {"status": "CURRENT_NO_CHANGES", "message": "No se regeneró el grafo."}
    run = run_path(name)
    ticket = LIVE / 'ds-prepared.json'
    candidates = [run]
    if ticket.exists():
        try:
            candidates.append(run_path(read_json(ticket)['run']))
        except (ValueError, KeyError):
            pass
    for candidate in candidates:
        if not (candidate / 'source-plan.json').exists() or (candidate / 'closure.json').exists():
            continue
        saved = read_json(candidate / 'source-plan.json')
        if saved['source_sha256'] == delta['source_sha256'] and saved['config_sha256'] == delta['config_sha256']:
            try:
                assert_live_baseline(candidate)
            except ValueError:
                continue
            return {'status': 'PREPARED' if candidate == run else 'PREPARED_SHARED',
                    'run': candidate.name, 'semantic_files': len(saved['semantic_required']),
                    'chunks': len(read_json(candidate / 'semantic-plan.json')['chunks'])}
    if run.exists():
        raise ValueError('Lote previo tiene otro corte; usa un nuevo --run. Se conserva su evidencia.')
    run.mkdir(parents=True)
    (run / "before").mkdir()
    for filename in OUTPUTS + ["ds-closure.json"]:
        if (LIVE / filename).exists():
            shutil.copy2(LIVE / filename, run / "before" / filename)
    dump(run / "source-plan.json", delta)
    dump(run / "detection.json", detection)
    semantic = [p for kind in ("document", "paper", "image") for p in detection["files"].get(kind, [])]
    required = set(delta["semantic_required"])
    todo = [p for p in semantic if relative(p) in required]
    images = set(detection["files"].get("image", []))
    docs = sorted(p for p in todo if p not in images)
    chunks = [docs[i:i+22] for i in range(0, len(docs), 22)] + [[p] for p in todo if p in images]
    for i, files in enumerate(chunks):
        dump(run / f"chunk-{i:02d}.files.json", files)
    prompt = ROOT / ".codex/skills/graphify/references/extraction-spec.md"
    dump(run / "semantic-plan.json", {
        "chunks": chunks, "reused": [p for p in semantic if relative(p) not in required],
        "source_sha256": {relative(p): sha(p) for p in semantic},
        "prompt_sha256": sha(prompt), "usage_status": "UNAVAILABLE",
        "reuse_basis": "Source manifest content hash; prior semantic provenance retained"})
    dump(LIVE / "ds-prepared.json", {"run": name})
    return {"status": "PREPARED", "run": name, "semantic_files": len(todo), "chunks": len(chunks),
            "next": "Extraer cada chunk según la skill Graphify y después ejecutar scripts/ds graph close --run " + name}


def validate_fragments(run):
    if list(run.glob("delta-*.json")):
        raise ValueError("Unplanned semantic delta; prepare a new complete batch")
    prepared = read_json(run / "semantic-plan.json")
    baseline = run / "before/graph.json"
    before = read_json(baseline) if baseline.is_file() else {"nodes": []}
    old_ids = {n["id"] for n in before["nodes"]}
    fragments = []
    new_ids = set()
    for i, files in enumerate(prepared["chunks"]):
        path = run / f"chunk-{i:02d}.json"
        if not path.exists():
            raise ValueError(f"Semántica pendiente: {path.name}; no se cambia el grafo vigente.")
        part = read_json(path)
        expected = set(files)
        represented = set()
        local_ids = []
        for node in part.get("nodes", []):
            if not re.fullmatch(r"[a-z0-9_]+", node.get("id", "")):
                raise ValueError("Invalid semantic node ID")
            if node.get("file_type") not in {"code", "document", "paper", "image", "rationale", "concept"}:
                raise ValueError("Invalid semantic file type")
            if node.get("source_file") not in expected:
                raise ValueError("Semantic source outside assigned chunk")
            if not node.get("reference_only"):
                represented.add(node["source_file"])
            local_ids.append(node["id"])
        if len(set(local_ids)) != len(local_ids) or new_ids.intersection(local_ids) or not expected <= represented:
            raise ValueError("Duplicate IDs or incomplete semantic coverage")
        new_ids.update(local_ids)
        fragments.append(part)
    allowed_ids = new_ids | old_ids
    for part in fragments:
        for edge in part.get("edges", []):
            if edge.get("source") not in allowed_ids or edge.get("target") not in allowed_ids:
                raise ValueError("Semantic endpoint absent from chunk and prior graph")
            confidence = edge.get("confidence")
            score = edge.get("confidence_score")
            if confidence == "EXTRACTED" and score != 1.0:
                raise ValueError("EXTRACTED confidence must be 1")
            if confidence == "INFERRED" and score not in {0.95, 0.85, 0.75, 0.65, 0.55}:
                raise ValueError("Invalid inference confidence")
            if confidence == "AMBIGUOUS" and (not isinstance(score, (int, float)) or not 0.1 <= score <= 0.3):
                raise ValueError("Invalid ambiguous confidence")
            if confidence not in {"EXTRACTED", "INFERRED", "AMBIGUOUS"}:
                raise ValueError("Missing semantic confidence")
        for edge in part.get("hyperedges", []):
            if not set(edge.get("nodes", [])) <= allowed_ids:
                raise ValueError("Missing hyperedge endpoint")


def assert_source_plan(run, config):
    current, _ = plan(config)
    expected = read_json(run / "source-plan.json")
    if expected["source_sha256"] != current["source_sha256"] or expected["config_sha256"] != current["config_sha256"]:
        raise ValueError("Fuentes cambiaron después de prepare. Preparar otro lote; no certificar hashes nuevos con extracción antigua.")
    prompt = ROOT / ".codex/skills/graphify/references/extraction-spec.md"
    if sha(prompt) != read_json(run / "semantic-plan.json")["prompt_sha256"]:
        raise ValueError("Extraction prompt changed after preparation")


def assert_live_baseline(run):
    for filename in OUTPUTS + ["ds-closure.json"]:
        original, current = run / "before" / filename, LIVE / filename
        if original.exists() != current.exists() or (original.exists() and sha(original) != sha(current)):
            raise ValueError("Live graph changed after prepare; preserve newer outputs and prepare another batch")


def publish(run, closure, live=LIVE):
    """Rollback regular errors; closure-last makes crash-partial outputs detectably STALE."""
    filenames = OUTPUTS
    try:
        for name in filenames:
            staged = run / "staged" / name
            temp = live / (name + ".ds-publish-tmp")
            shutil.copy2(staged, temp)
            os.replace(temp, live / name)
        dump(live / "ds-closure.json", closure)
    except BaseException:
        for name in filenames:
            backup = run / "before" / name
            if backup.exists():
                shutil.copy2(backup, live / name)
            else:
                (live / name).unlink(missing_ok=True)
        previous = run / "before/ds-closure.json"
        if previous.exists():
            shutil.copy2(previous, live / "ds-closure.json")
        else:
            (live / "ds-closure.json").unlink(missing_ok=True)
        raise
    finally:
        for name in filenames:
            (live / (name + ".ds-publish-tmp")).unlink(missing_ok=True)


@coordinated
def close(config, name):
    runtime_gate(config)
    run = run_path(name)
    if not (run / "source-plan.json").exists():
        raise ValueError("Lote no preparado")
    result = check_graph(config)
    if result['status'] == 'CURRENT':
        return {**result, 'message': 'Cierre vigente compartido; no se repitió extracción.',
                'run': read_json(LIVE / 'ds-closure.json')['run']}
    if (run / 'closure.json').exists():
        raise ValueError('Lote cerrado previamente; preparar otro para cambios posteriores.')
    assert_source_plan(run, config)
    assert_live_baseline(run)
    validate_fragments(run)
    from ds_core import yaml_documents, generate_status, documentation_check, render_status
    detection = read_json(run / "detection.json")
    paths = paths_of(detection)
    parsed = yaml_documents(paths)
    state = generate_status(parsed, paths, config)
    docs = documentation_check(parsed, paths, state, config)
    dump(run / "documentation-check.json", docs)
    if docs["status"] != "PASS":
        raise ValueError("QA documental FAIL; ver documentation-check.json")
    if (not (ROOT / "registry/generated/project-status.json").exists()
            or read_json(ROOT / "registry/generated/project-status.json") != state
            or (ROOT / "registry/generated/project-status.md").read_text() != render_status(state)):
        raise ValueError("Vista derivada desactualizada; ejecuta scripts/ds status --write")
    import ds_graph_engine as engine
    engine.initialize(run)
    with (run / "engine.log").open("a") as log, contextlib.redirect_stdout(log), contextlib.redirect_stderr(log):
        graph = build_staged(engine, run)
    assert_source_plan(run, config)
    assert_live_baseline(run)
    verification = read_json(run / "verification.json")
    closure = {
        "status": "CURRENT", "run": name, "files": len(paths),
        "nodes": len(graph["nodes"]), "edges": len(graph["links"]),
        "config_sha256": sha(ROOT / "config/ds-project.json"),
        "output_sha256": {p: sha(run / "staged" / p) for p in OUTPUTS},
        "source_link_limitations": len(verification["source_link_limitations"]),
        "semantic_usage": "UNAVAILABLE; not zero",
        "scope": "Local corpus freshness, deterministic documentation checks, no Figma QA or design approval"}
    from ds_incremental import tool_digest
    closure['extraction_tool_sha256'] = tool_digest(ROOT)
    closure['extraction_sha256'] = {p: sha(run / p) for p in ['ast.json', 'structural-supplement.json', 'source-plan.json']}
    publish(run, closure)
    dump(run / "closure.json", closure)
    return closure


def build_staged(engine, run):
    if not (run / "ast.json").exists():
        engine.ast()
    ast = read_json(run / "ast.json")
    if ast.get("failed_sources"):
        raise ValueError("AST extraction failed for sources; previous graph preserved: " + str(ast["failed_sources"]))
    expected = set(read_json(run / "detection.json")["files"].get("code", []))
    extracted = {str((ROOT / p).resolve()) for p in ast.get("extracted_sources", [])}
    if expected - extracted:
        raise ValueError("AST extraction coverage incomplete; previous graph preserved")
    engine.supplement()
    engine.assemble()
    from graphify.build import build_from_json
    from graphify.export import to_html
    graph = read_json(run / "staged/graph.json")
    communities = {}
    for n in graph["nodes"]:
        communities.setdefault(n["community"], []).append(n["id"])
    labels = {int(k): v for k, v in read_json(run / "staged/.graphify_labels.json").items()}
    # Use serialized edges with their provenance for a matching HTML export.
    G = build_from_json({"nodes": graph["nodes"], "edges": graph["links"]}, root=str(ROOT),
                        directed=graph.get("directed", False))
    if not to_html(G, communities, str(run / "staged/graph.html"), community_labels=labels, node_limit=5000):
        raise RuntimeError("HTML export failed")
    engine.verify()
    health = read_json(run / "staged/.graphify_health.json")
    if any(health.get(k) for k in ("unverified_node_count", "dangling_endpoint_edges", "missing_endpoint_edges")):
        raise ValueError("Unresolved graph integrity findings")
    engine.manifest()
    return graph


def dispatch(args, config):
    if args.operation == "plan":
        value, _ = plan(config)
        value.pop("source_sha256")
    elif args.operation == "check":
        value = check_graph(config)
    elif args.operation == "prepare":
        value = prepare(config, args.run)
    else:
        value = close(config, args.run)
    print(json.dumps(value, indent=2, ensure_ascii=False))
    return 1 if value.get("status") in {"STALE", "BLOCKED", "FAILED"} else 0
