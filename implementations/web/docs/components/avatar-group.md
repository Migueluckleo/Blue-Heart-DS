# Avatar group · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `AVATAR-GROUP-001` · API local 0.1.0 · categoría identidad.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/avatar-group.contract.v1.0.0.md#guía-semántica-normativa).

Usa Avatar group para representar varias identidades asociadas al mismo trabajo. Muestra dos a cuatro identidades. Cuando haya más de cuatro, muestra tres y el contador +N, donde N es el total menos tres. El anfitrión proporciona los nombres accesibles y decide cómo mostrar la lista completa cuando haga falta.

| Situación | Haz | Evita |
|---|---|---|
| Dos a cuatro participantes | Usa el mismo tamaño y conserva el orden del anfitrión. | Mezclar tamaños o añadir indicadores de presencia. |
| Siete participantes | Muestra tres y «+4», con «y 4 más» como texto accesible. | Tratar el +4 de muestra como una constante. |
| Una identidad | Usa Avatar individual. | Mantener un grupo vacío o de un solo hijo. |

La edición en Figma es manual. Los colores alternos distinguen representaciones y conservan la excepción de contraste del contrato fuente. [Atlassian Avatar group](https://atlassian.design/components/avatar-group/examples)

## Uso sin backend

Siete identidades producen tres representaciones y el contador +4.

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

export function AvatarGroupExample() {
  return <div className="my-4">
    <AvatarGroup label="Participantes de muestra" people={[
      {id:'1',name:'Julia Ávila',initials:'JÁ'},
      {id:'2',name:'María Álvarez',initials:'MÁ'},
      {id:'3',name:'Karla Martínez',initials:'KM'},
      {id:'4',name:'Hugo Lara',initials:'HL'},
      {id:'5',name:'Sofía Ortega',initials:'SO'},
      {id:'6',name:'Diego Peña',initials:'DP'},
      {id:'7',name:'Andrea Núñez',initials:'AN'},
    ]}/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [avatar-group.tsx](../../src/components/avatar-group.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type AvatarGroupPerson = Omit<AvatarProps,'size'|'presence'|'decorative'|'name'> & {
  id: string;
  name: string;
};

export interface AvatarGroupProps {
  label: string;
  size?: AvatarSize;
  people: readonly [AvatarGroupPerson,AvatarGroupPerson,...AvatarGroupPerson[]];
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
AvatarGroup: {label, size = 'extra-large', people}: AvatarGroupProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Avatars es un Slot nativo de 2 a 4 instancias. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [avatar-group.contract.v1.0.0.md](../../../../specs/components/avatar-group.contract.v1.0.0.md) · SHA-256 `43a8a2744c029bdb9b8044c6f78f5d9dda205076ea0d1e57bd3dc71c7dbf62a2`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/avatar.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
