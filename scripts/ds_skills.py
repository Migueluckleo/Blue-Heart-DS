"""Deterministic, immutable consumer skill releases. No network or global installation."""
from __future__ import annotations

import fnmatch
import hashlib
import io
import json
import os
import re
import shutil
import tempfile
import zipfile
from ds_session import cached, coordinated
from pathlib import Path, PurePosixPath

from ds_core import ROOT, ACTIVE, read_json, markdown_links, local_target, yaml_documents, generate_status

SEMVER = re.compile(r"(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)\Z")
SECRET = re.compile(r"(?:^|/)(?:\.env(?:\..*)?|id_rsa|id_ed25519|credentials(?:\..*)?|secrets?(?:\..*)?)$", re.I)
RESERVED = ("assets/design-system/", "assets/snapshot-manifest.json", "assets/release.json", "references/components.json")


def digest(data):
    return hashlib.sha256(data).hexdigest()


def compact(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")


def encoded(value):
    return (json.dumps(value, ensure_ascii=False, indent=2) + "\n").encode("utf-8")


def safe(root, name):
    """Reject traversal and symlinks, including symlinked parent directories."""
    root = Path(root).resolve()
    pure = PurePosixPath(name)
    if not name or pure.is_absolute() or ".." in pure.parts or "\\" in name:
        raise ValueError("Unsafe package path: " + name)
    candidate = root.joinpath(*pure.parts)
    for p in (candidate, *candidate.parents):
        if p == root:
            break
        if p.is_symlink():
            raise ValueError("Symlink not allowed: " + name)
    if not candidate.resolve().is_relative_to(root):
        raise ValueError("Path escapes root: " + name)
    return candidate


def matches(name, patterns):
    return any(fnmatch.fnmatchcase(name, pattern) for pattern in patterns)


def forbidden(name, config):
    return bool(SECRET.search(name) or matches(name, config.get("exclude", []))
                or any(p in {"node_modules", ".git", ".next", "__pycache__", ".pnpm-store"} for p in PurePosixPath(name).parts))


def source_selection(root, config, project):
    selected = set()
    for pattern in config["include"]:
        if PurePosixPath(pattern).is_absolute() or ".." in PurePosixPath(pattern).parts:
            raise ValueError("Unsafe include pattern")
        for p in root.glob(pattern + "/*" if pattern.endswith("/**") else pattern):
            name = p.relative_to(root).as_posix()
            if forbidden(name, config):
                continue
            safe(root, name)
            if p.is_file():
                selected.add(name)
    if not selected:
        raise ValueError("Empty DS source selection")
    # Close document references within declared dependency roots. Every omitted
    # reference is explicit; missing references need an exact historical waiver.
    pending = sorted(selected)
    processed = set()
    exclusions = []
    exceptions = project.get("historical_link_exceptions", [])
    while pending:
        source = pending.pop()
        if source in processed or not source.endswith(".md"):
            continue
        processed.add(source)
        file = safe(root, source)
        source_hash = digest(file.read_bytes())
        for line, target in markdown_links(file.read_text()):
            local = local_target(source, target, root)
            if not local:
                raw_path = target.split("#", 1)[0]
                if raw_path and not re.match(r"^[a-zA-Z][\w+.-]*:", raw_path) and not raw_path.startswith("//"):
                    exclusions.append({"source": source, "line": line, "target": target,
                                       "resolved": None, "source_sha256": source_hash,
                                       "reason": "OUTSIDE_REPOSITORY_LOCAL_REFERENCE"})
                continue
            allowed = local in config.get("link_dependency_files", []) or any(
                local == base or local.startswith(base + "/") for base in config.get("link_dependency_roots", []))
            historical = any(e["source"] == source and e["target"] == target
                             and e["line"] == line and e["source_sha256"] == source_hash for e in exceptions)
            omitted = forbidden(local, config) or not allowed and local not in selected
            if omitted or historical:
                exclusions.append({"source": source, "line": line, "target": target,
                                   "resolved": local, "source_sha256": source_hash,
                                   "reason": "PINNED_HISTORICAL_REFERENCE" if historical else config["excluded_link_reason"]})
                continue
            path = safe(root, local)
            if not path.exists():
                raise ValueError(f"Missing snapshot dependency: {source}:{line} -> {target}")
            if path.is_dir():
                continue  # A navigational directory reference is not a recursive include.
            if local not in selected:
                selected.add(local)
                pending.append(local)
    return sorted(selected), sorted(exclusions, key=lambda e: (e["source"], e["line"], e["target"]))


def component_index(root, paths, project):
    registry = read_json(root / "implementations/web/components.registry.json")
    parsed = yaml_documents(paths, root)
    parse_errors = [{"path": name, "errors": row["errors"]} for name, row in parsed.items() if row.get("errors")]
    if parse_errors:
        raise ValueError("Cannot publish invalid source metadata: " + json.dumps(parse_errors, ensure_ascii=False))
    data = generate_status(parsed, paths, project, root)
    if data["issues"]:
        raise ValueError("Unresolved source status: " + json.dumps(data["issues"], ensure_ascii=False))
    families = {f["id"]: f for f in data["families"] if f["base"] and f["base"]["metadata"].get("type") != "tooling" and not f["id"].startswith(("FOUNDATIONS-", "MIGRATION-"))}
    ids = [r["id"] for r in registry]
    if len(ids) != len(set(ids)) or set(ids) != set(families):
        raise ValueError("Skill family coverage differs from current contract registry")
    result = []
    for row in sorted(registry, key=lambda x: x["id"]):
        family = families[row["id"]]
        base = family["base"]
        if row["base"] != base["path"]:
            raise ValueError("Stale web contract mapping: " + row["id"])
        amendments = sorted(set(row["amendments"]) | {a["path"] for a in family["amendments"]
                                                      if a["metadata"].get("status") in ACTIVE})
        refs = [row["base"], *amendments]
        if any(p not in paths for p in refs):
            raise ValueError("Component contract absent from selection: " + row["id"])
        meta = base["metadata"]
        figma = {key: meta[key] for key in ("figma_page_name", "target_file_key", "figma_file_key", "target_node_id", "figma_node_id", "figma_page_id", "target_node_ids") if key in meta}
        if figma:
            figma["source"] = base["path"]
            figma["evidence"] = "EXPLICIT_CONTRACT_METADATA; not a live Figma readback"
        result.append({"id": row["id"], "slug": row["slug"], "name": row["name"],
                       "contract": row["base"], "base": row["base"], "amendments": amendments,
                       "exports": row["exports"], "exportName": row["exports"][0] if row["exports"] else None,
                       "version": meta.get("version"), "figma": figma or None})
    return result


@cached
def source_inputs(root=ROOT):
    root = Path(root).resolve()
    config = read_json(safe(root, "config/ds-skills.json"))
    project = read_json(safe(root, "config/ds-project.json"))
    names = config["skills"]
    if len(names) != 2 or len(set(names)) != 2 or any(not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", n) for n in names):
        raise ValueError("Exactly two distinct skill names are required")
    safe(root, config["output"])
    paths, omissions = source_selection(root, config, project)
    files = {p: digest(safe(root, p).read_bytes()) for p in paths}
    components = component_index(root, paths, project)
    templates = {}
    for name in names:
        directory = safe(root, "skills/" + name)
        if not (directory / "SKILL.md").is_file():
            raise ValueError("Missing SKILL.md: " + name)
        entries = {}
        for path in directory.rglob("*"):
            rel = path.relative_to(directory).as_posix()
            safe(directory, rel)
            if not path.is_file() or forbidden(rel, config):
                continue
            if any(rel == prefix or rel.startswith(prefix) for prefix in RESERVED):
                raise ValueError("Generated snapshot in template: " + rel)
            entries[rel] = digest(path.read_bytes())
        templates[name] = dict(sorted(entries.items()))
    tool_files = ["schemas/consumption-query.v1.schema.json", "scripts/consumer_graph.py", "scripts/resolve_ds.py", "scripts/ds_skills.py", "scripts/ds_core.py", "scripts/ds_yaml.rb", "config/ds-skills.json", "config/ds-project.json"]
    fingerprint = {"files": files, "templates": templates, "components": components, "excluded_links": omissions,
                   "tooling": {p: digest(safe(root, p).read_bytes()) for p in tool_files}}
    return {"root": root, "config": config, "files": files, "templates": templates,
            "components": components, "excluded_links": omissions, "ds_digest": digest(compact(files)),
            "input_digest": digest(compact(fingerprint)), "fingerprint": fingerprint}


def inputs(root=ROOT):
    state = source_inputs(root)
    if state["config"].get("delivery") == "github-live-v1":
        # The installed engine changes only with its own instructions/tooling.
        # DS content has an independent catalog identity in catalog/current.json.
        figma = read_json(safe(state["root"], "config/figma-links.json"))
        master_key = figma["master_destination"]["file_key"]
        if not re.fullmatch(r"[A-Za-z0-9]+", master_key) or master_key == figma["root_source"]["file_key"]:
            raise ValueError("Invalid BlueHeart master file key")
        channel = state["config"]["channel"]
        if not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", channel["repository"]) or not re.fullmatch(r"[A-Za-z0-9_-]+", channel["branch"]):
            raise ValueError("Invalid GitHub catalog channel")
        fingerprint = {"templates": state["templates"], "tooling": state["fingerprint"]["tooling"],
                       "figma_library_file_key": master_key}
        state.update(files={}, components=[], excluded_links=[], ds_digest="REMOTE",
                     fingerprint=fingerprint, input_digest=digest(compact(fingerprint)))
    return state


def package_files(state, version, name):
    root = state["root"]
    result = {p: safe(root, "skills/" + name + "/" + p) for p in state["templates"][name]}
    if state["config"].get("delivery") == "github-live-v1":
        result["scripts/resolve_ds.py"] = safe(root, "scripts/resolve_ds.py")
        result["scripts/consumer_graph.py"] = safe(root, "scripts/consumer_graph.py")
        result["references/consumption-query.v1.schema.json"] = safe(root, "schemas/consumption-query.v1.schema.json")
        result["assets/engine.json"] = encoded({"engine_protocol": 1, "version": version,
            "skill_name": name, "companion_skill": next(n for n in state["config"]["skills"] if n != name),
            "delivery": state["config"]["delivery"], **state["config"]["channel"],
            "figma_library_file_key": state["fingerprint"]["figma_library_file_key"]})
        return dict(sorted(result.items()))
    result.update({"assets/design-system/" + p: safe(root, p) for p in state["files"]})
    manifest = {"schema_version": 1, "package_version": version, "ds_digest": state["ds_digest"],
                "authority": state["config"]["authority"], "files": state["files"],
                "components": state["components"], "excluded_links": state["excluded_links"]}
    result["assets/snapshot-manifest.json"] = encoded(manifest)
    result["references/components.json"] = encoded(state["components"])
    result["assets/release.json"] = encoded({"version": version, "ds_digest": state["ds_digest"],
        "skill_name": name, "companion_skill": next(n for n in state["config"]["skills"] if n != name)})
    return dict(sorted(result.items()))


def content(value):
    return value.read_bytes() if isinstance(value, Path) else value


def tree_hashes(files):
    return {p: digest(content(value)) for p, value in files.items()}


def zip_bytes(name, files):
    stream = io.BytesIO()
    with zipfile.ZipFile(stream, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path, value in sorted(files.items()):
            item = zipfile.ZipInfo(name + "/" + path, date_time=(1980, 1, 1, 0, 0, 0))
            item.create_system = 3
            item.external_attr = (0o100644 << 16)
            item.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(item, content(value), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    return stream.getvalue()


def next_version(version, bump):
    match = SEMVER.fullmatch(version)
    if not match:
        raise ValueError("Invalid release version: " + version)
    major, minor, patch = map(int, match.groups())
    return f"{major + 1}.0.0" if bump == "major" else f"{major}.{minor + 1}.0" if bump == "minor" else f"{major}.{minor}.{patch + 1}"


def expected_release(state, version):
    if not SEMVER.fullmatch(version):
        raise ValueError("Invalid release version")
    result = {}
    packages = {}
    for name in state["config"]["skills"]:
        files = package_files(state, version, name)
        packages[name] = {"files": tree_hashes(files)}
        result.update({name + "/" + path: value for path, value in files.items()})
        archive_name = name + "-" + version + ".zip"
        archive = zip_bytes(name, files)
        result[archive_name] = archive
        packages[name].update({"archive": archive_name, "sha256": digest(archive), "bytes": len(archive)})
    manifest = {"schema_version": 1, "version": version, "input_digest": state["input_digest"],
                "ds_digest": state["ds_digest"], "components": len(state["components"]),
                "packages": packages, "inputs": state["fingerprint"]}
    result["manifest.json"] = encoded(manifest)
    return result, manifest


def inspect_tree(directory, expected):
    if not directory.is_dir():
        return ["Missing release directory"]
    actual = set()
    errors = []
    for path in directory.rglob("*"):
        rel = path.relative_to(directory).as_posix()
        try:
            safe(directory, rel)
        except ValueError as error:
            errors.append(str(error))
            continue
        if path.is_file():
            actual.add(rel)
    for name in sorted(set(expected) - actual):
        errors.append("Missing: " + name)
    for name in sorted(actual - set(expected)):
        errors.append("Unexpected: " + name)
    for name in sorted(actual & set(expected)):
        if digest(safe(directory, name).read_bytes()) != digest(content(expected[name])):
            errors.append("Changed: " + name)
    return errors


def current_record(state):
    path = safe(state["root"], state["config"]["output"] + "/current.json")
    return read_json(path) if path.is_file() else None


def check(root=ROOT, state=None):
    try:
        state = state or inputs(root)
        current = current_record(state)
        if not current:
            return {"status": "STALE", "errors": ["No skill release; run scripts/ds skills sync"]}
        version = current.get("version", "")
        if not SEMVER.fullmatch(version):
            raise ValueError("Invalid current release version")
        if current.get("input_digest") != state["input_digest"]:
            return {"status": "STALE", "version": version, "errors": ["Selected DS sources, skill templates or release tooling changed"]}
        expected, manifest = expected_release(state, version)
        errors = inspect_tree(safe(state["root"], state["config"]["output"] + "/" + version), expected)
        if current != pointer(manifest):
            errors.append("current.json does not match release manifest")
        if state["config"].get("delivery") == "github-live-v1":
            from ds_remote import check_catalog
            catalog = check_catalog(state["root"])
            if catalog["status"] != "CURRENT":
                errors.extend(catalog.get("errors", ["GitHub catalog source is stale"]))
        return {"status": "STALE" if errors else "CURRENT", "version": version,
                "ds_digest": state["ds_digest"], "components": len(state["components"]), "errors": errors,
                "scope": "Package integrity and source freshness; no design approval or live Figma/web QA"}
    except (ValueError, OSError, KeyError, TypeError) as error:
        return {"status": "BLOCKED", "errors": [str(error)]}


def pointer(manifest):
    return {"schema_version": 1, "version": manifest["version"], "input_digest": manifest["input_digest"],
            "ds_digest": manifest["ds_digest"], "manifest": manifest["version"] + "/manifest.json",
            "manifest_sha256": digest(encoded(manifest))}


@coordinated
def sync(root=ROOT, bump="patch", state=None):
    state = state or inputs(root)
    current = current_record(state)
    if current and current.get("input_digest") == state["input_digest"]:
        result = check(root, state)
        if result["status"] != "CURRENT":
            raise ValueError("Existing release is damaged; immutable releases cannot be repaired in place: " + str(result["errors"]))
        return {**result, "operation": "UNCHANGED"}
    version = next_version(current["version"], bump) if current else state["config"]["initial_version"]
    if not SEMVER.fullmatch(version):
        raise ValueError("Invalid initial version")
    out = safe(state["root"], state["config"]["output"])
    target = safe(out, version)
    if target.exists():
        raise ValueError("Version collision; historical release preserved: " + version)
    expected, manifest = expected_release(state, version)
    out.mkdir(parents=True, exist_ok=True)
    staging = Path(tempfile.mkdtemp(prefix=".staging-", dir=out))
    try:
        for name, value in expected.items():
            path = safe(staging, name)
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(content(value))
        errors = inspect_tree(staging, expected)
        if errors:
            raise ValueError("Staged release failed verification: " + str(errors))
        # Re-read fingerprints before publication; concurrent source changes never
        # receive a release for an older source plan.
        fresh = inputs(state["root"])
        if fresh["input_digest"] != state["input_digest"] or current_record(state) != current:
            raise ValueError("Sources or current release changed during packaging; retry")
        if target.exists():
            raise ValueError("Version collision during publication")
        staging.rename(target)
        temp_pointer = out / ".current.tmp"
        temp_pointer.write_bytes(encoded(pointer(manifest)))
        os.replace(temp_pointer, out / "current.json")
    finally:
        if staging.exists():
            shutil.rmtree(staging)
    return {"status": "CURRENT", "operation": "CREATED", "version": version,
            "directory": str(target), "components": len(state["components"]), "ds_digest": state["ds_digest"],
            "archives": [str(target / p["archive"]) for p in manifest["packages"].values()]}


INSTALL_RECEIPT = ".ds-managed-install.json"


def installation_directory(value=None):
    directory = Path(value) if value is not None else Path(os.environ.get("CODEX_HOME", str(Path.home() / ".codex"))) / "skills"
    if directory.is_symlink():
        raise ValueError("Installation directory cannot be a symlink")
    return directory.expanduser().resolve()


def installed_receipt(target, name):
    if not target.exists():
        return None
    if target.is_symlink() or not target.is_dir():
        raise ValueError("Existing skill path is not a managed directory: " + name)
    receipt_path = safe(target, INSTALL_RECEIPT)
    if not receipt_path.is_file():
        raise ValueError("Existing skill has no managed receipt; preserved: " + name)
    receipt = read_json(receipt_path)
    if receipt.get("schema_version") != 1 or receipt.get("skill_name") != name or not SEMVER.fullmatch(receipt.get("version", "")):
        raise ValueError("Unrecognized managed receipt: " + name)
    expected = receipt.get("files")
    if not isinstance(expected, dict) or "SKILL.md" not in expected or INSTALL_RECEIPT in expected:
        raise ValueError("Invalid managed file list: " + name)
    actual = {}
    for path in target.rglob("*"):
        rel = path.relative_to(target).as_posix()
        safe(target, rel)
        if path.is_file() and rel != INSTALL_RECEIPT:
            actual[rel] = digest(path.read_bytes())
    if actual != expected:
        raise ValueError("Managed skill has local edits, missing or extra files; preserved: " + name)
    return receipt


@coordinated
def install(root=ROOT, skills_dir=None, state=None, verify_only=False):
    state = state or inputs(root)
    result = check(root, state)
    if result["status"] != "CURRENT":
        raise ValueError("Install requires a current verified release: " + str(result["errors"]))
    version = result["version"]
    directory = installation_directory(skills_dir)
    release_dir = safe(state["root"], state["config"]["output"] + "/" + version)
    release_manifest = read_json(release_dir / "manifest.json")
    planned = {}
    before = {}
    for name in state["config"]["skills"]:
        target = safe(directory, name)
        before[name] = installed_receipt(target, name)
        expected_hashes = release_manifest["packages"][name]["files"]
        files = {rel: safe(release_dir / name, rel).read_bytes() for rel in expected_hashes}
        if tree_hashes(files) != expected_hashes:
            raise ValueError("Release changed before installation: " + name)
        receipt = {"schema_version": 1, "skill_name": name, "version": version,
                   "ds_digest": state["ds_digest"], "files": tree_hashes(files)}
        planned[name] = (files, receipt)
    stale = [name for name, (_, receipt) in planned.items() if before[name] != receipt]
    if verify_only or not stale:
        return {"status": "STALE" if stale else "CURRENT", "operation": "CHECKED" if verify_only else "UNCHANGED",
                "version": version, "skills_dir": str(directory), "stale": stale}
    directory.mkdir(parents=True, exist_ok=True)
    transaction = Path(tempfile.mkdtemp(prefix=".ds-install-", dir=directory))
    moved = []
    published = []
    cleaned_transaction = False
    try:
        for name in stale:
            files, receipt = planned[name]
            files = {**files, INSTALL_RECEIPT: encoded(receipt)}
            staged = transaction / "staged" / name
            for rel, value in files.items():
                path = safe(staged, rel)
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(content(value))
            errors = inspect_tree(staged, files)
            if errors:
                raise ValueError("Staged installation failed: " + str(errors))
        # The source release is immutable. Recheck destination bytes immediately
        # before the first mutation so a user edit during staging is preserved.
        for name in stale:
            if installed_receipt(safe(directory, name), name) != before[name]:
                raise ValueError("Managed installation changed during staging: " + name)
        for name in stale:
            target = safe(directory, name)
            backup = transaction / "backup" / name
            if target.exists():
                backup.parent.mkdir(parents=True, exist_ok=True)
                os.replace(target, backup)
                moved.append(name)
            os.replace(transaction / "staged" / name, target)
            published.append(name)
        cleaned_transaction = True
    except Exception:
        for name in reversed(published):
            target = safe(directory, name)
            failed = transaction / "failed" / name
            failed.parent.mkdir(parents=True, exist_ok=True)
            os.replace(target, failed)
        for name in reversed(moved):
            os.replace(transaction / "backup" / name, safe(directory, name))
        cleaned_transaction = True
        raise
    finally:
        # If rollback itself fails, keep its backups for manual recovery.
        if cleaned_transaction or not moved:
            shutil.rmtree(transaction)
    return {"status": "CURRENT", "operation": "INSTALLED", "version": version,
            "skills_dir": str(directory), "installed": stale}


def dispatch(args):
    if args.operation == "check":
        result = check()
    elif args.operation in {"install", "check-installed"}:
        result = install(skills_dir=args.skills_dir, verify_only=args.operation == "check-installed")
    else:
        result = sync(bump=args.bump)  # Export is intentionally the same idempotent release operation.
    print(json.dumps(result, ensure_ascii=False, indent=2) if args.json else
          f"Skills: {result['status']} | {result.get('version', 'sin release')} | " +
          ("; ".join(result.get("errors", [])) or result.get("operation", "verificado")))
    return 0 if result["status"] == "CURRENT" else 1
