# Breadcrumb item · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `BREADCRUMB-ITEM-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/breadcrumb-item.contract.v1.0.0.md#guía-semántica-normativa).

Representa un ancestro navegable o la página actual dentro de una jerarquía. El anfitrión aporta rutas y orden. Usa House para Inicio con nombre accesible. Overflow usa tres puntos y pide mostrar ancestros omitidos. La página actual permanece visible como texto y se identifica con aria-current.

| Situación | Haz | Evita |
|---|---|---|
| Ancestro disponible | Enlaza «Documentos» con su ruta real. | Inferir la URL a partir de la etiqueta. |
| Inicio u overflow | Nombra la acción con «Inicio» o «Mostrar niveles anteriores». | Dejar el icono o los tres puntos como único nombre. |
| Página actual | Muestra «Comprobantes» como texto actual, sin separador. | Darle una acción de navegación. |

Usa un contenedor de navegación con nombre y lista ordenada. El anfitrión decide el comportamiento y contenido de overflow. [Atlassian Breadcrumbs](https://atlassian.design/components/breadcrumbs/) · [W3C Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

## Uso sin backend

Abre el overflow de ejemplo y consulta el eslabón actual.

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

export function BreadcrumbItemExample() {
  const [expanded, setExpanded] = useState(false);
  return <nav className="my-4 space-y-2" aria-label="Ruta de muestra">
    <ol className="flex flex-wrap items-center gap-1">
      <BreadcrumbItem type="icon" href="#demo-breadcrumb-home"/>
      <BreadcrumbItem type="overflow" label="Mostrar ancestros de muestra" expanded={expanded}
        onActivate={() => setExpanded(value => !value)}/>
      <BreadcrumbItem label="Comprobantes" current/>
    </ol>
    {expanded && <a href="#demo-breadcrumb-home">Documentos</a>}
    <span className="sr-only" id="demo-breadcrumb-home">Inicio de muestra</span>
  </nav>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [breadcrumb-item.tsx](../../src/components/breadcrumb-item.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type BreadcrumbItemProps =
  | { type?: 'text'; label: string; current: true }
  | { type?: 'text'; label: string; current?: false; href: string; disabled?: boolean }
  | { type: 'icon'; label?: string; href: string; disabled?: boolean }
  | { type: 'overflow'; label: string; onActivate: () => void; expanded?: boolean; controls?: string; disabled?: boolean };
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
BreadcrumbItem: props: BreadcrumbItemProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. El eslabón individual tiene tipos fijos; el contenedor decide la composición. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [breadcrumb-item.contract.v1.0.0.md](../../../../specs/components/breadcrumb-item.contract.v1.0.0.md) · SHA-256 `8256eb263629bebc8ee7017fc9060e375c5677ccb5b5f759814b3e13c62c8006`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/search-breadcrumb-item.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
