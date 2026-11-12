# Floating Actions · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `FLOATING-ACTIONS-001` · API local 0.1.0 · categoría feedback.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/floating-actions.contract.v1.0.0.md#guía-semántica-normativa).

Usa Floating Actions para mostrar las acciones aplicables a una selección existente. Carbon reúne las acciones en lote al seleccionar filas. BlueHeart conserva un resumen, una acción opcional de seleccionar todo y una región editable de acciones. [Carbon Data table](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Hay elementos seleccionados | Muestra el conteo y nombra la acción según su efecto sobre la selección. | Ejecutar una acción sobre filas fuera de la selección. |
| Selección de todo el conjunto | Explicita el universo al que aplica y deja que el anfitrión calcule el conteo. | Confundir la página visible con el conjunto filtrado. |
| Muchas acciones o poco ancho | Reduce o reorganiza las acciones desde el anfitrión. | Fijar el número de acciones de la muestra o inferir saltos automáticos. |

## Uso sin backend

Muestra el resumen y las acciones de la selección vigente. El anfitrión controla conteo, selección y cierre.

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

export function FloatingActionsExample() {
  const [count,setCount]=useState(3);
  const [message,setMessage]=useState('');
  return <div className="my-4 space-y-3">
    <Button id="demo-floating-open" label="Preparar selección" onClick={()=>{setCount(3);setMessage('');}}/>
    {count>0&&<div className="overflow-x-auto">
      <FloatingActions className="w-[1024px]" count={String(count)} label="Elementos seleccionados"
        selectAll={count<8?{label:'Seleccionar todos (8)',onSelect:()=>{
          setCount(8);document.getElementById('demo-floating-review')?.focus();
        }}:undefined}
        actions={<Button id="demo-floating-review" variant="text" label="Marcar como revisados" showLeftIcon
          onClick={()=>setMessage(`Se marcaron ${count} comprobantes de muestra.`)}/>}
        onDismiss={()=>{setCount(0);document.getElementById('demo-floating-open')?.focus();}}/>
    </div>}
    <p id="demo-floating-result" role="status">{message}</p>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [floating-actions.tsx](../../src/components/floating-actions.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface FloatingActionsProps {
  count: string;
  label: string;
  actions?: ReactNode;
  selectAll?: {label: string; onSelect: () => void};
  onDismiss?: () => void;
  dismissLabel?: string;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
FloatingActions: {count,label,actions,selectAll,onDismiss,dismissLabel='Cerrar acciones de selección',
  className}: FloatingActionsProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. General actions admite reemplazar y reordenar controles. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [floating-actions.contract.v1.0.0.md](../../../../specs/components/floating-actions.contract.v1.0.0.md) · SHA-256 `0aa666a17d76d5a049abad0c834748e3bb63e19d3760c8fa43b84f8d17fce8f0`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/actions-notification.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
