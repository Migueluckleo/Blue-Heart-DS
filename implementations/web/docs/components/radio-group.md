# Radio group · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `RADIO-GROUP-001` · API local 0.1.0 · categoría selección.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/radio-group.contextual-usage.amendment.v1.0.1.md#guía-semántica-normativa).

### Decisión, título y ayuda

**RADIO-GROUP-INTENT-01.** Usa alternativas visibles cuando compararlas ayude a tomar una sola decisión. Title enuncia la pregunta, por ejemplo Formato del reporte; cada Radio nombra una respuesta paralela, como Archivo PDF y Hoja de cálculo. No repitas el título en todas las alternativas ni presentes las respuestas como acciones independientes. Si varias pueden coexistir usa Checkbox; si es una preferencia binaria inmediata usa Toggle. Considera Dropdown cuando explorar un catálogo resulte más adecuado; no extiendas la capacidad del grupo para alojar una lista larga.

**RADIO-GROUP-TITLE-01.** `Title`/`title` y `Show title`/`showTitle=true` gobiernan nombre y visibilidad. Si se oculta el título visual, conserva nombre accesible; la implementación web mantiene legend oculto visualmente y `aria-labelledby`. La pantalla justifica el contexto inequívoco.

**RADIO-GROUP-HELPER-01.** Helper text aclara la decisión en default. `Show helper text`/`showHelperText=true` gobierna visibilidad en ambos estados. En error se conserva literalmente **Select an option**; modificar `Helper text`/`helperText` no reemplaza ese mensaje. Si hace falta explicación contextual en español, el anfitrión aporta texto visible adicional y asociado. Evita ocultar ayuda/error sin explicación equivalente. No inventes una prop de mensaje de error editable.

### Dirección y Options

| Regla | Uso | Evita |
|---|---|---|
| RADIO-GROUP-DIRECTION-01 | Vertical, por defecto, para 2–5 opciones; favorece texto largo, ancho limitado y comparación por comienzos alineados. | Recortar diferencias para conservar una sola línea. |
| RADIO-GROUP-DIRECTION-02 | Horizontal para 2–3 opciones cortas que quepan completas, comprobadas con texto real y traducciones. | Forzar una cuarta alternativa o reducir el control para que quepa. |
| RADIO-GROUP-DIRECTION-03 | El anfitrión decide dirección y ancho disponible. | Prometer cambio responsive o wrap automático que la receta no ofrece. |

**RADIO-GROUP-SLOT-01.** P-SLOTS REQUIRED: único Slot nativo Options común para las cuatro variantes, restringido a Radio oficiales; mínimo nativo 2 y máximo nativo 5. El límite horizontal de 3 pertenece al consumidor. Figma puede aceptar 4 en el Slot común y aun así incumplir el contrato horizontal; no atribuyas un rechazo nativo inexistente. La API web rechaza cardinalidades fuera de 2–5 vertical o 2–3 horizontal.

**RADIO-GROUP-SLOT-02.** Insertar, quitar, reordenar o sustituir Radio conserva contenido, orden, overrides y selección al cambiar direction/state. Las tres opciones iniciales son una muestra, no cantidad obligatoria. Cada hijo tiene Label visible y no vacío. No insertes contenido arbitrario ni fabriques otra implementación del círculo. Options vertical mantiene gap 8 px y horizontal gap 24 px; los hijos conservan tema y tokens del propietario. La colección tipada `options` en React es el equivalente web, no un Slot Figma nativo.

### Valor inicial, exclusividad y validación

**RADIO-GROUP-VALUE-01.** El anfitrión mantiene como máximo un valor elegido. Un dato guardado o default justificado puede iniciar seleccionado; una decisión consciente puede iniciar vacía sin error. La muestra con la primera elegida no dicta una regla de producto. `value`/`onValueChange` coordinan el estado controlado; `name` es común dentro del grupo y distinto entre decisiones. Cada opción web tiene `value` único y estable, `label` no vacío y `disabled` opcional. No uses la posición como identidad.

