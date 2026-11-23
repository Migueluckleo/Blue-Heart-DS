---
contract_schema: sdd-project/0.2
contract_id: INLINE-NOTIFICATION-001-CTA
name: Inline Notification · CTA opcional
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
amends: INLINE-NOTIFICATION-001
figma_page_name: Inline Notification
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/inline-notification.cta.v1.0.0.json
source_data_digest_sha256: 7d30558169bcdbf93b5fbbacea1338b158aee51820b7622d444316c0df1d7690
data_refs: [specs/data/inline-notification.v1.0.0.json, specs/data/inline-notification.cta.v1.0.0.json]
dependencies: [INLINE-NOTIFICATION-001, BUTTON-001, ICON-BUTTON-001]
---

# Inline Notification · CTA opcional

## Purpose

EXPLICIT, 2026-11-23: añadir un Call to Action opcional a Inline Notification, apagado por defecto, que muestre un botón Secondary al activarlo. El usuario confirmó el nombre de la familia. Esta enmienda amplía el componente existente en Figma y web; conserva los cinco tipos y sus identidades.

La [corrección posterior de layout e Isotipo](inline-notification.layout-isotipo.amendment.v1.0.0.md), solicitada explícitamente el mismo día, sustituye la ubicación vertical descrita inicialmente aquí. Los datos y el QA del primer corte permanecen históricos; defaults, Secondary small y acción independiente siguen vigentes.

## Contract

REQ-CTA-01 MUST: Show CTA es BOOLEAN con default false. REQ-CTA-02 MUST: true muestra un único Button Secondary oficial. REQ-CTA-03 MUST: no sustituye al enlace ni al cierre. REQ-CTA-04 MUST: conserva API, tokens, identidades y comportamiento anteriores. Datos adicionales delegados al [JSON de CTA](../data/inline-notification.cta.v1.0.0.json); el JSON inicial permanece intacto. La implementación técnica y sus pruebas no equivalen a aprobación humana.

## Anatomy

Se conserva Content con indicador y texto, y Dismiss target como hermano. DERIVED: un contenedor vertical Body agrupa el Text original y el CTA; este queda debajo del mensaje y alineado con su texto. Body usa el gap de contenido de la familia (16 px), padding none, ancho Fill y alto Hug. El CTA usa ancho Hug y Button/secondary small de 32 px, sin iconos por defecto. Las decisiones de ubicación y tamaño reutilizan la receta compacta del contexto y se registran como implementación derivada, no como observación de la fuente histórica.

## Properties

| Propiedad | Default | Mapeo |
|---|---|---|
| Show CTA | false | Figma BOOLEAN; web showCta=false |
| CTA Label | Ver detalles | Label del Button anidado expuesto; web ctaLabel |
| CTA action | Sin destino o efecto impuesto por el DS | onCta del anfitrión en web; conexión del prototipo en Figma |

Las siete propiedades originales se conservan; Show CTA eleva a ocho las propiedades del set. El label se edita en la dependencia anidada y no añade un noveno campo al set. Mantener el botón como instancia vinculada, con su propiedad Label accesible desde la instancia consumidora. No hay requisito de Slot abierto ni de múltiples acciones.

## Variants

neutral, info, success, warning y error conservan ID/key. Show CTA no es un eje de variantes. Cada tipo permite activar o desactivar la misma parte opcional.

## Sizes

Se conservan referencia 602 px, mínimo 320 px y alto adaptable. CTA small corresponde al Button oficial de 32 px. Apagado no reserva un hueco ni altera el alto de referencia previo de 76 px.

## States

CTA inicia en el estado default del Button Secondary. Hover, pressed, focus, disabled y loading son estados de la dependencia Button, no tipos nuevos de Notification. Esta ampliación no añade un estado global de carga o deshabilitado a Notification.

## Behavior

Activar Show CTA muestra el botón; desactivarlo lo retira del layout y del recorrido de teclado en web. El anfitrión conecta onCta y decide su efecto. Activar el CTA no cierra automáticamente el aviso ni ejecuta backend. Show dismiss/onDismiss conservan su comportamiento independiente. Un cambio de tipo debe preservar la visibilidad y el label configurados para el CTA.

## Accessibility

El CTA web es el Button semántico oficial con nombre visible y activación por Enter/Espacio; no un texto dibujado. El anuncio del mensaje mantiene status para neutral/info/success y alert para warning/error; el botón queda fuera del nodo de texto anunciado. El foco no se mueve al aparecer el aviso. Cuando el anfitrión retire contenido tras una acción, administra el foco según su flujo. El cierre sigue teniendo su nombre accesible propio.

