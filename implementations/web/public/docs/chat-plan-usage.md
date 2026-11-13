# Chat Plan Usage · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHAT-PLAN-USAGE-001` · API local 0.1.0 · categoría conversación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/chat-plan-usage.contract.v1.0.0.md#guía-semántica-normativa).

Usa el indicador para explicar uso de un plan. Mantén visibles o accesibles uso y límite. Deja los límites y acciones de cuenta al anfitrión.

## Uso sin backend

Composición y acciones de muestra del panel lateral.

```tsx
import { ChatPlanUsage } from '@/index';

export function ChatPlanUsageExample() {
  return <div className="flex max-w-[320px] items-start gap-4">
    <ChatPlanUsage plan="Pro Plan" used={42} limit={150}/>
    <ChatPlanUsage mode="compact" plan="Pro Plan" used={42} limit={150}/>
  </div>;
}
```

Ejemplo compilado en [examples/chat-plan-usage.tsx](../../src/examples/chat-plan-usage.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [chat-sidebar.tsx](../../src/components/chat-sidebar.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface ChatPlanUsageProps {
  plan: string;
  used: number;
  limit: number;
  mode?: 'expanded' | 'compact';
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
ChatPlanUsage: {plan, used, limit, mode = 'expanded'}: ChatPlanUsageProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. El uso del plan tiene contenido fijo. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [chat-plan-usage.contract.v1.0.0.md](../../../../specs/components/chat-plan-usage.contract.v1.0.0.md) · SHA-256 `810c9bd6e72f46b3c463bead5e04afde3148b81ff4c2267a0b8a4721a4ebf865`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/chat-sidebar.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
