# Dropdown menu · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `DROPDOWN-MENU-001` · API local 0.1.0 · categoría formularios.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/dropdown-menu.contextual-usage.amendment.v1.0.1.md#guía-semántica-normativa).

### Propósito y alcance del valor

**DROPDOWN-INTENT-01.** Usa Dropdown para elegir un valor de una lista definida por el anfitrión: moneda, cuenta o categoría. El nombre del campo permanece visible y el valor solo cambia al confirmar una opción. Para escribir un dato libre usa Input; para varias líneas usa Text Area; para buscar en un conjunto usa Search. Considera alternativas visibles cuando compararlas sea importante, sin fijar un umbral universal de cantidad.

**DROPDOWN-INTENT-02.** El selector actual conserva una selección simple. La búsqueda reduce opciones visibles; no acepta un valor libre, crea elementos, guarda el formulario ni introduce selección múltiple. Un menú de acciones o navegación necesita el patrón apropiado. Evita mezclar monedas con Guardar, Eliminar o Ver historial como opciones del mismo campo.

### Anatomía, tamaño y Slot

El disparador usa superficie Input fuera del menú y conserva etiqueta y valor. DropdownField coordina disparador y popup; DropdownMenu ofrece la superficie, búsqueda opcional y lista. [Dropdown item](../../../../specs/components/dropdown-item.contextual-usage.amendment.v1.0.1.md) representa valores y separadores.

**DROPDOWN-SLOT-01.** Options es Slot vertical con al menos un hijo, sin máximo declarado, con preferencia exclusiva por Dropdown item y ajuste al ancho al insertar. Cinco opciones medium son contenido inicial, no un límite. Header y Divider no eligen. Mantén tamaño común entre opciones y controla una selección como máximo.

**DROPDOWN-SIZE-01.** Usa Small para contexto local denso cuando los objetivos sigan siendo distinguibles; Medium como punto de partida contextual de escritorio normal y Large para un contexto más focalizado o de activación más cómoda. Conserva coherencia del grupo. No uses otro tamaño para expresar prioridad. DropdownField y DropdownMenu conservan default Medium; la recomendación contextual no cambia el default Large de Input o de DropdownItem.

**DROPDOWN-LAYOUT-01.** Popup y disparador comparten ancho, con separación de 4 px. El alto máximo del menú es 320 px; el anfitrión puede limitarlo más. No fijes la altura del ejemplo de 210 px para cualquier cantidad. Search permanece visible y solo Options se desplaza. Show scrollbar representa desbordamiento nativo de diseño; el navegador controla el desplazamiento web. El auxiliar privado no es un control consumible independiente.

### Lista simple o búsqueda opcional

**DROPDOWN-SEARCH-01.** Activa Show search cuando longitud, similitud o familiaridad de las opciones dificulte localizar un valor. Una lista breve y reconocible puede explorarse sin consulta. No hay un número universal que obligue a activar búsqueda.

**DROPDOWN-SEARCH-02.** `showSearch=false` por defecto. Al activarlo, Search small de 32 px ocupa el ancho disponible sobre Options y fuera del Slot. No hereda el tamaño de opciones o disparador. Conserva padding de contenido 4 px y separación de búsqueda/opciones 16 px según la enmienda vigente.

**DROPDOWN-SEARCH-03.** Filtra por Label y Description sin distinguir mayúsculas ni acentos. La consulta no cambia la selección; cerrar reinicia la consulta local y conserva el valor confirmado. Mantén grupos con coincidencias, elimina encabezados/divisores huérfanos y conserva coincidencias Disabled visibles sin permitir elegirlas. No hay búsqueda remota incorporada.

### Activa, seleccionada y hover

**DROPDOWN-ACTIVE-01.** La opción activa es candidata de la interacción. La seleccionada conserva el valor confirmado y su Check. Mover la candidata con flechas no cambia el valor. Hover da respuesta temporal al puntero; no equivale a selección ni a confirmación.

**DROPDOWN-ACTIVE-02.** En web el foco DOM permanece en el combobox, que comunica la candidata mediante `aria-activedescendant`; no se mueve a cada fila ni se agrega un Tab por opción. Disabled queda fuera de la elección y del recorrido de opciones habilitadas; Header y Divider no activan valores. La combinación Selected + Disabled no es una variante adicional del ítem.

