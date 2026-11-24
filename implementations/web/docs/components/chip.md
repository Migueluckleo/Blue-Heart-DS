# Chip · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHIP-001` · API local 0.1.0 · categoría selection.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/chip.contextual-usage.amendment.v1.0.1.md#guía-semántica-normativa).

### Intención, modo y alternativas

**CHIP-INTENT-01.** Usa Chip para elegir opciones o quitar filtros aplicados. El anfitrión —pantalla o flujo— define valores, agrupación, alcance, combinación de filtros, disponibilidad, aplicación, persistencia y foco. Chip no implementa motor de búsqueda/filtrado ni demuestra resultados de negocio por aparecer seleccionado.

**CHIP-INTENT-02.** Usa Badge para un atributo/estado de solo lectura; Button o enlace para Guardar, Enviar o navegar. Un catálogo extenso puede requerir Dropdown; una decisión de formulario puede entenderse mejor con Radio/Checkbox visibles. Elige por intención, no por forma compacta ni por espacio sobrante.

| Modo web existente | Intención y semántica | Evita |
|---|---|---|
| single | Una opción activa en un conjunto excluyente, con radios agrupados. | Botones independientes que permitan valores incompatibles o apagar la única elección. |
| multiple | Opciones combinables, cada botón con aria-pressed y nombre estable. | Borrar otras selecciones al elegir una. |
| removable | Resumir un filtro aplicado; la X lo quita de la colección. | Convertir Label en otra selección o confundir remoción con borrar registros. |

**CHIP-MODE-01.** Un modo y un tamaño por grupo. No mezcles selección y remoción en la misma agrupación. La unión de props web es excluyente: removable no admite selected. Los cuatro booleanos de opcionales de Figma no crean cuatro modos nuevos ni prueban que selección y X deban mezclarse.

### Single · una alternativa vigente

**CHIP-SINGLE-01.** Agrupa con nombre accesible que explique la decisión, como Estado de comprobantes. Usa el mismo `name`, valores únicos y estables y una sola opción activa. La convención local conserva una selección vigente: carga el dato existente o un default justificado. Todos puede expresar ausencia de restricción solo si es una alternativa real; no inventes un valor para ocultar una decisión pendiente.

**CHIP-SINGLE-02.** Elegir otra reemplaza la anterior; pulsar la actual no la apaga. Tab entra y sale del grupo y normalmente llega al radio seleccionado; flechas mueven foco y selección entre habilitados y omiten disabled; Espacio elige la enfocada. El aspecto selected de Figma no acredita exclusividad automática. Este patrón no describe el caso especial de radios dentro de toolbar.

**CHIP-SINGLE-03.** Explica si el cambio actualiza la vista al momento o requiere Aplicar. Seleccionar no envía/guarda todo el formulario ni debe provocar navegación inesperada. No lo confundas con recorrer candidatos de Dropdown sin confirmar.

### Multiple · selecciones independientes

**CHIP-MULTIPLE-01.** Mantén etiquetas estables como Ingresos y Egresos. Cada botón conserva su estado y anuncia `aria-pressed`; no cambies el nombre a Quitar ingresos según su selección. Estos toggles independientes son botones de selección, no instancias del componente visual Toggle.

**CHIP-MULTIPLE-02.** El anfitrión explica qué resultados cambia el grupo y cómo combina los filtros; Chip no decide unión, intersección u otra regla de negocio. Define si cero elegidos significa mostrar todo o no incluir categorías. Si se requiere una respuesta, valida el conjunto explícitamente, sin inferir obligatoriedad de una muestra.

**CHIP-MULTIPLE-03.** Tab recorre botones habilitados; Enter/Espacio alternan cada uno. Compón limpiar cuando el contexto lo requiera y explica momento de aplicación, resultados, espera o fallo sin borrar otras selecciones útiles. No agregues error/loading al componente.

### Removable · filtros ya aplicados

**CHIP-REMOVE-01.** El Label nombra una restricción, por ejemplo Periodo: este mes. Solo la X ejecuta su remoción; su nombre accesible es Quitar filtro seguido del Label. Los iconos acompañantes no son acciones separadas y el cuerpo del chip no es otro control de selección. Quitar el filtro no elimina comprobantes ni otros registros.

