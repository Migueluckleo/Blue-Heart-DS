# Loader · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `LOADER-001` · API local 0.1.0 · categoría estado.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/loader.usage.amendment.v1.0.1.md#guía-semántica-normativa).

Usa Loader para mostrar que una operación sigue en curso sin porcentaje fiable. Acércalo a la región que espera. Si se actualiza una sección, conserva lo demás disponible. El anfitrión controla su aparición y desaparición. La fuente recomienda evitar parpadeo en esperas breves y acompañar el indicador con texto si la espera supera aproximadamente dos segundos.

| Contexto | Haz | Evita |
|---|---|---|
| Guardado en Button | Conserva el ancho y comunica «Guardando…». Usa la variante Loader indicada por la receta. | Añadir un segundo anuncio para un spinner que ya está dentro de un botón ocupado. |
| Actualización de una lista | Mantén los resultados anteriores cuando sigan siendo útiles y agrega «Actualizando movimientos…» cerca del listado. | Sustituir toda la pantalla cuando solo se actualiza una sección. |
| Importación con avance medible | Usa progreso determinado cuando se conoce el avance, por ejemplo «2 de 8 archivos». | Usar la animación circular para comunicar un porcentaje conocido. |
| Error de carga | Retira el indicador cuando termina la espera y muestra el error y la acción disponible mediante el anfitrión. | Dejar girando el indicador como único mensaje de error o presentar el fin de la animación como éxito. |

**Variantes.** Elige el diámetro entre 16, 20, 24, 40, 64 y 88 px según el espacio y la jerarquía del anfitrión. Usa brand para el tema, neutral o strong en una superficie clara y on-color sobre un fondo de color adecuado. El arco señala actividad y el riel hace visible su recorrido. El Spinner y los sets de fases son internos. La composición es fija y P-SLOTS queda NOT_APPLICABLE.

**Accesibilidad.** El indicador no toma foco. Si Loader proporciona un anuncio independiente, el anfitrión le da un mensaje con nombre de proceso y estado de lectura cortés. Cuando vive dentro de Button ocupado, es decorativo. Comprueba la legibilidad contra el fondo real y respeta movimiento reducido. La animación almacenada no mide fotogramas por segundo.

**Contraste editorial.** Carbon orienta el uso inline junto a la acción y la redacción del mensaje. Atlassian distingue esperas indeterminadas de procesos con avance medible. Sus estados y configuraciones no amplían el API BlueHeart. [Carbon Inline loading](https://www.carbondesignsystem.com/building-blocks/core/components/inline-loading/guidelines) · [Atlassian Spinner](https://atlassian.design/components/spinner/usage) · [Atlassian Progress bar](https://atlassian.design/components/progress-bar/usage)

## Uso sin backend

Indicador indeterminado con tamaños y roles observados.

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

export function LoaderExample() {
  return (
    <div id="loader-example" className="my-4 space-y-4">
      <Loader size="small" label="Cargando archivos…"/>
      <details>
        <summary>Matriz de 24 variantes</summary>
        {loaderSizes.map(size => <div className="my-3 flex flex-wrap items-center gap-4" key={size}>
          <span className="w-28">{size}</span>
          {loaderColors.map(color => <span key={color} className={color === 'on-color' ? 'bg-slate-900 p-2 text-white' : 'p-2'}>
            <Loader size={size} color={color}/>
            <span className="ml-2">{color}</span>
          </span>)}
        </div>)}
      </details>
    </div>
  );
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [loader.tsx](../../src/components/loader.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type LoaderSize = typeof loaderSizes[number];

export type LoaderColor = typeof loaderColors[number];

export interface LoaderProps {
  size?: LoaderSize;
  color?: LoaderColor;
  /** Set when this instance provides the host's status announcement. */
  label?: string;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Loader: {size = 'extra-small', color = 'brand', label, className}: LoaderProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Riel, arco y fases constituyen composición fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [loader.contract.v1.0.0.md](../../../../specs/components/loader.contract.v1.0.0.md) · SHA-256 `b6bc0b64db1ebaefef508c2070add1d0f312d2e5b4cc20960b7d859b6bed0d55`.
- [loader.usage.amendment.v1.0.1.md](../../../../specs/components/loader.usage.amendment.v1.0.1.md) · SHA-256 `ec3dbe238868278bace0c7afe9c2d638f0fd7e2183b565d65bf515f76230192a`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/buttons-loader.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
