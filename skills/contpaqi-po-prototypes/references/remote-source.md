# Fuente de consumo BlueHeart en GitHub

Ejecuta `python3 scripts/resolve_ds.py --output NUEVA_CARPETA` desde la skill instalada. El catálogo proviene de [Blue-Heart-DS](https://github.com/Migueluckleo/Blue-Heart-DS) en `main`. El cargador verifica los hashes del corte y la identidad del maestro Figma. Reutiliza el runtime durante el encargo y consulta el puntero de nuevo al comenzar otro trabajo.

El comprobante `PASS` incluye la ruta absoluta `runtime`. Allí quedan `assets/release.json`, `assets/snapshot-manifest.json` y `assets/design-system/`. Ejecuta `node <runtime>/scripts/init.mjs <proyecto-nuevo>` con esa ruta.