**CHIP-REMOVE-FOCUS-01.** Al quitar el chip con foco, el anfitrión dirige el foco al siguiente filtro disponible o al control para agregar/restaurar filtros según el orden del flujo; no lo pierdas en el documento. Al quitar el último comunica el estado sin restricciones y conserva el acceso para agregar de nuevo, sin chip ficticio seleccionado. `removeRef` facilita esta responsabilidad, pero no implementa la política automáticamente.

**CHIP-REMOVE-02.** Tab llega a X; Enter o Espacio la activan. Disabled impide quitar y el anfitrión explica el motivo cuando corresponda. La API no incorpora Undo, confirmación o persistencia remota; feedback y recuperación se componen desde la pantalla con cobertura apropiada.

### Tamaños y área de activación

| Regla | Tamaño y altura | Contexto apropiado | Evita |
|---|---|---|---|
| CHIP-SIZE-01 | large · 48 px | Baja densidad o tarea focal con espacio para objetivo mayor. | Asignar mayor importancia de negocio por tamaño. |
| CHIP-SIZE-02 | medium · 40 px | Default web y punto de partida de escritorio, con controles de escala equivalente. | Afirmar que ya cubre 44 px táctiles. |
| CHIP-SIZE-03 | small · 32 px | Filtros compactos en escritorio denso, legibles y fáciles de operar. | Reducir para ocultar texto largo. |
| CHIP-SIZE-04 | extra-small · 24 px | Contextos muy compactos con densidad justificada y objetivo medido. | Usarlo sin comprobar comodidad y separación. |

**CHIP-SIZE-05.** Mantén escala coherente por grupo; normaliza “middle” a medium. Las alturas no incluyen anillo ni ampliación táctil. Los tamaños menores de 44 px necesitan cobertura local 44 × 44 px desde el anfitrión sin escalar el control ni solapar objetivos. En removable mide X como objetivo independiente: la altura 48 del chip no demuestra el ancho activable de X. No se certifica accesibilidad global por estas medidas.

### Selected, estados y Focus

**CHIP-STATE-01.** Selected conserva una elección; hover/pressed/focus son interacción momentánea, no valores nuevos. Dos valores × cinco estados × cuatro tamaños = 40 variantes, particionadas en cuatro sets de diez. No crear variantes por Label, Count, iconos o visibilidad.

| Estado | Uso correcto | Evita |
|---|---|---|
| default | Disponible con el selected real. | Atribuir filtrado, guardado o validación concluidos. |
| hover | Exploración con puntero. | Dar foco, elegir o eliminar solo al pasar. |
| pressed | Activación durante la presión. | Usarlo como selección persistente. |
| focus | Localizar la siguiente operación del teclado. | Confundir anillo con selected o crear foco propio de Badge por analogía. |
| disabled | Impedir selección/remoción conservando el valor almacenado. | Limpiar el valor o asumir que todos los datos dejaron de aplicar. |

**CHIP-FOCUS-01.** El anillo usa `:focus-visible` o foco visible de sus controles internos. El navegador gestiona su heurística: distingue foco DOM del anillo; un clic no exige simular llegada con Tab. Badge no tiene Focus ni estados interactivos. Chip mantiene halo adaptable, trazo 2 px y separación visible 2 px; no lo recortes tras cambiar Label, Counter o iconos. Hover no enfoca.

**CHIP-DISABLED-01.** Disabled conserva selected aunque comparta apariencia inactiva; no activa ni quita y se omite en teclado. Explica cerca la causa si la persona necesita saberla. No hay error, success o loading propios: espera de consulta, Sin resultados, reintento y anuncios pertenecen al flujo, no a variantes inventadas.

### Counter con alcance explícito

**CHIP-COUNTER-01.** Counter complementa Label, no lo sustituye. El anfitrión aporta y actualiza un texto cuyo alcance se entiende: coincidencias, elementos seleccionados u otro conjunto. No mezcles universos sin explicarlo. Counter no calcula, filtra ni valida números.

**CHIP-COUNTER-02.** Conserva `0` visible cuando sea el dato real; no lo ocultes mediante una condición de valor falsy ni deshabilites automáticamente el chip por cero. Si se desconoce o se está obteniendo, no inventes cero ni lo presentes como resultado confirmado: puede omitirse Counter y componer feedback externo. El anfitrión define disponibilidad.

**CHIP-COUNTER-03.** `99+` es un ejemplo de abreviación editorial a cargo del anfitrión, no un límite ni algoritmo. Mantén criterio consistente y acceso comprensible al alcance cuando haga falta. Figma tiene Counter TEXT y Show counter; web usa `counter?: string`, undefined lo oculta y “0” lo muestra. El contador se asocia como descripción mediante aria-describedby sin cambiar el nombre estable; no anuncia actualizaciones live automáticamente.

