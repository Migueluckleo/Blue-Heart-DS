# QA · consumo GitHub y retiro de Azure

Fecha: 2026-11-18. Alcance autorizado explícitamente: incluir la limpieza de Azure y los ajustes de consumo junto con Dropdown, Chat Document Viewer y App Shell. La autorización de push a main corresponde a GitHub; no publica la biblioteca Figma ni instala paquetes.

Se retiran el proveedor Azure, su configuración, wrappers, launchers alternativos y evidencias de esa integración del corte activo. Los dos workflows vigentes consumen GitHub desde un commit inmutable por encargo. Reader, verify_snapshot e init admiten solamente la sesión GitHub. Los lanzadores 1.0.9 conservan sus bytes; el mantenimiento reside en workflows y catálogo, sin nueva instalación.

QA del código: 19 tests Python PASS usando el runtime registrado de Graphify/Python 3.12. Incluye arranque de ambos workflows, actualización de workflow sin cambiar lanzador, fijación de HEAD durante la sesión, lectura dirigida por hash, rechazo de bytes alterados y ausencia de fallback a fuentes viejas, verificación Figma sparse y gates de publicación con Python optimizado. Un primer intento con Python del sistema carecía de graphifyy; se repitió con el intérprete fijado, sin instalar dependencias.

La publicación debe incluir fuentes verificadas y catalog/current junto con su release y consumption-graph. El comprobante posterior de GitHub registra commit remoto y lectura por ese commit. Los outputs temporales de ejecuciones y checkouts no forman parte de las fuentes de consumo; las evidencias históricas ajenas no se sustituyen por pruebas nuevas. La autorización no convierte una prueba local en lectura remota: los resultados de consumo remoto se registran después del push.
