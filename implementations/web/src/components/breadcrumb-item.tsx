'use client';

import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight';
import { HouseIcon } from '@phosphor-icons/react/dist/csr/House';

export type BreadcrumbItemProps =
  | { type?: 'text'; label: string; current: true }
  | { type?: 'text'; label: string; current?: false; href: string; disabled?: boolean }
  | { type: 'icon'; label?: string; href: string; disabled?: boolean }
  | { type: 'overflow'; label: string; onActivate: () => void; expanded?: boolean; controls?: string; disabled?: boolean };

export function BreadcrumbItem(props: BreadcrumbItemProps) {
  if ('current' in props && props.current) {
    return <li className="bh-breadcrumb-item" data-blueheart="breadcrumb-item">
      <span aria-current="page" className="bh-breadcrumb-current">{props.label}</span>
    </li>;
  }
  const icon = props.type === 'icon';
  const overflow = props.type === 'overflow';
  const label = props.label ?? 'Inicio';
  const content = icon ? <HouseIcon className="bh-breadcrumb-home" weight="light" aria-hidden="true"/>
    : overflow ? '...' : label;
  return <li className="bh-breadcrumb-item" data-blueheart="breadcrumb-item" data-disabled={props.disabled || undefined}>
    {props.disabled ? <span className="bh-breadcrumb-target" aria-disabled="true" aria-label={icon || overflow ? label : undefined}>{content}</span>
      : overflow ? <button type="button" className="bh-breadcrumb-target" aria-label={label}
          aria-expanded={props.expanded} aria-controls={props.controls} onClick={props.onActivate}>{content}</button>
        : <a className="bh-breadcrumb-target" href={props.href} aria-label={icon ? label : undefined}>{content}</a>}
    <CaretRightIcon className="bh-breadcrumb-separator" weight="light" aria-hidden="true"/>
  </li>;
}
