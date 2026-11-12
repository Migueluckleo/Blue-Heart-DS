'use client';

import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
import { HouseLineIcon } from '@phosphor-icons/react/dist/csr/HouseLine';
import type { Icon } from '@phosphor-icons/react';
import { useId, useState, type CSSProperties, type FocusEvent } from 'react';
import recipes from '../generated/menu-item-recipes.json';
import { length, token } from './loader';
import { Tooltip } from './tooltip';

export type MenuItemPresentation =
  | { orientation?: 'vertical'; type?: 'collapsed' | 'expanded' | 'sub-menu' }
  | { orientation: 'horizontal'; type?: 'collapsed' };

export type MenuItemAction =
  | { href: string; current?: boolean; expanded?: never; controls?: never; onActivate?: never }
  | { href?: never; current?: never; expanded?: boolean; controls?: string; onActivate: () => void };

export type MenuItemProps = MenuItemPresentation & MenuItemAction & {
  label: string;
  active?: boolean;
  showRightIcon?: boolean;
  showBeta?: boolean;
  fillIcon?: Icon;
  lightIcon?: Icon;
  tooltipLabel?: string;
};

export function MenuItem({label, orientation = 'vertical', type = 'collapsed', active = true,
  showRightIcon = true, showBeta = true, fillIcon = HouseLineIcon, lightIcon = HouseLineIcon,
  tooltipLabel = label, href, current, expanded, controls, onActivate}: MenuItemProps) {
  const id = useId();
  const [hovered, setHovered] = useState(false);
  const [tip, setTip] = useState(false);
  const [focused, setFocused] = useState(false);
  const iconOnly = orientation === 'vertical' && type === 'collapsed';
  const subMenu = type === 'sub-menu';
  const status = focused && !subMenu ? 'focus' : hovered ? 'hover' : 'default';
  const filled = active || status === 'hover';
  const Glyph = filled ? fillIcon : lightIcon;
  const recipe = recipes[`${orientation}/${type}/${status}/${active}` as keyof typeof recipes];
  const style = {
    '--bh-menu-icon': recipe.Icon ? token(recipe.Icon) : undefined,
    '--bh-menu-caret': recipe.CaretDown ? token(recipe.CaretDown) : undefined,
    '--bh-menu-label': recipe.Label ? token(recipe.Label) : undefined,
    '--bh-menu-shape': recipe.Union ? token(recipe.Union) : undefined,
    '--bh-menu-background': recipe.Background ? token(recipe.Background) : undefined,
    '--bh-menu-surface': recipe.surface ? token(recipe.surface) : undefined,
    '--bh-menu-outline': recipe.stroke ? token(recipe.stroke) : undefined,
    '--bh-menu-outline-width': recipe.strokeWidth ? length(recipe.strokeWidth) : undefined,
  } as CSSProperties;
  const content = <>
    {!subMenu && <Glyph className="bh-menu-item-icon" weight={filled ? 'fill' : 'light'} aria-hidden="true"/>}
    {!iconOnly && <span className="bh-menu-item-label">{label}</span>}
    {orientation === 'vertical' && type === 'expanded' && active && showBeta &&
      <span className="bh-menu-item-beta">BETA</span>}
    {!iconOnly && !subMenu && showRightIcon &&
      <CaretDownIcon className="bh-menu-item-caret" weight="light" aria-hidden="true"/>}
  </>;
  const attrs = {
    className:'bh-menu-item-target',
    'aria-label':iconOnly ? label : undefined,
    'aria-describedby':iconOnly && tooltipLabel !== label ? id : undefined,
    onFocus:(event: FocusEvent<HTMLElement>) => {setFocused(event.currentTarget.matches(':focus-visible'));setTip(true);},
    onBlur:() => {setFocused(false);setTip(false);},
  };
  return <span className="bh-menu-item" data-blueheart="menu-item" data-orientation={orientation}
    data-type={type} data-active={active} style={style} onMouseEnter={() => {
      setHovered(true);
      setTip(true);
    }} onMouseLeave={event => {
      setHovered(false);
      if (!event.currentTarget.contains(document.activeElement)) setTip(false);
    }} onKeyDown={event => {
      if (event.key === 'Escape') setTip(false);
    }}>
    {href !== undefined ? <a {...attrs} href={href} aria-current={current ? 'page' : undefined}>{content}</a>
      : <button {...attrs} type="button" aria-expanded={expanded} aria-controls={controls} onClick={onActivate}>{content}</button>}
    {iconOnly && <span className="bh-menu-item-tooltip">
      <Tooltip id={id} label={tooltipLabel} placement="right" arrow="center" hidden={!tip}/>
    </span>}
  </span>;
}
