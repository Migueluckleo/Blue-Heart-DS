'use client';

import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import type { Icon } from '@phosphor-icons/react';
import type { MouseEventHandler } from 'react';

export type DropdownSize = 'large' | 'medium' | 'small';

export interface DropdownOption {
  id: string;
  type: 'option';
  label: string;
  description?: string;
  icon?: Icon;
  showLeftIcon?: boolean;
  disabled?: boolean;
}

export type DropdownEntry = DropdownOption
  | {id: string; type: 'header'; label: string}
  | {id: string; type: 'divider'};

export type DropdownItemProps = {
  entry: DropdownEntry;
  size?: DropdownSize;
  id?: string;
  active?: boolean;
  selected?: boolean;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  onActivate?: () => void;
};

export function DropdownItem({entry,size='large',id,active,selected,onMouseDown,onActivate}: DropdownItemProps) {
  if(entry.type==='divider') return <div className="bh-dropdown-item" data-blueheart="dropdown-item"
    data-type="divider" aria-hidden="true"/>;
  if(entry.type==='header') return <div className="bh-dropdown-item" data-blueheart="dropdown-item"
    data-type="header" id={id} aria-hidden="true">{entry.label}</div>;
  const Glyph=entry.icon??ImageSquareIcon;
  const iconVisible=entry.showLeftIcon??Boolean(entry.icon);
  const showSelected=Boolean(selected&&!entry.disabled);
  const descriptionId=id&&entry.description?`${id}-description`:undefined;
  return <div className="bh-dropdown-item" data-blueheart="dropdown-item" data-type="option" data-size={size}
    data-active={active&&!entry.disabled||undefined} role="option" id={id}
    aria-label={entry.label} aria-describedby={descriptionId} aria-selected={showSelected}
    aria-disabled={entry.disabled||undefined} onMouseDown={onMouseDown}
    onClick={entry.disabled?undefined:onActivate}>
    {iconVisible&&<Glyph className="bh-dropdown-glyph" weight="light" aria-hidden="true"/>}
    <div className="bh-dropdown-item-content">
      <div className="bh-dropdown-item-label">{entry.label}</div>
      {entry.description&&<div id={descriptionId} className="bh-dropdown-item-description">{entry.description}</div>}
    </div>
    {showSelected&&<CheckIcon className="bh-dropdown-glyph" weight="light" aria-hidden="true"/>}
  </div>;
}
