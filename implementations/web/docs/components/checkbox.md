# Checkbox · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHECKBOX-001` · API local 0.1.0 · categoría selección.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/checkbox.contract.v1.0.0.md#guía-semántica-normativa).

Usa Checkbox para elecciones independientes y acciones sobre varios elementos. Expresa la opción con una etiqueta afirmativa y concreta. El anfitrión calcula el estado indeterminado si una parte del grupo está seleccionada. Al activar la casilla indeterminada, la selección pasa a true. El anfitrión controla el valor y la validación.

| Situación | Haz | Evita |
|---|---|---|
| Preferencias independientes | Permite marcar varias opciones. | Usar Checkbox para exigir una sola respuesta. |
| Selección de filas | Usa indeterminado si solo algunas filas aplicables están seleccionadas. | Convertir mixed en una preferencia independiente. |
| Aceptación requerida | Explica el error junto a la casilla y asocia su texto al control. | Preseleccionar consentimiento o depender del rojo. |

Conserva un nombre accesible cuando se oculta Label. La casilla nativa se activa con Espacio. Describe error y motivo de indisponibilidad cerca del control. [W3C Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) · [Atlassian Checkbox](https://atlassian.design/components/checkbox/usage)

## Uso sin backend

Activa la opción indeterminada con Espacio; la segunda casilla está deshabilitada.

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

export function CheckboxExample() {
  const [selected, setSelected] = useState<CheckboxSelection>('indeterminate');
  return <div className="my-4 flex flex-wrap gap-6">
    <Checkbox id="demo-checkbox" label="Seleccionar comprobantes visibles" showLabel selected={selected}
      onSelectedChange={setSelected}/>
    <Checkbox id="demo-checkbox-disabled" label="Selección no disponible" showLabel selected disabled/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [checkbox.tsx](../../src/components/checkbox.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type CheckboxSelection = boolean | 'indeterminate';

export type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>,
  'type' | 'role' | 'checked' | 'defaultChecked' | 'onChange' | 'aria-label' | 'aria-checked' | 'aria-invalid'> & {
  label: string;
  showLabel?: boolean;
  selected: CheckboxSelection;
  invalid?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  previewState?: 'hover' | 'focus';
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Checkbox: {label, showLabel = false, selected, onSelectedChange, invalid, previewState, className, ...input}: CheckboxProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Control, Box y Label son anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [checkbox.contract.v1.0.0.md](../../../../specs/components/checkbox.contract.v1.0.0.md) · SHA-256 `270c19f1bff11fcaa8ba77cc251302a890af236ba78302b572c20128fc2eee6d`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/file-upload-checkbox.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
