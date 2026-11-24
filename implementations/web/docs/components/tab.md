# Tab · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TAB-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/tab.contextual-usage.amendment.v1.0.0.md#guía-semántica-normativa).

### Anatomía y contenido

**TAB-LABEL-01.** Label visible, estable y no vacío, preferentemente sustantivo o nombre de la sección: Datos generales, Movimientos, Documentos. Mantén vocabulario paralelo; evita Otros o Más sin contenido distinguible. La fuente recomienda 1–2 palabras, no un límite de caracteres. No conviertas Label en Guardar/Consultar ni cambies la frase por selected.

**TAB-ICON-01.** Solo icono izquierdo opcional para ayudar a reconocer la sección. Es Phosphor Light de 20 px, decorativo y no reemplaza Label ni crea otra acción. Si no aporta información, ocúltalo. ImageSquare es placeholder, no significado de producto. No hay icono derecho, X/Remove, caret de menú ni acción interna; no copiar la anatomía de Chip. Orden fijo: icono → Label → Dot opcional.

**TAB-COUNT-01.** `Show badge` en Figma corresponde a Dot count/medium, no al componente Badge. Complementa Label con una cantidad y alcance definidos por el anfitrión: Documentos, 12 archivos vinculados. No calcula, filtra, valida ni acredita resultado confirmado por sí solo. No mezclar alcance total y filtrado sin explicarlo.

**TAB-COUNT-02.** Mantén `"0"` si es el dato real; puede abrir un estado vacío habilitado. Desconocido no equivale a cero: omite el conteo y explica la espera en el panel cuando proceda. En web `badgeCount?: string`: undefined o cadena vacía lo oculta; `"0"` se muestra. `99+` es formato del anfitrión, sin límite ni algoritmo automático. No hay cantidad máxima delegada ni estado error en el número.

**TAB-COUNT-ACCESS-01.** Dot es `aria-hidden`. El anfitrión proporciona `accessibleLabel` en TabsItem, conservando el Label visible e incorporando número y significado, por ejemplo «Documentos, 12 archivos vinculados». `badgeCount` por sí solo no anuncia esa cantidad ni actualizaciones live. Una Tab sin conteo conserva su etiqueta como nombre; no la ocultes a lectores.

### Presentaciones y estados

**TAB-VARIANTS-01.** Tres tipos × selected false/true × default/hover/focus/disabled = 24 variantes. No crear variantes por Label, Count, glyph o visibilidad. No hay eje size, pressed, loading, error, success, checked o cierre. Underline/Pill/Segmented conservan la misma función y no son large/medium/small. Métricas, matriz, contraste y recomendaciones de selección se gobiernan por la guía de Tabs y los datos delegados.

**TAB-FOCUS-01.** Focus visible localiza teclado y es independiente de selected; hover no enfoca ni activa. El navegador aplica `:focus-visible`: distingue foco DOM de anillo y no fuerces llegada con Tab por cada clic. Conserva trazo 2 px, offset 4 exterior y halo adaptable sin recorte. En el conjunto actual las flechas exploran; Enter/Espacio abre el panel.

**TAB-DISABLED-01.** Disabled conserva el valor selected y bloquea activación. El anfitrión decide si otro panel debe seleccionarse; no hay reselección automática. No deshabilitar solo por conteo cero ni reemplazar errores de consulta con disabled. Empty, loading, error y reintento pertenecen al panel.

### Propiedades y composición

| Dimensión | Figma y web actuales |
|---|---|
| Identidad visual | Type underline/pill/segmented; selected=false; state=default. Default web underline. |
| Contenido | Label=Tab en muestra; Label obligatorio en web. No usar el placeholder como nombre de producto. |
| Icono | Show icon=false e Icon swap; en Tab web pasar `icon` activa `showIcon` por defecto, salvo flag explícito. Sin icono custom, showIcon=false. TabsItem expone `icon`, sin showIcon. |
| Conteo | Show badge=false en muestra; Dot con Count. En web presencia de `badgeCount` no vacío. |
| Coordinación | `Tab` expone selected, disabled, ref y atributos/eventos HTML compatibles; no coordina otros Tab ni paneles. Usa `Tabs` para el patrón completo. |

P-SLOTS NOT_APPLICABLE: anatomía fija con texto, dos opcionales y swap acotado. No hay children arbitrarios. Los tokens internos siguen siendo de Tab/Dot; no aplicarles Body ni colores privados para imitar Chips.

## Uso sin backend

Nombra una sección dentro de Tabs: Label visible, icono izquierdo y Dot opcionales. Focus es independiente de selected; no hay size, icono derecho ni Remove.

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

export function TabExample() {
  const [selected, setSelected] = useState('summary');
  return <div className="my-4">
    <Tabs type="segmented" label="Vistas de la cuenta" selectedId={selected} onSelectionChange={setSelected}
      items={[
        {id:'summary',label:'Resumen',accessibleLabel:'Resumen, 12 pendientes',icon:ImageSquareIcon,badgeCount:'12',
          panel:<p className="pt-3">Doce comprobantes requieren revisión.</p>},
        {id:'documents',label:'Documentos',panel:<p className="pt-3">Documentos registrados de la cuenta.</p>},
      ]}/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [tab.tsx](../../src/components/tab.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type TabType = 'underline' | 'pill' | 'segmented';

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'role' | 'children' | 'aria-selected'> {
  label: string;
  type?: TabType;
  selected?: boolean;
  icon?: Icon;
  showIcon?: boolean;
  badgeCount?: string;
  ref?: Ref<HTMLButtonElement>;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Tab: {label, type = 'underline', selected = false, disabled = false,
  icon, showIcon = Boolean(icon), badgeCount, className, style, onFocus, onBlur, onPointerEnter, onPointerLeave, ...attrs}: TabProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Etiqueta, icono y Dot tienen posiciones fijas. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [tab.contract.v1.0.0.md](../../../../specs/components/tab.contract.v1.0.0.md) · SHA-256 `040d848dfd98d26731f00cad747680b67ea36457b8e1a74e3031314f481ab804`.
- [tab.contextual-usage.amendment.v1.0.0.md](../../../../specs/components/tab.contextual-usage.amendment.v1.0.0.md) · SHA-256 `7f5eef7801b720ff93e5af97c422803a3ee55b5900d23e06056f1d66adc3662f`.
- [tabs.local-navigation.amendment.v1.0.0.md](../../../../specs/patterns/tabs.local-navigation.amendment.v1.0.0.md) · SHA-256 `b297a1444e4ffcb17456d8ebcbba6bcb58b8349dad25038010b852b724ab39c0`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/tabs-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
