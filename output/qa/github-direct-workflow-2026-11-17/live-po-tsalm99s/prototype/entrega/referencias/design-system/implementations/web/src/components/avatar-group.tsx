'use client';

import { Avatar, type AvatarProps, type AvatarSize } from './avatar';

export type AvatarGroupPerson = Omit<AvatarProps,'size'|'presence'|'decorative'|'name'> & {
  id: string;
  name: string;
};

export interface AvatarGroupProps {
  label: string;
  size?: AvatarSize;
  people: readonly [AvatarGroupPerson,AvatarGroupPerson,...AvatarGroupPerson[]];
}

export function AvatarGroup({label, size = 'extra-large', people}: AvatarGroupProps) {
  const overflow = people.length > 4 ? people.length - 3 : 0;
  const visible = overflow ? people.slice(0,3) : people;
  return <ul aria-label={label} className="bh-avatar-group" data-blueheart="avatar-group" data-size={size}>
    {visible.map(({id,...person}) => <li key={id}><Avatar {...person} size={size}/></li>)}
    {overflow > 0 && <li className="bh-avatar-group-overflow">
      <Avatar name={`y ${overflow} más`} initials={`+${overflow}`} size={size}/>
    </li>}
  </ul>;
}
