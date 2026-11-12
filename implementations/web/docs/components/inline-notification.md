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

Usa el tipo según gravedad, agrega un destino real si hay enlace y deja al anfitrión el cierre.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Pagination, PaginationItem, Tabs, TextArea, DropdownField, FloatingActions, InlineNotification, Chip, Table, TableCell, TableCaptureCell, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function InlineNotificationExample() {
  const [show,setShow]=useState(true);
  return <div className="my-4 grid max-w-[602px] gap-3">
    <Button id="demo-inline-restore" variant="secondary" label="Mostrar aviso informativo" onClick={()=>setShow(true)}/>
    {show&&<InlineNotification type="info" title="Actualización disponible"
      description="Consulta el historial de la revisión." link={{href:'#demo-inline-details',label:'Ver historial'}}
      dismissLabel="Cerrar aviso informativo"
      onDismiss={()=>{setShow(false);document.getElementById('demo-inline-restore')?.focus();}}/>}
    <InlineNotification type="neutral" title="Resumen" description="Los datos corresponden al periodo seleccionado."/>
    <InlineNotification type="success" title="Conciliación completa" description="Puedes continuar con la siguiente revisión."/>
    <InlineNotification type="warning" title="Revisión pendiente" description="Hay comprobantes que requieren atención."/>
    <InlineNotification type="error" title="Archivo pendiente" description="Adjunta el archivo para completar el registro." showDismiss={false}/>
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
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
InlineNotification: {type='neutral',title,description,link,showTitle=true,showDescription=true,
  showIcon=true,showDismiss=true,onDismiss,dismissLabel='Cerrar notificación',className}: InlineNotificationProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Contenido, indicador y cierre tienen posiciones fijas. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [inline-notification.contract.v1.0.0.md](../../../../specs/components/inline-notification.contract.v1.0.0.md) · SHA-256 `622aca6f7fe4eaa960deee54d581971ffe46941364744de678d3480db269c661`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/actions-notification.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
