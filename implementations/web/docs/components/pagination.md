# Pagination · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `PAGINATION-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/pagination.contextual-usage.amendment.v1.0.0.md#guía-semántica-normativa).

**PAG-INTENT-01.** Usa Pagination para recorrer lotes del mismo conjunto. No convertir páginas en secciones del objeto, etapas de formulario, carrusel o Stepper. Una misma consulta no debe mezclar Pagination y scroll infinito como formas simultáneas de recorrerla. La elección Default/Compact depende de tarea y ancho, no cambia automáticamente por breakpoint.

| Tipo | Uso | Composición aprobada |
|---|---|---|
| Default | Saltar a números y, cuando convenga, cambiar tamaño de lote. | Primera/anterior, números con elipsis, siguiente/última; rows opcional. Contador de registros a la derecha de todos los controles. |
| Compact | Avance anterior/siguiente y lectura de posición. | Dos flechas y Página N de M; resumen visible si corresponde, a izquierda o derecha. |

**PAG-POSITION-01.** Configurar explícitamente `rangePosition="right"` en Default, tanto standalone como en `Table.pagination`. El valor implícito actual del código sigue siendo left y no aplica esta regla contextual. La base Figma ofrece cuatro combinaciones técnicas default/compact × left/right; esta guía prescribe Default/right y conserva ambos lados de Compact. No eliminar la variante técnica ni afirmar que fue modificada. El resumen se coloca después de navegación y selector de filas; cambiar su posición visual conserva foco, rango y selección.

**PAG-RANGE-01.** Distinguir posición del lote (Página 2 de 2) y registros (21-25 de 25 registros). El número de página no sustituye el total. Con `totalRecords` entero seguro >=0 y tamaño entero positivo, el componente calcula rango y páginas; usa rows.value si existe, o pageSize con default 20. `range` permite texto propio que el anfitrión debe mantener coherente. Sin total válido gobierna totalPages. No representar total desconocido como cero ni inventar cifras.

| Caso confirmado | Resumen y disponibilidad |
|---|---|
| 0 registros | 0-0 de 0 registros; una página y flechas deshabilitadas. |
| 1 registro | 1-1 de 1 registro; conserva resumen. |
| 25 registros, tamaño 20, página 1 | 1-20 de 25 registros. |
| Mismo conjunto, página 2 | 21-25 de 25 registros; no extender a 40. |

**PAG-VISIBLE-01.** Con total válido, conservar resumen incluso en una página. Sin totalRecords válido, totalPages menor que dos oculta el componente; no sustituirlo por una cifra ficticia. `aria-live=polite` anuncia rango/posición en web. Acotar visualmente currentPage no sincroniza las filas reales del anfitrión.

**PAG-ROWS-01.** rows habilita selector solo en Default. Conserva Input/filled small con ancho 88 y sin label/helper/tooltip/badge visuales; su nombre accesible identifica Filas por página. 20/50/100 son opciones de muestra, no un límite universal. Cambiar tamaño actualiza página, total, filas, rango y selección conforme a una política declarada; reiniciar a página 1 es propuesta base, no persistencia automática.

**PAG-CONSISTENCY-01.** Página, filtros, orden y tamaño describen la misma consulta. Al paginar conservar filtros/orden y actualizar rango y filas juntos. No mostrar rango nuevo con filas antiguas sin explicar espera. Al filtrar, resolver páginas fuera de rango; la propuesta vuelve a la primera. Al eliminar el último registro, ajustar solo tras resultado confirmado. El anfitrión resuelve carga, fallos, respuestas tardías, reintento y regreso de detalle; un clic no confirma consulta remota.

**PAG-SLOT-01.** P-SLOTS REQUIRED en Default: Pages admite Pagination item, mínimo uno y sin máximo declarado; insertar, retirar y reordenar conservando orden, extremos y página única. La muestra y sus dimensiones no fijan ancho ni cantidad. No crear una segunda selección con Chips/Tabs para reemplazar items.

**PAG-KEYBOARD-01.** Tab/Shift+Tab recorre controles habilitados. Enter/Espacio activa el botón pertinente; flechas del teclado no cambian páginas como Tabs. El anfitrión decide y prueba el foco tras reemplazar datos; Pagination anuncia cambios sin moverlo automáticamente. No hay size ni modo móvil automático; touchTargets amplía objetivos a 44 px sin escalar superficie de 32.

## Uso sin backend

Pasa totalRecords para mostrar el rango y el total, por ejemplo 1-20 de 25 registros. El tamaño usa rows.value o pageSize, con default 20. El resumen permanece visible con cero o una sola página. rangePosition left/right ubica el resumen antes o después de todos los controles; default left, en Default y Compact.

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

export function PaginationExample() {
  const [page, setPage] = useState(5);
  const [rows, setRows] = useState(20);
  const [rangePosition, setRangePosition] = useState<'left' | 'right'>('left');
  const [compactPage, setCompactPage] = useState(1);
  const results = useRef<HTMLHeadingElement>(null);
  const total = 240;
  return <div className="my-4 space-y-4">
    <label className="flex items-center gap-2">
      Posición del resumen de registros
      <select value={rangePosition} onChange={event => setRangePosition(event.target.value as 'left' | 'right')}>
        <option value="left">Izquierda</option>
        <option value="right">Derecha</option>
      </select>
    </label>
    <h3 id="demo-pagination-results" ref={results} tabIndex={-1}>Comprobantes de la página {page}</h3>
    <div className="overflow-x-auto">
      <Pagination label="Paginación de comprobantes" currentPage={page} totalPages={Math.ceil(total / rows)}
        onPageChange={next => {setPage(next);results.current?.focus();}}
        totalRecords={total} rangePosition={rangePosition}
        rows={{value:rows,options:[20,50,100],onChange:next=>{setRows(next);setPage(1);}}}/>
    </div>
    <Pagination label="Paginación de vista compacta" type="compact" currentPage={compactPage}
      totalRecords={55} pageSize={20} rangePosition={rangePosition} totalPages={3} onPageChange={setCompactPage} touchTargets/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [pagination.tsx](../../src/components/pagination.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  type?: 'default' | 'compact';
  label?: string;
  range?: string;
  rangePosition?: 'left' | 'right';
  totalRecords?: number;
  pageSize?: number;
  pageLabel?: string;
  touchTargets?: boolean;
  rows?: {
    label?: string;
    value: number;
    options: readonly number[];
    onChange: (value: number) => void;
  };
}

```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Pagination: {currentPage, totalPages, onPageChange, type = 'default', label = 'Paginación',
  range, rangePosition = 'left', totalRecords, pageSize = 20, pageLabel, touchTargets = false, rows}: PaginationProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Pages admite inserción, retiro y orden de ítems. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [pagination.contract.v1.0.0.md](../../../../specs/components/pagination.contract.v1.0.0.md) · SHA-256 `a7f1fe70b993ba7b7aa6805513657ed66f85b21cc2c8e803f7eb313a83957c1b`.
- [pagination.contextual-usage.amendment.v1.0.0.md](../../../../specs/components/pagination.contextual-usage.amendment.v1.0.0.md) · SHA-256 `834c79f14065070f6c3beb361c92ccf91450bda3f57800e5d8fa2f9be20dfa2b`.
- [tables-pagination-selection.amendment.v1.0.0.md](../../../../specs/patterns/tables-pagination-selection.amendment.v1.0.0.md) · SHA-256 `581fa2d5311abea2a85ff738e0beeeb606f73d45689eaa030f0530c0c833c287`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/pagination-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
