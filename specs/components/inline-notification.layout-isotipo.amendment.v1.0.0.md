---
contract_schema: sdd-project/0.2
contract_id: INLINE-NOTIFICATION-001-LAYOUT-ISOTIPO
name: Inline Notification · CTA derecho e Isotipo
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
amends: INLINE-NOTIFICATION-001-CTA
figma_page_name: Inline Notification
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/inline-notification.layout-isotipo.v1.0.0.json
source_data_digest_sha256: b69d6a1acdc27743fc9c352c9f96daaa6ab0a492a91a9364f51c355a460ddb7f
data_refs: [specs/data/inline-notification.layout-isotipo.v1.0.0.json, specs/tokens/inline-notification.indicator.v1.0.0.json, specs/data/logos.v1.0.0.json, specs/data/inline-notification.indicator.assets.v1.0.0.json]
dependencies: [INLINE-NOTIFICATION-001, INLINE-NOTIFICATION-001-CTA, BUTTON-001, ICON-BUTTON-001, LOGOS-001]
---

# Inline Notification · CTA a la derecha e Isotipo

## Alcance y precedencia

EXPLICIT, 2026-11-23: «El CTA se debe de acomodar a la derecha del body», con [referencia 589:81](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=589-81). El usuario añade reemplazar el ícono por Logos en formato Isotipo, ancho/alto máximos 32 px, sin deformar. Esta corrección sustituye únicamente la disposición vertical inicial de la enmienda CTA y añade la alternativa de indicador. Los cinco tipos, sus ID/key, Show CTA=false, Secondary small, edición del label y efectos independientes de acción/cierre siguen vigentes. No cambia la versión del contrato base ni publica o instala.

La corrección explícita del 26 de noviembre de 2026 coloca CTA entre Content y Dismiss en la fila principal. La referencia 589:81 registra el layout del 23 de noviembre.

## Layout normativo

REQ-RIGHT-01 MUST. La fila principal es horizontal sin wrap y tiene tres hijos en este orden: Content, CTA y Dismiss. Comparten el mismo eje horizontal con alineación vertical centrada. Content ocupa el ancho disponible y ajusta su altura al texto. El indicador visual se centra respecto al bloque de mensaje. CTA usa el Button Secondary small oficial y ancho Hug. Dismiss conserva su ancho intrínseco. La fila usa `inline-notification/spacing/content` para los 16 px entre hijos visibles.

REQ-RIGHT-02 MUST: apagar CTA no reserva ancho ni crea una fila vacía. Con CTA activo, el texto crece en altura al envolver. Se conserva mínimo 320 px y el CTA permanece a la derecha también en ese ancho; no se introduce una regla que lo apile debajo. Las medidas de alto 124/204 del QA vertical quedan históricas y no son expectativas de esta corrección.

## Indicador e Isotipo

REQ-ISOTIPO-01 MUST: el default continúa siendo el ícono de estado de 24 px de cada tipo. Show icon controla la visibilidad del indicador tanto en modo icon como isotipo. El modo no altera el tipo semántico, el título, la descripción, el CTA o el cierre.

REQ-ISOTIPO-02 MUST: en Figma, la instancia anidada Indicator expuesta permite source=icon/isotipo. Icon e Isotipo son propiedades INSTANCE_SWAP; los isotipos preferidos corresponden a los 21 productos oficiales con type=isotipo en [Logos](logos.contract.v1.0.0.md). Los tipos horizontal/vertical, marca corporativa y Beni/Navi carecen de esa variante y quedan fuera de esta selección. No recortar otra marca para inventar un Isotipo.

REQ-ISOTIPO-03 MUST: todo Isotipo mantiene su proporción original, cabe en un contenedor máximo 32×32 y conserva arte y colores. La escala es uniforme: min(32/anchoFuente,32/altoFuente,1). Centrar la instancia, sin stretch, crop, recolor o nuevos bindings sobre el arte. Un contenedor cuadrado no significa que el arte deba hacerse cuadrado. El token interno inline-notification/size/isotipo-max → semantic size-3xl → primitive size/3xl resuelve 32 en cuatro temas y permanece oculto con scopes=[].

