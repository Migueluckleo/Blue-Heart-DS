# Toggle · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TOGGLE-001` · API local 0.1.0 · categoría selección.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/toggle.contract.v1.0.0.md#guía-semántica-normativa).

Usa Toggle para una preferencia binaria cuyo cambio se aplica al alternarla. Para selección de varios elementos usa Checkbox. Para opciones excluyentes usa Radio. Si la persona debe revisar y guardar varios cambios juntos, elige el flujo de formulario adecuado.

| Situación | Haz | Evita |
|---|---|---|
| Preferencia | «Avisos por correo» permanece como nombre tanto encendido como apagado. | Cambiar la etiqueta a «Activar» o «Desactivar» según el estado. |
| Actualización asíncrona | Mantén la preferencia a cargo del anfitrión y explica un fallo donde se pueda corregir. | Inventar variantes loading o error en Toggle. |
| Espacio estrecho | Ajusta el anfitrión, permite envolver la etiqueta y conserva la señal de foco. | Estirar el riel para llenar el ancho del texto. |

Riel, perilla y foco son partes fijas. Label es opcional visualmente, con máximo observado de 320 px. Mantén nombre accesible si ocultas Label. La posición de la perilla comunica el valor además del color. Default, hover, focus y disabled son estados observados. En web, usa un switch con estado anunciado y activación por Espacio. El anfitrión decide persistencia, asincronía y el área táctil.

Contraste editorial sobre preferencias binarias y etiqueta estable. [Atlassian Toggle](https://atlassian.design/components/toggle/usage) · [W3C Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)

## Uso sin backend

Cambia una preferencia local. La segunda opción está deshabilitada.

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

export function ToggleExample() {
  const [enabled, setEnabled] = useState(false);
  return <div className="my-4 flex flex-wrap items-center gap-6">
    <Toggle showLabel id="demo-toggle" label="Notificaciones" selected={enabled} onSelectedChange={setEnabled}/>
    <Toggle showLabel id="demo-toggle-disabled" label="Alertas del sistema" selected disabled/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [toggle.tsx](../../src/components/toggle.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type ToggleProps = Omit<ComponentPropsWithoutRef<'input'>,
  'type' | 'role' | 'checked' | 'defaultChecked' | 'onChange' | 'aria-label'> & {
  label: string;
  showLabel?: boolean;
  selected: boolean;
  onSelectedChange?: (selected: boolean) => void;
  previewState?: 'hover' | 'focus';
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Toggle: {label, showLabel = false, selected, onSelectedChange, previewState, className, ...input}: ToggleProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Label y Show label son propiedades acotadas. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [toggle.contract.v1.0.0.md](../../../../specs/components/toggle.contract.v1.0.0.md) · SHA-256 `18fd1f9c1e182511bfd22d431d360e809cd095879d2d31d8ad4bb01799e5f29c`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/dot-toggle-radio.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
