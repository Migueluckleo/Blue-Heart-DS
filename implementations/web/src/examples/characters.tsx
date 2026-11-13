'use client';

import { useState } from 'react';
import { Button, Characters } from '../index';

// example: characters
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
