# Linear Progress Bar · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `LINEAR-PROGRESS-001` · API local 0.1.0 · categoría estado.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/linear-progress.contract.v1.0.0.md#guía-semántica-normativa).

Comunica el progreso de un proceso real. Usa el porcentaje cuando el anfitrión puede medir el avance y la variante indeterminada mientras se desconoce el total. Primary comunica progreso normal. Success comunica una finalización confirmada. Warning y error conservan el avance alcanzado y necesitan un mensaje que explique la situación. El anfitrión suministra los datos y decide cuándo retirar el indicador.

| Situación | Haz | Evita |
|---|---|---|
| Carga con total conocido | Muestra «Cargando comprobantes» y el avance real, con «2 de 4 comprobantes» si ayuda. | Incrementar el porcentaje con un temporizador sin datos. |
| Preparación con total desconocido | Usa indeterminado mientras calculas el total. | Presentar un porcentaje que el proceso aún no puede medir. |
| Carga detenida | Conserva el último avance y explica el fallo en Helper text. | Depender solo del color o mostrar success antes de confirmar 100%. |
| Indicador dentro de File Upload | Usa el set large y oculta Header cuando el anfitrión ya muestra nombre y estado. | Dejar una cabecera vacía con espacio reservado. |

En web proporciona nombre accesible, rango de 0 a 100 y valor actual si es determinado. El indeterminado omite el valor actual y respeta la preferencia de movimiento reducido. [Carbon Progress Bar](https://www.carbondesignsystem.com/building-blocks/core/components/progress-bar/guidelines) · [Material UI Progress](https://mui.com/material-ui/react-progress/)

## Uso sin backend

Completa cuatro pasos de muestra para ver el avance controlado. El segundo indicador representa un total desconocido. Caution usa la gama caution-orange en los cuatro temas. Badge Caution no tiene borde; Linear Progress Caution conserva el valor real y admite indeterminado.

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

export function LinearProgressExample() {
  const [value, setValue] = useState(0);
  return <div className="my-4 max-w-md space-y-4">
    <LinearProgress id="demo-progress" label="Cargando comprobantes" size="medium"
      value={value} type={value === 100 ? 'success' : 'primary'}
      helperText={value === 100 ? 'Carga de muestra completada' : `${value / 25} de 4 comprobantes`}/>
    <button type="button" className="rounded border px-3 py-2" disabled={value === 100}
      onClick={() => setValue(current => Math.min(100, current + 25))}>Completar siguiente paso de muestra</button>
    <LinearProgress id="demo-progress-unknown" label="Calculando total" size="large"/>
    <LinearProgress id="demo-progress-caution" label="Revisar capacidad disponible" type="caution" value={75}
      helperText="Precaución de muestra · El anfitrión aporta el significado del estado"/>
    <LinearProgress id="demo-progress-caution-unknown" label="Verificación con precaución" type="caution" size="large"/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [linear-progress.tsx](../../src/components/linear-progress.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type LinearProgressType = 'primary' | 'success' | 'warning' | 'caution' | 'error';

export type LinearProgressSize = 'small' | 'medium' | 'large';

export interface LinearProgressProps {
  id?: string;
  label: string;
  helperText?: string;
  /** Omit while the total is unknown. */
  value?: number;
  valueText?: string;
  size?: LinearProgressSize;
  type?: LinearProgressType;
  showLabel?: boolean;
  showValue?: boolean;
  showHelperText?: boolean;
  /** Collapse the reserved header when showing only the rail. */
  showHeader?: boolean;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
LinearProgress: {id, label, helperText, value, valueText, size = 'small', type = 'primary',
  showLabel = true, showValue = true, showHelperText = true, showHeader = true, className}: LinearProgressProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Header, riel y ayuda tienen anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [linear-progress.contract.v1.0.0.md](../../../../specs/components/linear-progress.contract.v1.0.0.md) · SHA-256 `6fc0673335dd42d7536f5fd4595084773e6df84bbde894d6e0be5b0bab2aa801`.
- [caution.amendment.v1.0.0.md](../../../../specs/foundations/caution.amendment.v1.0.0.md) · SHA-256 `3a1f2c61951535da83f92dc942feac5744846cfbe12bd7a2f14e53ff1b564503`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/linear-progress.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
