# Checkbox · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHECKBOX-001` · API local 0.1.0 · categoría selección.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/checkbox.contextual-usage.amendment.v1.0.1.md#guía-semántica-normativa).

### Intención y alternativas

**CHECKBOX-INTENT-01.** Usa Checkbox para elecciones independientes, aceptación y selección de elementos para acciones en lote. Pueden elegirse cero, una o varias opciones cuando las reglas del dato lo permitan. Seleccionar una no elimina las demás. Para una respuesta excluyente usa [Radio group](../../../../specs/components/radio-group.contextual-usage.amendment.v1.0.1.md); para una preferencia binaria que aplica al alternar usa [Toggle](../../../../specs/components/toggle.contextual-usage.amendment.v1.0.1.md). Guardar, enviar o eliminar corresponden a acciones, no a una casilla que las ejecute de forma ambigua.

**CHECKBOX-INTENT-02.** Checkbox también puede seleccionar o filtrar de inmediato si la pantalla lo explica. No reduzcas su diferencia con Toggle a la presencia de Guardar: su intención principal es inclusión o elección independiente. La pantalla o flujo anfitrión controla valores, permisos, alcance, validación y persistencia.

| Situación | Haz | Evita |
|---|---|---|
| Incluir en un reporte | Permitir combinar Totales, Cancelados y Observaciones. | Casillas para PDF y XLSX si solo se admite un formato. |
| Seleccionar filas | Explicar conjunto aplicable y selección parcial. | Extender silenciosamente la selección a otras páginas. |
| Aceptación | Mantener frase explícita y validación asociada. | Preseleccionar consentimiento o cobros. |

### Label, posición y visibilidad

**CHECKBOX-LABEL-01.** Usa una frase afirmativa, específica y en sentence case: “Recibir una copia del reporte”. La marca significa incluir o aceptar esa frase. Evita dobles negaciones como “No dejar de recibir”. Un valor inicial debe reflejar un dato existente o una decisión justificada; no se deduce de una muestra seleccionada.

**CHECKBOX-LABEL-02.** Propón `right`, predeterminado, en listas de opciones donde la marca precede al texto. Considera `left` cuando el patrón ubique el nombre antes del control. Mantén un lado consistente en el grupo y una proximidad clara. `label position` en Figma y `labelPosition` en web no cambian selección, nombre accesible ni validación; operan cuando la etiqueta está visible.

**CHECKBOX-LABEL-03.** El texto crece hasta un máximo de 320 px y envuelve; el control queda junto a la primera línea, sin recortar significado ni centrarlo respecto del párrafo completo. Ese máximo no es un ancho reservado ni un límite de caracteres. El anfitrión adapta anchos más estrechos y comprueba el resultado.

**CHECKBOX-LABEL-04.** `Show label` / `showLabel` es `false` por defecto. Mostrar etiqueta es una decisión explícita de composición. Ocúltala solo con contexto visual inequívoco y nombre accesible específico; en una tabla usa, por ejemplo, “Seleccionar comprobante FAC-024”. El API conserva `label` para el nombre cuando se oculta el texto. El clic en etiqueta y en casilla opera la misma opción.

### Selección y cinco estados

**CHECKBOX-MIXED-01.** `selected` admite `false`, `true` o `indeterminate`. False no tiene marca; true muestra Check; indeterminate muestra Minus y comunica mixed. El anfitrión calcula la selección parcial; no es una tercera preferencia que la persona elige manualmente. Al activar indeterminate, el callback recibe true. No implementes un ciclo manual false → true → mixed.

| Estado | Significado y uso | Evita |
|---|---|---|
| default | Disponible para elegir; selected conserva el valor. | Interpretarlo como validación exitosa o dato guardado. |
| hover | Respuesta temporal al puntero. | Dar foco o cambiar selección por hover. |
| focus | Localizar el control operado con teclado. | Confundir anillo con selección o dibujarlo por un simple hover. |
| error | Una regla validada requiere corrección; explicar con texto externo asociado. | Confiar solo en el borde rojo o iniciar una opción pendiente como fallo. |
| disabled | No se puede operar; conservar el valor y explicar la causa. | Interpretarlo necesariamente como false o depender de enfocarlo para explicar el motivo. |

