# Buttons · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `BUTTON-001` · API local 0.1.0 · categoría acción.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/buttons.contract.v1.0.0.md#guía-semántica-normativa).

Usa primary para una única acción principal por vista o diálogo. Secondary acompaña una acción alternativa; text reduce jerarquía para una acción terciaria; link navega; danger reserva acciones destructivas que el anfitrión debe confirmar con objeto y consecuencia. Evita dos acciones primary que compitan. Mantén un tamaño coherente en el grupo.

El contenedor aporta el área de interacción y el foco, Label identifica el resultado, los iconos son opcionales y Loader indica actividad en curso. Usa un verbo en infinitivo y un objeto cuando aclare, con hasta tres palabras según la guía fuente. Para cargar, usa gerundio y elipsis. La posición de las acciones y el área táctil son responsabilidad de la pantalla.

Haz «Guardar cambios» como primary, con una alternativa secondary como «Cancelar». Evita activar dos veces la misma acción mientras aparece «Guardando…». Usa link con una URL cuando el propósito sea navegar. Procedencia: descripción vigente de los cinco sets y reglas REQ-USAGE, REQ-CONTENT, REQ-LOADING y REQ-ACCESSIBILITY de BUTTON-001 v4.0.1 capturado.

## Uso sin backend

Activa una acción local y usa Terminar demo para salir de loading.

```tsx
'use client';

import { useState } from 'react';
import { Button, buttonSizes, buttonVariants, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

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

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/buttons-loader.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
