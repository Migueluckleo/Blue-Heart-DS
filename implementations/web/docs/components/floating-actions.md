# Floating Actions · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `FLOATING-ACTIONS-001` · API local 0.1.0 · categoría feedback.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/floating-actions.contextual-usage.amendment.v1.0.0.md#guía-semántica-normativa).

**FA-INTENT-01.** Reúne acciones sobre una selección existente. El resumen nombra objetos y cantidad; cada operación afecta exactamente la colección indicada al activar. Las acciones de fila conservan alcance individual. Si solo parte de la selección es elegible, explicar restricción/disponibilidad; no operar silenciosamente sobre un subconjunto mientras el contador presenta otro alcance.

**FA-THRESHOLD-01.** En multiselección de tablas: cero o un registro seleccionado no muestra la barra; desde dos IDs únicos seleccionados sí aparece. No contar casilla de cabecera, Mixed, celdas o filas simplemente coloreadas. Al volver a uno/cero se oculta. La regla pertenece al patrón; no es una nueva variante ni un umbral global para cualquier uso de Floating Actions.

**FA-ANCHOR-01.** Fijar la barra centrada respecto a toda la pantalla, a 32 px de su borde inferior visible, también con Sidebar expandida/contraída y durante scroll. Medir desde la superficie inferior, sin incluir sombra. No centrar solo respecto a Body/tabla. En web el anfitrión la coloca fuera de viewports recortados y ancestros que alteren position fixed; el componente no se posiciona automáticamente.

**FA-SPACE-01.** Reservar desplazamiento inferior: altura real de barra + 32 de anclaje + espacio de lectura. El ejemplo 96+32+32=160 no es altura universal. Todos los controles finales deben quedar alcanzables por encima de la barra. 1024 × 96 es referencia, no ancho máximo de producto. No comprimir texto/padding/hijos para ajustar; priorizar acciones u omitir selector según alcance. No prometer wrap, orientación vertical, móvil o menú de más acciones automático.

### Anatomía y alcance

**FA-SUMMARY-01.** Dot large/neutral muestra cantidad ya seleccionada y Label nombra objetos. El anfitrión calcula ambos. Para dos o más dígitos, Dot usa 8 px laterales, conservando alto large 20/medium 16. Figma usa count-multi con Count; React count lo ajusta incluso con separadores. count-expand conserva Max count independiente; 99+ es ejemplo de límite, no umbral obligatorio. Comunicar cantidad accesiblemente desde el anfitrión/resumen; Dot no recibe foco.

| Región | Regla |
|---|---|
| Seleccionar | Button/text large con CaretDown abre dos comandos fijos; no ejecuta exportación ni navega. |
| Solo esta página | Registros seleccionables de la página activa; cantidad y contexto antes de activar. |
| Todo | Histórico activo según filtros/configuración, incluidas sus demás páginas; no toda la empresa ni otros históricos. |
| General actions | Slot horizontal abierto: insertar, retirar, reemplazar y reordenar controles oficiales; las cuatro acciones originales no fijan cardinalidad. |
| Divider y X | Conservan composición. En este patrón X limpia selección y restaura foco a tabla. |

**FA-SCOPE-01.** Conservar Seleccionar disponible al completar una página: permite cambiar de alcance. Los conteos del menú describen cada comando y no se suman; el de la barra describe lo ya seleccionado. El anfitrión aporta countLabel, context, disabled y onSelect; aplica el cambio y actualiza IDs/conteo. Los números 6/12 del fixture o 50/2,600 de una referencia son ejemplos, no límites ni relación aritmética universal.

**FA-MENU-01.** Selector Figma Menu Closed/Open; filas Default/Hover/Focus/Disabled. Referencia 300 × 153 a 4 px sobre el disparador. Web se ajusta al viewport con popover para evitar recorte desde tabla con overflow. Flechas recorren habilitadas; Inicio/Fin llegan a extremos; Enter/Espacio activa. Escape cierra solo menú y restaura foco a Seleccionar; clic fuera/pérdida de foco cierra sin aplicar alcance. Disabled permanece visible y no se activa. Focus comunica teclado, no hover.

### Foco, ejecución y cierre

**FA-FOCUS-01.** Marcar la segunda fila muestra la barra sin robar foco al Checkbox. Es un grupo de acciones con resumen role=status, no diálogo modal ni focus trap. El anfitrión puede ofrecer Ir a acciones de selección explícito. Conservar teclado de hijos y no recortar/cubrir su anillo.

