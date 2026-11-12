# Badge · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `BADGE-001` · API local 0.1.0 · categoría estado.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/badge.contract.v1.0.0.md#guía-semántica-normativa).

Usa Badge como etiqueta de estado o atributo. Mantén una palabra o frase que comunique el significado sin depender del color. Usa success para un resultado confirmado, warning para atención, error para fallo, info para contexto o avance, y subtle o neutral para metadatos. Conserva el mismo tamaño en una lista o tabla.

| Situación | Haz | Evita |
|---|---|---|
| Moneda de un importe | Usa subtle/small con «MXN» o «USD» según el anfitrión. | Usar Badge como control para cambiar moneda. |
| Resultado | Muestra «Conciliado» o «Requiere revisión» y usa un icono decorativo si ayuda. | Apilar estados o comunicar el resultado solo por color. |
| Espacio insuficiente | Usa una etiqueta breve o un patrón que admita explicación. | Truncar Badge o convertir el icono derecho en un cierre. |

El anfitrión aporta contexto y anuncios al cambiar un estado. Warning conserva la excepción de contraste del contrato fuente. [Carbon Read-only tag](https://www.carbondesignsystem.com/building-blocks/core/components/tag/guidelines) · [Atlassian Lozenge](https://atlassian.design/components/lozenge/usage)

## Uso sin backend

Compara una moneda, un estado confirmado y una advertencia. Los iconos son decorativos.

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

export function BadgeExample() {
  return <div className="my-4 flex flex-wrap items-center gap-4" id="demo-badge">
    <Badge label="MXN"/>
    <Badge label="Conciliado" type="success" size="medium"
      showLeftIcon leftIcon={CheckCircleIcon} leftWeight="light"/>
    <Badge label="Requiere revisión" type="warning" size="large"/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [badge.tsx](../../src/components/badge.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type BadgeType = 'neutral' | 'subtle' | 'info' | 'success' | 'warning' | 'error';

export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps {
  label?: string;
  type?: BadgeType;
  size?: BadgeSize;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: Icon;
  rightIcon?: Icon;
  leftWeight?: IconWeight;
  rightWeight?: IconWeight;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Badge: {label = 'Label', type = 'subtle', size = 'small',
  showLeftIcon = false, showRightIcon = false, leftIcon: Left = PresentationIcon,
  rightIcon: Right = PresentationIcon, leftWeight = 'fill', rightWeight = 'fill'}: BadgeProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. El texto y ambos iconos forman una anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [badge.contract.v1.0.0.md](../../../../specs/components/badge.contract.v1.0.0.md) · SHA-256 `98e904066c0387b88dfc1db6679d4b35fc6665a1da266dde8dbac7c8c81a0213`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/badge.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
