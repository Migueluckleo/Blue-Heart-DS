# Dropdown item · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `DROPDOWN-ITEM-001` · API local 0.1.0 · categoría formularios.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/dropdown-item.contextual-usage.amendment.v1.0.1.md#guía-semántica-normativa).

### Tipos y anatomía

| Regla | Tipo o parte | Haz | Evita |
|---|---|---|---|
| DROPDOWN-ITEM-TYPE-01 | Option | Representar un valor elegible del mismo campo con Label identificable. | Mezclar valores con acciones como Guardar o Ver historial. |
| DROPDOWN-ITEM-TYPE-02 | Header | Nombrar un grupo de opciones relacionadas. | Convertir el encabezado en opción o incluirlo en el recorrido de elecciones. |
| DROPDOWN-ITEM-TYPE-03 | Divider | Separar secciones cuando mejore la lectura. | Tratar la línea como control o conservar separadores huérfanos al filtrar. |
| DROPDOWN-ITEM-CONTENT-01 | Label | Nombrar el valor con texto suficiente y consistente. | Usar solo descripción, color o un icono para identificarlo. |
| DROPDOWN-ITEM-CONTENT-02 | Description | Aportar contexto útil, como terminación de una cuenta. | Repetir Label o reemplazarlo por una descripción ambigua. |
| DROPDOWN-ITEM-ICON-01 | Icono izquierdo | Aclarar el tipo de opción si contribuye al significado, con Phosphor Outline/Light. | Dejar ImageSquare de muestra sin relación o inventar un segundo icono de contenido. |
| DROPDOWN-ITEM-SELECT-01 | Check derecho | Mostrar selección confirmada. | Interpretarlo como checkbox de multiselección o como opción activa sin confirmar. |

Show description y Show left icon están apagados por defecto en Figma; Description y swap son propiedades acotadas. En web `description` aporta el texto complementario y `icon`/`showLeftIcon` controlan el accesorio. Description se adapta al ancho de Content y puede crecer; no es una segunda etiqueta independiente.

### Activa, seleccionada, hover y disabled

**DROPDOWN-ITEM-STATE-01.** La candidata activa de teclado indica dónde se encuentra el recorrido; no cambia el valor del campo. La seleccionada conserva Check mientras se exploran otras. Hover solo comunica exploración con puntero y no confirma.

**DROPDOWN-ITEM-STATE-02.** Disabled conserva visibilidad si sirve al contexto, pero no se elige ni entra en el recorrido habilitado. No crees Selected + Disabled como una variante adicional. Header y Divider no activan una elección.

**DROPDOWN-ITEM-FOCUS-01.** El anfitrión coordina teclado y foco. En la composición web vigente el combobox conserva el foco DOM y comunica la opción candidata mediante aria-activedescendant; no hay un Tab por fila. La apariencia activa no significa mover el foco DOM al ítem ni selección persistente. El Input de búsqueda conserva su foco de edición.

### Matriz y tamaño

Option tiene siete combinaciones por tamaño: default/hover/focus/disabled sin selección y default/hover/focus con selección. Son 21 variantes. Header tiene tres tamaños, sin elección. Divider solo medium/default/sin selección. Total: 25, no el producto de todos los ejes posibles.

**DROPDOWN-ITEM-SIZE-01.** Las opciones de un mismo menú comparten tamaño. Small corresponde a un contexto denso si mantiene objetivos distinguibles; Medium es el punto de partida contextual del selector de escritorio; Large corresponde a un contexto más focalizado o de activación cómoda. No cambies tamaño para expresar prioridad. El API de DropdownItem conserva default Large; DropdownMenu y DropdownField pasan Medium por defecto. Search mantiene small cuando está presente.

### Mapeo de propiedades

| Dimensión | Figma | Web |
|---|---|---|
| Tipo | type=option/header/divider | `entry.type`; la forma de entry corresponde a cada tipo. |
| Contenido | Label, Description, Group label | `entry.label`, `entry.description`; Header usa label del grupo. |
| Accesorio | Show left icon, Left icon | `entry.icon`, `entry.showLeftIcon`; iconos oficiales. |
| Tamaño | size=small/medium/large | `size`; coherencia del menú. |
| Estado | state=default/hover/focus/disabled | Hover real; `active` identifica candidata; `entry.disabled` bloquea. |
| Selección | selected=false/true | `selected`; aria-selected y Check sin selección múltiple. |
| Identidad | Instancia del ítem | `entry.id`, `id`; identidad estable distinta de posición. |
| Activación | Elección coordinada por anfitrión | `onActivate`, `onMouseDown`; no implementan por sí solos el selector completo. |

Conserva colores, tipografía, roles de iconos, estados y bindings delegados. El tema sigue al producto; el contraste heredado de Description en ciertas interacciones permanece documentado y no acredita conformidad global. P-SLOTS NOT_APPLICABLE: el ítem tiene posiciones fijas; el Slot corresponde a Options del menú.

## Uso sin backend

Usa Option para elegir. Header y Divider organizan el contenido.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem, UserMessage, type ChatSidebarProps, Pagination, PaginationItem, Tabs, TextArea, DropdownField, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

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
- [dropdown-item.contextual-usage.amendment.v1.0.1.md](../../../../specs/components/dropdown-item.contextual-usage.amendment.v1.0.1.md) · SHA-256 `2ba61dcc3e1757a4be147b1102724444086e07c0698779c6330c2b5d384defec`.
- [inputs-dropdowns.forms.amendment.v1.0.0.md](../../../../specs/patterns/inputs-dropdowns.forms.amendment.v1.0.0.md) · SHA-256 `5523f57bfd8ea56fc98cb79bd6afb257a89010935eba879bf94d112f7bcc150b`.
- [forms.app-shell.amendment.v1.0.0.md](../../../../specs/patterns/forms.app-shell.amendment.v1.0.0.md) · SHA-256 `0981d971c7e675b226c79a31f7f64b4ed434c7133d5af86ad347a1f11177bda9`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/dropdown-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