### Teclado y retorno de foco

| Regla | Situación | Comportamiento |
|---|---|---|
| DROPDOWN-KEY-01 | Abrir sin búsqueda | Enter, Espacio o flechas desde el disparador. |
| DROPDOWN-KEY-02 | Abrir con búsqueda | El foco pasa al campo de consulta. |
| DROPDOWN-KEY-03 | Recorrer | Flechas arriba/abajo recorren opciones habilitadas sin confirmar. |
| DROPDOWN-KEY-04 | Confirmar | Enter elige la candidata; sin búsqueda, Espacio también. Actualiza el valor, cierra y devuelve foco al disparador. |
| DROPDOWN-KEY-05 | Home/End sin búsqueda | Con lista abierta, van al principio/final de las opciones habilitadas. |
| DROPDOWN-KEY-06 | Editar búsqueda | Espacio, Home y End conservan su función de texto. La composición IME no confirma accidentalmente. |
| DROPDOWN-KEY-07 | Cancelar | Escape cierra sin cambiar selección; retorna al disparador según el contexto y modo de búsqueda vigente. |
| DROPDOWN-KEY-08 | Salir | Tab permite salir y el popup cierra al abandonar el campo compuesto. Clic exterior cierra sin secuestrar el foco. |

El foco de edición del buscador sigue su control editable. No extrapoles al texto editable la regla de Focus de Button. Una ubicación de foco y una opción activa no son selección persistente.

### Vacío, disponibilidad y recuperación

**DROPDOWN-EMPTY-01.** Sin coincidencias, muestra y anuncia Sin resultados. Permite cambiar o limpiar la consulta. No agregues una opción ficticia Sin resultados o Crear nuevo. Esta situación difiere de una lista sin opciones disponibles.

**DROPDOWN-EMPTY-02.** DropdownField no abre si no hay opciones habilitadas. El anfitrión explica cerca el motivo y la acción posible. No dejes un selector deshabilitado sin explicación.

**DROPDOWN-RECOVERY-01.** Carga y error de obtención de datos pertenecen al flujo. DropdownField no expone props nativos de loading, error o read-only. Representa feedback con cobertura existente y registra las decisiones del anfitrión; no inventes variantes ni coloques un mensaje de sistema como valor seleccionable.

**DROPDOWN-DATA-01.** Usa IDs estables para opciones; su posición o texto no debe ser su única identidad técnica. Si cambia un dato del que depende el catálogo, comprueba que la selección anterior siga siendo válida. No selecciones silenciosamente el primer resultado. Elegir un valor no guarda por sí mismo todo el formulario.

### Propiedades públicas y responsabilidades

| Propiedad o concepto | Uso y límite |
|---|---|
| label, placeholder | Nombre del dato y texto visible cuando no hay valor. |
| entries | Opciones con Label, Description e icono opcionales; headers/dividers no eligen. |
| selectedId, onSelectionChange | Selección simple confirmada y cambio controlado por el anfitrión. |
| size | Escala común de opciones y disparador en DropdownField; default medium. |
| disabled | Disponibilidad del selector, con explicación contextual aportada fuera del control. |
| maxHeight | Límite de todo el popup, incluida búsqueda; Options usa el espacio restante. |
| showSearch | Búsqueda opcional, false por defecto. Search conserva small. |
| searchLabel, searchPlaceholder | Nombre de la consulta y ejemplo visible; defaults “Buscar en ${label}” y “Buscar…”. |
| id, activeId, hidden | Identidad del listbox, candidata y visibilidad al consumir DropdownMenu directamente. |
| searchValue, onSearchChange | Consulta controlada directa; si no se aporta searchValue, DropdownMenu conserva consulta local. |
| onSearchKeyDown, searchInputProps | Coordinación directa de teclado y atributos ARIA admitidos. |
| className | Integración sin redefinir tokens internos o fabricar variantes. |
| Options, Show scrollbar | Slot y señal nativa de desbordamiento de diseño; no equivalen a scroll programado web. |

En consumo directo de DropdownMenu, el anfitrión coordina consulta, candidata, selección, apertura/cierre, teclado y foco. DropdownField proporciona esa coordinación existente. Conserva Search oficial fuera del listbox y del Slot; la adaptación embedded evita formularios anidados. No amplíes el API mediante props supuestas.

