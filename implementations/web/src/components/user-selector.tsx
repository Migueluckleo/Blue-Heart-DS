'use client';

import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
import { Avatar, type AvatarProps } from './avatar';

export interface UserSelectorProps {
  id?: string;
  name: string;
  avatar?: Pick<AvatarProps,'initials'|'imageSrc'|'icon'>;
  open?: boolean;
  controls?: string;
  onToggle?: () => void;
}

export function UserSelector({id,name,avatar,open=false,controls,onToggle}:UserSelectorProps) {
  return <button id={id} type="button" className="bh-user-selector" data-blueheart="user-selector"
    aria-label={`Cuenta de ${name}`} aria-haspopup="menu" aria-expanded={open}
    aria-controls={controls} onClick={onToggle}>
    <Avatar {...avatar} size="extra-large" decorative/>
    <CaretDownIcon className="bh-user-caret" weight="light" aria-hidden="true"/>
  </button>;
}
