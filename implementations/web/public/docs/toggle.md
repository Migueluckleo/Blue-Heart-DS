# Toggle · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TOGGLE-001` · API local 0.1.0 · categoría selección.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/toggle.contextual-usage.amendment.v1.0.1.md#guía-semántica-normativa).

### Intención y alternativa apropiada

**TOGGLE-INTENT-01.** Usa Toggle para una preferencia binaria cuyo cambio se aplica al alternarla: Avisos por correo. La convención local BlueHeart es aplicación inmediata. El anfitrión ejecuta y persiste; mover la perilla no acredita éxito de negocio. El estado es apagado/encendido, sin un punto intermedio.

**TOGGLE-INTENT-02.** Usa Checkbox para inclusión independiente, aceptación o selección en lote; Radio para alternativas excluyentes; Button para Guardar, Eliminar o Enviar. Si varios cambios deben revisarse y guardarse juntos, resuelve un formulario con el patrón apropiado. Evita un Toggle que aparenta aplicar al momento y depende de un Guardar lejano. Checkbox también puede seleccionar o filtrar de inmediato si el contexto lo explica; no elijas únicamente por la presencia de Guardar.

| Haz | Evita |
|---|---|
| Avisos por correo, con el mismo nombre al encender y apagar. | Cambiar el nombre a Activar avisos o Desactivar avisos según el valor. |
| Representar valor persistido y explicar una actualización pendiente o fallida. | Aparentar una preferencia guardada que el servicio rechazó. |
| Ajustar el anfitrión al texto y al área activable. | Estirar el riel o fabricar small/medium/large. |

### Nombre, visibilidad y geometría

**TOGGLE-LABEL-01.** Mantén nombre estable, afirmativo y en sentence case, que describa la preferencia en ambos estados. No agregues órdenes variables Activar/Desactivar ni textos Sí/No u On/Off como sustituto del nombre. La posición de la perilla comunica el valor además del color.

**TOGGLE-LABEL-02.** `Label`/`label` nombra y `Show label`/`showLabel=false` gobierna visibilidad. Mostrarlo es una decisión explícita. Si se oculta, conserva contexto visual y nombre accesible equivalente; la implementación mantiene aria-label a partir de label. Clic en riel o etiqueta alterna la misma preferencia. No existe labelPosition izquierda/derecha ni swaps de icono: la etiqueta va a la derecha, perilla y riel son geometría propia.

**TOGGLE-LAYOUT-01.** Un tamaño: riel 40 × 24 px, perilla de 20 px, gap de etiqueta 8 px, label hasta 320 px que crece y envuelve sin recortes. El máximo no reserva siempre ese ancho. Toggle conserva alineación central multilínea; no importes la de primera línea de Checkbox/Radio ni estires el riel para llenar el texto. El anfitrión ajusta el ancho y comprueba el resultado.

### Dos valores y cuatro estados

| Estado | Uso correcto | Evita |
|---|---|---|
| default | Disponible; selected conserva apagado o encendido. | Interpretar una perilla movida como persistencia confirmada. |
| hover | Respuesta temporal al puntero. | Dar foco o alternar por hover. |
| focus | Localizar el control operado con teclado. | Confundir foco con valor o exigir anillo por un clic. |
| disabled | Preferencia no operable; explicar cerca el requisito faltante. | Usarlo como falso error o exigir foco para conocer el motivo. |

**TOGGLE-COVERAGE-01.** Dos valores × cuatro estados = 8 variantes. No hay indeterminate, error, success, loading, pressed, read-only o size propios. Disabled conserva la diferencia de valor por posición de la perilla aunque comparta paleta. Para consulta compón el valor claramente; no inventes solo lectura. Conserva los cuatro temas y tokens internos; el tema sigue al producto, no expresa prioridad ni resultado.

### Persistencia, espera y recuperación

**TOGGLE-ASYNC-01.** El anfitrión mantiene valor y controla la operación. Si tarda, compón Loader junto al control y anuncia la espera cuando sea necesario. Define cómo evitar solicitudes contradictorias y gestionar sus respuestas. No agregues una variante loading al átomo ni declares un cambio remoto exitoso por el estado visual.

**TOGGLE-ASYNC-02.** Al confirmar, el valor visible debe corresponder al persistido; el feedback es proporcional y no mueve foco sin necesidad. Si falla, revierte al valor anterior y presenta Inline Notification con explicación y forma de reintentar: “No se guardó el cambio. Los avisos siguen desactivados. Intenta de nuevo”. Loader y notificación pertenecen a la pantalla, no son hijos/dependencias obligatorios de la anatomía de Toggle. Los ejemplos son ficticios y no implican servicios reales.

