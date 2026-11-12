# Icon Button · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `ICON-BUTTON-001` · API local 0.1.0 · categoría acción.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/icon-button.contract.v1.0.0.md#guía-semántica-normativa).

Usa Icon Button para una acción reconocible en poco espacio. Da al botón un nombre accesible con verbo y objeto. Usa Dot como señal decorativa y comunica cualquier conteo importante desde el anfitrión. Secondary y ghost pueden comunicar alternancia. Las acciones destructivas necesitan identificar el objeto y confirmación según el flujo.

| Situación | Haz | Evita |
|---|---|---|
| Alternancia en una barra | Usa secondary o ghost y expón aria-pressed. | Comunicar la selección solo con color. |
| Notificaciones | Nombra la acción y comunica el conteo si es relevante. | Hacer de Dot un control propio o mostrar números en small. |
| Acción destructiva | Nombra el objeto y ofrece confirmación en el anfitrión. | Colocar indicador en danger o usar un icono ambiguo para una operación crítica. |

Tooltip y el tamaño táctil se resuelven en el anfitrión. [Material UI Icon Button](https://mui.com/material-ui/react-button/) · [W3C Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Uso sin backend

Alterna notificaciones con teclado y comprueba el nombre accesible.

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

export function IconButtonExample() {
  const [selected, setSelected] = useState(false);
  return <div className="my-4 flex flex-wrap items-center gap-6">
    <IconButton id="demo-icon-button" variant="secondary" label="Alternar notificaciones" selected={selected}
      showBadge badgeCount="7" onClick={() => setSelected(value => !value)}/>
    <IconButton id="demo-icon-button-disabled" variant="ghost" label="Notificaciones no disponibles" disabled/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [icon-button.tsx](../../src/components/icon-button.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type IconButtonSize = 'small' | 'medium' | 'large';

export type IconButtonState = 'default' | 'hover' | 'pressed' | 'focus' | 'disabled';

export type IconButtonProps = Omit<ComponentPropsWithoutRef<'button'>,
  'children' | 'type' | 'aria-label' | 'aria-pressed' | 'onFocus' | 'onBlur' |
  'onPointerEnter' | 'onPointerLeave' | 'onPointerDown' | 'onPointerUp' | 'onPointerCancel'> & {
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  selected?: boolean;
  icon?: Icon;
  showBadge?: boolean;
  badgeCount?: string;
  badgeMaxCount?: string;
  previewState?: Exclude<IconButtonState, 'disabled'>;
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
IconButton: {label, variant = 'primary', size = 'large', selected, icon: Glyph = BellIcon,
  showBadge = false, badgeCount, badgeMaxCount, disabled = false, previewState, className, ...attrs}: IconButtonProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Glyph intercambiable y Dot son partes fijas. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [icon-button.contract.v1.0.0.md](../../../../specs/components/icon-button.contract.v1.0.0.md) · SHA-256 `26ea2e8769d17dfb87285d886e13771fa37d0ebdbcb633358b0172ec27f75493`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/sidebar-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
