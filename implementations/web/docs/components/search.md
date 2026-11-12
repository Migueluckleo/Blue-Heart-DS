# Search · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `SEARCH-001` · API local 0.1.0 · categoría búsqueda.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/search.contract.v1.0.0.md#guía-semántica-normativa).

Usa Search para localizar o filtrar elementos dentro de un conjunto identificable. Explica qué se puede buscar y conserva el nombre accesible aunque Label se oculte. El anfitrión decide cuándo ejecutar la consulta y cómo presentar resultados, errores y estados vacíos. Mantén el texto introducido por la persona y conserva el foco al limpiar.

| Situación | Haz | Evita |
|---|---|---|
| Catálogo de comprobantes | Usa «Nombre, RFC o folio» para indicar el alcance. | Usar el campo como captura de un dato de negocio. |
| Consulta explícita | Permite enviar con Enter y conserva el texto con acentos o Ñ. | Atribuir al campo un algoritmo o servicio de búsqueda. |
| Consulta escrita | Usa X con el nombre «Limpiar búsqueda» y devuelve el foco al campo. | Dejar un control sin nombre o mover el foco a resultados vacíos. |

El anfitrión controla el tamaño de toque y la región de resultados. El contraste del borde default observado conserva la limitación de la fuente. [Carbon Search](https://www.carbondesignsystem.com/building-blocks/core/components/search/guidelines)

## Uso sin backend

Introduce una consulta, pulsa Enter y usa Limpiar búsqueda para devolver el foco al campo.

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

export function SearchExample() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState('');
  return <div className="my-4 max-w-md space-y-2">
    <Search id="demo-search" label="Buscar comprobantes" showLabel
      placeholder="Nombre, RFC o folio" size="medium" value={value}
      onValueChange={setValue} onSearch={setSubmitted}/>
    <p id="demo-search-status" role="status">{submitted ? `Consulta de muestra: ${submitted}` : 'Escribe una consulta y pulsa Enter.'}</p>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [search.tsx](../../src/components/search.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type SearchSize = 'small' | 'medium' | 'large';

export interface SearchProps {
  id?: string;
  label: string;
  showLabel?: boolean;
  placeholder?: string;
  value: string;
  size?: SearchSize;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Search: {id, label, showLabel = false, placeholder = 'Search', value, size = 'large',
  disabled = false, onValueChange, onSearch}: SearchProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Label, control y X forman una anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [search.contract.v1.0.0.md](../../../../specs/components/search.contract.v1.0.0.md) · SHA-256 `229c8301f0151604052def3951424823588392a5c9165c01352daaa0e39829ed`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/search-breadcrumb-item.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
