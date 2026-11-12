'use client';

import { BellIcon } from '@phosphor-icons/react/dist/csr/Bell';
import type { Icon } from '@phosphor-icons/react';
import { useState, type CSSProperties, type ComponentPropsWithoutRef } from 'react';
import { Dot } from './dot';
import { length, token } from './loader';
import recipes from '../generated/icon-button-recipes.json';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonState = 'default' | 'hover' | 'pressed' | 'focus' | 'disabled';

export type IconButtonProps = Omit<ComponentPropsWithoutRef<'button'>,
  'children' | 'type' | 'aria-label' | 'aria-pressed' | 'onFocus' | 'onBlur' |
  'onPointerEnter' | 'onPointerLeave' | 'onPointerDown' | 'onPointerUp' | 'onPointerCancel'> & {
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  selected?: boolean;
  icon?: Icon;
  showBadge?: boolean;
  badgeCount?: string;
  badgeMaxCount?: string;
  previewState?: Exclude<IconButtonState, 'disabled'>;
};

export function IconButton({label, variant = 'primary', size = 'large', selected, icon: Glyph = BellIcon,
  showBadge = false, badgeCount, badgeMaxCount, disabled = false, previewState, className, ...attrs}: IconButtonProps) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const supportsSelected = variant === 'secondary' || variant === 'ghost';
  const chosen = supportsSelected && Boolean(selected);
  const state = disabled ? 'disabled' : previewState ?? (pressed ? 'pressed' : focused ? 'focus' : hover ? 'hover' : 'default');
  const key = `${variant}/${size}/${chosen}/${state}` as keyof typeof recipes;
  const recipe = recipes[key];
  const style = {
    inlineSize: length(recipe.control),
    blockSize: length(recipe.control),
    borderRadius: length(recipe.radius),
    backgroundColor: recipe.fill ? token(recipe.fill) : undefined,
    color: token(recipe.glyphColor),
    '--bh-icon-button-glyph': length(recipe.glyph),
    '--bh-icon-button-badge-right': `${recipe.badgeRight}px`,
    '--bh-icon-button-badge-top': `${recipe.badgeTop}px`,
    '--bh-icon-button-focus': recipe.focus ? token(recipe.focus) : undefined,
    '--bh-icon-button-focus-width': recipe.focusWidth ? length(recipe.focusWidth) : undefined,
    '--bh-icon-button-focus-radius': recipe.focusRadius ? length(recipe.focusRadius) : undefined,
    boxShadow: recipe.stroke && recipe.strokeWidth ? `inset 0 0 0 ${length(recipe.strokeWidth)} ${token(recipe.stroke)}` : undefined,
  } as CSSProperties;
  return <button {...attrs} type="button" className={['bh-icon-button',className].filter(Boolean).join(' ')}
    disabled={disabled} aria-label={label} aria-pressed={supportsSelected ? selected : undefined}
    data-blueheart="icon-button" data-state={state} data-variant={variant} style={style}
    onPointerEnter={() => setHover(true)} onPointerLeave={() => {setHover(false);setPressed(false);}}
    onPointerDown={() => setPressed(true)} onPointerUp={() => setPressed(false)} onPointerCancel={() => setPressed(false)}
    onFocus={event => setFocused(event.currentTarget.matches(':focus-visible'))} onBlur={() => setFocused(false)}>
    <Glyph className="bh-icon-button-glyph" weight="light" aria-hidden="true"/>
    {showBadge && variant !== 'danger' && <span className="bh-icon-button-badge" aria-hidden="true">
      {size === 'small' ? <Dot type="notification" size="small"/>
        : badgeMaxCount !== undefined ? <Dot type="count-expand" size={size} maxCount={badgeMaxCount}/>
        : <Dot type="count" size={size} count={badgeCount}/>}
    </span>}
  </button>;
}
