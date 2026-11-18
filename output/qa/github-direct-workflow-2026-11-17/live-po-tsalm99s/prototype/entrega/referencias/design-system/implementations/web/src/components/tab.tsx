'use client';

import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import type { Icon } from '@phosphor-icons/react';
import { useState, type ButtonHTMLAttributes, type CSSProperties, type Ref } from 'react';
import recipes from '../generated/tab-recipes.json';
import { Dot } from './dot';
import { length, token } from './loader';

export type TabType = 'underline' | 'pill' | 'segmented';

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'role' | 'children' | 'aria-selected'> {
  label: string;
  type?: TabType;
  selected?: boolean;
  icon?: Icon;
  showIcon?: boolean;
  badgeCount?: string;
  ref?: Ref<HTMLButtonElement>;
}

export function Tab({label, type = 'underline', selected = false, disabled = false,
  icon, showIcon = Boolean(icon), badgeCount, className, style, onFocus, onBlur, onPointerEnter, onPointerLeave, ...attrs}: TabProps) {
  const Glyph = icon ?? ImageSquareIcon;
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const state = disabled ? 'disabled' : focused ? 'focus' : hovered ? 'hover' : 'default';
  const recipe = recipes[`${type}/${selected}/${state}`];
  const decoration = [
    recipe.underline && recipe.underlineWidth
      ? `inset 0 calc(-1 * ${length(recipe.underlineWidth)}) 0 ${token(recipe.underline)}` : undefined,
    recipe.shadow,
  ].filter(Boolean).join(', ');
  const appearance = {
    gap: recipe.gap ? length(recipe.gap) : undefined,
    paddingInline: recipe.inline ? length(recipe.inline) : undefined,
    paddingBlock: recipe.block ? length(recipe.block) : undefined,
    borderRadius: recipe.radius ? length(recipe.radius) : undefined,
    background: recipe.background ? token(recipe.background) : undefined,
    color: recipe.label ? token(recipe.label) : undefined,
    fontWeight: recipe.weight ? token(recipe.weight) : undefined,
    boxShadow: decoration || undefined,
    '--bh-tab-icon': recipe.icon ? token(recipe.icon) : undefined,
    '--bh-tab-focus': recipe.focus ? token(recipe.focus) : undefined,
    '--bh-tab-focus-radius': recipe.focusRadius ? length(recipe.focusRadius) : undefined,
    '--bh-tab-focus-width': recipe.focusWidth ? length(recipe.focusWidth) : undefined,
    '--bh-tab-focus-offset': recipe.focusOffset === null ? undefined : `${recipe.focusOffset}px`,
    ...style,
  } as CSSProperties;

  return <button {...attrs} type="button" role="tab" aria-selected={selected} disabled={disabled}
    className={['bh-tab',className].filter(Boolean).join(' ')} data-blueheart="tab" data-type={type}
    data-state={state} style={appearance}
    onFocus={event=>{setFocused(event.currentTarget.matches(':focus-visible'));onFocus?.(event);}}
    onBlur={event=>{setFocused(false);onBlur?.(event);}}
    onPointerEnter={event=>{setHovered(true);onPointerEnter?.(event);}}
    onPointerLeave={event=>{setHovered(false);onPointerLeave?.(event);}}>
    {showIcon && <Glyph className="bh-tab-icon" weight="light" aria-hidden="true"/>}
    <span>{label}</span>
    {badgeCount && <Dot type="count" size="medium" count={badgeCount}/>}
  </button>;
}
