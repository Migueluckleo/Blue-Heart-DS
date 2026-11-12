# App Shell · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `APP-SHELL-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/app-shell.contract.v1.0.0.md#guía-semántica-normativa).

Usa App Shell para reunir navegación global y el contenido principal de una pantalla de escritorio. Carbon documenta cómo Header y panel lateral organizan niveles de navegación. W3C WAI distingue las regiones semánticas que permiten recorrer la página. BlueHeart mantiene la jerarquía local en Section Header y deja Grid o Flex al contenido. [Carbon Global Header](https://www.carbondesignsystem.com/building-blocks/core/patterns/global-header) · [W3C WAI Landmark Regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)

| Situación | Haz | Evita |
|---|---|---|
| Dashboard con módulos alineados | Usa Grid y elige spans según los mínimos de cada módulo. | Fijar las alturas de los rectángulos de ejemplo. |
| Listado, formulario o detalle | Usa Flex cuando predomine un eje. Conserva el orden del contenido. | Reordenar el significado visualmente. |
| Menú expandido y contenido largo | Verifica espacio disponible y declara una región de scroll en el anfitrión. | Convertir el recorte del ejemplo Figma en contenido web inaccesible. |

## Uso sin backend

Compón Header, Sidebar y Section Header. Elige Grid o Flex según las relaciones del contenido de Body.

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

export function AppShellExample() {
  const [collapsed, setCollapsed] = useState(true);
  const [bodyLayout, setBodyLayout] = useState<AppShellBodyLayout>('grid');
  const [action, setAction] = useState('');
  const moduleStyle = 'grow basis-0 rounded-lg bg-slate-100 p-4';
  return <div className="my-4 space-y-4">
    <label className="inline-flex items-center gap-2">
      Distribución del contenido
      <select className="rounded border px-2 py-1" value={bodyLayout}
        onChange={event => setBodyLayout(event.currentTarget.value === 'grid' ? 'grid' : 'flex')}>
        <option value="grid">Grid</option>
        <option value="flex">Flex</option>
      </select>
    </label>
    <div className="overflow-x-auto">
      <AppShell className="w-[1440px] min-h-[1024px]" bodyLayout={bodyLayout}
        contentAs="section" contentLabel="Área de trabajo de muestra"
        header={{actions:{actions:3,onAction:next => setAction(next)}}}
        sidebar={{label:'Navegación del área de trabajo',collapsed,onCollapsedChange:setCollapsed,
          collapsedMenuItems:<MenuItem label="Inicio del área" href="#demo-shell-heading" current showRightIcon={false} showBeta={false}/>,
          expandedMenuItems:<MenuItem type="expanded" label="Inicio del área" href="#demo-shell-heading" current showRightIcon={false} showBeta={false}/>}}
        sectionHeader={{title:'Resumen contable',headingLevel:3,
          description:'Revisa los comprobantes del periodo y su estado de conciliación.'}}>
        <div className={bodyLayout === 'grid' ? 'contents' : 'flex gap-[var(--bh-app-shell-gap)]'}>
          <AppShellGridItem span={2} className={moduleStyle}>
            <h4>Comprobantes registrados</h4>
            <p>128 en el periodo</p>
          </AppShellGridItem>
          <AppShellGridItem span={2} className={moduleStyle}>
            <h4>Por conciliar</h4>
            <p>7 pendientes</p>
          </AppShellGridItem>
        </div>
        <AppShellGridItem span={4} className={moduleStyle}>
          <h4 id="demo-shell-heading">Revisión del periodo</h4>
          <Input id="demo-shell-note" label="Nota de revisión" placeholder="Añade una nota"
            required={false} showIcon={false} className="max-w-sm"/>
        </AppShellGridItem>
      </AppShell>
    </div>
    <p role="status">{action && `Acción de muestra: ${action}`}</p>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [app-shell.tsx](../../src/components/app-shell.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type AppShellBodyLayout = 'grid' | 'flex';

export interface AppShellProps {
  header: HeaderProps;
  sidebar: SidebarProps;
  sectionHeader: SectionHeaderProps;
  children: ReactNode;
  bodyLayout?: AppShellBodyLayout;
  contentAs?: 'main' | 'section';
  contentLabel?: string;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
AppShell: {header, sidebar, sectionHeader, children, bodyLayout = 'grid',
  contentAs: Content = 'main', contentLabel, className}: AppShellProps
AppShellGridItem: {span = 1, children, className}: {
  span?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Body admite composición reemplazable en cuatro variantes. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [app-shell.contract.v1.0.0.md](../../../../specs/components/app-shell.contract.v1.0.0.md) · SHA-256 `6e4514e91f96d44d8478142518e827a09ebd2d7fdda64255aa0d827bd8650492`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/app-shell.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
