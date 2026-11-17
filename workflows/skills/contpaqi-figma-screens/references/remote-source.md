# Fuente de consumo GitHub

El punto de entrada instalado solo indica cómo leer el workflow vigente en `Migueluckleo/Blue-Heart-DS`, rama `main`. Se resuelve un commit por encargo y se leen las instrucciones y referencias desde ese commit. Las herramientas ejecutables se obtienen del mismo origen en la carpeta del trabajo. No hay scripts, plantillas, contratos ni tokens en la skill instalada.

El workflow inicia `github_workflow.py start`. Este consulta el catálogo y el índice reducido de Graphify, verifica identidad y hashes y obtiene fuentes individuales cuando se necesitan. No descarga el bundle del corpus ni utiliza caché entre encargos. Registra los comprobantes en la sesión y utiliza el `runtime` devuelto en PASS.

Para contenido de producto, obtiene los contratos y datos Body vigentes; los controles oficiales mantienen sus tokens internos. La consulta Graphify descubre fuentes y dependencias, y el consumidor verifica los documentos originales. El índice no sustituye las reglas canónicas ni las validaciones de cada destino.
