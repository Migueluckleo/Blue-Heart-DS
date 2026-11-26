# Buttons · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `BUTTON-001` · API local 0.1.0 · categoría acción.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/buttons.contextual-usage.amendment.v1.0.2.md#guía-semántica-normativa).

### Propósito y elección del control

**BUTTON-INTENT-01.** Usa Button cuando una persona decide iniciar una operación. La etiqueta anticipa el resultado. Decide en este orden: intención, variante, tamaño, texto e iconos, estado y patrón. El anfitrión es la pantalla o flujo que conecta la operación, los permisos, las confirmaciones, los resultados y el foco.

| Intención | Control apropiado | Haz | Evita |
|---|---|---|---|
| Iniciar una operación | Button nativo | Guardar cambios, crear un reporte, abrir un diálogo o validar y avanzar un paso. | Representar una operación mediante un enlace sin destino real. |
| Cambiar de destino | Button/link con `href` | Ver historial con URL concreta. | Guardar, aprobar o eliminar mediante Link. |
| Elegir valores | Radio, Checkbox o Toggle según el caso | Conservar exclusividad y estado propios del control de selección. | Simular selección con Primary. |
| Cambiar de sección | Tabs, menú o navegación correspondiente | Usar la semántica de navegación de esa región. | Inventar `selected` como variante visual de Button. |
| Acción reconocible en poco espacio | Icon Button | Conservar nombre accesible y contexto suficiente. | Ocultar Label de Button para fabricar un Icon Button. |

### Variante y jerarquía

**BUTTON-VARIANT-01.** La variante expresa intención y énfasis; no expresa tamaño ni estado. Usa una única acción principal por vista o diálogo y conserva un tamaño coherente entre las acciones de un grupo.

| `variant` | Cuándo usar | Haz | Evita |
|---|---|---|---|
| `primary` | Completa el objetivo principal de la vista o diálogo. | Guardar cambios al terminar la edición. | Otro Primary para Cancelar que compita por atención. |
| `secondary` | Alternativa visible que acompaña a la principal. | Cancelar o Volver a edición. | Dar jerarquía secundaria a la acción que debe encontrarse primero. |
| `text` | Acción local terciaria de menor énfasis. | Restaurar filtros junto a los filtros aplicados. | Usarla como acción principal del formulario o como navegación a otra página. |
| `link` | Navegación a una URL concreta. | Ver historial con `href`. | Ejecutar un guardado, aprobación o eliminación. |
| `danger` | Acción destructiva o irreversible. | Eliminar borrador después de identificar objeto y consecuencia y solicitar confirmación. | Usar rojo como acento para Crear o Guardar. |

En la confirmación destructiva, Danger representa la decisión crítica. No agregues otro Primary que compita con ella. El patrón define una alternativa conservadora.

### Tamaño según contexto

Los nombres técnicos son `small`, `medium` y `large`. Normaliza «middle» a `medium`. Las medidas son datos delegados al [recetario de Buttons](../../../../specs/data/buttons.v1.0.0.json), no tamaños nuevos.

| Regla | `size` | Contexto apropiado | Evita |
|---|---|---|---|
| P-SIZE-01 | `small`, 32 px de alto | Acciones locales repetidas en tablas o herramientas densas de escritorio, cuando contexto y puntero permiten distinguir cada objetivo. | Reducirlo solo para que quepan más acciones o para resolver una etiqueta larga. |
| P-SIZE-02 | `medium`, 40 px de alto | Punto de partida contextual para formularios y barras de acciones de escritorio de densidad normal; acompaña controles de escala equivalente. | Aplicarlo universalmente sin revisar el área de interacción real. |
| P-SIZE-03 | `large`, 48 px de alto | Flujos breves y focalizados, baja densidad o contextos táctiles que necesitan un objetivo más cómodo. | Usarlo para expresar prioridad, que ya corresponde a la variante. |

**BUTTON-SIZE-COHERENCE-01.** Mantén el tamaño dentro del grupo. Si falta espacio, reorganiza o apila las acciones antes de mezclar tamaños. El default web sigue siendo `large`; el criterio contextual de `medium` no cambia ese default. Verifica ancho, alto y separación del objetivo en la pantalla. La altura por sí sola no demuestra conformidad de accesibilidad.

### Texto e iconos

Label conserva el significado de la acción. Los iconos son opcionales e independientes, apagados por defecto. Usa Phosphor oficial y conserva tamaño, color y peso de la receta; la fuente conserva Outline/Light. El API admite otros pesos, pero esa capacidad no define una jerarquía ni un estado nuevo.

