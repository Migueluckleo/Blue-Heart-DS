# Company selector · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `COMPANY-SELECTOR-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/company-selector.contract.v1.0.0.md#guía-semántica-normativa).

Muestra la empresa activa y su RFC. El control solicita abrir la lista del anfitrión, con foco y estado expandido. Conserva la identidad completa y confirma un cambio cuando el producto lo requiera.

| Situación | Haz | Evita |
|---|---|---|
| Razón social larga | Conserva el nombre accesible completo y el RFC visible. | Cortar el dato fuente o inferir la empresa. |
| Selección de empresa | Abre una lista de empresas disponibles. | Usar el estado open como confirmación de cambio. |
| Cambios sin guardar | Deja la confirmación al flujo anfitrión. | Cambiar el contexto sin la regla del producto. |

[Carbon UI shell header](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-header/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Uso sin backend

Abre la lista local y vuelve con Escape.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem, UserMessage, type ChatSidebarProps, Pagination, PaginationItem, Tabs, TextArea, DropdownField, FloatingActions, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function CompanySelectorExample() {
  const [open, setOpen] = useState(false);
  const close = () => {setOpen(false);document.getElementById('demo-company-selector')?.focus();};
  useEffect(()=>{if(open)document.getElementById('demo-company-option')?.focus();},[open]);
  return <div className="my-4 space-y-2" onKeyDown={event=>{if(open&&event.key==='Escape')close();}}>
    <CompanySelector id="demo-company-selector" companyName="Empresa de muestra" rfc="XAXX010101000"
      open={open} onToggle={()=>setOpen(value=>!value)} controls="demo-company-list"/>
    <ul id="demo-company-list" role="listbox" aria-label="Empresas de muestra" hidden={!open}>
      <li id="demo-company-option" role="option" aria-selected="true" tabIndex={0}
        onClick={close} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();close();}}}>
        Empresa de muestra
      </li>
    </ul>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [company-selector.tsx](../../src/components/company-selector.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface CompanySelectorProps {
  id?: string;
  companyName: string;
  rfc: string;
  open?: boolean;
  controls?: string;
  onToggle?: () => void;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
CompanySelector: {id,companyName,rfc,open=false,controls,onToggle}:CompanySelectorProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Anatomía fija y textos acotados. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [company-selector.contract.v1.0.0.md](../../../../specs/components/company-selector.contract.v1.0.0.md) · SHA-256 `8f25df0524c840e0386cdc279c9afbb05993f18a5f029868f0f4baa9dcd4b2f5`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/header-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
