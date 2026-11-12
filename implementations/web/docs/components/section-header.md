# Section Header · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `SECTION-HEADER-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/section-header.contract.v1.0.0.md#guía-semántica-normativa).

Usa Section Header para orientar dentro de una sección y colocar los controles que cambian su contenido. GOV.UK usa Breadcrumb para expresar jerarquía navegable. W3C WAI asigna el nivel de encabezado según la estructura de la página. BlueHeart combina ambas referencias con metadatos y controles opcionales gestionados por el anfitrión. [GOV.UK Breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/) · [W3C WAI Headings](https://www.w3.org/WAI/tutorials/page-structure/headings/)

| Situación | Haz | Evita |
|---|---|---|
| Encabezado de una sección | Usa el nivel de título apropiado y muestra Breadcrumb cuando ayude a orientarse. | Repetir el título o usar Breadcrumb como progreso. |
| Estado y actualización | Usa Metadata para estado o fecha relevantes y permite omitirlo cuando quede vacío. | Mezclar acciones y metadatos en la misma región. |
| Configuración y acciones | Mantén Inputs y General actions independientes y reduce los controles en contenedores estrechos. | Fijar cinco Inputs o inferir un breakpoint global. |

## Uso sin backend

Selecciona el nivel del título según la página y compón Breadcrumb, Metadata, Inputs y General actions con los controles del anfitrión.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Pagination, PaginationItem, Tabs, TextArea, DropdownField, FloatingActions, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function SectionHeaderExample() {
  const [message, setMessage] = useState('');
  const metadata = <><Badge type="success" size="small" label="Actualizado"/><time dateTime="2026-11-11">11 nov 2026</time></>;
  return <div className="my-4 space-y-4">
    <SectionHeader className="max-w-[1225px]" title="Comprobantes" headingLevel={3}
      description="Consulta los comprobantes registrados y ajusta los filtros del listado."
      breadcrumbs={<Breadcrumb ancestors={[{label:'Inicio',href:'#demo-section-start'}]} current="Comprobantes"/>}
      metadata={metadata}
      inputs={['Periodo','Empresa','Tipo','Moneda','Ejercicio'].map(label =>
        <Input key={label} label={label} placeholder={label} showLabel={false} showHelper={false} required={false}/>)}
      actions={<>
        <IconButton label="Configurar filtros" variant="secondary" size="large" icon={GearIcon}
          onClick={()=>setMessage('Configuración de filtros abierta.')}/>
        <Button label="Aplicar filtros" onClick={()=>setMessage('Filtros aplicados.')}/>
      </>}/>
    <p id="demo-section-action-status" role="status">{message}</p>
    <div id="demo-section-start" className="max-w-[640px]">
      <SectionHeader title="Comprobantes recientes" headingLevel={3} metadata={metadata}
        description="Revisa los registros del periodo seleccionado."
        inputs={<Input label="Periodo reciente" placeholder="Periodo" showLabel={false} showHelper={false} required={false}/>}
        actions={<Button label="Consultar periodo" onClick={()=>setMessage('Consulta de muestra ejecutada.')}/>}/>
    </div>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [section-header.tsx](../../src/components/section-header.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface SectionHeaderProps {
  title: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  description?: string;
  breadcrumbs?: ReactNode;
  metadata?: ReactNode;
  inputs?: ReactNode;
  actions?: ReactNode;
  showBreadcrumbs?: boolean;
  showDescription?: boolean;
  showMetadata?: boolean;
  showActions?: boolean;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
SectionHeader: {title, headingLevel = 2, description, breadcrumbs, metadata, inputs, actions,
  showBreadcrumbs = true, showDescription = true, showMetadata = true, showActions = true,
  className}: SectionHeaderProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Tres regiones independientes admiten listas abiertas. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [section-header.contract.v1.0.0.md](../../../../specs/components/section-header.contract.v1.0.0.md) · SHA-256 `240b8713839c0099525bffbd08545a99d5894e57344a33df6b112f6085a91836`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/section-header.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