**RADIO-GROUP-VALUE-02.** Elegir otra reemplaza la anterior; la actual no se apaga al pulsarla. Para una decisión opcional que deba retirarse, considera Ninguno/No aplica solo si son valores válidos del dominio. No agregues respuestas ficticias para eludir validación.

**RADIO-GROUP-VALIDATION-01.** La pantalla define obligatoriedad, cuándo validar y cuándo retirar el error. Valida al intentar continuar si corresponde y conserva selecciones útiles. El grupo representa default/error; no hay una prop required de grupo en este API ni variantes propias loading, success, read-only o disabled del contenedor. La indisponibilidad por alternativa se comunica en cada Radio y se explica cuando haga falta. `aria-invalid` y las asociaciones de ayuda existen en web; el anfitrión aporta contexto adicional sin depender del color.

### Teclado, foco y geometría

**RADIO-GROUP-KEYBOARD-01.** En este grupo nativo de formulario, Tab/Shift+Tab entran/salen y normalmente llegan al seleccionado; entrada inversa con el grupo vacío puede variar por navegador. Flechas cambian foco **y selección** entre opciones habilitadas y omiten disabled; Espacio elige la enfocada y no apaga la actual. No lo confundas con candidatos de Dropdown ni agregues Tab por alternativa. Seleccionar no envía el formulario ni provoca navegación inesperada. No se extiende este comportamiento al caso especial de toolbar.

**RADIO-GROUP-FOCUS-01.** El anillo de Radio sigue `:focus-visible` orientado a teclado; hover no enfoca. Distingue foco DOM, anillo y selección. Mantén halo sin recorte y permite corregir error con foco visible. Checkbox y Radio tienen un tamaño interno de Control 24 px; el anfitrión conserva la cobertura táctil 44 × 44 px indicada en la receta sin escalarlo ni afirmar que un label alto la acredita automáticamente.

**RADIO-GROUP-COVERAGE-01.** Dos direcciones × dos estados = 4 variantes. Title usa su estilo propio, Helper el suyo, y las opciones el de Radio. No hay size/small/medium/large. Texto largo puede ampliar alto/ancho; el grupo no promete wrap automático. La diferencia **RADIO-MULTILINE-01** continúa aplicando a sus hijos: receta exige primera línea, web actual centra Radio multilínea; esta guía no corrige ni adopta esa diferencia. Los colores/aliases viven en los datos delegados, no en un inventario editable paralelo.

### Mapeo de propiedades

| Propiedades | Responsabilidad |
|---|---|
| title, showTitle=true | Decisión y nombre accesible aun ocultando título visual. |
| helperText, showHelperText=true | Ayuda editable en default; visibilidad de mensaje fijo en error. |
| direction=vertical, state=default | Disposición y condición respaldadas por la receta. |
| options: value, label, disabled? | Contenido permitido, cardinalidades, identidad y disponibilidad. |
| name, value?, onValueChange | Agrupar y conservar una única selección controlada. |

## Uso sin backend

Selecciona un medio de entrega. La segunda muestra conserva el mensaje fijo de error.

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
- [radio-group.contextual-usage.amendment.v1.0.1.md](../../../../specs/components/radio-group.contextual-usage.amendment.v1.0.1.md) · SHA-256 `5bcc9653d79e3ce578ebc22fa61d2e721c0f332e8c1870ab7249078bd900f172`.
- [selection-controls.decisions.amendment.v1.0.0.md](../../../../specs/patterns/selection-controls.decisions.amendment.v1.0.0.md) · SHA-256 `475cbf939a69291170f79eece14cf88848d0fd4bec4268de9c7f5b9a6486dcbc`.
- [forms.app-shell.amendment.v1.0.0.md](../../../../specs/patterns/forms.app-shell.amendment.v1.0.0.md) · SHA-256 `0e4c9655879b4847db021522fe49bc86f8dcac095a01c63fb3d75d03b5db8b8b`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/radio-group.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
