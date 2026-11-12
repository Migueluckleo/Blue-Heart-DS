# Chip · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHIP-001` · API local 0.1.0 · categoría selection.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/chip.contract.v1.0.0.md#guía-semántica-normativa).

Usa Chip para filtros, selección o filtros aplicados. En selección única el anfitrión mantiene una opción activa y usa radios agrupados. En selección múltiple, cada botón conserva su nombre y anuncia aria-pressed. En un filtro aplicado, X se nombra «Quitar filtro» seguido de Label. El anfitrión decide el destino de foco al quitar y comunica el motivo de deshabilitar una opción cuando corresponda. [W3C WAI Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) · [W3C WAI Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

| Situación | Haz | Evita |
|---|---|---|
| Una moneda por vista | Agrupa MXN y USD con un nombre común y conserva una elección activa. | Presentar el grupo como botones independientes. |
| Varios estados de un comprobante | Usa toggles independientes y explica el universo filtrado desde el anfitrión. | Cambiar el nombre del control según su selección. |
| Filtro aplicado removible | Da nombre a X y mueve el foco al siguiente filtro o al control de agregar. | Mezclar selección y eliminación en la misma agrupación. |

## Uso sin backend

El ejemplo conserva una moneda activa, combina estados independientes y permite retirar filtros con foco restaurado.

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

export function ChipExample() {
  const [currency, setCurrency] = useState('MXN');
  const [pending, setPending] = useState(false);
  const [reviewed, setReviewed] = useState(true);
  const [applied, setApplied] = useState(['Este mes', 'Sucursal Mérida']);
  const reset = useRef<HTMLButtonElement>(null);
  const removeButtons = useRef(new Map<string, HTMLButtonElement>());
  const nextFocus = useRef<string | null>(null);
  useEffect(() => {
    if (nextFocus.current === null) return;
    const next = removeButtons.current.get(nextFocus.current) ?? reset.current;
    next?.focus();
    nextFocus.current = null;
  }, [applied]);
  function remove(index: number) {
    nextFocus.current = applied[index + 1] ?? applied[index - 1] ?? '';
    setApplied(applied.filter((_, current) => current !== index));
  }
  return <div className="grid gap-5">
    <fieldset className="min-w-0">
      <legend>Moneda del comprobante</legend>
      <div className="mt-2 flex flex-wrap gap-3">
        {['MXN','USD'].map(value=><Chip key={value} mode="single" size="large" name="chip-example-currency"
          label={value} value={value} selected={currency===value} onSelect={()=>setCurrency(value)}/>)}
      </div>
    </fieldset>
    <div role="group" aria-label="Estados de comprobantes" className="flex flex-wrap gap-3">
      <Chip mode="multiple" label="Pendiente" counter="0" showLeftIcon selected={pending} onSelectedChange={setPending}/>
      <Chip mode="multiple" label="Revisado" counter="12" showRightIcon selected={reviewed} onSelectedChange={setReviewed}/>
      <Chip mode="multiple" label="Archivado" selected={false} disabled onSelectedChange={()=>{}}/>
    </div>
    <div role="group" aria-label="Filtros aplicados" className="flex flex-wrap items-center gap-3">
      {applied.map((label,index)=><Chip key={label} mode="removable" size="small" label={label} onRemove={()=>remove(index)}
        removeRef={node=>{if(node)removeButtons.current.set(label,node);else removeButtons.current.delete(label);}}/>)}
      <button type="button" ref={reset} className="underline" onClick={()=>setApplied(['Este mes','Sucursal Mérida'])}>Restaurar filtros</button>
    </div>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [chip.tsx](../../src/components/chip.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type ChipSize = 'large' | 'medium' | 'small' | 'extra-small';

export type ChipMode =
  | { mode: 'single'; name: string; value: string; selected: boolean; onSelect: () => void }
  | { mode: 'multiple'; selected: boolean; onSelectedChange: (selected: boolean) => void }
  | { mode: 'removable'; onRemove: () => void; removeRef?: Ref<HTMLButtonElement> };

export type ChipProps = ChipMode & {
  label: string;
  size?: ChipSize;
  counter?: string;
  leftIcon?: Icon;
  rightIcon?: Icon;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  disabled?: boolean;
  describedBy?: string;
  className?: string;
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Chip: props: ChipProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Texto, visibilidad y swaps de glyph cubren la anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [chip.contract.v1.0.0.md](../../../../specs/components/chip.contract.v1.0.0.md) · SHA-256 `10c3a4dbf70aa981dc8e8596a467d263183b3e84ecf32f47695cc3d29206c7f4`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/chip.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
