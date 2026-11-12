'use client';

import { ArrowLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLeft';
import { useId, useState } from 'react';
import { BreadcrumbItem } from './breadcrumb-item';

export interface BreadcrumbAncestor {
  label: string;
  href: string;
  type?: 'text' | 'icon';
}

export interface BreadcrumbProps {
  label?: string;
  ancestors: readonly [BreadcrumbAncestor, ...BreadcrumbAncestor[]];
  current: string;
  showBack?: boolean;
  collapsed?: boolean;
  compact?: boolean;
}

export function Breadcrumb({label = 'Ruta de navegación', ancestors, current, showBack = true,
  collapsed = ancestors.length >= 5, compact = false}: BreadcrumbProps) {
  const hiddenId = useId();
  const [expanded, setExpanded] = useState(false);
  const parent = ancestors[ancestors.length - 1];
  const hideMiddle = collapsed && ancestors.length > 2;
  const hidden = hideMiddle ? ancestors.slice(1, -1) : [];
  const backIcon = <ArrowLeftIcon className="bh-breadcrumb-back-icon" weight="light" aria-hidden="true"/>;

  if (compact) {
    return <nav aria-label={label} className="bh-breadcrumb" data-blueheart="breadcrumb">
      <a className="bh-breadcrumb-back" href={parent.href}>{showBack && backIcon}{parent.label}</a>
    </nav>;
  }

  return <nav aria-label={label} className="bh-breadcrumb" data-blueheart="breadcrumb" onKeyDown={event => {
    if (event.key === 'Escape' && expanded) {
      setExpanded(false);
      event.currentTarget.querySelector<HTMLButtonElement>('button[aria-expanded]')?.focus();
    }
  }}>
    <div className="bh-breadcrumb-row">
      {showBack && <a className="bh-breadcrumb-back" href={parent.href} aria-label={`Volver a ${parent.label}`}>{backIcon}</a>}
      <ol className="bh-breadcrumb-list">
        {ancestors.map((item,index) => {
          if (hideMiddle && index === 1) {
            return <BreadcrumbItem key="overflow" type="overflow" label="Mostrar niveles anteriores"
              expanded={expanded} controls={hiddenId} onActivate={() => setExpanded(value => !value)}/>;
          }
          if (hideMiddle && index > 1 && index < ancestors.length - 1) return null;
          const key = `${item.href}-${index}`;
          return item.type === 'icon'
            ? <BreadcrumbItem key={key} type="icon" label={item.label} href={item.href}/>
            : <BreadcrumbItem key={key} label={item.label} href={item.href}/>;
        })}
        <BreadcrumbItem label={current} current/>
      </ol>
    </div>
    {hideMiddle && <ul id={hiddenId} hidden={!expanded} className="bh-breadcrumb-hidden">
      {hidden.map((item,index) => <li key={`${item.href}-${index}`}><a href={item.href}>{item.label}</a></li>)}
    </ul>}
  </nav>;
}
