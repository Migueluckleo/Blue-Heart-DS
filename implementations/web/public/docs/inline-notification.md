# Inline Notification · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `INLINE-NOTIFICATION-001` · API local 0.1.0 · categoría feedback.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/inline-notification.contract.v1.0.0.md#guía-semántica-normativa).

Usa Inline Notification junto al contenido afectado. Carbon sitúa el mensaje cerca de su contexto. W3C WAI reserva el anuncio de alerta para mensajes importantes que requieren atención oportuna. BlueHeart usa status para neutral, info y success, y alert para warning y error. [Carbon Notification](https://www.carbondesignsystem.com/building-blocks/core/components/notification/guidelines) · [W3C WAI Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

| Situación | Haz | Evita |
|---|---|---|
| Actualización informativa | Explica qué pasó y qué puede hacer la persona. | Depender solo del glyph o del color. |
| Error aún activo | Mantén visible el mensaje y omite el cierre cuando deba resolverse primero. | Descartar el mensaje automáticamente. |
| Enlace de detalle | Proporciona un destino real y un texto comprensible. | Tratar el subrayado Figma como enlace configurado. |

## Uso sin backend

CTA opcional, apagado por defecto, Secondary small a la derecha del Body. Indicador de estado o Isotipo oficial ≤32×32 sin deformar. El anfitrión conecta acción, enlace y cierre.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem, UserMessage, type ChatSidebarProps, Pagination, PaginationItem, Tabs, TextArea, DropdownField, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function InlineNotificationExample() {
  const [show,setShow]=useState(true);
  const [showCta,setShowCta]=useState(false);
  const [ctaActivations,setCtaActivations]=useState(0);
  const [isotipo,setIsotipo]=useState<{src:string;alt:string}>();
  const cta={showCta,ctaLabel:'Ver detalles',onCta:()=>setCtaActivations(count=>count+1),isotipo};
  return <div id="demo-inline-notification" className="my-4 grid max-w-[602px] gap-3">
    <Checkbox label="Mostrar CTA de las notificaciones" showLabel selected={showCta} onSelectedChange={setShowCta}/>
    <div className="flex flex-wrap gap-2">
      <Button variant="text" size="small" label="Ícono de estado" onClick={()=>setIsotipo(undefined)}/>
      <Button variant="text" size="small" label="Isotipo Contabilidad" onClick={()=>setIsotipo({src:'/assets/inline-notification-isotipo-contabilidad.svg',alt:'Contabilidad'})}/>
      <Button variant="text" size="small" label="Isotipo XML en línea" onClick={()=>setIsotipo({src:'/assets/inline-notification-isotipo-xml-en-linea.svg',alt:'XML en línea'})}/>
    </div>
    <Button id="demo-inline-restore" variant="secondary" label="Mostrar aviso informativo" onClick={()=>setShow(true)}/>
    {show&&<InlineNotification {...cta} type="info" title="Actualización disponible"
      description="Consulta el historial de la revisión." link={{href:'#demo-inline-details',label:'Ver historial'}}
      dismissLabel="Cerrar aviso informativo"
      onDismiss={()=>{setShow(false);document.getElementById('demo-inline-restore')?.focus();}}/>}
    <InlineNotification {...cta} type="neutral" title="Resumen" description="Los datos corresponden al periodo seleccionado."/>
    <InlineNotification {...cta} type="success" title="Conciliación completa" description="Puedes continuar con la siguiente revisión."/>
    <InlineNotification {...cta} type="warning" title="Revisión pendiente" description="Hay comprobantes que requieren atención."/>
    <InlineNotification {...cta} type="error" title="Archivo pendiente" description="Adjunta el archivo para completar el registro." showDismiss={false}/>
    <p id="demo-inline-cta-result" role="status">Activaciones locales de CTA: {ctaActivations}</p>
    <p id="demo-inline-details">Historial de revisión del catálogo.</p>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [inline-notification.tsx](../../src/components/inline-notification.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type InlineNotificationType = keyof typeof glyphs;

export interface InlineNotificationProps {
  type?: InlineNotificationType;
  title?: string;
  description?: string;
  link?: {label: string; href: string};
  showTitle?: boolean;
  showDescription?: boolean;
  showIcon?: boolean;
  showDismiss?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
  /** Shows the optional Secondary action between the content and Dismiss. */
  showCta?: boolean;
  ctaLabel?: string;
  onCta?: () => void;
  /** Official product Isotipo; aspect ratio is preserved within 32 by 32 px. */
  isotipo?: {src: string; alt: string};
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
InlineNotification: {type='neutral',title,description,link,showTitle=true,showDescription=true,
  showIcon=true,showDismiss=true,onDismiss,dismissLabel='Cerrar notificación',
  showCta=false,ctaLabel='Ver detalles',onCta,isotipo,className}: InlineNotificationProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Contenido, indicador, cierre y un único CTA opcional de anatomía fija; Show CTA controla visibilidad, no una región abierta. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [inline-notification.contract.v1.0.0.md](../../../../specs/components/inline-notification.contract.v1.0.0.md) · SHA-256 `dee4664651874ad99f30094e29e1ff7005f2b6d5f820f02ac62890a54cf730e0`.
- [forms.app-shell.amendment.v1.0.0.md](../../../../specs/patterns/forms.app-shell.amendment.v1.0.0.md) · SHA-256 `0981d971c7e675b226c79a31f7f64b4ed434c7133d5af86ad347a1f11177bda9`.
- [inline-notification.cta.amendment.v1.0.0.md](../../../../specs/components/inline-notification.cta.amendment.v1.0.0.md) · SHA-256 `84a68d752343cc04cb9ea66550ddadabb05a64592e6b6efde0e16ed66a115765`.
- [inline-notification.layout-isotipo.amendment.v1.0.0.md](../../../../specs/components/inline-notification.layout-isotipo.amendment.v1.0.0.md) · SHA-256 `3e92c3f0e0ddc262c4b30797451c2215d7e6a0043368af279b1b7b4cded8da0f`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/inline-notification.layout-isotipo.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