| Regla | Configuración | Cuándo usar | Haz | Evita |
|---|---|---|---|---|
| P-ICON-01 | Sin icono: ambos `show…Icon=false` | Primera opción si el texto se entiende inmediatamente. | Guardar cambios solo con texto. | Decorar todas las acciones por sistema. |
| P-ICON-02 | Derecho: `showRightIcon=true` y `rightIcon` | Anticipa dirección del flujo o cambio de contexto real. | Continuar con ArrowRight; Abrir portal con marca externa si el destino lo justifica. | Un caret de menú para comunicar avance. |
| P-ICON-03 | Izquierdo: `showLeftIcon=true` y `leftIcon` | Ayuda a reconocer una operación como creación o descarga. | Plus con Crear reporte; DownloadSimple con Descargar reporte. | Dejar el PlusCircle de muestra en una acción sin relación. |
| P-ICON-04 | Ambos visibles con swaps independientes | Excepción: cada icono comunica algo diferente y el espacio lo permite. | Descarga a la izquierda y marca externa a la derecha solo si la operación realmente combina descarga y apertura externa. | Duplicar signos o mezclar pistas contradictorias. |

Un caret no implementa un menú. Si abre opciones, el anfitrión debe aportar menú real, semántica, teclado, apertura/cierre y retorno de foco, con las capacidades públicas disponibles. No inventes propiedades que el API de Button no expone.

### Etiquetas y redacción

**BUTTON-CONTENT-01.** Usa verbo en infinitivo y objeto cuando aclare; la guía fuente establece hasta tres palabras. Escribe Enviar solicitud en lugar de Aceptar si este último oculta la operación. Mantén los términos del producto: Guardar borrador y Publicar reporte son decisiones diferentes.

**P-CONTENT-01.** Ante una traducción larga o un término de negocio indispensable, conserva el significado y revisa el layout. Registra la excepción al límite editorial. No trunques una acción crítica ni inventes abreviaturas.

**BUTTON-CONTENT-02.** Durante la carga usa gerundio y elipsis: Guardar cambios → Guardando…; Enviar solicitud → Enviando…; Eliminar borrador → Eliminando…. El API usa `loadingLabel` para ese texto.

Cancelar cierra un intento; Descartar cambios pierde trabajo. Explica la pérdida antes de confirmar. La etiqueta y el encabezado identifican el objeto; en acciones críticas el diálogo nombra el registro afectado.

### Estados y navegación con teclado

Las cinco variantes y los tres tamaños conservan seis estados: 5 × 3 × 6 = 90 combinaciones.

| Estado | Significado y uso | Haz | Evita |
|---|---|---|---|
| `default` | Acción disponible. | Permitir iniciar la operación. | Usarlo para comunicar éxito de una operación anterior. |
| `hover` | Exploración temporal con puntero. | Dar respuesta visual al pasar el puntero. | Mostrar el anillo Focus o esconder información indispensable fuera de hover. |
| `pressed` | Activación momentánea al presionar. | Dar respuesta durante la pulsación. | Confundirlo con selección persistente o éxito. |
| `focus` | Ubicación al navegar con teclado. | Mostrar la señal al llegar con Tab o Shift+Tab. | Mostrarla por hover o por clic, o usarla como selección persistente. |
| `loading` | Operación ya iniciada. | Sustituir iconos por Loader, comunicar ocupado y bloquear duplicados. | Aceptar una segunda activación o usar el spinner como error. |
| `disabled` | No puede iniciarse la acción. | Explicar el requisito para habilitarla. | Ocultar el motivo en una ayuda que exija enfocar el botón deshabilitado. |

**BUTTON-FOCUS-01.** Focus se muestra al navegar con teclado, especialmente con Tab y Shift+Tab; no se activa por hover ni por clic. Enter y Espacio activan el botón enfocado. El anillo identifica dónde está la persona; no indica que la acción esté seleccionada o haya terminado. En web conserva el tratamiento `:focus-visible` del componente oficial. En una muestra aislada, `previewState="focus"` ilustra ese estado; no se fija como estado de producto.

No recortes el anillo con el contenedor. Al abrir o cerrar un diálogo conserva una ubicación lógica de foco; distinguir la ubicación del foco de teclado de su apariencia evita activar una decoración de Focus por cualquier interacción de puntero.

`success`, `error` y `selected` no amplían la matriz de Button. El éxito y el error pertenecen al flujo; la alternancia de Icon Button tiene su propio contrato.

### Carga, error y recuperación

**P-FLOW-01.** Antes de activar, explica qué se guardará y los requisitos pendientes. Tras activar, comunica Guardando…, conserva el ancho reservado y evita un segundo envío. El Loader interno es decorativo; Button comunica ocupado. La operación real pertenece al anfitrión.

**P-FLOW-02.** Cuando termina, retira la carga y comunica el resultado. Si falla, conserva los datos útiles, explica el error y ofrece reintento solo si repetir la operación es válido. No dejes girando el indicador como mensaje de error.

