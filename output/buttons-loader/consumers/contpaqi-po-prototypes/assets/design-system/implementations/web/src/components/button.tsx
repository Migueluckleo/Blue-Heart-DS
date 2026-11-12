'use client';

import { PlusCircleIcon } from '@phosphor-icons/react/dist/csr/PlusCircle';
import type { Icon } from '@phosphor-icons/react';
import { useState, type CSSProperties, type MouseEvent } from 'react';
import data from '../generated/buttons-recipes.json';
import { length, Loader, loaderKeyById, loaderRecipes, token, type LoaderColor, type LoaderSize } from './loader';

export const buttonVariants = ['primary', 'secondary', 'text', 'link', 'danger'] as const;
export const buttonSizes = ['large', 'medium', 'small'] as const;
export type ButtonVariant = typeof buttonVariants[number];
export type ButtonSize = typeof buttonSizes[number];
export type ButtonInteraction = 'default' | 'hover' | 'pressed' | 'focus';
export type ButtonState = ButtonInteraction | 'loading' | 'disabled';

export interface ButtonIcon {
  /** Official Phosphor icon export. */
  component: Icon;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

export interface ButtonCommonProps {
  size?: ButtonSize;
  label?: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: ButtonIcon;
  rightIcon?: ButtonIcon;
  describedBy?: string;
  id?: string;
  className?: string;
  /** For an isolated catalogue specimen. */
  previewState?: ButtonInteraction;
}

export type ButtonProps = ButtonCommonProps & (
  | {variant?: ButtonVariant; href?: never; type?: 'button' | 'submit' | 'reset'; onClick?: (event: MouseEvent<HTMLButtonElement>) => void}
  | {variant: 'link'; href: string; type?: never; onClick?: (event: MouseEvent<HTMLAnchorElement>) => void}
);

type Recipe = {
  root: Record<string, string>;
  label: Record<string, string>;
  icons: Array<{size: string; color: string}>;
  focus: Record<string, string> | null;
  loader: string | null;
  underline: boolean;
};
const recipes: Record<`${ButtonVariant}/${ButtonSize}/${ButtonState}`, Recipe> = data;
const defaultIcon = {component: PlusCircleIcon, weight: 'light'} as const;

function Glyph({icon, spec}: {icon: ButtonIcon; spec?: Recipe['icons'][number]}) {
  if (!spec) return null;
  const Graphic = icon.component;
  return <span className="bh-button-icon" style={{width: length(spec.size), height: length(spec.size), color: token(spec.color)}}>
    <Graphic size="100%" weight={icon.weight ?? 'light'} aria-hidden="true" focusable="false"/>
  </span>;
}

export function Button(props: ButtonProps) {
  const {variant = 'primary', size = 'large', label = 'Button', loadingLabel = 'Cargando…',
    loading = false, disabled = false, showLeftIcon = false, showRightIcon = false,
    leftIcon = defaultIcon, rightIcon = defaultIcon, describedBy, id, className, previewState} = props;
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focus, setFocus] = useState(false);
  const pending = loading && !disabled;
  const blocked = disabled || pending;
  const interaction = previewState ?? (pressed ? 'pressed' : hover ? 'hover' : focus ? 'focus' : 'default');
  const state = disabled ? 'disabled' : pending ? 'loading' : interaction;
  const recipe = recipes[`${variant}/${size}/${state}`];
  const resting = recipes[`${variant}/${size}/default`];
  const busy = recipes[`${variant}/${size}/loading`];
  const focusRecipe = recipes[`${variant}/${size}/focus`].focus;
  const ring = !disabled && (focus || previewState === 'focus') && focusRecipe;
  const dimension = (key: string) => recipe.root[key] ? length(recipe.root[key]) : undefined;
  const textValue = (key: string) => token(recipe.label[key]);
  const textLength = (key: string) => length(recipe.label[key]);
  const strokeWidth = dimension('strokeTopWeight') ?? '1px';
  const style = {
    height: dimension('height'), paddingBlockStart: dimension('paddingTop'), paddingBlockEnd: dimension('paddingBottom'),
    paddingInlineStart: dimension('paddingLeft'), paddingInlineEnd: dimension('paddingRight'),
    '--bh-button-gap': dimension('itemSpacing'), borderRadius: dimension('topLeftRadius'),
    backgroundColor: recipe.root.fills ? token(recipe.root.fills) : 'transparent',
    boxShadow: recipe.root.strokes ? `inset 0 0 0 ${strokeWidth} ${token(recipe.root.strokes)}` : undefined,
    color: textValue('fills'), fontFamily: textValue('fontFamily'), fontWeight: textValue('fontStyle'),
    fontSize: textLength('fontSize'), lineHeight: textLength('lineHeight'), letterSpacing: textLength('letterSpacing'),
    textDecoration: recipe.underline ? 'underline' : undefined,
    '--bh-focus-color': ring ? token(ring.strokes) : undefined,
    '--bh-focus-radius': ring ? length(ring.topLeftRadius) : undefined,
    '--bh-focus-width': ring ? length(ring.strokeTopWeight) : undefined,
  } as CSSProperties;
  const loaderKey = loaderKeyById[busy.loader!];
  const [loaderSize, loaderColor] = loaderKey.split('/') as [LoaderSize, LoaderColor];
  const loaderDiameter = length(loaderRecipes[loaderKey].diameter);
  const iconRecipe = pending ? resting.icons : recipe.icons;
  const content = <span className="bh-button-reserve">
    <span className="bh-button-layer" data-inactive={pending || undefined} aria-hidden={pending || undefined}>
      {showLeftIcon && <Glyph icon={leftIcon} spec={iconRecipe[0]}/>}
      <span>{label}</span>
      {showRightIcon && <Glyph icon={rightIcon} spec={iconRecipe[1]}/>}
    </span>
    <span className="bh-button-layer" data-inactive={!pending || undefined} aria-hidden={!pending || undefined}>
      {pending ? <Loader size={loaderSize} color={loaderColor}/> : <span style={{width: loaderDiameter}}/>}
      <span>{loadingLabel}</span>
    </span>
  </span>;
  const common = {
    id, style, className: ['bh-button', className].filter(Boolean).join(' '),
    'data-blueheart': 'button', 'data-variant': variant, 'data-size': size, 'data-state': state,
    'data-focus': ring ? 'true' : undefined, 'aria-busy': pending || undefined,
    'aria-disabled': blocked || undefined, 'aria-describedby': describedBy,
    onPointerEnter: () => setHover(true), onPointerLeave: () => {setHover(false); setPressed(false);},
    onPointerDown: () => {if (!blocked) setPressed(true);}, onPointerUp: () => setPressed(false),
    onPointerCancel: () => setPressed(false),
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      if (!blocked && (event.key === 'Enter' || (event.key === ' ' && props.href === undefined))) setPressed(true);
    },
    onKeyUp: () => setPressed(false),
    onFocus: (event: React.FocusEvent<HTMLElement>) => setFocus(event.currentTarget.matches(':focus-visible')),
    onBlur: () => {setFocus(false); setPressed(false);},
  };
  if (props.href !== undefined) {
    return <a {...common} href={blocked ? undefined : props.href}
      role={blocked ? 'link' : undefined} tabIndex={disabled ? -1 : pending ? 0 : undefined} onClick={event => {
        if (blocked) {event.preventDefault(); return;}
        props.onClick?.(event);
      }}>{content}</a>;
  }
  return <button {...common} type={props.type ?? 'button'} disabled={disabled} onClick={event => {
    if (blocked) {event.preventDefault(); return;}
    props.onClick?.(event);
  }}>{content}</button>;
}