### Temas y legibilidad

El tema sigue al producto: Contable, Administrativo, Servicios o Personas. Conserva los tokens internos de cada componente, el borde, elevación, tamaños y roles. No cambies el tema de un menú aislado para recolorearlo. El QA heredado registra condiciones de contraste de Description en ciertas interacciones; conservarlas y revisar el contexto real no certifica conformidad global ni autoriza recolorear el DS.

## Uso sin backend

DropdownField conserva selección simple y añade showSearch opcional, con filtrado local y Search small fuera del listbox. El host controla datos y selección.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem, UserMessage, type ChatSidebarProps, Pagination, PaginationItem, Tabs, TextArea, DropdownField, FloatingActions, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

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
    <form onSubmit={event=>event.preventDefault()}>
      <DropdownField label="Moneda con búsqueda" entries={entries} selectedId={currency}
        showSearch searchLabel="Buscar moneda" searchPlaceholder="Buscar por nombre o código"
        onSelectionChange={setCurrency}/>
    </form>
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
  showSearch?: boolean;
  searchLabel?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  searchInputProps?: Pick<InputHTMLAttributes<HTMLInputElement>,
    'role' | 'aria-expanded' | 'aria-controls' | 'aria-activedescendant' | 'aria-autocomplete'>;
}

const optionId = (menuId: string, id: string) => `${menuId}-option-${encodeURIComponent(id)}`;
const normalize = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().trim();

/** Keep only groups with matches and separators between surviving options. */

export interface DropdownFieldProps extends Omit<DropdownMenuProps,
  'id' | 'activeId' | 'hidden' | 'searchValue' | 'onSearchChange' | 'onSearchKeyDown' | 'searchInputProps'> {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
DropdownMenu: {id, label, entries, size = 'medium', selectedId, activeId,
  onSelectionChange, maxHeight = 320, hidden = false, showSearch = false,
  searchLabel = `Buscar en ${label}`, searchPlaceholder = 'Buscar…', searchValue,
  onSearchChange, onSearchKeyDown, searchInputProps}: DropdownMenuProps
DropdownField: {label, entries, selectedId, onSelectionChange, size = 'medium',
  placeholder = 'Selecciona una opción', disabled = false, maxHeight = 320, className = '',
  showSearch = false, searchLabel, searchPlaceholder}: DropdownFieldProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Options admite insertar, quitar y reordenar ítems oficiales. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [dropdown-menu.contract.v1.0.0.md](../../../../specs/components/dropdown-menu.contract.v1.0.0.md) · SHA-256 `829e36cc2dd2c048bb3d7289b9d2243675d3618de25a3867e240754978caac58`.
- [dropdown-menu.search.amendment.v1.0.0.md](../../../../specs/components/dropdown-menu.search.amendment.v1.0.0.md) · SHA-256 `54cff39539cd9cd14f019d489e4b8c13a8a36faee73dd5acf9185c62edb3e722`.
- [dropdown-menu.contextual-usage.amendment.v1.0.1.md](../../../../specs/components/dropdown-menu.contextual-usage.amendment.v1.0.1.md) · SHA-256 `63ddeab29c441760b64ebbdad1517fc683971c2b7bda1ad81dfd80338293ca18`.
- [inputs-dropdowns.forms.amendment.v1.0.0.md](../../../../specs/patterns/inputs-dropdowns.forms.amendment.v1.0.0.md) · SHA-256 `5523f57bfd8ea56fc98cb79bd6afb257a89010935eba879bf94d112f7bcc150b`.
- [forms.app-shell.amendment.v1.0.0.md](../../../../specs/patterns/forms.app-shell.amendment.v1.0.0.md) · SHA-256 `0e4c9655879b4847db021522fe49bc86f8dcac095a01c63fb3d75d03b5db8b8b`.
- [tabs.local-navigation.amendment.v1.0.0.md](../../../../specs/patterns/tabs.local-navigation.amendment.v1.0.0.md) · SHA-256 `b297a1444e4ffcb17456d8ebcbba6bcb58b8349dad25038010b852b724ab39c0`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/dropdown-menu.search.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