### Iconos, Remove y opcionales

**CHIP-ICON-01.** Orden fijo: Left icon, Label, Counter, Right icon y Remove. Propón izquierda para identificar categoría o periodo; derecha solo con señal secundaria clara. Los acompañantes son decorativos y no acciones independientes. Si no aportan significado, ocúltalos. Evita duplicar la señal a ambos lados o sugerir apertura de menú no implementada.

**CHIP-ICON-02.** Left/Right swaps usan PlusCircle Outline/Light por defecto; Remove usa X Outline/Light oficial. El API fija Light; tamaños y roles siguen la receta y el Label, también en selected. Counter conserva su propio rol. No conviertas Right icon en X ni la X de Remove en un swap decorativo. El placeholder PlusCircle no implementa una acción Agregar por sí solo.

**CHIP-OPTIONALS-01.** Figma expone cuatro flags independientes Show left icon / Show right icon / Show counter / Show remove, false por defecto, y valores de muestra Label=Label y Counter=12. Selected=false y state=default en cada set, que fija su size. Las 16 combinaciones de opcionales no crean variantes adicionales. Esos defaults son de muestrario, no datos ni reglas de producto.

**CHIP-OPTIONALS-02.** En web pasar `leftIcon/rightIcon` activa su visibilidad por defecto, salvo flag explícito. Sin icono personalizado, showLeftIcon/showRightIcon son false. Counter depende de la presencia de `counter`; no hay `showCounter`. Remove corresponde a `mode=removable`; no hay `showRemove` ni selected en ese modo. La matriz visual de Figma no demuestra que selección y remoción deban mezclarse en un grupo.

### Longitud, agrupación y temas

**CHIP-LAYOUT-01.** Label breve, específico y en sentence case, normalmente 1–3 palabras. Ancho HUG con una línea, sin truncamiento ni máximo de caracteres o ancho inventado. Revisa redacción o el patrón si no cabe; no recortes la parte distintiva ni comprimas tipografía. Dos chips con igual Label pueden diferir 2 px por el borde según el estado: no alteres tokens/padding para igualarlos.

**CHIP-LAYOUT-02.** El anfitrión organiza wrap o desplazamiento horizontal cuando corresponda, con orden, descubrimiento y acceso de teclado. El átomo no decide responsive del grupo ni garantiza adaptación a un host menor que su contenido. No dejes elementos inaccesibles fuera del viewport ni impongas una cantidad universal desde una muestra.

**CHIP-THEME-01.** Todos los roles son invariantes en los cuatro temas. Selected usa neutros inversos, no éxito ni color de marca. Label, glyphs y Remove comparten el rol pertinente; Counter conserva sus roles propios. Se anuncia selected con radios/aria-pressed; no atribuyas a la apariencia una señal no cromática no demostrada. La excepción de contraste de Badge warning no aplica a Chip. Los valores/aliases siguen en el JSON delegado; no se certifica accesibilidad global sobre cualquier superficie.

### Mapeo de propiedades y composición

| Modo / dimensión | Propiedades públicas y responsabilidad |
|---|---|
| Contenido y escala | label obligatorio; size=medium por defecto en web; cuatro tamaños reales. |
| single | name, value, selected, onSelect; agrupación y única selección controladas por anfitrión. |
| multiple | selected, onSelectedChange(boolean); estado independiente con aria-pressed. |
| removable | onRemove, removeRef?; colección y foco del anfitrión, sin selected. |
| Counter | counter?: string; sin cálculo, formato ni máximo automáticos. |
| Iconos | leftIcon/rightIcon; showLeftIcon/showRightIcon; Light fijo de la receta. |
| Disponibilidad y descripción | disabled=false; describedBy adicional, combinado con Counter cuando existe. |
| Anfitrión | className compone sin fabricar variantes ni sustituir tokens internos. |

P-SLOTS NOT_APPLICABLE: anatomía fija con texto/booleanos/swaps acotados. No hay Chip group público ni Slot arbitrario por estas muestras. Reglas de negocio, búsqueda, consulta, combinación y persistencia se componen fuera del componente.

## Uso sin backend

