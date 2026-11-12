import { PresentationIcon } from '@phosphor-icons/react/dist/ssr/Presentation';
import type { Icon, IconWeight } from '@phosphor-icons/react';
import type { CSSProperties } from 'react';
import { token } from './loader';

export type BadgeType = 'neutral' | 'subtle' | 'info' | 'success' | 'warning' | 'error';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps {
  label?: string;
  type?: BadgeType;
  size?: BadgeSize;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: Icon;
  rightIcon?: Icon;
  leftWeight?: IconWeight;
  rightWeight?: IconWeight;
}

export function Badge({label = 'Label', type = 'subtle', size = 'small',
  showLeftIcon = false, showRightIcon = false, leftIcon: Left = PresentationIcon,
  rightIcon: Right = PresentationIcon, leftWeight = 'fill', rightWeight = 'fill'}: BadgeProps) {
  const neutral = type === 'neutral' || type === 'subtle';
  const style = {
    backgroundColor: token(`--badge-color-bg-${type}`),
    color: token(`--badge-color-text-${neutral ? 'primary' : type}`),
    '--bh-badge-icon-color': token(`--badge-color-icon-${neutral ? 'subtle' : type}`),
  } as CSSProperties;
  return <span className="bh-badge" data-blueheart="badge" data-size={size} data-type={type} style={style}>
    {showLeftIcon && <Left className="bh-badge-icon" weight={leftWeight} aria-hidden="true"/>}
    <span>{label}</span>
    {showRightIcon && <Right className="bh-badge-icon" weight={rightWeight} aria-hidden="true"/>}
  </span>;
}
