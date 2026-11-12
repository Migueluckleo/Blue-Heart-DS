'use client';

import { useState } from 'react';
import { DSNode } from './evidence';

export default function Page() {
  const [count, setCount] = useState(0);
  return <main className="flex min-h-screen flex-col items-start gap-6 p-8">
    <DSNode id="title" component="LOCAL-TITLE" props={{}}><h1>Prototipo BlueHeart</h1></DSNode>
    <DSNode id="action" component="LOCAL-ACTION" props={{}}><button type="button" onClick={() => setCount(count + 1)}>Probar interacción</button></DSNode>
    <DSNode id="feedback" component="LOCAL-FEEDBACK" props={{}}><p aria-live="polite">Interacciones: {count}</p></DSNode>
  </main>;
}