El ejemplo conserva una moneda activa, combina estados independientes y permite retirar filtros con foco restaurado. Para abrir secciones hermanas con panel propio usa Tabs; la forma Pill/Segmented no cambia esa decisión.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem, UserMessage, type ChatSidebarProps, Pagination, PaginationItem, Tabs, TextArea, DropdownField, FloatingActions, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function ChipExample() {
  const [currency, setCurrency] = useState('MXN');
  const [pending, setPending] = useState(false);
  const [reviewed, setReviewed] = useState(true);
  const [applied, setApplied] = useState(['Este mes', 'Sucursal Mérida']);
  const reset = useRef<HTMLButtonElement>(null);
  const removeButtons = useRef(new Map<string, HTMLButtonElement>());
  const nextFocus = useRef<string | null>(null);
  useEffect(() => {
    if (nextFocus.current === null) return;
    const next = removeButtons.current.get(nextFocus.current) ?? reset.current;
    next?.focus();
    nextFocus.current = null;
  }, [applied]);
  function remove(index: number) {
    nextFocus.current = applied[index + 1] ?? applied[index - 1] ?? '';
    setApplied(applied.filter((_, current) => current !== index));
  }
  return <div className="grid gap-5">
    <fieldset className="min-w-0">
      <legend>Moneda del comprobante</legend>
      <div className="mt-2 flex flex-wrap gap-3">
        {['MXN','USD'].map(value=><Chip key={value} mode="single" size="large" name="chip-example-currency"
          label={value} value={value} selected={currency===value} onSelect={()=>setCurrency(value)}/>)}
      </div>
    </fieldset>
    <div role="group" aria-label="Estados de comprobantes" className="flex flex-wrap gap-3">
      <Chip mode="multiple" label="Pendiente" counter="0" showLeftIcon selected={pending} onSelectedChange={setPending}/>
      <Chip mode="multiple" label="Revisado" counter="12" showRightIcon selected={reviewed} onSelectedChange={setReviewed}/>
      <Chip mode="multiple" label="Archivado" selected={false} disabled onSelectedChange={()=>{}}/>
    </div>
    <div role="group" aria-label="Filtros aplicados" className="flex flex-wrap items-center gap-3">
      {applied.map((label,index)=><Chip key={label} mode="removable" size="small" label={label} onRemove={()=>remove(index)}
        removeRef={node=>{if(node)removeButtons.current.set(label,node);else removeButtons.current.delete(label);}}/>)}
      <button type="button" ref={reset} className="underline" onClick={()=>setApplied(['Este mes','Sucursal Mérida'])}>Restaurar filtros</button>
    </div>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [chip.tsx](../../src/components/chip.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type ChipSize = 'large' | 'medium' | 'small' | 'extra-small';

export type ChipMode =
  | { mode: 'single'; name: string; value: string; selected: boolean; onSelect: () => void }
  | { mode: 'multiple'; selected: boolean; onSelectedChange: (selected: boolean) => void }
  | { mode: 'removable'; onRemove: () => void; removeRef?: Ref<HTMLButtonElement> };

export type ChipProps = ChipMode & {
  label: string;
  size?: ChipSize;
  counter?: string;
  leftIcon?: Icon;
  rightIcon?: Icon;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  disabled?: boolean;
  describedBy?: string;
  className?: string;
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Chip: props: ChipProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Texto, visibilidad y swaps de glyph cubren la anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [chip.contract.v1.0.0.md](../../../../specs/components/chip.contract.v1.0.0.md) · SHA-256 `10c3a4dbf70aa981dc8e8596a467d263183b3e84ecf32f47695cc3d29206c7f4`.
- [chip.contextual-usage.amendment.v1.0.1.md](../../../../specs/components/chip.contextual-usage.amendment.v1.0.1.md) · SHA-256 `56d5970845b06e04e19c0688fc2ba594d4b8bc46085f9f83d67db13cad28757f`.
- [badges-chips.status-filters.amendment.v1.0.0.md](../../../../specs/patterns/badges-chips.status-filters.amendment.v1.0.0.md) · SHA-256 `d730fa5d62f171469afaf7315f01b36d13a1bd8901e95c333080e76b042aa119`.
- [tabs.local-navigation.amendment.v1.0.0.md](../../../../specs/patterns/tabs.local-navigation.amendment.v1.0.0.md) · SHA-256 `b297a1444e4ffcb17456d8ebcbba6bcb58b8349dad25038010b852b724ab39c0`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/chip.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