**P-FLOW-03.** Conserva o mueve el foco según el resultado y el siguiente paso del flujo. No prometas Cancelar si el proceso real no admite cancelación. Para Disabled usa una explicación específica como «Selecciona al menos un reporte para exportar».

### Anatomía, temas y tokens

| Parte | Responsabilidad |
|---|---|
| Contenedor | Área de acción, fondo, borde y radio. |
| Label | Nombre de la operación y resultado esperado. |
| Iconos opcionales | Apoyo semántico mediante swaps oficiales. |
| Foco exterior | Ubicación del control en navegación con teclado. |
| Loader compartido | Actividad ya iniciada; tamaño y color determinados por la receta. |

El tema sigue al producto: Contable, Administrativo, Servicios o Personas. No elijas otro tema para colorear un botón aislado. Danger conserva su semántica destructiva. Este corte no acredita un modo oscuro adicional.

Conserva HUG horizontal, alturas, padding, separación, tipografía, subrayado Link, radio y bindings delegados. El anfitrión decide layout, separación entre grupos y área táctil. No redefine tokens internos ni clases `.bh-*` para fabricar variantes.

El recetario conserva 48 referencias de tokens: 45 de Button y tres tamaños de Loader. Las categorías son medida (seis), espaciado (cuatro), radio/borde (cuatro), fondo (diez), contenido (catorce), tipografía (siete) y carga (tres). Se conservan las identidades exactas, incluida `button/font/line-hight`. Altura/icono: large 48/24, medium 40/20 y small 32/16 px. Los valores y aliases se leen de los datos delegados, no se mantienen como otro catálogo editable en esta guía.

### Accesibilidad y adaptación

Usa botón nativo para acciones y enlace real para navegación. Mantén nombre específico, teclado y foco visible. No dupliques el anuncio del Loader interno. El motivo de Disabled debe quedar visible o accesible.

Verifica texto, iconos y foco sobre la superficie real. Reorganiza o apila el grupo ante poco ancho o traducciones largas, conservando orden de lectura y foco; no comprimas el texto para resolver el layout. WCAG 2.2, 2.5.8, establece un objetivo de puntero de 24 × 24 CSS px con excepciones; revisa la experiencia real. Las alturas del DS no prueban conformidad global. El Loader local adapta su velocidad con movimiento reducido.

### Frontera con Icon Button

Usa [ICON-BUTTON-001](../../../../specs/components/icon-button.contract.v1.0.0.md) para una acción reconocible en poco espacio y con nombre accesible. Si necesita explicación para entenderse o afecta una tarea importante, conserva preferentemente la etiqueta visible.

Primary y danger no exponen selected; secondary y ghost pueden alternar con selected y `aria-pressed`. Conserva un nombre estable. Dot es decorativo, el anfitrión comunica conteos relevantes; small no muestra número. Danger no admite Dot. Tooltip y área táctil pertenecen al anfitrión. Icon Button no ofrece Loading en su matriz actual.

### Mapeo de consumo

| Dimensión | Figma / concepto | API existente | Responsabilidad |
|---|---|---|---|
| Jerarquía | Button/primary, secondary, text, link, danger | `variant` | Elegir por intención. |
| Tamaño | size=small, medium, large | `size` | Elegir por contexto y coherencia del grupo. |
| Etiqueta | Label editable | `label`, `loadingLabel` | Nombrar resultado y proceso. |
| Iconos | Left icon / Right icon: visibilidad y swap | `showLeftIcon`, `showRightIcon`, `leftIcon`, `rightIcon` | Justificar cada pista. |
| Disponibilidad | state=loading / disabled | `loading`, `disabled`, `describedBy` | Bloquear y explicar. |
| Interacción | default / hover / pressed / focus | Interacción del componente; `previewState` solo para muestrario | Focus únicamente por navegación de teclado. |
| Navegación | Destino real | `variant="link"`, `href` | Conectar la URL. |
| Operación | Acción y envío | `type`, `onClick` | Ejecutar lógica del anfitrión. |
| Integración | Identificación y composición | `id`, `className` | No crear variantes mediante overrides. |
| Alternancia técnica | Capacidad del API | `ariaPressed` | No crea una variante selected de Button; preferir el control semántico apropiado. |

Cada instancia se asocia a `BUTTON-001`; cada patrón conserva su ID en [composición de acciones](../../../../specs/patterns/buttons.actions.amendment.v1.0.0.md). Registra intención, variante, tamaño, texto, iconos, estados, tema y responsabilidad del anfitrión. La composición acotada de Button no admite Slot arbitrario.

## Uso sin backend

Activa una acción local y usa Terminar demo para salir de loading.

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

