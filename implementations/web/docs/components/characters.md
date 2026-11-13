# Characters · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHARACTERS-001` · API local 0.1.0 · categoría identidad.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/characters.contract.v1.0.0.md#guía-semántica-normativa).

| Situación | Haz | Evita |
| --- | --- | --- |
| Asistente en espera | Usa BENI Standby como acompañamiento. | Atribuir progreso o confirmación al parpadeo. |
| Tarea de análisis en curso | Usa NAVI Analysis junto a un estado textual que aporta el anfitrión. | Comunicar el estado solo con el personaje. |
| Movimiento reducido o escena estática | Usa una pose fija. Permite detener el bucle cuando se active. | Forzar reproducción continua. |

La fase identifica una pose del ciclo. El anfitrión controla el estado real, el texto accesible y el comienzo o fin de la tarea. En web, el personaje es decorativo de forma predeterminada. Si transmite información adicional, usa un nombre accesible.

## Uso sin backend

BENI Standby y NAVI Analysis reproducen los ciclos observados. El anfitrión controla la reproducción. La selección de fase y la preferencia de movimiento reducido permiten mostrar una pose fija.

```tsx
'use client';

import { useState } from 'react';
import { Button, Characters } from '@/index';

export function CharactersExample() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="my-4 grid gap-4">
      <div className="flex flex-wrap items-end gap-6">
        <figure className="grid justify-items-center gap-2">
          <Characters character="beni" playing={playing} width={118}/>
          <figcaption>BENI Standby</figcaption>
        </figure>
        <figure className="grid justify-items-center gap-2">
          <Characters character="navi" playing={playing} width={118}/>
          <figcaption>NAVI Analysis</figcaption>
        </figure>
      </div>
      <div>
        <Button size="small" variant="secondary"
          label={playing ? 'Detener animaciones' : 'Reproducir animaciones'}
          onClick={() => setPlaying(value => !value)}/>
      </div>
      <details>
        <summary>Poses de Characters</summary>
        <div className="my-3 flex flex-wrap gap-2">
          {(['01', '02', '03', '04', '05', '06'] as const).map(frame => (
            <Characters key={frame} character="beni" frame={frame} width={58} label={`BENI, fase ${frame}`}/>
          ))}
        </div>
        <div className="my-3 flex flex-wrap gap-2">
          {(['01', '02', '03', '04', '05', '06', '07'] as const).map(frame => (
            <Characters key={frame} character="navi" frame={frame} width={58} label={`NAVI, fase ${frame}`}/>
          ))}
        </div>
      </details>
    </div>
  );
}
```

Ejemplo compilado en [examples/characters.tsx](../../src/examples/characters.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [characters.tsx](../../src/components/characters.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type CharacterFrame = '01' | '02' | '03' | '04' | '05' | '06' | '07';

export type CharactersProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'viewBox'> & {
  /** Opt in to the source loop. Reduced motion keeps the selected pose. */
  playing?: boolean;
  /** The illustration is decorative when no label is provided. */
  label?: string;
} & (
  | { character: 'beni'; frame?: Exclude<CharacterFrame, '07'> }
  | { character: 'navi'; frame?: CharacterFrame }
);

interface Layer {
  id: string;
  d: string;
  transform: number[];
  rule: 'evenodd' | 'nonzero';
  opacity: number;
  token: string;
}

const characters = artwork.characters as Record<CharactersProps['character'], {
  frames: Partial<Record<CharacterFrame, Record<string, Layer>>>;
  order: string[];
}>;
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Characters: {
  character, frame = '01', playing = false, label, className,
  width = artwork.width, height, ...props
}: CharactersProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Anatomía vectorial fija de identidad. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [characters.contract.v1.0.0.md](../../../../specs/components/characters.contract.v1.0.0.md) · SHA-256 `1c77b3bf880ee220ddfc6d548c091b762c6937bbd7d78c62849b7bb7ff90e8f9`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/characters.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
