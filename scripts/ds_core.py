"""Read-only project inspection and deterministic derived status. No network calls."""
from __future__ import annotations

import hashlib
import json
import os
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote
from ds_session import cached, ACTIVE as ACTIVE_SESSION

ROOT = Path(__file__).resolve().parent.parent
CONFIG = ROOT / "config/ds-project.json"
ACTIVE = {"APPROVED", "DELEGATED_FOR_BUILD"}
STATES = ACTIVE | {"DRAFT", "IN_REVIEW", "REJECTED", "SUPERSEDED"}
TICK = chr(96)


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def read_json(path):
    def unique(pairs):
        result = {}
        for key, value in pairs:
            if key in result:
                raise ValueError("Duplicate JSON key: " + key)
            result[key] = value
        return result
    return json.loads(Path(path).read_text(), object_pairs_hook=unique)


def dump(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    data = json.dumps(value, indent=2, ensure_ascii=False) + "\n"
    if path.exists() and path.read_text() == data:
        return False
    temporary = path.with_name(path.name + ".tmp")
    temporary.write_text(data)
    temporary.replace(path)
    return True


def relative(path, root=ROOT):
    return Path(path).resolve().relative_to(root.resolve()).as_posix()


def excluded(path, config):
    return (Path(path).parts[0] in config["exclude_roots"]
            or any(path.startswith(p) for p in config["exclude_prefixes"]))


@cached
def corpus(root=ROOT, config=None):
    """Use Graphify's protection filters, then narrowly supplement design sources."""
    config = config or read_json(root / "config/ds-project.json")
    from graphify.detect import detect
    detection = detect(root)
    for kind, paths in detection["files"].items():
        detection["files"][kind] = [
            p for p in paths if not excluded(relative(p, root), config)]
    for name in config["supplemental_design_data"]:
        path = root / name
        obj = read_json(path)
        def guard(value):
            if isinstance(value, dict):
                for k, v in value.items():
                    if re.fullmatch(r"password|passwd|secret|api_key|access_token|refresh_token|private_key", k, re.I):
                        raise ValueError("Credential-like key in supplemental design file: " + name)
                    guard(v)
            elif isinstance(value, list):
                for item in value:
                    guard(item)
        guard(obj)
        if str(path) not in detection["files"]["code"]:
            detection["files"]["code"].append(str(path))
    for pattern in config["supplemental_documents"]:
        for path in root.glob(pattern):
            if not path.read_text().startswith("flowchart "):
                raise ValueError("Unsupported supplemental diagram: " + str(path))
            if str(path) not in detection["files"]["document"]:
                detection["files"]["document"].append(str(path))
    # El detector genérico omite CSS y lockfiles. Son fuentes de la capa web,
    # por eso el proyecto enumera archivos concretos, sin ampliar todo el scan.
    for name in config.get("supplemental_web_sources", []):
        path = (root / name).resolve()
        if not path.is_relative_to((root / "implementations/web").resolve()) or path.suffix not in {".css", ".yaml"}:
            raise ValueError("Unsupported supplemental web source: " + name)
        path.read_text()  # Exigir fuente existente y texto UTF-8.
        if not any(str(path) in group for group in detection["files"].values()):
            detection["files"]["document"].append(str(path))
    # Los starters portables también tienen estilos operativos que el detector omite.
    for name in config.get("supplemental_skill_sources", []):
        path = (root / name).resolve()
        if not path.is_relative_to((root / "skills").resolve()) or path.suffix != ".css":
            raise ValueError("Unsupported supplemental skill source: " + name)
        path.read_text()
        if not any(str(path) in group for group in detection["files"].values()):
            detection["files"]["document"].append(str(path))
    # Shell entry point is operational source, even if detector does not recognize its suffix.
    launcher = root / "scripts/ds"
    if launcher.exists() and not any(str(launcher) in p for p in detection["files"].values()):
        detection["files"]["code"].append(str(launcher))
    for kind in detection["files"]:
        detection["files"][kind] = sorted(set(detection["files"][kind]))
    detection["total_files"] = sum(map(len, detection["files"].values()))
    return detection


def paths_of(detection, root=ROOT):
    return sorted({relative(p, root) for group in detection["files"].values() for p in group})


def _yaml_documents_uncached(paths, root=ROOT):
    rows = []
    prose = {}
    for path in paths:
        if not path.endswith((".md", ".yaml", ".yml")):
            continue
        text = (root / path).read_text()
        if path.endswith(".md"):
            if not text.startswith("---\n"):
                # Older contracts declare identity/state in prose. Read exact labels;
                # never infer approval from the folder, version or QA paragraphs.
                title = re.match(r"# ([A-Z][A-Z0-9-]+-\d+) · (.+) · v(\d+(?:\.\d+)+)\s*\n", text)
                status = re.search(r"^Estado: [`*]*([A-Z_]+)", text, re.M)
                if title and path.startswith(("specs/", "drafts/contracts/")):
                    meta = {"contract_id": title[1], "name": title[2], "version": title[3],
                            "metadata_origin": "explicit prose labels"}
                    if status:
                        meta["status"] = status[1]
                    audit = re.search(r"Auditoría humana:? [`*]*([A-Z_]+)", text)
                    page = re.search(r"[Pp]ágina semántica(?: exclusiva| de destino:)?\s+\*\*([^*]+)\*\*", text)
                    if audit:
                        meta["user_audit"] = audit[1]
                    if page:
                        meta["figma_page_name"] = page[1]
                    slots = [line for line in text.splitlines() if "P-SLOTS:" in line]
                    if slots:
                        meta["slot_applicability"] = slots
                    prose[path] = {"path": path, "value": meta, "errors": []}
                continue
            match = re.search(r"^---\s*$", text[4:], re.M)
            if not match:
                rows.append({"path": path, "text": "invalid: [unterminated"})
                continue
            text = text[4:4 + match.start()]
        rows.append({"path": path, "text": text})
    result = subprocess.run(
        ["ruby", str(ROOT / "scripts/ds_yaml.rb")],
        input=json.dumps(rows), capture_output=True, text=True, timeout=120)
    if result.returncode:
        raise RuntimeError("Ruby/Psych no disponible o falló: " + result.stderr.strip())
    return {**prose, **{row["path"]: row for row in json.loads(result.stdout)}}


def as_list(value):
    return value if isinstance(value, list) else ([] if value is None else [value])


def markdown_links(text):
    """Inline and reference links outside fenced code; anchors deliberately not validated."""
    fence = None
    definitions = {}
    lines = []
    for line_no, line in enumerate(text.splitlines(), 1):
        opening = re.match(r"^\s*(" + TICK + r"{3,}|~{3,})", line)
        if opening:
            char = opening[1][0]
            fence = None if fence == char else (char if fence is None else fence)
            continue
        if fence:
            continue
        definition = re.match(r"^\s*\[([^\]]+)\]:\s*(<[^>]+>|\S+)", line)
        if definition:
            definitions[definition[1].lower()] = definition[2].strip("<>")
            yield line_no, definition[2].strip("<>")
            continue
        lines.append((line_no, line))
        for match in re.finditer(r"!?\[[^\]]*\]\((<[^>]+>|[^)\s]+)(?:\s+['\"].*?['\"])?\)", line):
            yield line_no, match[1].strip("<>")


def local_target(source, link, root=ROOT):
    target = unquote(link.split("#", 1)[0])
    if not target or re.match(r"^[a-zA-Z][\w+.-]*:", target):
        return None
    resolved = ((root / source).parent / target).resolve()
    if not resolved.is_relative_to(root.resolve()):
        return None  # External local links are not repository references.
    return resolved.relative_to(root.resolve()).as_posix()


def contract_records(parsed, root=ROOT):
    records = []
    for path, entry in sorted(parsed.items()):
        value = entry["value"]
        if (entry["errors"] or not path.endswith(".md")
                or not path.startswith(("specs/", "drafts/contracts/"))
                or ".source.component-contract." in path
                or not isinstance(value, dict)):
            continue
        identity = value.get("contract_id") or value.get("amendment_id")
        if not identity:
            continue
        records.append({
            "id": identity, "path": path, "sha256": sha(root / path),
            "kind": "amendment" if ("amendment" in path or value.get("amendment_id")
                                   or "amendment" in str(value.get("type", ""))) else "base",
            "metadata": value,
        })
    return records


def resolve_bases(records):
    """Only explicit supersedes or base_version can select among eligible bases."""
    candidates = [r for r in records if r["kind"] == "base"
                  and r["metadata"].get("status") in ACTIVE]
    replaced = set()
    for record in candidates:
        meta = record["metadata"]
        for ref in as_list(meta.get("supersedes")):
            for other in candidates:
                if ref == other["path"] or ref == other["id"] + "/" + str(other["metadata"].get("version")):
                    replaced.add(other["path"])
        if meta.get("base_version") is not None:
            replaced.update(r["path"] for r in candidates
                            if r["metadata"].get("version") == meta["base_version"])
    return [r for r in candidates if r["path"] not in replaced]


@cached
def generate_status(parsed, paths, config, root=ROOT):
    records = contract_records(parsed, root)
    by_id = defaultdict(list)
    for record in records:
        by_id[record["id"]].append(record)
    prose = {r["source"]: r for r in config.get("prose_relations", [])}
    issues = []
    for path, row in prose.items():
        if (not (root / path).exists() or sha(root / path) != row["source_sha256"]
                or row.get("evidence_contains", "") not in (root / path).read_text()):
            issues.append({"control": "STATE-RELATION", "path": path,
                           "message": "Prose relation evidence changed; requires reinspection."})
    contexts = []
    for row in config.get("family_context_selectors", []):
        file = root / row["source"]
        text = file.read_text() if file.exists() else ""
        heading = row["heading"]
        if not file.exists() or sha(file) != row["source_sha256"] or (heading + "\n") not in text:
            issues.append({"control": "STATE-CONTEXT", "path": row["source"],
                           "message": "Scoped closure/exception evidence changed; reinspect selector."})
            continue
        body = text.split(heading + "\n", 1)[1].split("\n## ", 1)[0].strip()
        contexts.append({**row, "text": body,
                         "line": text[:text.index(heading)].count("\n") + 1})
    states = []
    for path in paths:
        if path.startswith("implementations/") and path.endswith(".json"):
            try:
                value = read_json(root / path)
                if isinstance(value, dict):
                    states.append((path, value))
            except (ValueError, OSError):
                pass
    families = []
    for identity, family_records in sorted(by_id.items()):
        base_records = [r for r in family_records if r["kind"] == "base"]
        if not base_records:
            continue
        selected = resolve_bases(family_records)
        resolution = "RESOLVED" if len(selected) == 1 else ("AMBIGUOUS" if selected else "CANDIDATE_ONLY")
        if len(selected) > 1:
            issues.append({"control": "STATE-BASE", "path": ", ".join(r["path"] for r in selected),
                           "message": "Multiple eligible bases without explicit substitution: " + identity})
        base = selected[0] if len(selected) == 1 else None
        amendments = []
        for record in records:
            if record["kind"] != "amendment":
                continue
            meta = record["metadata"]
            targets = as_list(meta.get("applies_to"))
            if record["id"] == identity:
                targets.append(identity)
            if meta.get("base_contract") in {r["path"] for r in base_records}:
                targets.append(identity)
            if record["path"] in prose and not any(
                    x["path"] == record["path"] for x in issues):
                targets.extend(prose[record["path"]]["targets"])
            if identity in targets:
                amendments.append(record)
        relevant = ({r["path"] for r in selected} | {r["path"] for r in amendments
                      if r["metadata"].get("status") in ACTIVE})
        linked_states = set()
        for source in relevant:
            for _, link in markdown_links((root / source).read_text()):
                target = local_target(source, link, root)
                if target and target.startswith("implementations/") and target.endswith(".json"):
                    linked_states.add(target)
        evidence = []
        for path, value in states:
            # Exact declared contract paths, never filename recency, control association.
            declared = set()
            for key in ("contract", "contract_ref", "contractRef", "contractPath", "contract_path",
                        "amendment", "amendment_ref", "contracts"):
                for item in as_list(value.get(key)):
                    if isinstance(item, str):
                        declared.add(item)
                    elif isinstance(item, dict):
                        declared.update(v for v in item.values() if isinstance(v, str))
            if declared & relevant or path in linked_states:
                evidence.append({"path": path, "contract_refs": sorted(declared & relevant),
                    "declared": {k: value[k] for k in (
                        "status", "implementationValidation", "implementation_status", "implementationStatus", "scope",
                        "userAudit", "user_audit", "publication", "remotePublication", "libraryPublication",
                        "qa", "notValidated", "observations", "pendingValidations") if k in value}})
        qa = set()
        authority = set()
        for path in relevant:
            text = (root / path).read_text()
            for _, link in markdown_links(text):
                target = local_target(path, link, root)
                if target and target.startswith("qa/"):
                    qa.add(target)
                if target and target.startswith("registry/"):
                    authority.add(target)
        # Supplemental fields quote their source; absence stays UNKNOWN.
        fields = {}
        for field in ("status", "user_audit", "figma_page_name", "review_targets",
                      "readiness_by_target", "slot_applicability", "implementation_review",
                      "implementation_status"):
            values = [{"source": r["path"], "value": r["metadata"][field]}
                      for r in ([base] if base else []) + amendments
                      if field in r["metadata"] and r["metadata"].get("status") in ACTIVE]
            fields[field] = values or "UNKNOWN"
        families.append({"id": identity, "resolution": resolution, "base": base,
                         "base_history_and_candidates": [r for r in base_records if r is not base],
                         "amendments": amendments, "declared_fields_by_scope": fields,
                         "implementation_evidence": evidence, "qa_refs": sorted(qa),
                         "authority_refs": sorted(authority),
                         "closure_and_exception_evidence": [r for r in contexts if identity in r["targets"]],
                         "next_action": ("Resolve eligible base before use" if resolution == "AMBIGUOUS"
                                         else "Inspect scoped QA, exceptions and unvalidated fields; no global PASS inferred")})
    used = [p for p in paths if p.startswith(("specs/", "drafts/contracts/", "implementations/",
                                             "registry/", "qa/")) and p.endswith((".md", ".json", ".yaml", ".yml"))]
    used.extend(["config/ds-project.json", "scripts/ds_core.py", "scripts/ds_yaml.rb"])
    grouped = {r["path"] for f in families for r in f["amendments"]}
    standalone = [r for r in records if r["kind"] == "amendment" and r["path"] not in grouped]
    return {"schema_version": 1, "kind": "DERIVED_NOT_AUTHORITY",
            "source_sha256": {p: sha(root / p) for p in sorted(set(used)) if (root / p).is_file()},
            "selection_rule": "Explicit statuses and substitution; never highest version or latest date",
            "issues": issues, "families": families, "standalone_amendments": standalone}


def render_status(data):
    def link(path, label=None):
        return "[" + (label or path) + "](../../" + path + ")"
    out = ["# Estado por familia · vista derivada", "",
           "Generado por scripts/ds status --write. No editar. Los contratos y registros enlazados gobiernan.",
           "La base se resuelve solo mediante relaciones explícitas; las enmiendas conservan su alcance.",
           "Los estados de QA son evidencia declarada por documento, sin nueva lectura Figma ni aprobación.",
           "", "| Familia | Base | Estado documental | Enmiendas | Evidencia de implementación |",
           "|---|---|---|---|---|"]
    for family in data["families"]:
        base = family["base"]
        summary = (link(base["path"], str(base["metadata"].get("version", "UNKNOWN"))) if base
                   else family["resolution"])
        status = base["metadata"].get("status", "UNKNOWN") if base else "UNKNOWN"
        out.append("| " + family["id"] + " | " + summary + " | " + status + " | "
                   + str(len(family["amendments"])) + " | "
                   + str(len(family["implementation_evidence"])) + " registros por alcance |")
    for family in data["families"]:
        out += ["", "## " + family["id"], ""]
        if family["base"]:
            out += ["Base: " + link(family["base"]["path"]) + "."]
        out += ["Resolución: " + family["resolution"] + ". Auditoría, preparación y QA permanecen separados.", ""]
        for field, label in [("user_audit", "Auditoría humana"), ("figma_page_name", "Página declarada"),
                             ("readiness_by_target", "Preparación"), ("slot_applicability", "Slots"),
                             ("implementation_review", "Revisión de implementación declarada")]:
            values = family["declared_fields_by_scope"][field]
            out.append("- " + label + ": " + ("UNKNOWN" if values == "UNKNOWN" else "; ".join(
                str(row["value"]) + " en " + link(row["source"]) for row in values)) + ".")
        for amendment in family["amendments"]:
            meta = amendment["metadata"]
            scope = (meta.get("supersedes_scope") or meta.get("supersedes_requirement")
                     or meta.get("affected_requirements") or "Consultar alcance en la enmienda")
            out.append("- Enmienda: " + link(amendment["path"]) + " — "
                       + str(meta.get("status", "UNKNOWN")) + "; " + str(scope) + ".")
        for evidence in family["implementation_evidence"]:
            out.append("- Implementación: " + link(evidence["path"]) + " — "
                       + json.dumps(evidence["declared"], ensure_ascii=False) + ".")
        if family["qa_refs"]:
            out.append("- QA por alcance: " + ", ".join(link(p) for p in family["qa_refs"]) + ".")
        if family["authority_refs"]:
            out.append("- Autoridad/registro: " + ", ".join(link(p) for p in family["authority_refs"]) + ".")
        if family["base_history_and_candidates"]:
            out.append("- Historia/candidatos: " + ", ".join(link(r["path"])
                        for r in family["base_history_and_candidates"]) + ".")
        for context in family.get("closure_and_exception_evidence", []):
            out += ["", "Cierre/excepción con alcance explícito: " + link(context["source"], context["heading"].lstrip("# "))
                    + " (línea " + str(context["line"]) + ").", ""]
            # Quote text as source evidence. Rewrite only inline relative links so
            # the derived view remains navigable from its own directory.
            body = re.sub(r"(\]\()([^\s)]+)(\))", lambda m: m[1] + (
                "../../" + local_target(context["source"], m[2])
                if local_target(context["source"], m[2]) else m[2]) + m[3], context["text"])
            out += ["> " + line for line in body.splitlines()]
            out.append("")
        out += ["- Preparación no declarada: UNKNOWN; no se deduce del estado documental.",
                "- Pendientes/excepciones: " + link("specs/MIGRATION-AUDIT.md", "auditoría")
                + " y " + link("specs/MIGRATION-TRACEABILITY-STATUS.md", "trazabilidad vigente") + "."]
    if data.get("standalone_amendments"):
        out += ["", "## Enmiendas sin asociación automática a una base", "",
                "Conservan su identidad y alcance propios; consultar relaciones explícitas en cada documento.", ""]
        out += ["- " + link(r["path"]) + " — " + str(r["metadata"].get("status", "UNKNOWN")) + "."
                for r in data["standalone_amendments"]]
    return "\n".join(out) + "\n"


@cached
def documentation_check(parsed, paths, status, config, root=ROOT):
    findings = []
    def add(control, path, message, severity="ERROR", line=None):
        findings.append(dict(control=control, path=path, line=line,
                             severity=severity, message=message))
    counts = defaultdict(int)
    exceptions = config.get("historical_link_exceptions", [])
    for path in paths:
        file = root / path
        if path.endswith(".json"):
            counts["json"] += 1
            try:
                read_json(file)
            except (ValueError, OSError) as e:
                add("DOC-JSON", path, str(e))
        if path in parsed:
            meta = parsed[path].get("value")
            key = "prose_metadata" if isinstance(meta, dict) and meta.get("metadata_origin") else "yaml_or_frontmatter"
            counts[key] += 1
            for error in parsed[path]["errors"]:
                add("DOC-YAML", path, error)
        if path.endswith(".md"):
            for line, target in markdown_links(file.read_text()):
                local = local_target(path, target, root)
                if local and not (root / local).exists():
                    matching = [x for x in exceptions if x["source"] == path and x["target"] == target
                                and x["line"] == line and x["source_sha256"] == sha(file)]
                    add("DOC-LINK", path, target, "HISTORICAL" if matching else "ERROR", line)
    records = contract_records(parsed, root)
    declared_ids = set()
    for path in paths:
        if path.endswith(".md") and path.startswith(("registry/", "specs/")):
            for line in (root / path).read_text().splitlines():
                if line.startswith("#"):
                    declared_ids.update(re.findall(r"\b[A-Z][A-Z0-9-]+-\d{3}\b", line))
    declared_ids.update(r["id"] for r in records)
    for record in records:
        path, meta = record["path"], record["metadata"]
        if meta.get("status") not in STATES:
            add("DOC-STATUS", path, "Unknown document status: " + str(meta.get("status")))
        if record["kind"] == "base" and not meta.get("version"):
            add("DOC-VERSION", path, "Base contract has no declared version")
        if record["kind"] == "base" and meta.get("status") in ACTIVE:
            for dependency in as_list(meta.get("dependencies")):
                if not isinstance(dependency, str):
                    add("DOC-DEPENDENCY", path, "Non-string dependency")
                elif not (root / dependency).is_file() and dependency.split("@")[0] not in declared_ids:
                    add("DOC-DEPENDENCY", path, "Unresolved declared dependency: " + dependency, "WARNING")
        for field in ("data_refs", "source_data_ref", "base_contract", "foundation_dependency"):
            for ref in as_list(meta.get(field)):
                if isinstance(ref, str) and ref.endswith((".json", ".yaml", ".yml", ".md")):
                    if not (root / ref).exists() and not ((root / path).parent / ref).exists():
                        add("DOC-REFERENCE", path, field + ": " + ref)
        if meta.get("source_data_ref") and meta.get("source_data_digest_sha256"):
            ref = root / meta["source_data_ref"]
            if ref.exists() and sha(ref) != meta["source_data_digest_sha256"]:
                add("DOC-DIGEST", path, "source_data_digest_sha256 does not match " + meta["source_data_ref"])
    for item in status["issues"]:
        add(item["control"], item["path"], item["message"])
    for path, guard in config["protected_data"].items():
        if not (root / path).exists() or sha(root / path) != guard["sha256"]:
            add("DOC-PROTECTED", path, "Canonical data differ from configured approved reference")
    version = config["protocol_package"]
    for path, pattern in [("AGENTS.md", r"\*\*Paquete de protocolos:\*\*\s*([\d.]+)"),
                          ("README.md", r"\*\*Versión operativa integrada:\*\*\s*([\d.]+)")]:
        match = re.search(pattern, (root / path).read_text())
        if not match or match[1] != version:
            add("DOC-PACKAGE", path, "Expected documented package version " + version)
    if not re.search(r"^## " + re.escape(version) + r"\b", (root / "CHANGELOG.md").read_text(), re.M):
        add("DOC-PACKAGE", "CHANGELOG.md", "Package version missing from changelog: " + version)
    return {"status": "FAIL" if any(f["severity"] == "ERROR" for f in findings) else "PASS",
            "counts": dict(counts), "findings": findings,
            "scope": "Deterministic documentation checks; no semantic approval, Figma readback or web QA"}


def explicit_yaml_file_references(text):
    """Exact repository-relative paths declared as YAML scalars; no ID/name inference."""
    if not text.startswith('---\n'):
        return []
    result = []
    for line, value in enumerate(text.splitlines()[1:], 2):
        if value.strip() == '---': break
        match = re.fullmatch(r"\s*(?:-\s+|[\w-]+:\s+)[\"']?([a-zA-Z0-9_./-]+\.(?:md|json|yaml|yml))[\"']?\s*", value)
        if match:
            path = match[1]
            if not Path(path).is_absolute() and '..' not in Path(path).parts:
                result.append((line,path))
    return result


def yaml_documents(paths, root=ROOT):
    session = ACTIVE_SESSION.get()
    if session is None:
        return _yaml_documents_uncached(paths, root)
    parser = sha(ROOT / 'scripts/ds_yaml.rb') + sha(ROOT / 'scripts/ds_core.py')
    wanted = [p for p in paths if p.endswith(('.md', '.yaml', '.yml'))]
    keys = {p: ('yaml-file', str(Path(root).resolve()), p, sha(Path(root) / p), parser) for p in wanted}
    cache_path = Path(root) / 'output/closures/yaml-cache.json'
    store_key = ('yaml-store', str(Path(root).resolve()))
    if store_key not in session.cache:
        rows = {}
        try:
            saved = read_json(cache_path)
            payload = json.dumps(saved['rows'], sort_keys=True, ensure_ascii=False).encode()
            if saved.get('schema_version') == 1 and saved.get('payload_sha256') == hashlib.sha256(payload).hexdigest():
                rows = saved['rows']
        except (OSError, ValueError, KeyError, TypeError):
            pass
        session.cache[store_key] = rows
    rows = session.cache[store_key]
    persisted = 0
    for p in wanted:
        old = rows.get(p, {})
        if keys[p] not in session.cache and old.get('content_sha256') == keys[p][3] and old.get('parser_sha256') == parser and 'result' in old:
            session.cache[keys[p]] = old['result']
            persisted += 1
    missing = [p for p in wanted if keys[p] not in session.cache]
    if missing:
        parsed = _yaml_documents_uncached(missing, root)
        for p in missing:
            session.cache[keys[p]] = parsed.get(p)
            rows[p] = {'content_sha256': keys[p][3], 'parser_sha256': parser, 'result': parsed.get(p)}
        payload = json.dumps(rows, sort_keys=True, ensure_ascii=False).encode()
        dump(cache_path, {'schema_version': 1, 'payload_sha256': hashlib.sha256(payload).hexdigest(), 'rows': rows})
    counter = session.counts.setdefault('yaml_files', {'executed': 0, 'reused': 0, 'persisted_reused': 0})
    counter['executed'] += len(missing)
    counter['reused'] += len(wanted) - len(missing)
    counter['persisted_reused'] += persisted
    from copy import deepcopy
    return {p: deepcopy(session.cache[keys[p]]) for p in wanted if session.cache[keys[p]] is not None}
