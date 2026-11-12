import type { CSSProperties } from 'react';
import { length, token } from './loader';

export type DotSize = 'large' | 'medium' | 'small';
export type DotColor = 'default' | 'brand' | 'neutral' | 'white';
export type DotProps =
  | { type: 'active' | 'busy' | 'inactive' | 'notification'; size?: DotSize; color?: 'default'; count?: never; maxCount?: never }
  | { type: 'count'; size?: Exclude<DotSize, 'small'>; color?: DotColor; count?: string; maxCount?: never }
  | { type: 'count-expand'; size?: Exclude<DotSize, 'small'>; color?: DotColor; maxCount?: string; count?: never };

export function Dot({type, size = 'large', color = 'default', count = '1', maxCount = '99+'}: DotProps) {
  const counter = type === 'count' || type === 'count-expand';
  const sizeRole = size === 'small' ? 'presence-small' : size === 'medium'
    ? counter ? 'regular' : 'presence-medium' : counter ? 'count-large' : 'regular';
  const background = color !== 'default' ? color : type === 'active' || type === 'inactive' ? type : 'alert';
  const diameter = length(`--dot-size-${sizeRole}`);
  const style: CSSProperties = {
    height: diameter,
    minWidth: diameter,
    backgroundColor: token(`--dot-color-bg-${background}`),
    outlineColor: token(color === 'white' ? '--dot-color-stroke-on-white' : '--dot-color-stroke-separator'),
    color: token(color === 'white' ? '--dot-color-text-on-white' : '--dot-color-text-inverse'),
    fontSize: counter ? length(`--dot-font-size-${size}`) : undefined,
    paddingInline: type === 'count-expand' ? length('--dot-spacing-counter-inline') : undefined,
  };
  return <span aria-hidden="true" className="bh-dot" data-blueheart="dot" data-type={type} style={style}>
    {type === 'count' ? count : type === 'count-expand' ? maxCount : null}
  </span>;
}
