# Catálogo web BlueHeart

[P07](../../protocols/07-WEB-COMPONENTS-AND-TECHNICAL-DOCUMENTATION.md) exige una entrada en `components.registry.json` por familia activa, un export React y un ejemplo en `src/examples.tsx`. El generador deriva fichas, índice y mapa de ejemplos. Las fuentes aprobadas de tokens, tipografía y assets se declaran en [config/web-inputs.json](../../config/web-inputs.json). Una lista vacía genera cobertura cero.

Con Node y las dependencias locales fijadas en el lockfile, ejecuta `pnpm ds:generate` y `pnpm verify`. `pnpm dev` sirve el catálogo local. `pnpm build` deja una exportación estática en `out/`.

En `token_sources`, lista cada fuente delegada en orden de precedencia con `path` y `sha256`. `modes` registra los nombres confirmados. `asset_manifest` apunta a un manifiesto con entradas `name`, `file` y `sha256`; los archivos se conservan bajo `sources/assets`. Activa el catálogo tipográfico con `typography_catalog`, `typography_contract` y, si aplican, `typography_amendments`.

Buttons y Loader se pueden recorrer en el catálogo estático. `pnpm test:browser` verifica el build de `out/` mediante un servidor temporal de loopback y Chrome headless. No requiere servicios del producto. Las demos usan datos y estado locales.
