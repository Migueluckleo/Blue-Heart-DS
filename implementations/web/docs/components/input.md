# Input · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `INPUT-001` · API local 0.1.0 · categoría formularios.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/input.contextual-usage.amendment.v1.0.1.md#guía-semántica-normativa).

### Propósito y alternativa apropiada

**INPUT-INTENT-01.** Usa Input para escribir un dato breve de una línea: nombre, correo o referencia. Usa [Dropdown](../../../../specs/components/dropdown-menu.contextual-usage.amendment.v1.0.1.md) cuando el valor deba elegirse de una lista definida. Un caret visible no convierte un Input en selector. Usa Text Area para respuestas de varias líneas y Search para buscar en un conjunto. Considera Radio cuando comparar alternativas visibles sea útil; no hay un umbral universal de cantidad de opciones. La selección múltiple necesita su cobertura específica.

El anfitrión es la pantalla o flujo que define formato, validación, permisos, dependencias, persistencia y resultado. La captura de un valor no guarda automáticamente todo el formulario.

### Etiqueta, ejemplo y ayuda

| Regla | Parte | Haz | Evita |
|---|---|---|---|
| INPUT-LABEL-01 | Label | Nombre breve y específico, como Correo electrónico. Mantén preferentemente Show label. | Ocultar Label sin contexto visual inequívoco y sin nombre accesible. |
| INPUT-PLACEHOLDER-01 | Placeholder | Ejemplo de formato cuando etiqueta y ayuda ya explican el dato. | Tratarlo como valor guardado o usarlo como única etiqueta o instrucción. |
| INPUT-HELPER-01 | Helper text | Instrucción persistente sobre formato, requisito o corrección. | Esconder información indispensable detrás de un tooltip. |
| INPUT-REQUIRED-01 | Required | Declarar la obligatoriedad real del dato; el asterisco complementa la semántica nativa. | Convertir un dato opcional en obligatorio por el default técnico. |

El placeholder desaparece al capturar un valor, no por el mero hecho de enfocar. Ocultar ayuda redundante mediante Show helper es válido; conserva el mensaje que explica error o disponibilidad. Para un campo opcional, decláralo como tal; añade “(opcional)” a la etiqueta cuando ayude a distinguir excepciones. El API conserva `required=true` por defecto.

### Tamaño según contexto

| Regla | Tamaño y altura de campo | Uso apropiado | Evita |
|---|---|---|---|
| INPUT-SIZE-01 | small, 32 px | Captura local o filtros en escritorio denso cuando sea fácil localizar y activar el objetivo. | Reducir para ocultar una etiqueta larga o agregar más campos. |
| INPUT-SIZE-02 | medium, 40 px | Punto de partida contextual para formularios y filtros de escritorio de densidad normal; acompaña controles de escala equivalente. | Interpretarlo como un cambio del default de Input. |
| INPUT-SIZE-03 | large, 48 px | Captura focalizada, baja densidad o mayor comodidad al activar el campo. | Usarlo para expresar importancia del dato. |

**INPUT-SIZE-04.** Mantén escala coherente dentro del grupo y verifica el área activable real. Las alturas no incluyen Label ni ayuda. El ancho fuente de 464 px es adaptable. El tamaño no define el ancho ni garantiza accesibilidad táctil. Normaliza “middle” a `medium`. Input conserva default `large`; DropdownField y DropdownMenu conservan default `medium`.

### Accesorios: semántica y límites

**INPUT-ICON-01.** Propón ocultar el accesorio si no aporta significado. Para captura libre, usa `showIcon=false` cuando el caret sugiera una elección inexistente. Un Envelope puede identificar un correo, pero no lo envía. El accesorio existente está a la derecha; Input no ofrece posiciones izquierda/derecha independientes como Button. Conserva Phosphor Outline/Light, tamaños y roles de la receta.

**INPUT-ICON-02.** El default visual incluye CaretDown con `showIcon=true`. Si la persona debe elegir un valor, consume DropdownField y su comportamiento real. No simules la apertura de una lista mostrando un caret en un Input de texto.

**INPUT-BADGE-01.** Usa Badge subtle/small para una unidad verificada, por ejemplo MXN junto a un importe. El dato se escribe en el campo; Badge no almacena el valor ni convierte la unidad. `showBadge=false` por defecto; `badgeLabel` permite identificar la unidad.

**INPUT-TOOLTIP-01.** Show tooltip muestra Question junto a Label. El glyph por sí solo no implementa ayuda interactiva: el anfitrión resuelve semántica, apertura/cierre, foco y accesibilidad. Una restricción indispensable permanece en la ayuda del campo. `showTooltip=false` por defecto.

### Empty, filled y siete estados

Empty y filled indican si existe valor; no expresan validación. Cada apariencia conserva tres tamaños y siete estados: 2 × 3 × 7 = 42 combinaciones.

