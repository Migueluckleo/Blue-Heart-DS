'use client';

import { UserIcon } from '@phosphor-icons/react/dist/csr/User';
import type { Icon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Dot } from './dot';

export type AvatarSize = 'extra-large' | 'large' | 'medium' | 'small';
export type AvatarPresence = 'active' | 'busy' | 'inactive';

export interface AvatarProps {
  name?: string;
  initials?: string;
  imageSrc?: string;
  size?: AvatarSize;
  icon?: Icon;
  presence?: AvatarPresence;
  decorative?: boolean;
}

const presenceText: Record<AvatarPresence,string> = {active:'Disponible',busy:'Ocupado',inactive:'Inactivo'};

export function Avatar({name, initials, imageSrc, size = 'extra-large', icon: Glyph = UserIcon,
  presence, decorative = false}: AvatarProps) {
  const [failedSource, setFailedSource] = useState<string>();
  const hasImage = Boolean(imageSrc && imageSrc !== failedSource);
  const description = [name, presence && presenceText[presence]].filter(Boolean).join(', ');
  const label = !decorative && description ? description : undefined;
  return <span className="bh-avatar" data-blueheart="avatar" data-size={size}
    role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
    <span className="bh-avatar-surface">
      {hasImage ? <img src={imageSrc} alt="" onError={() => setFailedSource(imageSrc)}/>
        : initials ? <span>{initials}</span> : <Glyph className="bh-avatar-icon" weight="light" aria-hidden="true"/>}
    </span>
    {presence && <span className="bh-avatar-presence">
      <Dot type={presence} size={size === 'extra-large' ? 'large' : size === 'large' ? 'medium' : 'small'}/>
    </span>}
  </span>;
}
