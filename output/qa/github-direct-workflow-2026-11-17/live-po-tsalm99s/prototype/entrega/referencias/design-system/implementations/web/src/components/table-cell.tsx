'use client';

import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import type { Icon } from '@phosphor-icons/react';
import type { AriaAttributes, ReactNode } from 'react';
import { Avatar, type AvatarProps } from './avatar';

export type TableCellState = 'default' | 'selected' | 'hover' | 'focus';

export interface TableCellAction {
  id: string;
  label: string;
  icon: Icon;
  weight?: 'light' | 'regular';
  onActivate: () => void;
}

type CellContent = {
  label?: string;
  leftIcon?: Icon;
  rightIcon?: Icon;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  showVerticalDivider?: boolean;
  showHorizontalBorders?: boolean;
};

type CellVariant =
  | { item: 'header'; kind?: 'default' | 'checkbox' | 'toggle'; state?: 'default' | 'focus'; sort?: AriaAttributes['aria-sort'] }
  | { item?: 'concept'; kind?: 'default' | 'link' | 'checkbox' | 'action' | 'toggle' | 'badge'; state?: TableCellState; sort?: never };

export type TableCellProps = CellContent & CellVariant & {
  avatar?: Omit<AvatarProps, 'size'>;
  href?: string;
  children?: ReactNode;
  actions?: readonly [TableCellAction, TableCellAction?, TableCellAction?, TableCellAction?];
};

export interface TableCaptureCellProps extends CellContent {
  capture?: boolean;
  state?: TableCellState;
}

function TextCellContent({label, leftIcon: Left = CaretDownIcon, rightIcon: Right = CaretDownIcon,
  showLeftIcon = false, showRightIcon = false, href}: CellContent & {href?: string}) {
  return <>
    {showLeftIcon && <Left className="bh-table-cell-glyph" weight="light" aria-hidden="true"/>}
    {href
      ? <a className="bh-table-cell-label bh-table-cell-link" href={href} title={label}>{label}</a>
      : <span className="bh-table-cell-label" title={label}>{label}</span>}
    {showRightIcon && <Right className="bh-table-cell-glyph" weight="light" aria-hidden="true"/>}
  </>;
}

export function TableCell({item = 'concept', kind = 'default', state = 'default', avatar, href, children, actions, sort,
  showVerticalDivider = false, showHorizontalBorders = true, showRightIcon = false, ...text}: TableCellProps) {
  const Element = item === 'header' ? 'th' : 'td';
  return <Element scope={item === 'header' ? 'col' : undefined} aria-sort={sort}
    className="bh-table-cell" data-blueheart="table-cell" data-item={item} data-kind={kind} data-state={state}
    data-divider={showVerticalDivider} data-border={showHorizontalBorders}>
    <div className="bh-table-cell-inner">
      {kind === 'default' && avatar && <Avatar {...avatar} size="medium"/>}
      {(kind === 'default' || kind === 'link') && <TextCellContent {...text} showRightIcon={showRightIcon}
        href={kind === 'link' ? href : undefined}/>}
      {children}
      {kind === 'badge' && showRightIcon && <PencilSimpleIcon className="bh-table-cell-glyph" weight="light" aria-hidden="true"/>}
      {kind === 'action' && actions && <div className="bh-table-cell-actions">
        {actions.map(action => action && <button key={action.id} type="button" aria-label={action.label} onClick={action.onActivate}>
          <action.icon className="bh-table-cell-glyph" weight={action.weight ?? 'light'} aria-hidden="true"/>
        </button>)}
      </div>}
    </div>
  </Element>;
}

export function TableCaptureCell({capture = false, state = 'default', showVerticalDivider = false,
  showHorizontalBorders = true, ...text}: TableCaptureCellProps) {
  return <td className="bh-table-cell" data-blueheart="table-capture-cell" data-capture={capture}
    data-state={state} data-divider={showVerticalDivider} data-border={showHorizontalBorders}>
    <div className="bh-table-cell-inner"><div className="bh-table-capture-field"><TextCellContent {...text}/></div></div>
  </td>;
}