DERIVED, mecanismo Figma: un helper interno de indicador tiene dos variantes source (no una por ícono) con los swaps Icon/Isotipo. Un helper interno de Isotipos contiene 21 wrappers cuadrados con una instancia oficial escalada uniformemente por producto; así un swap entre productos de proporciones distintas mantiene el ajuste sin deformación. La visibilidad del modo corresponde a frames contenedores, independientes de la instancia intercambiable. Cada instancia del modo icon conserva el token de color de estado de su anfitrión. Estos helpers pertenecen a Inline Notification, se documentan como dependencias internas, no crean una familia ni export público independientes. Los maestros de Logos permanecen en su página y no se modifican. Preservar el override de Isotipo al cambiar el tipo de la notificación.

## Consumo web y accesibilidad

REQ-WEB-01 MUST. Content, Button Secondary small y Dismiss se centran en la misma fila. `showCta` controla la presencia del botón y comienza en false. `isotipo?: {src:string; alt:string}` reemplaza al glyph únicamente cuando showIcon=true. El anfitrión aporta un Isotipo oficial, su recurso y el nombre accesible. El image conserva su relación de aspecto con contain y límites del contenedor tokenizado; no se aplica el color semántico del aviso al arte. Ausencia de isotipo conserva el glyph anterior.

La familia Logos conserva su alcance general Figma. Esta enmienda autoriza el uso embebido de Isotipos en Inline Notification para su paridad web; los SVG de muestra exportados del maestro son Contabilidad y XML en línea, con procedencia, geometría y SHA-256 en el manifiesto. No se crea un export React Logos ni una galería web nueva de marcas. El consumidor puede proporcionar otro Isotipo oficial del mismo catálogo. Los roles status/alert y mensajes continúan comunicando gravedad; una marca no sustituye ese significado. El logo no se vuelve acción ni toma foco por sí mismo.

## Tokens, API y composición

Los tokens previos y sus aliases se conservan. El nuevo sizing es de component; todo token ajeno a body/ permanece oculto. Los dos helpers internos heredan sizing/spacing del componente; el arte original de Logos mantiene la excepción de cero bindings. P-SLOTS NOT_APPLICABLE: indicador único reemplazable y CTA único opcional, sin listas o contenido de cardinalidad abierta. No se añaden tipos por visibilidad o por producto al set principal.

La Description normativa permanece en el contrato base y se actualiza en el set principal y sus variantes. Las propiedades del indicador se editan desde la instancia anidada expuesta. En web, isotipo se suma a la API existente y no condiciona la visibilidad del CTA.

## Aceptación y QA

Verificar la referencia antes de modificar. En cinco tipos: CTA apagado/encendido, centrado entre Content y Dismiss, sin espacio reservado al apagar. Probar 804, 602 y 320 px con texto largo. En Figma: editar label, elegir icon/isotipo, hacer swaps de isotipos verticales y apaisados, apagar Show icon y cambiar tipo conservando overrides. Los 21 wrappers deben demostrar arte oficial vinculado, escala uniforme, ambas dimensiones ≤32 y ratio igual al origen. Auditar los modos, scopes, aliases, paints de iconos y excepción de marca sin bindings. Preservar el frame de referencia 589:81 aportado por el usuario.

En web: default, icon/isotipo, ambos recursos oficiales de muestra, cinco tipos/cuatro temas, ratios naturales y cajas renderizadas ≤32, teclado/clic, CTA que no descarta, enlace/cierre independientes y anchos. Actualizar código, ficha, catálogo, guías y QA del mismo corte. El QA vertical inicial permanece histórico. El cierre local de esta corrección actualiza Graphify y catálogo. El registro del 23 de noviembre conserva su alcance histórico.
