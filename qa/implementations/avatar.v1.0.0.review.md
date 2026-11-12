# QA de implementación · Avatar y Avatar group

2026-11-11 · AVATAR-001 y AVATAR-GROUP-001. Avatar y Avatar group PASS en Figma. Avatar web PASS.

## Figma

Avatar `145:106` → `83:18`. La lectura independiente comprueba las cuatro variantes de [icono](../../implementations/figma/root-families-2026-11-11/avatar-4.readback.json) y las cuatro de [texto](../../implementations/figma/root-families-2026-11-11/avatar-8.readback.json) sin diferencias. La [lectura final de imagen](../../implementations/figma/root-families-2026-11-11/avatar-photo.readback.json) pasó cuatro variantes y 132 bindings sin diferencias.

El usuario autorizó transferir la foto original `avatar-portrait.png` a AI Blueheart DS. Se comprobó el SHA-256 del [manifiesto](../../specs/data/avatar.assets.v1.0.0.json) antes de subir el archivo. Figma devolvió el hash original `33f6b019db4382817513e4485e94d3a7dd5a6ca2` y 800 × 1200 px. La [mutación de los cuatro fills](../../implementations/figma/root-families-2026-11-11/avatar-photo.mutation.json) conserva `83:7`, `83:10`, `83:13` y `83:16` y aplica la transformación de origen. La captura del set confirmó la foto visible en los cuatro tamaños.

La [lectura histórica](../../implementations/figma/root-families-2026-11-11/avatar-0.readback.json) conserva las cuatro diferencias de fill del corte anterior. Ese intento fue rechazado por revisión automática hasta recibir autorización explícita para el archivo y el destino.

Avatar group `145:147` → `85:10`. [Lectura independiente](../../implementations/figma/root-families-2026-11-11/avatar-group-0.readback.json) sin diferencias en cuatro variantes y 116 comprobaciones de bindings. El Slot Avatars `Avatars#85:0` restringe la preferencia al set Avatar y conserva mínimo 2 y máximo 4. La muestra usa Avatar de texto. La [prueba nativa desde instancias](../../implementations/figma/root-families-2026-11-11/avatar-consumer.readback.json) pasó 19 comprobaciones de iniciales con acento, visibilidad de Status, swap Phosphor, orden, vínculos, cardinalidad y limpieza de instancias temporales. Esta prueba usa Avatar de texto e icono.

## Web

TypeScript, 9 pruebas Node y el build de Next pasaron. [Chrome en localhost](../../implementations/web/tests/buttons-loader.browser.mjs) verificó la decodificación de la fotografía original de 800 px, Avatar de 48 px con nombre accesible y estado, cuatro elementos visibles para siete participantes y contador +4 con texto accesible. El servidor de prueba bloqueó solicitudes externas. La sustitución de una imagen fallida por iniciales o glyph forma parte del código.
