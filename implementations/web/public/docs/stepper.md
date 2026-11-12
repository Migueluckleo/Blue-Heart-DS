# Stepper · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `STEPPER-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/stepper.contract.v1.0.0.md#guía-semántica-normativa).

Usa Stepper para orientar a la persona en una secuencia estable de varias etapas. El paso actual se identifica con `aria-current="step"` en la lista ordenada. Los estados completado y pendiente se comunican también como texto accesible. La fuente carece de reacciones en el maestro y en el ejemplo. El anfitrión decide validación, navegación, controles Anterior y Continuar y foco al cambiar de paso. La orientación responde al espacio de la interfaz. [USWDS Step indicator](https://designsystem.digital.gov/components/step-indicator/) · [W3C WAI Multi-page Forms](https://www.w3.org/WAI/tutorials/forms/multi-page/)

| Situación | Haz | Evita |
|---|---|---|
| Configurar una empresa | Nombra cada etapa por su objetivo e identifica un paso actual. | Reutilizar las etiquetas como destinos de navegación global. |
| Importar movimientos | Cambia el paso después de validar y conserva el avance en el anfitrión. | Marcar un paso completado por el mero clic en la etiqueta. |
| Vista estrecha | Usa la orientación vertical para mantener los títulos legibles. | Cortar los títulos o usar el color como única señal del avance. |
| Ayuda complementaria | Coloca la información imprescindible en el título o en el contenido principal. | Delegar instrucciones críticas al caption de contraste reducido. |

## Uso sin backend

Progreso orientativo de un registro de empresa. Los controles del anfitrión cambian el paso y mueven el foco al título.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Pagination, PaginationItem, Tabs, TextArea, DropdownField, FloatingActions, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function StepperExample() {
  const steps = [
    {id:'company',title:'Datos de la empresa',caption:'Identificación'},
    {id:'tax',title:'Datos fiscales',caption:'Configuración'},
    {id:'access',title:'Accesos',caption:'Personas'},
    {id:'review',title:'Revisión',caption:'Confirmación'},
  ];
  const [current,setCurrent] = useState(1);
  const [orientation,setOrientation] = useState<StepperOrientation>('horizontal');
  const heading = useRef<HTMLHeadingElement>(null);
  const changedStep = useRef(false);
  useEffect(()=>{
    if (changedStep.current) heading.current?.focus();
  },[current]);
  const go = (index: number) => {
    changedStep.current = true;
    setCurrent(index);
  };
  return <div className="grid gap-4">
    <label className="flex items-center gap-2">Orientación del progreso
      <select value={orientation} onChange={event=>setOrientation(event.target.value as StepperOrientation)}>
        <option value="horizontal">Horizontal</option>
        <option value="vertical">Vertical</option>
      </select>
    </label>
    <Stepper label="Progreso del registro de empresa" steps={steps} currentStep={steps[current].id} orientation={orientation}/>
    <h3 ref={heading} tabIndex={-1}>{steps[current].title}</h3>
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" size="small" label="Volver al paso anterior" disabled={current===0} onClick={()=>go(current-1)}/>
      <Button size="small" label="Continuar registro" disabled={current===steps.length-1} onClick={()=>go(current+1)}/>
    </div>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [stepper.tsx](../../src/components/stepper.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type StepperOrientation = 'horizontal' | 'vertical';

export type StepperState = 'checked' | 'default' | 'inactive';

export type StepperPosition = 'start' | 'middle' | 'end';

export interface StepperStep {
  id: string;
  title: string;
  caption?: string;
  stepLabel?: string;
  completedIcon?: Icon;
}

export interface StepperItemProps extends Omit<StepperStep, 'id'> {
  orientation: StepperOrientation;
  state: StepperState;
  position: StepperPosition;
}

export interface StepperProps {
  label: string;
  steps: readonly StepperStep[];
  currentStep: string;
  orientation?: StepperOrientation;
  showStep?: boolean;
}

const spokenState: Record<StepperState, string> = {
  checked: 'Completado',
  default: 'Actual',
  inactive: 'Pendiente',
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Stepper: {label, steps, currentStep, orientation = 'horizontal', showStep = true}: StepperProps
StepperItem: {
  title, caption, stepLabel, completedIcon, orientation, state, position,
}: StepperItemProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Cada paso tiene anatomía fija. El anfitrión aporta la colección. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [stepper.contract.v1.0.0.md](../../../../specs/components/stepper.contract.v1.0.0.md) · SHA-256 `ff793f8f06c17a85244a3a513671fdca9439c5aa11e63edda7bc121ba310db52`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/stepper.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
