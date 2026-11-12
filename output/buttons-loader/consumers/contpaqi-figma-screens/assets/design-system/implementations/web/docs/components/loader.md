# Loader · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `LOADER-001` · API local 0.1.0 · categoría estado.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/loader.contract.v1.0.0.md#guía-semántica-normativa).

Usa Loader para espera de duración indeterminada. Ajusta el tamaño al contenedor y elige brand para la marca del tema, neutral o strong sobre superficies claras y on-color sobre fondo de color. Mantén el contenido anterior si solo se actualiza una parte. El riel da contexto al arco y el arco indica que la operación continúa. La composición es fija; el texto y su posición pertenecen al anfitrión. No recibe foco ni activa acciones.

Haz que una espera prolongada vaya acompañada de «Cargando archivos…». Evita usar el indicador como único mensaje de error o elegir on-color sobre blanco. Procedencia: documentación del nodo fuente Loader y LOADER-001 v1.0.0 capturado.

## Uso sin backend

Indicador indeterminado con tamaños y roles observados.

```tsx
'use client';

import { useState } from 'react';
import { Button, buttonSizes, buttonVariants, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

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

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/buttons-loader.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
