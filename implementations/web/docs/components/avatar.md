# Avatar · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `AVATAR-001` · API local 0.1.0 · categoría identidad.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/avatar.contract.v1.0.0.md#guía-semántica-normativa).

Representa una persona o entidad. Usa foto disponible, iniciales de un nombre fiable o el icono cuando no haya representación fiable. Conserva acentos y Ñ en las iniciales. El anfitrión suministra el nombre completo y decide si el Avatar es decorativo cuando el nombre ya está visible. Muestra presencia solo si aporta información al contexto, con un texto accesible.

| Situación | Haz | Evita |
|---|---|---|
| Cuenta de una persona | Usa foto autorizada o iniciales del nombre. | Derivar iniciales de identificadores fiscales. |
| Presencia relevante | Comunica «Disponible», «Ocupado» o «Inactivo» con un nombre accesible. | Depender solo del color o mostrar presencia en listados donde no aplica. |
| Nombre visible junto al avatar | Marca la representación como decorativa si el texto ya comunica su identidad. | Duplicar el anuncio del mismo nombre. |

La representación no añade navegación. El anfitrión aporta foco y área de toque cuando el avatar forma parte de un control. [Atlassian Avatar](https://atlassian.design/components/avatar)

## Uso sin backend

Compara fotografía local, iniciales y glyph. La variante de fotografía nativa queda pendiente de autorización de transferencia.

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

export function AvatarExample() {
  return <div className="my-4 flex items-center gap-4">
    <Avatar name="Cuenta de muestra" imageSrc="/assets/avatar-portrait.png" initials="JA" presence="active"/>
    <Avatar name="Julia Ávila" initials="JÁ" size="large" presence="busy"/>
    <Avatar name="Cuenta de trabajo" size="medium"/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [avatar.tsx](../../src/components/avatar.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type AvatarSize = 'extra-large' | 'large' | 'medium' | 'small';

export type AvatarPresence = 'active' | 'busy' | 'inactive';

export interface AvatarProps {
  name?: string;
  initials?: string;
  imageSrc?: string;
  size?: AvatarSize;
  icon?: Icon;
  presence?: AvatarPresence;
  decorative?: boolean;
}

const presenceText: Record<AvatarPresence,string> = {active:'Disponible',busy:'Ocupado',inactive:'Inactivo'};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Avatar: {name, initials, imageSrc, size = 'extra-large', icon: Glyph = UserIcon,
  presence, decorative = false}: AvatarProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Composición fija y propiedades acotadas. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [avatar.contract.v1.0.0.md](../../../../specs/components/avatar.contract.v1.0.0.md) · SHA-256 `70f70507b073c37ca689301ed3617e0f01248affc4e5a65c462537eb1840a11a`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/avatar.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
