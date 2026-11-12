# Menu item · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `MENU-ITEM-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/menu-item.contract.v1.0.0.md#guía-semántica-normativa).

Usa Menu item para un destino o un control que despliega una rama en la navegación. Conserva el nombre accesible cuando el riel colapsado oculta Label. Usa Tooltip para orientación adicional. Marca como activo el destino actual o la rama que contiene la página actual según el contexto del anfitrión. El anfitrión resuelve rutas, permisos, jerarquía y colisiones de Tooltip.

| Situación | Haz | Evita |
|---|---|---|
| Riel colapsado | Conserva «Inicio» como nombre accesible y alinea la ayuda con el icono. | Depender de Tooltip como único nombre. |
| Rama con submenú | Usa un botón que expone expanded y conserva la navegación como enlaces. | Usar roles de menú de aplicación para una navegación de sitio. |
| Destino actual | Identifica la página actual con aria-current y mantiene el estado visible. | Marcar como página actual todas las ramas activas. |

Los aliases temáticos y estados se conservan. BETA mantiene su gradiente original y su contraste limitado documentado. [Carbon UI shell](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-left-panel/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Uso sin backend

Navega al destino o despliega la rama por teclado.

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

export function MenuItemExample() {
  const [open, setOpen] = useState(false);
  return <nav aria-label="Menú de muestra" className="my-4 flex flex-wrap items-start gap-6">
    <MenuItem label="Inicio" href="#demo-menu-home" current tooltipLabel="Página de inicio"/>
    <div>
      <MenuItem label="Documentos" type="expanded" expanded={open} controls="demo-menu-children"
        onActivate={() => setOpen(value => !value)}/>
      <div id="demo-menu-children" hidden={!open}>
        <MenuItem label="Comprobantes" type="sub-menu" href="#demo-menu-home" active={false}/>
      </div>
    </div>
    <span id="demo-menu-home" className="sr-only">Destino de muestra</span>
  </nav>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [menu-item.tsx](../../src/components/menu-item.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type MenuItemPresentation =
  | { orientation?: 'vertical'; type?: 'collapsed' | 'expanded' | 'sub-menu' }
  | { orientation: 'horizontal'; type?: 'collapsed' };

export type MenuItemAction =
  | { href: string; current?: boolean; expanded?: never; controls?: never; onActivate?: never }
  | { href?: never; current?: never; expanded?: boolean; controls?: string; onActivate: () => void };

export type MenuItemProps = MenuItemPresentation & MenuItemAction & {
  label: string;
  active?: boolean;
  showRightIcon?: boolean;
  showBeta?: boolean;
  fillIcon?: Icon;
  lightIcon?: Icon;
  tooltipLabel?: string;
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
MenuItem: {label, orientation = 'vertical', type = 'collapsed', active = true,
  showRightIcon = true, showBeta = true, fillIcon = HouseLineIcon, lightIcon = HouseLineIcon,
  tooltipLabel = label, href, current, expanded, controls, onActivate}: MenuItemProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Los hijos y los intercambios de icono forman una anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [menu-item.contract.v1.0.0.md](../../../../specs/components/menu-item.contract.v1.0.0.md) · SHA-256 `99c7968ebc13a059c0482d64c99944fc878da6f518805d41f3528b6080537868`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/sidebar-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
