# Input · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `INPUT-001` · API local 0.1.0 · categoría formularios.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/input.contract.v1.0.0.md#guía-semántica-normativa).

Usa Input para capturar un dato breve de una sola línea. Mantén una etiqueta corta y usa la ayuda persistente para el formato. GOV.UK enfatiza etiquetas visibles y mensajes con una corrección concreta. Carbon distingue el estado de solo lectura del deshabilitado y mantiene la ayuda bajo el campo. BlueHeart admite un ejemplo de formato como placeholder cuando la etiqueta y la ayuda ya explican el dato. [GOV.UK Text input](https://design-system.service.gov.uk/components/text-input/) · [Carbon Text input](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Capturar un importe | Usa una etiqueta como «Importe», ayuda de formato y Badge subtle para la unidad MXN. | Guardar el valor dentro del Badge o explicar el formato solo con placeholder. |
| Validación de un campo | Muestra el mensaje junto al campo y vincúlalo con aria-describedby al reportar error. Reserva Success para validación concluida. | Cambiar a error mientras se escribe cada carácter o depender solo del color. |
| Dato visible para consulta | Usa read-only cuando el dato deba poder leerse o copiarse. Para disabled, explica cerca por qué no está disponible. | Deshabilitar un valor que el usuario necesita copiar. |

## Uso sin backend

Captura una línea con etiqueta y ayuda vinculadas. El host controla la validación. Badge subtle indica una unidad.

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

export function InputExample() {
  const [amount, setAmount] = useState('');
  const [attempted, setAttempted] = useState(false);
  const invalid = attempted && !/^\d+(\.\d{2})?$/.test(amount);
  const sizes: InputSize[] = ['large','medium','small'];
  const statuses: InputStatus[] = ['default','hover','focus','success','error','read-only','disabled'];
  return <div className="my-4 space-y-4">
    <form className="grid max-w-[464px] justify-items-start gap-4" noValidate
      onSubmit={event => {event.preventDefault();setAttempted(true);}}>
      <Input className="w-full" id="demo-input-amount" name="amount" label="Importe" value={amount}
        onValueChange={next => {setAmount(next);setAttempted(false);}} placeholder="1200.00"
        helperText={invalid ? 'Escribe el importe con dos decimales o sin centavos.' : 'Usa un punto para separar los centavos.'}
        status={invalid ? 'error' : attempted ? 'success' : 'default'} showBadge/>
      <Button label="Comprobar importe" type="submit"/>
    </form>
    <div className="grid max-w-[464px] gap-4">
      <Input id="demo-input-read-only" label="Folio de consulta" defaultValue="A-2026-183" size="medium"
        status="read-only" showIcon={false} required={false}/>
      <Input id="demo-input-disabled" label="Referencia externa" size="small" status="disabled"
        helperText="Disponible al vincular una cuenta." showIcon={false} required={false}/>
    </div>
    <details>
      <summary>Matriz de 42 variantes</summary>
      <div className="grid max-w-[464px] gap-4 p-2">
        {[false,true].flatMap(filled => sizes.flatMap(size => statuses.map(status => {
          const label = `${filled ? 'Con valor' : 'Vacío'} · ${size} · ${status}`;
          return <Input key={label} label={label} size={size} status={status} placeholder="Ejemplo"
            defaultValue={filled ? 'A-2026-183' : ''} helperText="Texto de ayuda"/>;
        })))}
      </div>
    </details>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [input.tsx](../../src/components/input.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type InputSize = 'large' | 'medium' | 'small';

export type InputStatus = 'default' | 'hover' | 'focus' | 'success' | 'error' | 'read-only' | 'disabled';

export interface InputProps {
  id?: string;
  name?: string;
  type?: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'search' | 'url' | 'tel' | 'password'>;
  size?: InputSize;
  status?: InputStatus;
  label: string;
  placeholder?: string;
  helperText?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  showLabel?: boolean;
  showPlaceholder?: boolean;
  showHelper?: boolean;
  showTooltip?: boolean;
  showIcon?: boolean;
  icon?: Icon;
  showBadge?: boolean;
  badgeLabel?: string;
  className?: string;
}

```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Input: {id, name, type = 'text', size = 'large', status = 'default', label,
  placeholder, helperText, value, defaultValue = '', onValueChange, onBlur, required = true,
  showLabel = true, showPlaceholder = true, showHelper = true, showTooltip = false,
  showIcon = true, icon: Glyph = CaretDownIcon, showBadge = false, badgeLabel = 'MXN', className}: InputProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Etiqueta, campo, ayuda y accesorios ocupan posiciones fijas. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [input.contract.v1.0.0.md](../../../../specs/components/input.contract.v1.0.0.md) · SHA-256 `38943f5018664f4353163bc990d049e08fbbd247cf9d858a35ca2666681bddaa`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/input.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
