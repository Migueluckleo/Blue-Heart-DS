# Top bar · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TOP-BAR-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/top-bar.contract.v1.0.0.md#guía-semántica-normativa).

Agrupa destinos del mismo nivel en una barra horizontal. El anfitrión aporta el orden, la ruta activa y el comportamiento cuando falta espacio. Mantén nombres que identifiquen cada destino y usa una región de navegación con nombre.

| Situación | Haz | Evita |
|---|---|---|
| Navegación de sección | Agrupa destinos relacionados en Menu items. | Mezclar acciones ajenas al recorrido. |
| Ancho limitado | Decide overflow o patrón alternativo desde el anfitrión. | Suponer que la barra se adapta a un modo móvil automáticamente. |
| Destino activo | Conserva un estado visual y aria-current cuando corresponda. | Hacer depender la ubicación solo del color. |

Carbon distingue navegación de primer nivel y navegación lateral en el shell. [Carbon UI shell](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-left-panel/guidelines)

## Uso sin backend

Usa el área desplazable del anfitrión para consultar las secciones.

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

export function TopBarExample() {
  return <div className="my-4 overflow-x-auto">
    <TopBar label="Secciones de muestra" items={[
      {id:'home',label:'Inicio',href:'#demo-top-bar-target',active:true,current:true,showRightIcon:false},
      {id:'sales',label:'Ventas',href:'#demo-top-bar-target',active:false,showRightIcon:false},
      {id:'reports',label:'Reportes',href:'#demo-top-bar-target',active:false,showRightIcon:false},
    ]}/>
    <span id="demo-top-bar-target" className="sr-only">Destino de muestra</span>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [top-bar.tsx](../../src/components/top-bar.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type TopBarItem = MenuItemAction & {
  id: string;
  label: string;
  active?: boolean;
  showRightIcon?: boolean;
};

export interface TopBarProps {
  label: string;
  items: readonly TopBarItem[];
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
TopBar: {label, items, className}: TopBarProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Menu items admite una lista abierta. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [top-bar.contract.v1.0.0.md](../../../../specs/components/top-bar.contract.v1.0.0.md) · SHA-256 `5219c7be83a50e7b035eccc8c317528d2821b3e66df1710895e7f53ac1188470`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/sidebar-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
