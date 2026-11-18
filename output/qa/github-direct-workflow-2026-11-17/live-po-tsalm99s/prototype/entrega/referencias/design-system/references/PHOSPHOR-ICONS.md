# Iconografía de BlueHeart

Los iconos del sistema se consumen de Phosphor Icons por decisión explícita del 11 de noviembre de 2026. En Figma se usan instancias vinculadas a maestros de la [biblioteca autorizada](https://www.figma.com/design/xZSksKpcQTp5H3C4dZApBL/Phosphor-Icons?node-id=26-4). Identificar nombre, key, formato y peso antes de escribir. Conservar tamaño y variables del consumidor. Si no se puede importar la key oficial, registrar el bloqueo de ese alcance.

En React, usar `@phosphor-icons/react` con versión fijada en el lockfile, mediante el export oficial y `weight` explícito cuando el contrato lo exige. La [documentación oficial](https://github.com/phosphor-icons/react#usage) acredita el paquete y su API. Los indicadores con geometría propia, como Loader, conservan su anatomía cuando su fuente no depende de un icono.