export function ButtonsExample() {
  const [busy, setBusy] = useState(false);
  const [activations, setActivations] = useState(0);
  return (
    <div className="my-4 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button id="demo-primary" label="Guardar cambios" loadingLabel="Guardando…" loading={busy}
          showLeftIcon onClick={() => {setActivations(count => count + 1); setBusy(true);}}/>
        <Button id="demo-reset" variant="secondary" label="Terminar demo" onClick={() => setBusy(false)}/>
        <Button id="demo-disabled" variant="danger" label="Eliminar" disabled describedBy="demo-disabled-note"/>
        <Button id="demo-link" variant="link" label="Ver indicador" href="#loader-example"/>
      </div>
      <p id="demo-disabled-note">Selecciona un elemento para eliminar.</p>
      <p role="status" id="demo-activations">Activaciones locales: {activations}</p>
      <details>
        <summary>Matriz de 90 variantes</summary>
        {buttonVariants.map(variant => (
          <div key={variant} className="my-3 overflow-auto">
            <h3 className="mb-2 font-medium">{variant}</h3>
            {buttonSizes.map(size => <div key={size} className="mb-3 flex w-max gap-4 p-1">
              {states.map(state => <div key={state} className="space-y-1">
                <p className="text-xs">{size} · {state}</p>
                <Button variant={variant} size={size} disabled={state === 'disabled'} loading={state === 'loading'}
                  previewState={state !== 'disabled' && state !== 'loading' ? state : undefined}/>
              </div>)}
            </div>)}
          </div>
        ))}
      </details>
    </div>
  );
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [button.tsx](../../src/components/button.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type ButtonVariant = typeof buttonVariants[number];

export type ButtonSize = typeof buttonSizes[number];

export type ButtonInteraction = 'default' | 'hover' | 'pressed' | 'focus';

export interface ButtonIcon {
  /** Official Phosphor icon export. */
  component: Icon;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

export interface ButtonCommonProps extends Pick<AriaAttributes, "aria-haspopup" | "aria-expanded" | "aria-controls"> {
  size?: ButtonSize;
  label?: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: ButtonIcon;
  rightIcon?: ButtonIcon;
  describedBy?: string;
  /** Controlled pressed state for actions that toggle a view. */
  ariaPressed?: boolean;
  id?: string;
  className?: string;
  /** For an isolated catalogue specimen. */
  previewState?: ButtonInteraction;
}

export type ButtonProps = ButtonCommonProps & (
  | {variant?: ButtonVariant; href?: never; type?: 'button' | 'submit' | 'reset'; onClick?: (event: MouseEvent<HTMLButtonElement>) => void}
  | {variant: 'link'; href: string; type?: never; onClick?: (event: MouseEvent<HTMLAnchorElement>) => void}
);

```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Button: props: ButtonProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Label, visibilidad y swaps son propiedades acotadas. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [buttons.contract.v1.0.0.md](../../../../specs/components/buttons.contract.v1.0.0.md) · SHA-256 `f10c3428203f6d083bfa1a67175609ad3890e6ee8826e9121175159cec909b70`.
- [buttons.usage.amendment.v1.0.1.md](../../../../specs/components/buttons.usage.amendment.v1.0.1.md) · SHA-256 `39c8b5851fd42cc0e57257faab9c7bdac4d529422eea58378bc81a06f70bded8`.
- [buttons.contextual-usage.amendment.v1.0.2.md](../../../../specs/components/buttons.contextual-usage.amendment.v1.0.2.md) · SHA-256 `ae82a9a67a4e0a04699dafc847d6a52c9a67811eef594a588737e6afb0d6481a`.
- [buttons.actions.amendment.v1.0.0.md](../../../../specs/patterns/buttons.actions.amendment.v1.0.0.md) · SHA-256 `55ce62e2548edd9c1dc2cfe28624bbba65f80892890458e09208e1801304b01e`.
- [forms.app-shell.amendment.v1.0.0.md](../../../../specs/patterns/forms.app-shell.amendment.v1.0.0.md) · SHA-256 `0981d971c7e675b226c79a31f7f64b4ed434c7133d5af86ad347a1f11177bda9`.
- [tabs.local-navigation.amendment.v1.0.0.md](../../../../specs/patterns/tabs.local-navigation.amendment.v1.0.0.md) · SHA-256 `b297a1444e4ffcb17456d8ebcbba6bcb58b8349dad25038010b852b724ab39c0`.
- [tables-pagination-selection.amendment.v1.0.0.md](../../../../specs/patterns/tables-pagination-selection.amendment.v1.0.0.md) · SHA-256 `581fa2d5311abea2a85ff738e0beeeb606f73d45689eaa030f0530c0c833c287`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/buttons-loader.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