## Design tokens

Body usa inline-notification/spacing/content y inline-notification/spacing/none. El Button hereda sus roles de componente de color, tipografía, spacing, sizing y radius; no consume los semánticos directamente ni se recolorea para cada tipo. No se crean tokens nuevos. Cadena componente → semantic → primitive y scopes internos vacíos; solo body/* sigue visible por propiedad según la política vigente. Preservar todos los valores, aliases y estilos existentes.

## Content rules

CTA Label breve, específico y no vacío. «Ver detalles» es el valor de muestra inicial, editable por el consumidor. El anfitrión debe conectar una acción real al usarlo en un producto; la demo solo comunica una activación local identificada. No reemplazar todo el mensaje por el botón ni depender únicamente del color.

## Composition rules

P-SLOTS v0.1.0: NOT_APPLICABLE. La necesidad explícita es mostrar/ocultar una parte fija única. Una booleana y la instancia Button cubren el alcance; no se declara inserción, eliminación o reordenación de una cantidad variable de botones. Los maestros de Button permanecen en Buttons y el cierre continúa usando Icon Button Ghost small.

## Responsive behavior

Content/Body/Text hacen Fill en ancho; alto Hug y CTA Hug. Mantener el mínimo 320 px y permitir crecimiento del mensaje largo. El label del CTA debe caber en el ancho disponible usando una redacción breve; no introducir clipping o scroll nuevo. Comprobar 602 y 320 px con texto largo y cierre visible.

## Edge cases

Comprobar mensaje largo, título o descripción ocultos, cierre oculto y CTA apagado/encendido. La combinación sin texto informativo no es un uso recomendado de Notification. El enlace inline y CTA pueden coexistir con efectos independientes. La visibilidad del CTA no depende de Show description.

## Forbidden combinations

No usar Primary, Text, Link, Ghost o un control dibujado como sustituto del CTA Secondary solicitado. No mostrarlo por defecto, duplicar la familia, desacoplar Button, añadir un tipo por visibilidad, sustituir aliases por literales ni tratar el botón como cierre automático.

## Design ↔ Code mapping

Figma Show CTA → showCta; Button anidado Label → ctaLabel; activación → onCta. Web compone el export Button con variant="secondary" y size="small"; no acepta cambiar la jerarquía del CTA desde esta API. Description canónica permanece en el contrato base y se replica en los metadatos del set/variantes. La descripción del DS no inventa destinos de prototipo.

## Acceptance criteria

Desde instancias consumidoras: default false, true visible, false sin espacio reservado; cinco tipos y ocho propiedades; label editable sin detach; cambio de tipo conserva configuración. Verificar tokens, aliases y scopes de la composición y de Button, identidad de la familia/dependencias y página única. Probar Figma con ambos anchos y texto largo. En web, cinco tipos, cuatro temas, activación de teclado/clic, CTA no descarta el aviso, cierre/enlace independientes, ausencia del CTA apagado y build/types/checks del mismo corte. Documentar alcance visual y semántico observado.

## Examples

«Revisión pendiente» + descripción + Secondary «Ver detalles». En web: `<InlineNotification type="warning" title="Revisión pendiente" showCta ctaLabel="Ver detalles" onCta={abrirRevision} />`. Omitir showCta conserva el comportamiento previo. El anfitrión aporta abrirRevision; el ejemplo no define negocio ni backend.

## Source of truth

Solicitud y aclaración explícitas del usuario en este chat, 2026-11-23; contrato base y JSON histórico con digest conservado; JSON de enmienda; lectura Figma previa en implementations/figma/inline-notification-cta-2026-11-23/before.json. Set destino 122:274, página 122:49; Button/secondary 23:952, small/default 23:853. La búsqueda e inspección comprobaron dependencias locales del maestro.

## Change management

Ampliación aditiva acotada, sin publicación ni instalación. Preservar snapshots cerrados y la única PO universal instalada. Actualizar documentación técnica, catálogo y guías canónicas; el chat Verificar Graphify actualizado valida el cierre y, cuando esté vigente, notifica al chat Estado de Github para el push autorizado por el usuario. El comprobante del cierre y las notificaciones son evidencia independiente del QA del componente.

## Changelog

2026-11-23 · Enmienda CTA v1.0.0: nuevo Show CTA=false, Button Secondary/small opcional y mapeo Figma/web. Los cinco tipos y las siete propiedades previas se conservan.
