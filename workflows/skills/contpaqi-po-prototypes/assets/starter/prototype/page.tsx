'use client';

import { useState } from 'react';
import { Button } from '@contpaqi/ui';

export default function Page() {
  const [count, setCount] = useState(0);
  return <main className="flex min-h-screen flex-col items-start gap-6 p-8">
    <h1>Prototipo BlueHeart</h1>
    <Button label="Probar interacción" onClick={() => setCount(count + 1)}/>
    <p aria-live="polite">Interacciones: {count}</p>
  </main>;
}
