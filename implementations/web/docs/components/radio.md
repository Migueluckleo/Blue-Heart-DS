# Radio · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `RADIO-001` · API local 0.1.0 · categoría selección.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/radio.contextual-usage.amendment.v1.0.1.md#guía-semántica-normativa).

### Intención y exclusividad

**RADIO-INTENT-01.** Usa Radio para una alternativa dentro de una decisión mutuamente excluyente. Ejemplo: Archivo PDF frente a Hoja de cálculo bajo Formato del reporte. Usa Checkbox para elecciones independientes o aceptación; Toggle para una preferencia binaria aplicada al alternar. No uses un radio aislado como casilla de aceptación ni varios radios autónomos que permitan marcar respuestas incompatibles.

**RADIO-VALUE-01.** El grupo conserva como máximo un valor seleccionado. Elegir otra alternativa reemplaza la anterior; pulsar la actual no la apaga. `selected` verdadero/falso es un eje visual, no prueba de exclusión automática en Figma. El anfitrión controla selección, disponibilidad y validación. Si la respuesta es opcional y debe poder retirarse, considera Ninguno o No aplica solo cuando sea una respuesta real del dominio.

**RADIO-INITIAL-01.** El valor inicial corresponde a un dato guardado o a un default justificado por el flujo. La primera opción de la muestra no obliga a preseleccionar la primera en producto. Puede iniciar sin selección cuando se necesite una decisión consciente. No cambies el valor por reordenar opciones ni identifiques la alternativa solo por su posición.

### Label, anatomía y geometría

**RADIO-LABEL-01.** Las etiquetas deben ser comparables y paralelas, con diferencias visibles. Mantén un título común mediante Radio group. `Show label` / `showLabel=false` por defecto en el átomo; las opciones del grupo lo muestran. Si se oculta, `label` mantiene un nombre accesible específico. Control y etiqueta forman la misma superficie operable. No hay labelPosition izquierda/derecha en este API; el label existente va a la derecha.

**RADIO-LAYOUT-01.** Un solo tamaño: Control 24 × 24 px, Circle 18 × 18 px y punto 8 × 8 px. Gap 8 px, label hasta 320 px, texto que envuelve sin elipsis. No hay size/small/medium/large, indeterminate, pressed, success o loading propios. El punto es geometría interna, no el componente público Dot ni un pictograma Phosphor intercambiable.

**RADIO-MULTILINE-01.** La receta canónica indica control junto a la primera línea; Toggle tiene alineación central propia. Diferencia OBSERVED registrada en la página 9 del PDF: la web vigente comparte `align-items:center` entre `.bh-toggle` y `.bh-radio` en `implementations/web/src/styles.css`, y centra Radio ante etiquetas multilínea. Las capturas conservan esa implementación como evidencia, sin convertirla en regla ni afirmar que ya se corrigió. Esta enmienda documental conserva la alineación exigida por el contrato y no modifica CSS.

### Dos valores y cinco estados

| Estado | Haz | Evita |
|---|---|---|
| default | Representar disponibilidad y el selected real. | Interpretarlo como elección validada o guardada. |
| hover | Dar respuesta temporal al puntero. | Seleccionar o enfocar por hover. |
| focus | Localizar el radio operado con teclado. | Confundirlo con un candidato de Dropdown pendiente de confirmar. |
| error | Asociar una explicación a la decisión del grupo. | Depender solo del borde rojo o cambiar el valor sin acción. |
| disabled | Mantener valor representado y explicar indisponibilidad cuando sea necesario. | Permitir operación o exigir foco para conocer el motivo. |

**RADIO-COVERAGE-01.** Dos valores × cinco estados = 10 variantes. Error y foco pueden coexistir durante la corrección en web. No hay read-only propio; para consulta compón el valor claramente. Conserva tema y roles del JSON delegado; no recolorees para fabricar éxito o prioridad.

### Teclado y foco

**RADIO-KEYBOARD-01.** En el radio group nativo de formulario, Tab/Shift+Tab permiten entrar y salir; normalmente se llega a la opción seleccionada. Si no hay selección, la entrada inversa puede variar por navegador. Flechas mueven foco y selección entre alternativas habilitadas; pueden volver al extremo opuesto y omiten disabled. Espacio elige la enfocada si aún no lo estaba y no apaga la actual. No agregues un Tab obligatorio por opción ni prometas activación con Enter. Este patrón no documenta un radio group dentro de una toolbar.

**RADIO-KEYBOARD-02.** A diferencia de Dropdown, aquí recorrer con flechas sí cambia la selección. Ese cambio no debe enviar el formulario ni provocar navegación inesperada. Si revela campos, mantén su contexto junto a la decisión.

**RADIO-FOCUS-01.** El anillo usa `:focus-visible`, orientado a teclado según la heurística del navegador. Distingue foco DOM, selección y anillo visible: clic en control/label opera sin exigir el anillo de navegación con Tab; hover no da foco. No recortes el halo. `previewState` es solo una apariencia de muestrario. El anfitrión verifica el objetivo activable y la cobertura táctil de 44 × 44 px prevista por la receta sin escalar el círculo; una etiqueta alta por sí sola no acredita toda esa área ni accesibilidad global.

### Mapeo y composición

| Propiedad | Uso |
|---|---|
| name, value | Nombre común dentro del grupo; nombres distintos entre decisiones y valores únicos y estables. |
| label, showLabel=false | Nombre de la alternativa; visibilidad sin perder nombre accesible. |
| selected obligatorio, onSelect(value) | Valor controlado; seleccionar otra alternativa reemplaza la anterior. |
| invalid, disabled y atributos nativos admitidos | Invalidez/disponibilidad y asociación mediante aria-describedby según el contexto. |
| previewState=hover/focus | Muestra estática; no gestiona foco ni selección. |
| className | Composición sin sustituir tokens o fabricar tamaños. |

P-SLOTS NOT_APPLICABLE para el átomo: Control, Circle, punto y Label son partes fijas. El Slot Options pertenece a RADIO-GROUP-001. No crea Slots arbitrarios ni propiedades de iconos.

## Uso sin backend

Elige el medio de entrega por teclado o puntero.

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
- [radio.contextual-usage.amendment.v1.0.1.md](../../../../specs/components/radio.contextual-usage.amendment.v1.0.1.md) · SHA-256 `ff566e03f1d02322aeb3eb7d6c270a2791ede6af3cb948f07934b22aece4f7b5`.
- [selection-controls.decisions.amendment.v1.0.0.md](../../../../specs/patterns/selection-controls.decisions.amendment.v1.0.0.md) · SHA-256 `475cbf939a69291170f79eece14cf88848d0fd4bec4268de9c7f5b9a6486dcbc`.
- [forms.app-shell.amendment.v1.0.0.md](../../../../specs/patterns/forms.app-shell.amendment.v1.0.0.md) · SHA-256 `0e4c9655879b4847db021522fe49bc86f8dcac095a01c63fb3d75d03b5db8b8b`.
- [tabs.local-navigation.amendment.v1.0.0.md](../../../../specs/patterns/tabs.local-navigation.amendment.v1.0.0.md) · SHA-256 `b297a1444e4ffcb17456d8ebcbba6bcb58b8349dad25038010b852b724ab39c0`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/dot-toggle-radio.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
