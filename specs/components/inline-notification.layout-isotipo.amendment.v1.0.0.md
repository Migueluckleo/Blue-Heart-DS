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
source_data_digest_sha256: ac22f5b0f296b1e39114271fe2cb32a0dfb85fe541415496014cfab3100ba2de
data_refs: [specs/data/inline-notification.layout-isotipo.v1.0.0.json, specs/tokens/inline-notification.indicator.v1.0.0.json, specs/data/logos.v1.0.0.json, specs/data/inline-notification.indicator.assets.v1.0.0.json]
dependencies: [INLINE-NOTIFICATION-001, INLINE-NOTIFICATION-001-CTA, BUTTON-001, ICON-BUTTON-001, LOGOS-001]
---

# Inline Notification · CTA a la derecha e Isotipo

## Alcance y precedencia

EXPLICIT, 2026-11-23: «El CTA se debe de acomodar a la derecha del body», con [referencia 589:81](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=589-81). El usuario añade reemplazar el ícono por Logos en formato Isotipo, ancho/alto máximos 32 px, sin deformar. Esta corrección sustituye únicamente la disposición vertical inicial de la enmienda CTA y añade la alternativa de indicador. Los cinco tipos, sus ID/key, Show CTA=false, Secondary small, edición del label y efectos independientes de acción/cierre siguen vigentes. No cambia la versión del contrato base ni publica o instala.

## Layout normativo

REQ-RIGHT-01 MUST: Body horizontal, sin wrap, CTA a la derecha del texto y antes del cierre. OBSERVED en la referencia: Space between y alineación inferior (MAX), gap 16, notificación 804×76; texto de muestra fijo 474. DERIVED para conservar el comportamiento adaptable existente: Text usa Fill horizontal/Hug vertical; CTA Hug horizontal y alto de su receta small (32). La implementación usa distribución MIN con crecimiento de Text, que ancla el CTA a la derecha y conserva el gap tokenizado mínimo de 16 px; Space between queda como evidencia del ejemplo. Body sigue Fill/Hug y usa inline-notification/spacing/content para la separación. El cierre y el indicador se mantienen arriba; el CTA se alinea con el borde inferior del texto. El ancho de la referencia no fija el ancho obligatorio.

REQ-RIGHT-02 MUST: apagar CTA no reserva ancho ni crea una fila vacía. Con CTA activo, el texto crece en altura al envolver. Se conserva mínimo 320 px y el CTA permanece a la derecha también en ese ancho; no se introduce una regla que lo apile debajo. Las medidas de alto 124/204 del QA vertical quedan históricas y no son expectativas de esta corrección.

## Indicador e Isotipo

REQ-ISOTIPO-01 MUST: el default continúa siendo el ícono de estado de 24 px de cada tipo. Show icon controla la visibilidad del indicador tanto en modo icon como isotipo. El modo no altera el tipo semántico, el título, la descripción, el CTA o el cierre.

REQ-ISOTIPO-02 MUST: en Figma, la instancia anidada Indicator expuesta permite source=icon/isotipo. Icon e Isotipo son propiedades INSTANCE_SWAP; los isotipos preferidos corresponden a los 21 productos oficiales con type=isotipo en [Logos](logos.contract.v1.0.0.md). Los tipos horizontal/vertical, marca corporativa y Beni/Navi carecen de esa variante y quedan fuera de esta selección. No recortar otra marca para inventar un Isotipo.

REQ-ISOTIPO-03 MUST: todo Isotipo mantiene su proporción original, cabe en un contenedor máximo 32×32 y conserva arte y colores. La escala es uniforme: min(32/anchoFuente,32/altoFuente,1). Centrar la instancia, sin stretch, crop, recolor o nuevos bindings sobre el arte. Un contenedor cuadrado no significa que el arte deba hacerse cuadrado. El token interno inline-notification/size/isotipo-max → semantic size-3xl → primitive size/3xl resuelve 32 en cuatro temas y permanece oculto con scopes=[].