**FA-CLEAR-01.** La X se nombra Limpiar selección: vacía IDs, oculta barra y lleva foco a control estable de tabla. Esta decisión fue propuesta complementaria y queda adoptada al aprobar el PDF; se limita a este patrón. No ocultar barra dejando 2+ seleccionados sin acceso a sus acciones. Al pasar 2→1, conservar foco en la casilla usada. Si se desmonta un control enfocado, reubicar foco en destino disponible; cerrar menú no limpia selección.

**FA-EXECUTE-01.** Capturar el conjunto al activar, evitar duplicados y mantener contexto durante operación. Button aporta Loading/Disabled cuando corresponde; no hay loading del padre. El clic no confirma éxito. En fallo conservar selección útil y ofrecer recuperación; tras resultado confirmado definir si limpiar o conservar. El componente no incorpora servicio, confirmaciones, Undo o persistencia por sí mismo.

## Uso sin backend

El menú Seleccionar ofrece la página actual y todo el histórico seleccionado. El anfitrión proporciona conteos, contexto, disponibilidad y callbacks. General actions conserva su composición abierta.

```tsx
'use client';

import { DownloadSimpleIcon } from '@phosphor-icons/react/dist/csr/DownloadSimple';
import { useState } from 'react';
import { Button, FloatingActions } from '@/index';

export function FloatingActionsExample() {
  const [count,setCount]=useState(3);
  const [message,setMessage]=useState('');
  const countLabel=count.toLocaleString('es-MX');
  return <div className="my-4 space-y-3">
    <Button id="demo-floating-open" label="Preparar selección" onClick={()=>{setCount(3);setMessage('');}}/>
    {count>0&&<div className="overflow-x-auto">
      <FloatingActions className="w-[1024px]" count={countLabel} label="Elementos seleccionados"
        selection={{
          page:{countLabel:'50 comprobantes',context:'Página 1 de 12'},
          all:{countLabel:'2,600 comprobantes',context:'Todas las páginas'},
          onSelect:scope=>setCount(scope==='page'?50:2600),
        }}
        actions={<>
          <Button variant="text" label="Descargar XML" showLeftIcon leftIcon={{component:DownloadSimpleIcon}}
            onClick={()=>setMessage(`Selección de muestra para XML: ${countLabel} comprobantes.`)}/>
          <Button variant="text" label="Descargar PDF" showLeftIcon leftIcon={{component:DownloadSimpleIcon}}
            onClick={()=>setMessage(`Selección de muestra para PDF: ${countLabel} comprobantes.`)}/>
        </>}
        onDismiss={()=>{setCount(0);document.getElementById('demo-floating-open')?.focus();}}/>
    </div>}
    <p id="demo-floating-result" role="status">{message}</p>
  </div>;
}
```

Ejemplo compilado en [examples/floating-actions.tsx](../../src/examples/floating-actions.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [floating-actions.tsx](../../src/components/floating-actions.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type FloatingSelectionScope = 'page' | 'all';

export interface FloatingSelectionOption {
  countLabel: string;
  context: string;
  disabled?: boolean;
}

export interface FloatingSelectionProps {
  page: FloatingSelectionOption;
  all: FloatingSelectionOption;
  onSelect: (scope: FloatingSelectionScope) => void;
}

export interface FloatingActionsProps {
  count: string;
  label: string;
  actions?: ReactNode;
  selection?: FloatingSelectionProps;
  selectAll?: {label: string; onSelect: () => void};
  onDismiss?: () => void;
  dismissLabel?: string;
  className?: string;
}

```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
FloatingActions: {count,label,actions,selection,selectAll,onDismiss,dismissLabel='Cerrar acciones de selección',
  className}: FloatingActionsProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. General actions admite reemplazar y reordenar controles. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [floating-actions.contract.v1.0.0.md](../../../../specs/components/floating-actions.contract.v1.0.0.md) · SHA-256 `b3505fdb3466e5d8f05031bf7d8c000de02db7a40d2ea4caf365f3c84699afe5`.
- [floating-actions.selection-scope.amendment.v1.0.0.md](../../../../specs/components/floating-actions.selection-scope.amendment.v1.0.0.md) · SHA-256 `f1bd67c88fe3615b351b36b2162eaaa2d576427abfabea9b017ed9bafbd3b900`.
- [floating-actions.contextual-usage.amendment.v1.0.0.md](../../../../specs/components/floating-actions.contextual-usage.amendment.v1.0.0.md) · SHA-256 `83e467d077e3a39994d0ecabb080d60339fcc42dd3ca191bf0c47da42cd410e5`.
- [tables-pagination-selection.amendment.v1.0.0.md](../../../../specs/patterns/tables-pagination-selection.amendment.v1.0.0.md) · SHA-256 `581fa2d5311abea2a85ff738e0beeeb606f73d45689eaa030f0530c0c833c287`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/floating-actions.selection-scope.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
