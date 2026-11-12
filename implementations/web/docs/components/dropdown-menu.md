# Dropdown menu · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `DROPDOWN-MENU-001` · API local 0.1.0 · categoría formularios.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/dropdown-menu.contract.v1.0.0.md#guía-semántica-normativa).

Usa Dropdown menu para elegir un valor de una lista definida por el anfitrión. W3C WAI relaciona combobox y listbox mediante controles y opción activa. Carbon mantiene la etiqueta del campo y distingue elección simple de multiselección. [W3C WAI Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) · [Carbon Dropdown](https://www.carbondesignsystem.com/building-blocks/core/components/dropdown/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Elegir moneda u otra opción | Mantén el nombre del campo y actualiza su valor al confirmar. | Presentar acciones de navegación como opciones del campo. |
| Lista extensa | Ajusta el viewport y permite desplazamiento cuando sobrepase el espacio. | Fijar cinco como máximo o simular seguimiento nativo del thumb privado. |
| Cerrar sin elegir | Conserva el valor anterior y devuelve foco al disparador según la acción. | Cambiar el valor al mover la opción activa. |

## Uso sin backend

DropdownField coordina el combobox de solo selección con el listbox. El host controla los datos y la selección.

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

export function DropdownMenuExample() {
  const [currency,setCurrency]=useState('MXN');
  const names=[['MXN','Peso mexicano'],['USD','Dólar estadounidense'],['EUR','Euro'],
    ['CAD','Dólar canadiense'],['BRL','Real brasileño'],['COP','Peso colombiano'],
    ['CLP','Peso chileno'],['PEN','Sol peruano'],['JPY','Yen japonés'],['GBP','Libra esterlina']] as const;
  const entries: DropdownEntry[]=[
    {id:'group',type:'header',label:'Monedas'},
    ...names.map(([id,description])=>({id,type:'option' as const,label:id,description,disabled:id==='EUR'})),
  ];
  return <div className="my-4 grid max-w-[320px] gap-4">
    <DropdownField label="Moneda del comprobante" entries={entries} selectedId={currency}
      onSelectionChange={setCurrency}/>
    <p id="demo-dropdown-currency" role="status">Moneda elegida: {currency}</p>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [dropdown-menu.tsx](../../src/components/dropdown-menu.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface DropdownMenuProps {
  id: string;
  label: string;
  entries: readonly DropdownEntry[];
  size?: DropdownSize;
  selectedId?: string;
  activeId?: string;
  onSelectionChange: (id: string) => void;
  maxHeight?: number;
  hidden?: boolean;
}

export interface DropdownFieldProps extends Omit<DropdownMenuProps,'id'|'activeId'|'hidden'> {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
DropdownMenu: {id,label,entries,size='medium',selectedId,activeId,onSelectionChange,maxHeight,hidden}: DropdownMenuProps
DropdownField: {label,entries,size='medium',selectedId,onSelectionChange,maxHeight,
  placeholder='Selecciona una opción',disabled,className}: DropdownFieldProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Options admite insertar, quitar y reordenar ítems oficiales. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [dropdown-menu.contract.v1.0.0.md](../../../../specs/components/dropdown-menu.contract.v1.0.0.md) · SHA-256 `d064ff4c024858d9fd9bf7448aaf0227b214a837d63700855880351e8effa766`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/dropdown-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