DERIVED, mecanismo Figma: un helper interno de indicador tiene dos variantes source (no una por ícono) con los swaps Icon/Isotipo. Un helper interno de Isotipos contiene 21 wrappers cuadrados con una instancia oficial escalada uniformemente por producto; así un swap entre productos de proporciones distintas mantiene el ajuste sin deformación. La visibilidad del modo corresponde a frames contenedores, independientes de la instancia intercambiable. Cada instancia del modo icon conserva el token de color de estado de su anfitrión. Estos helpers pertenecen a Inline Notification, se documentan como dependencias internas, no crean una familia ni export público independientes. Los maestros de Logos permanecen en su página y no se modifican. Preservar el override de Isotipo al cambiar el tipo de la notificación.

## Consumo web y accesibilidad

REQ-WEB-01 MUST: CTA horizontal y alineado abajo, con los mismos tokens y Button Secondary small. `isotipo?: {src:string; alt:string}` reemplaza al glyph únicamente cuando showIcon=true. El anfitrión aporta un Isotipo oficial, su recurso y el nombre accesible. El image conserva su relación de aspecto con contain y límites del contenedor tokenizado; no se aplica el color semántico del aviso al arte. Ausencia de isotipo conserva el glyph anterior.

La familia Logos conserva su alcance general Figma. Esta enmienda autoriza el uso embebido de Isotipos en Inline Notification para su paridad web; los SVG de muestra exportados del maestro son Contabilidad y XML en línea, con procedencia, geometría y SHA-256 en el manifiesto. No se crea un export React Logos ni una galería web nueva de marcas. El consumidor puede proporcionar otro Isotipo oficial del mismo catálogo. Los roles status/alert y mensajes continúan comunicando gravedad; una marca no sustituye ese significado. El logo no se vuelve acción ni toma foco por sí mismo.

## Tokens, API y composición

Los tokens previos y sus aliases se conservan. El nuevo sizing es de component; todo token ajeno a body/ permanece oculto. Los dos helpers internos heredan sizing/spacing del componente; el arte original de Logos mantiene la excepción de cero bindings. P-SLOTS NOT_APPLICABLE: indicador único reemplazable y CTA único opcional, sin listas o contenido de cardinalidad abierta. No se añaden tipos por visibilidad o por producto al set principal.

La Description normativa permanece en el contrato base y se actualiza en el set principal y sus variantes. Las propiedades del indicador se editan desde la instancia anidada expuesta. En web, isotipo se suma a la API existente y no condiciona la visibilidad del CTA.

## Aceptación y QA

Verificar la referencia antes de modificar. En cinco tipos: CTA apagado/encendido, a la derecha, alineado con borde inferior del texto, sin espacio reservado al apagar. Probar 804, 602 y 320 px con texto largo. En Figma: editar label, elegir icon/isotipo, hacer swaps de isotipos verticales y apaisados, apagar Show icon y cambiar tipo conservando overrides. Los 21 wrappers deben demostrar arte oficial vinculado, escala uniforme, ambas dimensiones ≤32 y ratio igual al origen. Auditar los modos, scopes, aliases, paints de iconos y excepción de marca sin bindings. Preservar el frame de referencia 589:81 aportado por el usuario.

En web: default, icon/isotipo, ambos recursos oficiales de muestra, cinco tipos/cuatro temas, ratios naturales y cajas renderizadas ≤32, teclado/clic, CTA que no descarta, enlace/cierre independientes y anchos. Actualizar código, ficha, catálogo, guías y QA del mismo corte. El QA vertical inicial permanece histórico. El cierre derivado se encarga al chat Verificar Graphify actualizado con un run nuevo; solo después de CURRENT notifica a Estado de Github para el push autorizado. Sin instalar paquetes ni alterar snapshots cerrados.
