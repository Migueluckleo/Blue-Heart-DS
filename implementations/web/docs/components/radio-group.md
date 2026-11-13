# Radio group · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `RADIO-GROUP-001` · API local 0.1.0 · categoría selección.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/radio-group.contract.v1.0.0.md#guía-semántica-normativa).

Ofrece una sola respuesta entre alternativas breves visibles al mismo tiempo. Usa un título que enuncie la decisión y etiquetas paralelas. El grupo vertical admite de dos a cinco opciones. El horizontal admite hasta tres opciones cortas y requiere ancho suficiente. La selección, la disponibilidad y la validación pertenecen al anfitrión. Selecciona un valor inicial solo cuando el flujo lo justifique.

| Situación | Haz | Evita |
|---|---|---|
| Entrega de un comprobante | Agrupa «Correo electrónico» y «Descarga» bajo un título común. | Presentar las alternativas como acciones independientes. |
| Etiquetas largas | Usa la dirección vertical y deja crecer las etiquetas. | Forzar una sola línea o recortar las diferencias. |
| Validación | Conecta «Select an option» con el grupo. El anfitrión puede aportar contexto adicional. | Cambiar el mensaje fijo mediante Helper text en error. |

En web usa un nombre común, selección exclusiva, flechas nativas y mensajes asociados. Si ocultas el título visual, conserva su nombre accesible. La superficie táctil del anfitrión puede alcanzar 44 px conservando la anatomía interna.

Referentes editoriales sobre selección exclusiva y teclado. [Carbon Radio button](https://www.carbondesignsystem.com/building-blocks/core/components/radio-button/guidelines) · [W3C Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

## Uso sin backend

Selecciona un medio de entrega. La segunda muestra conserva el mensaje fijo de error.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem, UserMessage, type ChatSidebarProps, Pagination, PaginationItem, Tabs, TextArea, DropdownField, FloatingActions, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function RadioGroupExample() {
  const [value, setValue] = useState<string>();
  return <div className="my-4 space-y-6">
    <RadioGroup name="receipt-delivery" title="Entrega del comprobante" helperText="Elige una alternativa."
      options={[{value:'email', label:'Correo electrónico'}, {value:'download', label:'Descarga'}]}
      value={value} onValueChange={setValue}/>
    <RadioGroup name="receipt-format" title="Formato del archivo" state="error" direction="horizontal"
      options={[{value:'pdf', label:'PDF'}, {value:'xml', label:'XML'}]}/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [radio-group.tsx](../../src/components/radio-group.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface RadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  title: string;
  showTitle?: boolean;
  helperText?: string;
  showHelperText?: boolean;
  direction?: 'vertical' | 'horizontal';
  state?: 'default' | 'error';
  options: readonly RadioGroupOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
RadioGroup: {name, title, showTitle = true, helperText, showHelperText = true,
  direction = 'vertical', state = 'default', options, value, onValueChange}: RadioGroupProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Options es Slot Figma; la lista tipada controla cardinalidad y selección en web. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [radio-group.contract.v1.0.0.md](../../../../specs/components/radio-group.contract.v1.0.0.md) · SHA-256 `640f7616ccc82c29e5c134fa887d97cfeb65235af0448f1cdcfa8e93988850cb`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/radio-group.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
