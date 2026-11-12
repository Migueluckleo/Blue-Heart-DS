# Dropdown item · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `DROPDOWN-ITEM-001` · API local 0.1.0 · categoría formularios.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/dropdown-item.contract.v1.0.0.md#guía-semántica-normativa).

Usa Option para un valor elegible, Header para identificar un grupo y Divider para separar secciones. W3C WAI diferencia las opciones elegibles de los nombres de grupo. Carbon trata las opciones de Dropdown como elecciones del mismo campo. [W3C WAI Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) · [Carbon Dropdown](https://www.carbondesignsystem.com/building-blocks/core/components/dropdown/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Elección con contexto | Usa Label como nombre y Description para un dato complementario. | Usar solo descripción o color para identificarla. |
| Opciones agrupadas | Usa Header o Divider como separadores sin activación. | Incluir encabezados en el recorrido de opciones. |
| Selección y disponibilidad | Muestra Check al seleccionar y mantén Disabled fuera de la elección. | Combinar Selected y Disabled como variante adicional. |

## Uso sin backend

Usa Option para elegir. Header y Divider organizan el contenido.

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

export function DropdownItemExample() {
  const [selected,setSelected]=useState('general');
  return <div className="my-4 max-w-[320px]">
    <DropdownField label="Tipo de comprobante" size="small" selectedId={selected} onSelectionChange={setSelected}
      entries={[
        {id:'group',type:'header',label:'Clasificación'},
        {id:'general',type:'option',label:'General',description:'Disponible para todos los comprobantes',showLeftIcon:true},
        {id:'operations',type:'option',label:'Operaciones',description:'Aplicable a revisiones del periodo'},
        {id:'archived',type:'option',label:'Archivado',disabled:true},
        {id:'line',type:'divider'},
        {id:'other',type:'option',label:'Otro tipo'},
      ]}/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [dropdown-item.tsx](../../src/components/dropdown-item.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type DropdownSize = 'large' | 'medium' | 'small';

export interface DropdownOption {
  id: string;
  type: 'option';
  label: string;
  description?: string;
  icon?: Icon;
  showLeftIcon?: boolean;
  disabled?: boolean;
}

export type DropdownEntry = DropdownOption
  | {id: string; type: 'header'; label: string}
  | {id: string; type: 'divider'};

export type DropdownItemProps = {
  entry: DropdownEntry;
  size?: DropdownSize;
  id?: string;
  active?: boolean;
  selected?: boolean;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  onActivate?: () => void;
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
DropdownItem: {entry,size='large',id,active,selected,onMouseDown,onActivate}: DropdownItemProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Option, Header y Divider tienen posiciones fijas. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [dropdown-item.contract.v1.0.0.md](../../../../specs/components/dropdown-item.contract.v1.0.0.md) · SHA-256 `19b5fb01a5e2a2e61cb5de983552f72435914b88c1d6d954748f5ddef19b79e3`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/dropdown-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
