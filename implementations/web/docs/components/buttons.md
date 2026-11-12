# Buttons · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `BUTTON-001` · API local 0.1.0 · categoría acción.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/buttons.usage.amendment.v1.0.1.md#guía-semántica-normativa).

Usa Button cuando la persona decide iniciar una acción. El texto debe anticipar el resultado. Para elegir entre valores simultáneos, usa el control de selección que corresponda. Si la interacción cambia de destino, usa la variante Link y un enlace real.

| Variante | Cuándo usar | Haz | Evita |
|---|---|---|---|
| Primary | Acción que completa el objetivo de la vista o diálogo. | «Guardar borrador» en un editor de reporte. | Dar la misma prominencia a «Guardar borrador» y «Cancelar». |
| Secondary | Alternativa visible que acompaña la acción principal. | «Volver a edición» junto a «Guardar borrador». | Dar jerarquía secundaria a una acción que la persona necesita encontrar primero. |
| Text | Acción terciaria, local y de menor énfasis. | «Restaurar filtros» al lado de los filtros aplicados. | Usarla para la acción principal de un formulario o para navegar a otra vista. |
| Link | Navegación hacia una URL o destino concreto. | «Ver historial» con un href a la página de historial. | Usarlo para aprobar, guardar o eliminar un registro. |
| Danger | Acción destructiva o irreversible. La pantalla aporta confirmación con objeto y consecuencia. | «Eliminar borrador» en el diálogo que identifica el borrador afectado. | Usarlo como acento para resaltar una acción cotidiana. |

**Tamaño y composición.** Mantén un tamaño coherente en un grupo. Los tres tamaños conservan 48, 40 y 32 px de alto. El anfitrión decide el layout y comprueba el área táctil necesaria. Label aporta el nombre. Los iconos Phosphor son opcionales y se eligen por su contribución al significado. El foco exterior pertenece al control. La composición es acotada y P-SLOTS queda NOT_APPLICABLE.

**Estados.** Default comunica disponibilidad. Hover y pressed dan respuesta temporal a puntero o activación. Focus conserva una señal visible al tabular. Loading señala una acción ya iniciada, conserva el ancho en web y reemplaza los iconos por el Loader compartido. Disabled impide iniciar una acción y la pantalla explica el requisito para habilitarla. Un error posterior pertenece al flujo que lanzó la acción.

**Caso de carga.** Al activar «Guardar borrador» pasa a «Guardando…» y bloquea una segunda activación. La operación real pertenece al anfitrión. Cuando termina, la pantalla decide cómo comunicar el resultado y restablece la disponibilidad que corresponda. La demo del catálogo permite entrar y salir de carga mediante estado local.

**Accesibilidad.** Usa botón nativo para una acción y enlace con href para navegación. Mantén un nombre específico, el foco visible, la activación por teclado y la comunicación de ocupado en web. Si la acción está deshabilitada, deja visible o accesible el motivo. El color y los iconos complementan la etiqueta.

**Contraste editorial.** Atlassian y Carbon orientan la jerarquía de una acción principal, las alternativas y la claridad de etiquetas. La semántica, matriz y restricciones de BlueHeart siguen gobernadas por el contrato base. [Atlassian Button](https://atlassian.design/components/button/usage) · [Carbon Button](https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines)

## Uso sin backend

Activa una acción local y usa Terminar demo para salir de loading.

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

export interface ButtonCommonProps {
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

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/buttons-loader.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
