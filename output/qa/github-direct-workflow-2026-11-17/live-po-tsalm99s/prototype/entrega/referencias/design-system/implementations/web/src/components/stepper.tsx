import { CheckFatIcon } from '@phosphor-icons/react/dist/ssr/CheckFat';
import { ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import type { Icon } from '@phosphor-icons/react';

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

export function StepperItem({
  title, caption, stepLabel, completedIcon, orientation, state, position,
}: StepperItemProps) {
  const completedMark = state === 'checked' && position !== 'end';
  const Glyph = completedMark ? completedIcon ?? CheckFatIcon : ImageIcon;
  return (
    <li className="bh-stepper-item" data-blueheart="stepper-item"
      data-orientation={orientation} data-state={state} data-position={position}
      data-mark={completedMark ? 'completed' : state === 'inactive' ? 'inactive' : 'current'}
      aria-current={state === 'default' ? 'step' : undefined}>
      <div className="bh-stepper-progress" aria-hidden="true">
        {position !== 'start' && <span className="bh-stepper-line bh-stepper-line-before"/>}
        <span className="bh-stepper-mark"><Glyph weight="fill"/></span>
        {position !== 'end'
          ? <span className="bh-stepper-line bh-stepper-line-after"/>
          : orientation === 'horizontal' && <span className="bh-stepper-terminal"/>}
      </div>
      <div className="bh-stepper-details">
        {stepLabel && <span className="bh-stepper-step-label">{stepLabel}</span>}
        <div className="bh-stepper-copy">
          <span className="sr-only">{spokenState[state]}. </span>
          <span className="bh-stepper-title">{title}</span>
          {caption && <span className="bh-stepper-caption">{caption}</span>}
        </div>
      </div>
    </li>
  );
}

export function Stepper({label, steps, currentStep, orientation = 'horizontal', showStep = true}: StepperProps) {
  const current = steps.findIndex(step => step.id === currentStep);
  if (steps.length < 2 || current < 0) return null;
  return (
    <ol role="list" className="bh-stepper" data-blueheart="stepper" data-orientation={orientation} aria-label={label}>
      {steps.map(({id, stepLabel, ...step}, index) => (
        <StepperItem {...step} key={id} orientation={orientation}
          stepLabel={showStep ? stepLabel ?? `Paso ${index + 1}` : undefined}
          state={index < current ? 'checked' : index === current ? 'default' : 'inactive'}
          position={index === 0 ? 'start' : index === steps.length - 1 ? 'end' : 'middle'}/>
      ))}
    </ol>
  );
}
