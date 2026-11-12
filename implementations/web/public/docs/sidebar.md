# Sidebar · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `SIDEBAR-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/sidebar.secondary-control.amendment.v1.0.1.md#guía-semántica-normativa).

Usa Sidebar para navegación lateral persistente. En Figma y web, usa Secondary small para que el control de expansión y contracción tenga una superficie definida. Conserva «Expandir navegación» y «Contraer navegación» como nombres accesibles en consumo web. El anfitrión define el contenido principal y las opciones inferiores de cada presentación, la altura disponible y la ruta actual.

| Situación | Haz | Evita |
|---|---|---|
| Navegación contraída | Usa CaretRight Light para expandir y da un nombre a cada destino. | Depender solo del icono. |
| Menú expandido | Usa CaretLeft Light para contraer y organiza los destinos en sus Slots. | Convertir la cantidad de la muestra en un límite. |
| Cambio de presentación | Mantén explícitas las listas de cada presentación y el foco del control. | Prometer sincronización automática de contenido personalizado. |

El anfitrión resuelve rutas, permisos, scroll y adaptación móvil. [Carbon UI shell](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-left-panel/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Uso sin backend

El control de expansión y contracción usa Icon Button Secondary small en Figma y en el ejemplo web. Conserva el foco y actualiza su nombre accesible al alternar.

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

export function SidebarExample() {
  const [collapsed, setCollapsed] = useState(true);
  return <div className="my-4">
    <Sidebar label="Navegación lateral de muestra" collapsed={collapsed} onCollapsedChange={setCollapsed} className="h-72"
      collapsedMenuItems={<MenuItem label="Inicio" href="#demo-sidebar-target" current/>}
      collapsedLowerOptions={<MenuItem label="Ayuda" href="#demo-sidebar-target" active={false}
        fillIcon={QuestionIcon} lightIcon={QuestionIcon}/>}
      expandedMenuItems={<>
        <MenuItem label="Inicio" type="expanded" href="#demo-sidebar-target" current showRightIcon={false}/>
        <MenuItem label="Comprobantes" type="expanded" href="#demo-sidebar-target" active={false} showRightIcon={false}/>
      </>}
      expandedLowerOptions={<MenuItem label="Ayuda" type="expanded" href="#demo-sidebar-target" active={false}
        fillIcon={QuestionIcon} lightIcon={QuestionIcon} showRightIcon={false}/>}/>
    <span id="demo-sidebar-target" className="sr-only">Destino de muestra</span>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [sidebar.tsx](../../src/components/sidebar.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface SidebarProps {
  label: string;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  collapsedMenuItems?: ReactNode;
  collapsedLowerOptions?: ReactNode;
  expandedMenuItems?: ReactNode;
  expandedLowerOptions?: ReactNode;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Sidebar: {label, collapsed, onCollapsedChange, collapsedMenuItems, collapsedLowerOptions,
  expandedMenuItems, expandedLowerOptions, className}: SidebarProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Cuatro Slots independientes permiten editar ambas presentaciones. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [sidebar.contract.v1.0.0.md](../../../../specs/components/sidebar.contract.v1.0.0.md) · SHA-256 `0cfcf88001c7bbba68ad8011197bc3ff049e8dad5ab320dbfa5e149a68cf57f0`.
- [sidebar.secondary-control.amendment.v1.0.1.md](../../../../specs/components/sidebar.secondary-control.amendment.v1.0.1.md) · SHA-256 `d6a628fc853ee2223064511ec4244d61edc16965dd6e86c169ffd8eab2bdf0ad`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/sidebar-secondary-control.v1.0.1.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