**CHECKBOX-COVERAGE-01.** Tres valores × cinco estados × dos posiciones = 30 variantes. Hay un solo tamaño: Control 24 × 24 px, Box 18 × 18 px, marca 12 px y separación de etiqueta de 8 px. No hay size/small/medium/large, success, loading ni read-only propios. La densidad y el área activable se componen en el anfitrión conservando la geometría. Check y Minus son marcas fijas de Phosphor, no swaps decorativos ni iconos a izquierda/derecha del label.

### Selección en lote y alcance

**CHECKBOX-BULK-01.** Para el conjunto aplicable: ninguno seleccionado → false; algunos → indeterminate; todos → true. Activar la maestra parcial selecciona el conjunto; desmarcar la maestra completa lo limpia. La casilla aislada solo comunica un valor: no conoce filas, filtros, permisos o páginas.

**CHECKBOX-BULK-02.** Define y nombra “esta página” o “todos los resultados filtrados”, qué filas son seleccionables, qué ocurre al filtrar o paginar y qué se conserva. No cambies el alcance silenciosamente. Si el conjunto aplicable está vacío, no anuncies “todos seleccionados”; explica la ausencia de elementos disponibles. El patrón [BULK-SELECTION-001](../../../../specs/patterns/selection-controls.decisions.amendment.v1.0.0.md) gobierna la composición.

### Validación y disponibilidad

**CHECKBOX-VALIDATION-01.** El anfitrión define obligatoriedad y momento de validación. Una casilla opcional desmarcada está en default. Valida la aceptación requerida al intentar continuar; conserva el contexto y vincula una corrección concreta, por ejemplo “Confirma la revisión de los datos para continuar”. `invalid` comunica `aria-invalid`; el texto externo se asocia mediante `aria-describedby`.

**CHECKBOX-VALIDATION-02.** Recibir foco no resuelve el error. El anfitrión revalida y retira el mensaje al cumplirse la regla. No borres otras selecciones útiles. Los atributos nativos incluyen `required` cuando aplica; en “elige al menos una” valida el conjunto en el anfitrión: poner required en cada casilla exigiría cada una.

**CHECKBOX-DISABLED-01.** Explica cerca “Selecciona una empresa con sucursales” si falta ese requisito. No uses un tooltip sobre el control deshabilitado como única explicación. Disabled puede conservar selección. Para consulta sin edición, compón una representación clara del valor; no inventes una variante read-only.

### Teclado, Focus, tema y área de activación

**CHECKBOX-FOCUS-01.** Tab y Shift+Tab recorren controles disponibles; Espacio alterna false/true y convierte mixed a true. Disabled se omite. Hover no enfoca. El anillo web usa `:focus-visible`, orientado a navegación de teclado y gestionado por la heurística del navegador. Distingue foco DOM del indicador visible: el clic opera el control sin exigir un anillo como si se hubiera llegado con Tab. No prometas activación con Enter. `previewState` solo representa hover/focus en muestrarios.

**CHECKBOX-FOCUS-02.** Mantén el anillo sin recortes y su localización durante la corrección; error y foco pueden coexistir. Conserva los cuatro temas y los roles internos: el tema sigue al producto, no significa éxito o prioridad. El anfitrión verifica el objetivo real, amplía cobertura táctil y evita solapamientos sin escalar la figura. Un label alto por sí solo no demuestra un área de 44 × 44 px; el criterio táctil local no debe atribuirse al mínimo AA de WCAG 2.5.8. No se certifica accesibilidad global desde las muestras.

### Mapeo de propiedades

