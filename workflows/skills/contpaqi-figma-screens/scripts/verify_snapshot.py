#!/usr/bin/env python3
"""Verify the packaged CONTPAQi snapshot; never modify its sources."""

import argparse
import hashlib
import json
from pathlib import Path
import sys


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def verify(skill_root):
    errors = []
    manifest = read_json(skill_root / "assets/snapshot-manifest.json")
    release = read_json(skill_root / "assets/release.json")
    components = read_json(skill_root / "references/components.json")
    if manifest.get("schema_version") != 1:
        raise ValueError("Unsupported snapshot schema_version")
    files = manifest.get("files")
    if not isinstance(files, dict) or not files:
        raise ValueError("Manifest files must be a non-empty path-to-SHA256 object")
    base = (skill_root / "assets/design-system").resolve()
    session_paths = [skill_root / 'assets' / name for name in ('github-session.json', 'azure-session.json')
                     if (skill_root / 'assets' / name).is_file()]
    if len(session_paths) > 1:
        raise ValueError('Ambiguous remote session')
    session = read_json(session_paths[0]) if session_paths else None
    if session and (session.get('manifest_sha256') != hashlib.sha256((skill_root / 'assets/snapshot-manifest.json').read_bytes()).hexdigest()
                    or session.get('ds_digest') != manifest.get('ds_digest')):
        raise ValueError('Remote session identity mismatch')
    checked = 0
    for name, expected in files.items():
        if not isinstance(name, str) or not isinstance(expected, str):
            errors.append({"path": str(name), "error": "Invalid manifest entry"})
            continue
        path = (base / name).resolve()
        if Path(name).is_absolute() or not path.is_relative_to(base):
            errors.append({"path": name, "error": "Path escapes snapshot root"})
            continue
        if not path.is_file() and session:
            continue  # Unused source stays in GitHub; consumers verify it on demand.
        if not path.is_file():
            errors.append({"path": name, "error": "Missing file"})
            continue
        checked += 1
        actual = hashlib.sha256(path.read_bytes()).hexdigest()
        if actual != expected:
            errors.append({"path": name, "error": "SHA256 mismatch", "actual": actual})
    canonical = json.dumps(files, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    digest = hashlib.sha256(canonical.encode("utf-8")).hexdigest()
    if release.get("ds_digest") != digest:
        errors.append({"path": "assets/release.json", "error": "ds_digest mismatch"})
    if not isinstance(manifest.get("components"), list) or components != manifest["components"]:
        errors.append({"path": "references/components.json", "error": "Component index mismatch"})
    expected_skill = 'azure-contpaqi-figma-screens' if (skill_root / 'assets/azure-session.json').is_file() else 'contpaqi-figma-screens'
    if release.get("skill_name") != expected_skill:
        errors.append({"path": "assets/release.json", "error": "Unexpected skill_name"})
    return {
        "status": "FAIL" if errors else "PASS",
        "package_version": release.get("version"),
        "ds_digest": digest,
        "checked_files": checked,
        "catalog_files": len(files),
        "scope": "MATERIALIZED_SOURCES; remaining sources verified on demand" if session else "FULL_SNAPSHOT",
        "errors": errors,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skill-root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    try:
        result = verify(args.skill_root.resolve())
    except (OSError, ValueError, TypeError) as exc:
        result = {"status": "FAIL", "errors": [{"error": str(exc)}]}
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["status"] == "PASS" else 1


if __name__ == "__main__":
    sys.exit(main())
