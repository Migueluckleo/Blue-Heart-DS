# Radio · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `RADIO-001` · API local 0.1.0 · categoría selección.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/radio.contract.v1.0.0.md#guía-semántica-normativa).

Usa Radio para una opción mutuamente excluyente dentro de un grupo. Haz visible el conjunto cuando comparar alternativas ayuda. Si se pueden elegir varias respuestas, usa Checkbox. Una preferencia binaria aplicada de inmediato corresponde a Toggle.

| Situación | Haz | Evita |
|---|---|---|
| Una elección | «Periodo del reporte» agrupa «Mes actual» y «Mes anterior». El grupo conserva una sola opción seleccionada. | Usar radios independientes para permitir elegir ambos periodos. |
| Error | Comunica la selección necesaria mediante el grupo y conserva un mensaje asociado. | Confiar solo en el borde de error o cambiar la selección sin acción del usuario. |
| Etiqueta larga | Conserva el control junto a la primera línea y permite envolver el texto. | Recortar el nombre o ocultarlo sin alternativa accesible. |

Control, círculo, punto de selección y foco son partes fijas. La etiqueta es opcional visualmente y conserva nombre accesible. El grupo anfitrión suministra nombre común, exclusividad y navegación con flechas en web. La fuente individual conserva default, hover, focus, disabled y error, con selected verdadero o falso. Sus dos reacciones observadas cambian de default a hover. La selección funcional en web se comprueba aparte del prototipo Figma.

Contraste editorial sobre exclusividad, etiquetas y teclado. [Carbon Radio button](https://www.carbondesignsystem.com/building-blocks/core/components/radio-button/guidelines) · [W3C Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

## Uso sin backend

Elige el medio de entrega por teclado o puntero.

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

export function RadioExample() {
  const [delivery, setDelivery] = useState('email');
  return <fieldset className="my-4 space-y-3">
    <legend>Entrega del comprobante</legend>
    <div className="flex flex-wrap gap-6">
      <Radio showLabel id="demo-radio-email" name="delivery" value="email" label="Correo electrónico"
        selected={delivery === 'email'} onSelect={setDelivery}/>
      <Radio showLabel id="demo-radio-download" name="delivery" value="download" label="Descarga"
        selected={delivery === 'download'} onSelect={setDelivery}/>
      <Radio showLabel id="demo-radio-post" name="delivery" value="post" label="Correo postal" selected={false} disabled/>
    </div>
    <p id="demo-radio-hint">Selecciona un medio de entrega disponible.</p>
  </fieldset>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [radio.tsx](../../src/components/radio.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type RadioProps = Omit<ComponentPropsWithoutRef<'input'>,
  'type' | 'role' | 'checked' | 'defaultChecked' | 'onChange' | 'aria-label' | 'aria-invalid' | 'name' | 'value' | 'onSelect'> & {
  name: string;
  value: string;
  label: string;
  showLabel?: boolean;
  selected: boolean;
  invalid?: boolean;
  onSelect?: (value: string) => void;
  previewState?: 'hover' | 'focus';
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Radio: {name, value, label, showLabel = false, selected, invalid, onSelect, previewState, className, ...input}: RadioProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Label y Show label son propiedades acotadas del Radio individual. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [radio.contract.v1.0.0.md](../../../../specs/components/radio.contract.v1.0.0.md) · SHA-256 `d23b3e151a7d530f3611b8a9f2d2b86c095861622412ea59692b31dd07900fef`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/dot-toggle-radio.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