| Dimensión | Propiedades / mecanismo | Responsabilidad |
|---|---|---|
| Valor | selected obligatorio; onSelectedChange(boolean) | Mantener selección controlada; calcular mixed fuera del átomo. |
| Contenido | Label/label; Show label/showLabel=false | Nombre de la elección y su visibilidad; conservar nombre accesible. |
| Posición | label position/labelPosition=right o left | Alinear composición; sin efecto semántico. |
| Condición | state de Figma; invalid y disabled en web | Representar situación real, con ayuda externa. |
| Integración nativa | id, name, value, required, aria-describedby y otros atributos admitidos | Identidad, datos y asociación de mensajes; no validación automática de conjunto. |
| Muestrario y composición | previewState=hover/focus; className | Apariencia de muestra y anfitrión; sin sustituir tokens ni crear variantes. |

P-SLOTS NOT_APPLICABLE: Control, Box, Label y marcas son anatomía fija; texto/visibilidad/posición no crean contenido arbitrario. Los valores y aliases pertenecen al JSON delegado del contrato base; esta guía no mantiene un catálogo paralelo.

## Uso sin backend

Elige labelPosition left o right cuando showLabel está activo. La etiqueta va a la derecha por defecto. El selector de la muestra permite alternar ambos lados; la segunda casilla está deshabilitada.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem, UserMessage, type ChatSidebarProps, Pagination, PaginationItem, Tabs, TextArea, DropdownField, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function CheckboxExample() {
  const [selected, setSelected] = useState<CheckboxSelection>('indeterminate');
  const [labelPosition, setLabelPosition] = useState<'left' | 'right'>('right');
  return <div className="my-4 space-y-4">
    <label className="flex items-center gap-2">
      Posición de la etiqueta de Checkbox
      <select value={labelPosition} onChange={event => setLabelPosition(event.target.value as 'left' | 'right')}>
        <option value="right">Derecha</option>
        <option value="left">Izquierda</option>
      </select>
    </label>
    <div className="flex flex-wrap gap-6">
      <Checkbox id="demo-checkbox" label="Seleccionar comprobantes visibles" showLabel labelPosition={labelPosition} selected={selected}
        onSelectedChange={setSelected}/>
      <Checkbox id="demo-checkbox-disabled" label="Selección no disponible" showLabel labelPosition={labelPosition} selected disabled/>
    </div>
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
  labelPosition?: 'left' | 'right';
  selected: CheckboxSelection;
  invalid?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  previewState?: 'hover' | 'focus';
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Checkbox: {label, showLabel = false, labelPosition = 'right', selected, onSelectedChange, invalid, previewState, className, ...input}: CheckboxProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Control, Box y Label son anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [checkbox.contract.v1.0.0.md](../../../../specs/components/checkbox.contract.v1.0.0.md) · SHA-256 `fd1bf81cba70bac10fdd8069c963734ac506db7b4d8cf763d768250303794c56`.
- [checkbox.contextual-usage.amendment.v1.0.1.md](../../../../specs/components/checkbox.contextual-usage.amendment.v1.0.1.md) · SHA-256 `25f0ae5152cb7fe3496b5720521d1408537af4e77817ead61aad2c30bdd11019`.
- [selection-controls.decisions.amendment.v1.0.0.md](../../../../specs/patterns/selection-controls.decisions.amendment.v1.0.0.md) · SHA-256 `475cbf939a69291170f79eece14cf88848d0fd4bec4268de9c7f5b9a6486dcbc`.
- [forms.app-shell.amendment.v1.0.0.md](../../../../specs/patterns/forms.app-shell.amendment.v1.0.0.md) · SHA-256 `0e4c9655879b4847db021522fe49bc86f8dcac095a01c63fb3d75d03b5db8b8b`.
- [tables-pagination-selection.amendment.v1.0.0.md](../../../../specs/patterns/tables-pagination-selection.amendment.v1.0.0.md) · SHA-256 `b4f3057e9a09e7f7651275e1a47afcba00a364bb8ffd02c562a440073d29955b`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/file-upload-checkbox.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