**TOGGLE-DISABLED-01.** Explica cerca “Registra un correo para habilitar los avisos” si ese es el requisito real. No dependas de enfocar el control deshabilitado ni de tooltip como única explicación. Permisos, persistencia y fallos corresponden al flujo; no crean variantes del componente.

### Teclado, foco y área activable

**TOGGLE-FOCUS-01.** Tab/Shift+Tab recorren controles disponibles y Espacio alterna el valor. Disabled se omite y es inerte. No hay promesa de activación con Enter. El anillo web usa `:focus-visible`, orientado a teclado conforme a la heurística del navegador. Distingue foco DOM del anillo visible: clic opera sin exigir el anillo de Tab; hover no enfoca. `previewState` es apariencia de muestrario, no manejo real de foco.

**TOGGLE-FOCUS-02.** Mantén halo sin recortes. El anfitrión conserva la cobertura táctil local de 44 × 44 px sin escalar el riel, verifica el objetivo real y evita solapamientos. Una etiqueta alta no demuestra toda esa área. Este criterio local no es una atribución al mínimo AA de WCAG 2.5.8 ni una certificación de accesibilidad global.

### Mapeo de propiedades

| Propiedad | Responsabilidad |
|---|---|
| selected obligatorio, onSelectedChange(boolean) | Valor controlado; sin estado intermedio. Persistencia a cargo del anfitrión. |
| label, showLabel=false | Nombre estable y visibilidad sin perder nombre accesible. |
| state de Figma | default/hover/focus/disabled. |
| disabled y atributos nativos admitidos | Disponibilidad, identidad y asociaciones; no agregan estados del DS. |
| previewState=hover/focus | Apariencia estática para muestrario. |
| className | Composición sin sustituir tokens ni fabricar variantes. |

Web usa input checkbox con `role=switch` y `checked` para comunicar valor. P-SLOTS NOT_APPLICABLE: riel, perilla, foco y Label son partes fijas; no hay iconos, contenido arbitrario ni subcomponentes intercambiables. Valores/aliases permanecen en el JSON delegado del contrato base.

## Uso sin backend

Cambia una preferencia local. La segunda opción está deshabilitada.

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

export function ToggleExample() {
  const [enabled, setEnabled] = useState(false);
  return <div className="my-4 flex flex-wrap items-center gap-6">
    <Toggle showLabel id="demo-toggle" label="Notificaciones" selected={enabled} onSelectedChange={setEnabled}/>
    <Toggle showLabel id="demo-toggle-disabled" label="Alertas del sistema" selected disabled/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [toggle.tsx](../../src/components/toggle.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type ToggleProps = Omit<ComponentPropsWithoutRef<'input'>,
  'type' | 'role' | 'checked' | 'defaultChecked' | 'onChange' | 'aria-label'> & {
  label: string;
  showLabel?: boolean;
  selected: boolean;
  onSelectedChange?: (selected: boolean) => void;
  previewState?: 'hover' | 'focus';
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Toggle: {label, showLabel = false, selected, onSelectedChange, previewState, className, ...input}: ToggleProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Label y Show label son propiedades acotadas. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [toggle.contract.v1.0.0.md](../../../../specs/components/toggle.contract.v1.0.0.md) · SHA-256 `18fd1f9c1e182511bfd22d431d360e809cd095879d2d31d8ad4bb01799e5f29c`.
- [toggle.contextual-usage.amendment.v1.0.1.md](../../../../specs/components/toggle.contextual-usage.amendment.v1.0.1.md) · SHA-256 `d5d96b3869896ca0a62a36996ca6333cafb9293af859c9196c25309f9595e11e`.
- [selection-controls.decisions.amendment.v1.0.0.md](../../../../specs/patterns/selection-controls.decisions.amendment.v1.0.0.md) · SHA-256 `475cbf939a69291170f79eece14cf88848d0fd4bec4268de9c7f5b9a6486dcbc`.
- [forms.app-shell.amendment.v1.0.0.md](../../../../specs/patterns/forms.app-shell.amendment.v1.0.0.md) · SHA-256 `0e4c9655879b4847db021522fe49bc86f8dcac095a01c63fb3d75d03b5db8b8b`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/dot-toggle-radio.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
