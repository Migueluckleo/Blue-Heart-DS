# Chat Tool Item · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHAT-TOOL-ITEM-001` · API local 0.1.0 · categoría conversación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/chat-tool-item.contract.v1.0.0.md#guía-semántica-normativa).

Usa la fila para iniciar una acción o expandir una agrupación que el anfitrión controle. Mantén el caret solo si indica una expansión.

## Uso sin backend

Composición y acciones de muestra del panel lateral.

```tsx
import { ChatToolItem } from '@/index';

export function ChatToolItemExample() {
  return <div className="max-w-[232px]"><ChatToolItem label="Nuevo chat" disabled/></div>;
}
```

Ejemplo compilado en [examples/chat-tool-item.tsx](../../src/examples/chat-tool-item.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [chat-sidebar.tsx](../../src/components/chat-sidebar.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface ChatToolItemProps {
  label: string;
  icon?: Icon;
  leading?: ReactNode;
  expanded?: boolean;
  disabled?: boolean;
  onActivate?: () => void;
  extraActions?: ReactNode;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
ChatToolItem: {label, icon: Glyph = NotePencilIcon, leading, expanded, disabled, onActivate, extraActions}: ChatToolItemProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Región de contenido reemplazable. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [chat-tool-item.contract.v1.0.0.md](../../../../specs/components/chat-tool-item.contract.v1.0.0.md) · SHA-256 `369f4c685c50ed56d80c622700cb45861048ca4eea76e1c1fa9fee561ac04163`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/chat-sidebar.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
