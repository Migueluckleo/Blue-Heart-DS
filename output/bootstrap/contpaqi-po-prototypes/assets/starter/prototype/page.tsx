'use client';

import { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  return <main className="flex min-h-screen flex-col items-start gap-6 p-8">
    <h1>Prototipo BlueHeart</h1>
    <button type="button" onClick={() => setCount(count + 1)}>Probar interacción</button>
    <p aria-live="polite">Interacciones: {count}</p>
  </main>;
}
