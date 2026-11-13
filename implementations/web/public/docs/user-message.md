# User message · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `USER-MESSAGE-001` · API local 0.1.0 · categoría conversación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/user-message.contract.v1.0.0.md#guía-semántica-normativa).

Usa User message para el texto que la persona ya envió. [Conversation Composer](conversation-composer.contract.v1.0.0.md) cubre la redacción. [Conversation Response](conversation-response.contract.v1.0.0.md) presenta la respuesta del agente.

| Situación | Haz | Evita |
|---|---|---|
| Consulta enviada | Muestra el contenido mediante Message dentro del historial. | Reutilizar la burbuja para editar un borrador. |
| Mensaje largo | Deja que la burbuja crezca y respete saltos de línea. | Recortar información necesaria para interpretar la respuesta. |

## Uso sin backend

Burbuja con el mensaje enviado por la persona. Conserva el texto y permite el reflujo en el ancho disponible.

```tsx
import { UserMessage } from '@/index';

export function UserMessageExample() {
  return <div className="max-w-[616px]">
    <UserMessage message={"Muéstrame facturas de personas físicas con IVA retenido en marzo 2025"}/>
  </div>;
}
```

Ejemplo compilado en [examples/user-message.tsx](../../src/examples/user-message.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [user-message.tsx](../../src/components/user-message.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface UserMessageProps {
  message: string;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
UserMessage: {message, className}: UserMessageProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. La burbuja contiene una propiedad de texto. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [user-message.contract.v1.0.0.md](../../../../specs/components/user-message.contract.v1.0.0.md) · SHA-256 `4c93f58bf3caaa4040e10596331e6a53746fbafb378227ce8c3ba06138b49965`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/user-message.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