| Estado | Significado | Haz | Evita |
|---|---|---|---|
| default | Disponible para capturar. | Mantener etiqueta y ayuda necesarias. | Interpretarlo como validación exitosa. |
| hover | Puntero sobre el campo. | Dar respuesta temporal de exploración. | Confundirlo con edición o insertar el cursor por hover. |
| focus | Campo que recibe entrada. | Mantener localización y posición de inserción mientras se edita. | Confundirlo con éxito, error o selección de un valor. |
| success | Comprobación concluida. | Mostrarlo tras una validación real y con significado. | Marcar éxito solo porque hay texto. |
| error | Dato que requiere corrección. | Explicar problema y solución junto al campo. | Depender solo del color o de “Valor inválido”. |
| read-only | Consulta sin edición. | Conservar lectura y copia de un dato útil, como folio asignado. | Deshabilitar un valor que debe poder copiarse. |
| disabled | Captura no disponible. | Explicar qué falta para habilitarla. | Dejar un campo inaccesible sin motivo comprensible. |

### Focus de edición y foco de Button

**INPUT-FOCUS-01.** Tab y Shift+Tab permiten llegar al Input y mostrar su ubicación. Hacer clic dentro también inicia la edición y le da foco. La implementación vigente usa `:focus-within` para el tratamiento visual de edición; no se traslada automáticamente la regla de Focus de Button, reservada allí a navegación de teclado.

**INPUT-FOCUS-02.** Hover no coloca el cursor ni da foco. Un campo puede estar vacío o lleno y enfocado. El marco localiza dónde se escribe y el cursor de texto señala la posición de inserción. El foco vacío medium/small conserva su separación exterior específica.

**INPUT-FOCUS-03.** Error y foco pueden coexistir durante la corrección. Mantén el mensaje y el indicador de edición; no borres el error solo porque el campo recibió foco. Los estados controlados sirven para representar la situación real y para muestras; no sustituyen la interacción de edición.

### Validación, corrección y disponibilidad

**INPUT-VALIDATION-01.** No cambies a Error por cada carácter de una respuesta todavía incompleta. Mantén la ayuda de formato. Evalúa al terminar la captura o al intentar continuar según el flujo; la pantalla define las reglas y el momento pertinente.

**INPUT-VALIDATION-02.** Ante error conserva lo escrito y asocia una corrección concreta. Haz: “Incluye el dominio. Ejemplo: ana@empresa.mx.” Evita: “Valor inválido.” Error usa `aria-invalid`; la ayuda se vincula mediante `aria-describedby`.

**INPUT-VALIDATION-03.** Revalida cuando sea útil y usa Success tras una comprobación concluida. Formato válido de correo no garantiza existencia ni entrega de mensajes. No existe estado nativo de loading o validación remota en Input; espera y resultado pertenecen al flujo.

**INPUT-AVAILABILITY-01.** Read-only conserva consulta/copia; Disabled impide capturar por un requisito pendiente. Explica “Selecciona primero una empresa” cerca del campo. No exijas enfocar el campo deshabilitado para conocer el motivo. El producto decide qué dato es obligatorio; el default de `required` no es una regla de negocio.

### Mapeo de propiedades y composición

| Dimensión | Propiedades existentes | Responsabilidad |
|---|---|---|
| Identificación | id, name | Identificar y conectar el dato con su contexto. |
| Tipo de entrada | type: text/email/search/url/tel/password | Elegir el tipo admitido; no inventar `number` ni otras props no expuestas. |
| Contenido | label, placeholder, helperText, value, defaultValue | Separar nombre, ejemplo, ayuda y valor real. |
| Visibilidad | showLabel, showPlaceholder, showHelper | Conservar contexto y nombre accesible; el componente mantiene aria-label cuando oculta Label. |
| Accesorios | showIcon, icon, showTooltip, showBadge, badgeLabel | Justificar cada pista, unidad o ayuda. |
| Obligatoriedad y presentación | required, size, status | Reflejar requisito real, escala y estado. |
| Captura y validación | onValueChange, onBlur | Conectar el comportamiento del anfitrión; no atribuir guardado al componente. |
| Integración | className | Componer sin sobrescribir tokens internos ni fabricar variantes. |

Los 11 controles de contenido/visibilidad de cada set se suman a size/status. Label, campo, ayuda y accesorios conservan posiciones fijas; Badge es composición vinculada. P-SLOTS NOT_APPLICABLE. Conserva la base, sus 48 referencias de tokens y sus estilos; no mantengas otro catálogo de valores editables en esta guía. Los cuatro temas siguen al producto. El QA existente registra una excepción de contraste del borde vacío: conservar esa condición explícita y verificar la pantalla real no equivale a certificar accesibilidad global ni a recolorear el DS.

## Uso sin backend

Captura una línea con etiqueta y ayuda vinculadas. El host controla la validación. Badge subtle indica una unidad.

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
- [input.contextual-usage.amendment.v1.0.1.md](../../../../specs/components/input.contextual-usage.amendment.v1.0.1.md) · SHA-256 `aff1f6c99b555acb2962c04badd878776f3a3642f34dcd648b01841c90b27fdc`.
- [inputs-dropdowns.forms.amendment.v1.0.0.md](../../../../specs/patterns/inputs-dropdowns.forms.amendment.v1.0.0.md) · SHA-256 `5523f57bfd8ea56fc98cb79bd6afb257a89010935eba879bf94d112f7bcc150b`.
- [forms.app-shell.amendment.v1.0.0.md](../../../../specs/patterns/forms.app-shell.amendment.v1.0.0.md) · SHA-256 `0e4c9655879b4847db021522fe49bc86f8dcac095a01c63fb3d75d03b5db8b8b`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/input.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
