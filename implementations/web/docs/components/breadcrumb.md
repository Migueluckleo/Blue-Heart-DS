# Breadcrumb · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `BREADCRUMB-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/breadcrumb.contract.v1.0.0.md#guía-semántica-normativa).

Muestra la ubicación actual en una jerarquía y ofrece acceso a ancestros. Back apunta al nivel inmediatamente superior. Para rutas largas, conserva el primer nivel, los dos últimos elementos visibles y un control para revelar los ancestros omitidos. El anfitrión aporta los destinos y controla el espacio disponible. En una presentación de retorno compacta, muestra el ancestro anterior y conserva su condición de enlace.

| Situación | Haz | Evita |
|---|---|---|
| Ruta corta | Ordena los ancestros y conserva el actual al final. | Tratar el actual como enlace o omitir su indicación. |
| Ruta larga | Expón los niveles omitidos mediante un control con nombre. | Inferir rutas comparando muestras de Figma. |
| Retorno | Enlaza Back al padre jerárquico. | Usar historial del navegador como equivalente. |

Usa una región de navegación con nombre y aria-current en la página actual. [Atlassian Breadcrumbs](https://atlassian.design/components/breadcrumbs/) · [W3C Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

## Uso sin backend

Abre los niveles anteriores en una ruta de muestra y compara el acceso de retorno compacto.

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

export function BreadcrumbExample() {
  const ancestors = [
    {label:'Inicio', href:'#demo-breadcrumb-root', type:'icon'},
    {label:'Contabilidad', href:'#demo-breadcrumb-accounting'},
    {label:'Pólizas', href:'#demo-breadcrumb-parent'},
  ] as const;
  return <div className="my-4 space-y-4">
    <Breadcrumb label="Ruta jerárquica de muestra" ancestors={ancestors} current="Póliza P-0458" collapsed/>
    <Breadcrumb label="Retorno de muestra" ancestors={ancestors} current="Póliza P-0458" compact/>
    <div className="sr-only">
      <span id="demo-breadcrumb-root">Inicio</span>
      <span id="demo-breadcrumb-accounting">Contabilidad</span>
      <span id="demo-breadcrumb-parent">Pólizas</span>
    </div>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [breadcrumb.tsx](../../src/components/breadcrumb.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface BreadcrumbAncestor {
  label: string;
  href: string;
  type?: 'text' | 'icon';
}

export interface BreadcrumbProps {
  label?: string;
  ancestors: readonly [BreadcrumbAncestor, ...BreadcrumbAncestor[]];
  current: string;
  showBack?: boolean;
  collapsed?: boolean;
  compact?: boolean;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Breadcrumb: {label = 'Ruta de navegación', ancestors, current, showBack = true,
  collapsed = ancestors.length >= 5, compact = false}: BreadcrumbProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. La matriz nativa define cantidades por variante y expone instancias oficiales. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [breadcrumb.contract.v1.0.0.md](../../../../specs/components/breadcrumb.contract.v1.0.0.md) · SHA-256 `9ebe8c835f06524e6d08da68d49515e613e06c6ec74b41037778118a5eb1ef50`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/search-breadcrumb-item.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
