"""Publish the data channel independently of installed skill engines. No network."""
from __future__ import annotations
import argparse
import gzip
import hashlib
import io
import json
from pathlib import Path
import tarfile
from ds_session import coordinated
from ds_skills import source_inputs, compact, encoded, safe, digest

@coordinated
def build(root):
    state = source_inputs(root)
    from ds_consumption import prepared
    graph_bytes = prepared(root, state)
    graph_descriptor = {"schema_version": 1, "sha256": digest(graph_bytes), "bytes": len(graph_bytes)}
    manifest = {"schema_version": 1, "package_version": "0.0.0+ds." + state["ds_digest"][:16],
                "ds_digest": state["ds_digest"], "authority": state["config"]["authority"],
                "files": state["files"], "components": state["components"],
                "excluded_links": state["excluded_links"], "consumption_graph": graph_descriptor}
    manifest_bytes = encoded(manifest)
    # Identity covers metadata as well as file bytes.
    identity = digest(manifest_bytes)
    directory = Path(root) / "catalog/releases" / identity
    stream = io.BytesIO()
    with gzip.GzipFile(fileobj=stream, mode="wb", mtime=0) as gz:
        with tarfile.open(fileobj=gz, mode="w") as archive:
            for name, expected in state["files"].items():
                data = safe(Path(root), name).read_bytes()
                if digest(data) != expected:
                    raise ValueError("Source changed during publication: " + name)
                item = tarfile.TarInfo(name)
                item.size = len(data)
                item.mode = 0o644
                archive.addfile(item, io.BytesIO(data))
    bundle = stream.getvalue()
    if len(bundle) > 90 * 1024 * 1024:
        raise ValueError("Data bundle exceeds supported publication size")
    if source_inputs(root)["ds_digest"] != state["ds_digest"] or prepared(root, state) != graph_bytes:
        raise ValueError("Sources changed during publication")
    directory.mkdir(parents=True, exist_ok=True)
    for name, data in {"manifest.json": manifest_bytes, "data.tar.gz": bundle, "consumption-graph.json": graph_bytes}.items():
        target = directory / name
        if target.exists() and target.read_bytes() != data:
            raise ValueError("Immutable data release changed")
        target.write_bytes(data)
    pointer = {"schema_version": 1, "engine_protocol": 1,
               "manifest": f"catalog/releases/{identity}/manifest.json", "manifest_sha256": identity,
               "bundle": f"catalog/releases/{identity}/data.tar.gz", "bundle_sha256": digest(bundle),
               "bundle_bytes": len(bundle), "ds_digest": state["ds_digest"]}
    tmp = Path(root) / "catalog/.current.tmp"
    tmp.write_bytes(encoded(pointer))
    tmp.replace(Path(root) / "catalog/current.json")
    return {"status": "CURRENT", "files": len(state["files"]), "components": len(state["components"]),
            "ds_digest": state["ds_digest"], "bundle_bytes": len(bundle)}

def check_catalog(root):
    try:
        state = source_inputs(root)
        pointer = json.loads((Path(root) / "catalog/current.json").read_text())
        identity = pointer["manifest_sha256"]
        if pointer.get("schema_version") != 1 or pointer.get("engine_protocol") != 1 or pointer.get("manifest") != f"catalog/releases/{identity}/manifest.json" or pointer.get("bundle") != f"catalog/releases/{identity}/data.tar.gz":
            raise ValueError("Invalid catalog protocol or paths")
        data = safe(Path(root), pointer["manifest"]).read_bytes()
        manifest = json.loads(data)
        if digest(data) != identity or manifest.get("schema_version") != 1 or pointer.get("ds_digest") != state["ds_digest"] or manifest.get("ds_digest") != state["ds_digest"] or manifest["files"] != state["files"] or manifest["components"] != state["components"] or manifest["excluded_links"] != state["excluded_links"]:
            raise ValueError("Catalog differs from current source files or metadata")
        from ds_consumption import prepared
        graph_bytes = prepared(root, state)
        if manifest.get("consumption_graph") != {"schema_version": 1, "sha256": digest(graph_bytes), "bytes": len(graph_bytes)} or safe(Path(root), f"catalog/releases/{identity}/consumption-graph.json").read_bytes() != graph_bytes:
            raise ValueError("Consumption graph differs from prepared release")
        bundle = safe(Path(root), pointer["bundle"]).read_bytes()
        if len(bundle) != pointer.get("bundle_bytes") or digest(bundle) != pointer["bundle_sha256"]:
            raise ValueError("Data bundle integrity failure")
        return {"status": "CURRENT", "ds_digest": state["ds_digest"]}
    except (OSError, ValueError, KeyError) as error:
        return {"status": "STALE", "errors": [str(error)]}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    result = check_catalog(args.root) if args.check else build(args.root)
    print(json.dumps(result, ensure_ascii=False))
    raise SystemExit(0 if result["status"] == "CURRENT" else 1)
