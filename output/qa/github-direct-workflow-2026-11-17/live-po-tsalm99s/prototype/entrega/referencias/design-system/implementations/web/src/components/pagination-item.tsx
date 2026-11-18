'use client';

import { CaretDoubleLeftIcon } from '@phosphor-icons/react/dist/csr/CaretDoubleLeft';
import { CaretDoubleRightIcon } from '@phosphor-icons/react/dist/csr/CaretDoubleRight';
import { CaretLeftIcon } from '@phosphor-icons/react/dist/csr/CaretLeft';
import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight';

export type PaginationDirection = 'first' | 'previous' | 'next' | 'last';

const carets = {
  first: CaretDoubleLeftIcon,
  previous: CaretLeftIcon,
  next: CaretRightIcon,
  last: CaretDoubleRightIcon,
};

export type PaginationItemProps =
  | {type: 'page'; label: string; accessibleLabel?: string; selected?: boolean; onActivate: () => void; touchTarget?: boolean}
  | {type: 'icon'; direction: PaginationDirection; accessibleLabel: string; disabled?: boolean; onActivate: () => void; touchTarget?: boolean}
  | {type: 'ellipsis'};

export function PaginationItem(props: PaginationItemProps) {
  if (props.type === 'ellipsis') return <span className="bh-pagination-item-surface"
    data-blueheart="pagination-item" data-type="ellipsis" aria-hidden="true">…</span>;
  const Glyph = props.type === 'icon' ? carets[props.direction] : null;
  const selected = props.type === 'page' && props.selected;
  return <button type="button" className="bh-pagination-item" data-blueheart="pagination-item" data-type={props.type}
    data-touch-target={props.touchTarget || undefined} aria-label={props.accessibleLabel}
    aria-current={selected ? 'page' : undefined} disabled={props.type === 'icon' && props.disabled}
    onClick={props.onActivate}>
    <span className="bh-pagination-item-surface" data-type={props.type}>
      {Glyph && <Glyph className="bh-pagination-item-icon" weight="light" aria-hidden="true"/>}
      {props.type === 'page' && props.label}
    </span>
  </button>;
}
