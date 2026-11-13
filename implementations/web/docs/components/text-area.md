# Text Area · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TEXT-AREA-001` · API local 0.1.0 · categoría formularios.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/text-area.contract.v1.0.0.md#guía-semántica-normativa).

Usa Text Area para respuestas de varias líneas. GOV.UK distingue las respuestas extensas y recomienda ajustar la altura al contenido esperado. Carbon conserva etiqueta y ayuda visibles y permite que el contenido siga siendo alcanzable al desbordar. BlueHeart ofrece contador cuando el anfitrión lo necesita. [GOV.UK Textarea](https://design-system.service.gov.uk/components/textarea/) · [Carbon Text input](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Respuesta extensa | Da una etiqueta visible y permite leer el valor completo mediante scroll o altura suficiente. | Recortar la respuesta o usar Placeholder como etiqueta. |
| Límite de caracteres | Usa el límite del anfitrión y asocia el contador sin anunciar cada pulsación. | Adoptar 300 como regla de todos los productos. |
| Error de captura | Vincula la ayuda de corrección y conserva el valor escrito. | Indicar error solo por color o borrar el contenido. |

## Uso sin backend

Usa una etiqueta visible y elige el límite y altura en el anfitrión. Helper y Counter se asocian al control.

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

export function TextAreaExample() {
  const [value, setValue] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const error = attempted && !value.trim();
  return <div className="my-4 space-y-4">
    <form className="grid w-full max-w-[305px] justify-items-start gap-3" noValidate
      onSubmit={event=>{event.preventDefault();setAttempted(true);}}>
      <TextArea id="demo-text-area" label="Comentarios de revisión" value={value}
        onValueChange={next=>{setValue(next);setAttempted(false);}} placeholder="Describe la situación"
        helperText={error ? 'Escribe un comentario antes de continuar.' : 'Incluye los datos útiles para la revisión.'}
        state={error ? 'error' : 'default'} maxLength={300} className="w-full" fieldHeight={expanded ? 180 : undefined}/>
      <div className="flex flex-wrap gap-2">
        <Button label="Comprobar comentario" type="submit"/>
        <Button label={expanded ? 'Reducir campo' : 'Ampliar campo'} variant="secondary" onClick={()=>setExpanded(!expanded)}/>
      </div>
    </form>
    <TextArea id="demo-text-area-disabled" label="Comentario archivado" defaultValue="Revisión concluida."
      state="disabled" helperText="El periodo está cerrado." className="max-w-[305px]"/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [text-area.tsx](../../src/components/text-area.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type TextAreaState = 'default' | 'focus' | 'error' | 'disabled';

export interface TextAreaProps {
  id?: string;
  name?: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  showHelper?: boolean;
  showCounter?: boolean;
  maxLength?: number;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  state?: TextAreaState;
  fieldHeight?: number;
  resizable?: boolean;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
TextArea: {id, name, label, placeholder, helperText, showHelper = true, maxLength,
  showCounter = maxLength !== undefined, required = false, value, defaultValue = '', onValueChange,
  state = 'default', fieldHeight, resizable = false, className}: TextAreaProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Etiqueta, campo, ayuda, contador y muesca tienen anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [text-area.contract.v1.0.0.md](../../../../specs/components/text-area.contract.v1.0.0.md) · SHA-256 `4462e6f71b9e5371383f6ae604e7d1002af36f6743a33e94754a982b38b54d48`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/text-area.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
