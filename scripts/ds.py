#!/usr/bin/env python3
"""Local DS tooling. Inspection commands do not write unless explicitly requested."""
import argparse
import json
import sys
import subprocess
from pathlib import Path

from ds_core import (ROOT, read_json, corpus, paths_of, yaml_documents, generate_status,
                     render_status, documentation_check, dump)


def main():
    parser = argparse.ArgumentParser(description="Verificación documental, estado derivado y cierre Graphify.")
    subs = parser.add_subparsers(dest="command", required=True)
    check = subs.add_parser("check", help="Comprobar documentación, vista y vigencia del grafo sin escribir.")
    check.add_argument("--docs-only", action="store_true", help="Excluir gates de outputs derivados durante preparación.")
    check.add_argument("--json", action="store_true")
    check.add_argument("--report", type=Path, help="Guardar evidencia explícitamente en esta ruta.")
    status = subs.add_parser("status", help="Consultar el estado derivado desde fuentes actuales.")
    status.add_argument("family", nargs="?")
    status.add_argument("--write", action="store_true", help="Actualizar registry/generated/project-status.{json,md}.")
    status.add_argument("--json", action="store_true")
    subs.add_parser("test", help="Pruebas de regresión de las herramientas locales.")
    graph = subs.add_parser("graph", help="Operaciones locales Graphify, sin servicios externos.")
    graph.add_argument("operation", choices=["plan", "prepare", "close", "check"])
    graph.add_argument("--run", help="Identificador nuevo de lote para prepare/close.")
    graph.add_argument("--json", action="store_true")
    skills = subs.add_parser("skills", help="Sincronizar, comprobar, exportar o instalar las dos skills de consumo.")
    skills.add_argument("operation", choices=["sync", "check", "export", "install", "check-installed"])
    skills.add_argument("--bump", choices=["patch", "minor", "major"], default="patch")
    skills.add_argument("--skills-dir", type=Path, help="Destino explícito de instalación o comprobación; no cambia el gate portable.")
    skills.add_argument("--json", action="store_true")
    closing = subs.add_parser('close', help='Cierre local coordinado, incremental y medido; reanudable.')
    closing.add_argument('--run', required=True)
    closing.add_argument('--install', action='store_true', help='Actualizar las copias locales gestionadas autorizadas.')
    closing.add_argument('--usage-start', type=Path)
    closing.add_argument('--usage-end', type=Path)
    metrics = subs.add_parser('metrics', help='Registrar observación real de consumo final, sin recalcular el cierre.')
    metrics.add_argument('--run', required=True)
    metrics.add_argument('--usage-end', required=True, type=Path)
    args = parser.parse_args()
    if args.command == 'metrics':
        from ds_close import record_metrics
        return record_metrics(args)
    if args.command == 'close':
        from ds_close import dispatch
        return dispatch(args)
    if args.command == "test":
        return subprocess.call([sys.executable, "-B", "-m", "unittest", "discover", "-s", "tests", "-v"], cwd=ROOT)
    if args.command == "skills":
        from ds_skills import dispatch
        return dispatch(args)
    config = read_json(ROOT / "config/ds-project.json")
    if args.command == "graph":
        from ds_graph import dispatch
        return dispatch(args, config)
    detection = corpus(config=config)
    paths = paths_of(detection)
    parsed = yaml_documents(paths)
    data = generate_status(parsed, paths, config)
    if args.command == "status":
        if args.write:
            if data["issues"]:
                print(json.dumps(data["issues"], ensure_ascii=False, indent=2))
                return 1
            directory = ROOT / "registry/generated"
            dump(directory / "project-status.json", data)
            md = render_status(data)
            file = directory / "project-status.md"
            if not file.exists() or file.read_text() != md:
                file.write_text(md)
            print("Vista derivada actualizada: registry/generated/project-status.md")
        if args.family:
            families = [f for f in data["families"] if f["id"].casefold() == args.family.casefold()]
            if not families:
                print("Familia no encontrada: " + args.family, file=sys.stderr)
                return 2
            data = {**data, "families": families, "standalone_amendments": []}
            data.pop("source_sha256", None)  # Full provenance remains in the generated JSON.
        if not args.write or args.family:
            if args.json:
                print(json.dumps(data, ensure_ascii=False, indent=2))
            else:
                print(render_status({**data, "standalone_amendments": []} if args.family else data))
        return 1 if data["issues"] else 0
    result = documentation_check(parsed, paths, data, config)
    result["documentation_status"] = result["status"]
    if not args.docs_only:
        from ds_graph import check_graph
        graph_result = check_graph(config, detection)
        result["graph"] = graph_result
        generated = ROOT / "registry/generated/project-status.json"
        markdown = ROOT / "registry/generated/project-status.md"
        view_current = (generated.exists() and read_json(generated) == data
                        and markdown.exists() and markdown.read_text() == render_status(data))
        result["derived_view"] = "CURRENT" if view_current else "STALE"
        from ds_skills import check as check_skills
        result["skills"] = check_skills()
        if graph_result["status"] != "CURRENT" or not view_current or result["skills"]["status"] != "CURRENT":
            result["status"] = "FAIL"
    if args.report:
        path = args.report.resolve()
        if not path.is_relative_to(ROOT):
            raise ValueError("--report debe permanecer dentro del proyecto")
        dump(path, result)
    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print("Resultado: " + result["status"] + " | Documentación: " + result["documentation_status"] + " | " + json.dumps(result["counts"]))
        for f in result["findings"]:
            print(f'{f["severity"]} {f["control"]} {f["path"]}:{f["line"] or 1} — {f["message"]}')
        if "graph" in result:
            print("Grafo: " + result["graph"]["status"] + " | vista: " + result["derived_view"])
            print("Skills: " + result["skills"]["status"])
    return 0 if result["status"] == "PASS" else 1


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (ValueError, OSError, RuntimeError, ImportError, subprocess.TimeoutExpired) as error:
        print("BLOCKED: " + str(error), file=sys.stderr)
        sys.exit(2)
