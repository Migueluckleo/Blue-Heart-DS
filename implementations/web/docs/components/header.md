# Header · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `HEADER-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/header.contract.v1.0.0.md#guía-semántica-normativa).

Identifica el producto y su contexto global. Muestra versión, etapa, acciones, empresa y cuenta según el producto. Mantén la proporción del logo original y delega los menús, permisos y confirmaciones al anfitrión.

| Situación | Haz | Evita |
|---|---|---|
| Versión preliminar | Asocia el Badge al bloque de versión. | Mostrar etapa como control independiente. |
| Contexto global | Mantén acciones, empresa y cuenta distinguibles. | Añadir destinos ajenos a la configuración. |
| Ancho limitado | Usa el mínimo del contrato y un patrón de anfitrión adecuado. | Recortar el logo o inferir un breakpoint. |

[Carbon UI shell header](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-header/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Uso sin backend

Compone el logo oficial, la versión y las opciones locales de empresa y cuenta.

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

export function HeaderExample() {
  const [open, setOpen] = useState<'company'|'user'>();
  const [message, setMessage] = useState('');
  const toggle = (next:'company'|'user') => setOpen(current=>current===next ? undefined : next);
  const close = () => {
    if (open) document.getElementById(`demo-header-${open}`)?.focus();
    setOpen(undefined);
  };
  useEffect(()=>{if(open)document.getElementById(`demo-header-${open}-option`)?.focus();},[open]);
  return <div className="my-4 space-y-2" onKeyDown={event=>{if(open&&event.key==='Escape')close();}}>
    <div className="overflow-x-auto">
      <Header company={{id:'demo-header-company',companyName:'Empresa de muestra',rfc:'XAXX010101000',
        open:open==='company',onToggle:()=>toggle('company'),controls:'demo-header-company-list'}}
        user={{id:'demo-header-user',name:'Julia Ávila',avatar:{initials:'JÁ'},
          open:open==='user',onToggle:()=>toggle('user'),controls:'demo-header-user-menu'}}
        actions={{actions:5,onAction:action=>setMessage(`Acción de muestra: ${action}`)}}/>
    </div>
    <ul id="demo-header-company-list" role="listbox" aria-label="Empresas del encabezado" hidden={open!=='company'}>
      <li id="demo-header-company-option" role="option" aria-selected="true" tabIndex={0}
        onClick={close} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();close();}}}>
        Empresa de muestra
      </li>
    </ul>
    <div id="demo-header-user-menu" role="menu" aria-label="Cuenta del encabezado" hidden={open!=='user'}>
      <button id="demo-header-user-option" type="button" role="menuitem" onClick={close}>Preferencias</button>
    </div>
    <p role="status">{message}</p>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [header.tsx](../../src/components/header.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface HeaderProps {
  version?: string;
  showVersion?: boolean;
  showReleaseBadge?: boolean;
  showCompany?: boolean;
  showActions?: boolean;
  showUser?: boolean;
  badge?: Pick<BadgeProps,'label'|'showLeftIcon'|'showRightIcon'|'leftIcon'|'rightIcon'>;
  company?: CompanySelectorProps;
  actions?: HeaderActionsProps;
  user?: UserSelectorProps;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Header: {version='2.0.0',showVersion=true,showReleaseBadge=true,showCompany=true,
  showActions=true,showUser=true,badge,company,actions,user}:HeaderProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Regiones fijas con visibilidad booleana. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [header.contract.v1.0.0.md](../../../../specs/components/header.contract.v1.0.0.md) · SHA-256 `cbac0551a47cc1c755f7db8440b49610ed0574bca0b07a7124fba3151759c044`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/header-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
