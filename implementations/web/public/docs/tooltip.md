# Tooltip · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TOOLTIP-001` · API local 0.1.0 · categoría ayuda.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/tooltip.contract.v1.0.0.md#guía-semántica-normativa).

Usa Tooltip para ayuda breve y complementaria sobre un control que recibe foco. En simple, usa una frase corta. En rich, usa un título corto y una descripción de hasta dos líneas como guía de autoría. El texto puede crecer. Mantén la ayuda indispensable visible en la página. El anfitrión gestiona el anclaje, la colisión con bordes y el acceso en pantallas táctiles.

| Situación | Haz | Evita |
|---|---|---|
| Acción mediante icono | Muestra «Ver historial» junto a un control que conserve nombre accesible. | Usar una burbuja como único nombre del control. |
| Ayuda adicional | Resume en rich qué actividad muestra un panel. | Repetir el texto visible del disparador. |
| Error o condición de bloqueo | Pon la explicación junto al control afectado. | Ocultar una condición necesaria para continuar dentro de Tooltip. |

El anfitrión abre con foco o después de unos 300 ms de hover, conserva el foco del disparador y permite cerrar con Escape. La burbuja es texto sin controles. Usa `role=tooltip` y `aria-describedby` cuando corresponda. El anfitrión elige el placement que cabe. [Atlassian Tooltip](https://atlassian.design/components/tooltip/usage) · [W3C Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

## Uso sin backend

Enfoca o pasa el puntero sobre Panel de actividad. Escape cierra la ayuda; el disparador conserva el foco.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem, UserMessage, type ChatSidebarProps, Pagination, PaginationItem, Tabs, TextArea, DropdownField, FloatingActions, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function TooltipExample() {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const close = () => {
    clearTimeout(timer.current);
    setVisible(false);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!visible) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [visible]);
  return <div className="my-4 space-y-4">
    <span className="relative inline-block" onMouseEnter={() => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setVisible(true), 300);
    }} onMouseLeave={event => {
      if (!event.currentTarget.contains(document.activeElement)) close();
    }}>
      <button type="button" id="demo-tooltip-trigger" className="rounded border px-3 py-2"
        aria-describedby="demo-tooltip" onFocus={() => {
          clearTimeout(timer.current);
          setVisible(true);
        }} onBlur={close}>
        Panel de actividad
      </button>
      <span className="absolute left-0 top-full z-10">
        <Tooltip id="demo-tooltip" placement="bottom" type="rich" title="Movimientos recientes"
          label="Consulta la actividad del periodo" hidden={!visible}/>
      </span>
    </span>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [tooltip.tsx](../../src/components/tooltip.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface TooltipProps {
  id: string;
  label?: string;
  title?: string;
  type?: 'simple' | 'rich';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  arrow?: 'start' | 'center' | 'end';
  hidden?: boolean;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Tooltip: {id, label = 'Tooltip', title = 'Title', type = 'simple',
  placement = 'top', arrow = 'start', hidden = false}: TooltipProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Body, textos y flecha forman una anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [tooltip.contract.v1.0.0.md](../../../../specs/components/tooltip.contract.v1.0.0.md) · SHA-256 `55730a20b256c59cd0287afb0f70d3d23836af988ae6ddc6d8e8a5787c91ca9c`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/tooltip.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
