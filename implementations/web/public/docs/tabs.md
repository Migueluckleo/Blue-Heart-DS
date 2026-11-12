# Tabs · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TABS-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/tabs.contract.v1.0.0.md#guía-semántica-normativa).

Usa Tabs para cambiar de vista dentro del mismo contexto. W3C WAI define la asociación de cada tab con su panel y el recorrido por flechas. Carbon propone títulos breves y un orden lógico. Elige presentación según densidad y revisa el ancho con el contenido real. [W3C WAI Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) · [Carbon Tabs](https://www.carbondesignsystem.com/building-blocks/core/components/tabs/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Vistas de igual nivel | Mantén una selección y vincula cada opción a su panel. | Usar el grupo como una lista de acciones. |
| Cambio de cantidad | Inserta o reordena Tab del mismo tipo en el Slot y conserva las identidades. | Fijar cuatro como límite o inferir otro panel por posición. |
| Recorrido con teclado | Permite recorrer las opciones habilitadas y activar el panel elegido. | Cambiar panel solo al mover foco en activación manual. |

## Uso sin backend

Mantén selección controlada e IDs estables. Flechas mueven foco y Enter o Espacio cambia el panel.

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

export function TabsExample() {
  const [selected, setSelected] = useState('invoices');
  return <div className="my-4">
    <Tabs label="Tipos de comprobante" selectedId={selected} onSelectionChange={setSelected}
      items={[
        {id:'invoices',label:'Facturas',panel:<p className="pt-3">Facturas del periodo seleccionado.</p>},
        {id:'payments',label:'Pagos',disabled:true,panel:<p className="pt-3">Los pagos no están disponibles.</p>},
        {id:'credit-notes',label:'Notas de crédito',panel:<p className="pt-3">Notas de crédito registradas.</p>},
        {id:'complements',label:'Complementos',panel:<p className="pt-3">Complementos del periodo.</p>},
      ]}/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [tabs.tsx](../../src/components/tabs.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface TabsItem {
  id: string;
  label: string;
  accessibleLabel?: string;
  icon?: TabProps['icon'];
  badgeCount?: string;
  disabled?: boolean;
  panel: ReactNode;
}

export interface TabsProps {
  label: string;
  items: readonly TabsItem[];
  selectedId: string;
  onSelectionChange: (id: string) => void;
  type?: TabType;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Tabs: {label, items, selectedId, onSelectionChange, type = 'underline', className}: TabsProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Tabs admite inserción, retirada y reordenamiento de instancias Tab. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [tabs.contract.v1.0.0.md](../../../../specs/components/tabs.contract.v1.0.0.md) · SHA-256 `ffa4637ae231721e77ab9be88d4c3c0c951c6c978e9d2c546ca67f12bcb0e446`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/tabs-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
