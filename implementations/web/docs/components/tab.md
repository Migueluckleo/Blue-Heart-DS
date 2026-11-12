# Tab · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TAB-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/tab.contract.v1.0.0.md#guía-semántica-normativa).

Usa Tab para identificar una vista del mismo contexto. W3C WAI vincula cada tab con su panel y distingue foco de selección en activación manual. Carbon usa títulos breves para anticipar el contenido. BlueHeart ofrece underline, pill y segmented con la misma semántica. [W3C WAI Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) · [Carbon Tabs](https://www.carbondesignsystem.com/building-blocks/core/components/tabs/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Vista con nombre | Usa una etiqueta breve que anticipe el panel. | Quitar la etiqueta para usar solo el glyph. |
| Conteo relevante | Usa Dot count y proporciona el significado accesible del número. | Calcular el conteo dentro de Tab. |
| Vista no disponible | Conserva Disabled y explica la condición desde el anfitrión cuando sea relevante. | Cambiar automáticamente a otro panel. |

## Uso sin backend

Mantén una etiqueta visible y proporciona el significado accesible del conteo.

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

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/tabs-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
