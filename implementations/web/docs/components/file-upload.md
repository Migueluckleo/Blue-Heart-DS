# File Upload · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `FILE-UPLOAD-001` · API local 0.1.0 · categoría entrada.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/file-upload.contract.v1.0.0.md#guía-semántica-normativa).

Usa File Upload cuando el usuario debe entregar un archivo desde su dispositivo. Ofrece selección por teclado además de arrastre. Informa antes de seleccionar los formatos y tamaños que el producto admite. El anfitrión recibe la selección, valida el archivo y comunica el resultado de la operación. Conserva el motivo concreto y una ruta de reintento cuando falla.

| Situación | Haz | Evita |
|---|---|---|
| Elegir un archivo | Muestra los formatos admitidos y habilita el selector nativo. | Exigir arrastre o usar el texto de ejemplo como política de validación. |
| Archivo rechazado | Comunica el motivo y ofrece «Subir nuevamente». | Indicar el fallo solo con color. |
| Recepción confirmada | Muestra success y el riel completo tras confirmación del anfitrión. | Confundir selección local con transferencia confirmada. |

La excepción de contraste de la fuente conserva el formato hover por debajo de 4.5:1 en algunos temas y el formato de error observado. La zona web conserva foco visible y mensajes accesibles. [Carbon File uploader](https://www.carbondesignsystem.com/building-blocks/core/components/file-uploader/accessibility)

## Uso sin backend

Selecciona o arrastra un archivo de muestra para ver feedback local.

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

export function FileUploadExample() {
  const [state, setState] = useState<FileUploadState>('default');
  const [feedback, setFeedback] = useState('Selecciona un archivo de muestra. El archivo permanece en tu dispositivo.');
  return <div className="my-4 space-y-4">
    <FileUpload id="demo-file-upload" state={state} showButton
      formats="Formatos de muestra: XLS, XLSX o CSV"
      supportingText={feedback} onFiles={([file]) => {
        if (!file) return;
        const accepted = /\.(xls|xlsx|csv)$/i.test(file.name);
        setState(accepted ? 'success' : 'error');
        setFeedback(accepted ? 'Selección de muestra confirmada. No se transfirió ningún archivo.'
          : 'Para esta muestra elige un archivo XLS, XLSX o CSV.');
      }}/>
    <FileUpload id="demo-file-upload-disabled" label="Selección no disponible" state="disabled" showHelper={false}/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [file-upload.tsx](../../src/components/file-upload.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type FileUploadState = 'default' | 'hover' | 'focus' | 'error' | 'success' | 'disabled';

export interface FileUploadProps {
  id?: string;
  label?: string;
  state?: FileUploadState;
  formats?: string;
  supportingText?: string;
  showButton?: boolean;
  showHelper?: boolean;
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
FileUpload: {id, label = 'Seleccionar archivos', state = 'default',
  formats = 'Supported formats: XLS, XLSX or CSV · Max 50 MB', supportingText = 'Optional helper text',
  showButton = false, showHelper = true, accept, multiple = false, onFiles}: FileUploadProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Zona, Button opcional y ayuda tienen anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [file-upload.contract.v1.0.0.md](../../../../specs/components/file-upload.contract.v1.0.0.md) · SHA-256 `30bc060028616c419b828e453f0743210e8e744ad2c4988be8751b136b6ad5c4`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/file-upload-checkbox.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
