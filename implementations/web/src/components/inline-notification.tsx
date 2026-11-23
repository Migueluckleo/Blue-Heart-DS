'use client';

import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { ConfettiIcon } from '@phosphor-icons/react/dist/csr/Confetti';
import { InfoIcon } from '@phosphor-icons/react/dist/csr/Info';
import { WarningIcon } from '@phosphor-icons/react/dist/csr/Warning';
import { XCircleIcon } from '@phosphor-icons/react/dist/csr/XCircle';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import { IconButton } from './icon-button';
import { Button } from './button';

const glyphs={neutral:ConfettiIcon,info:InfoIcon,success:CheckCircleIcon,warning:WarningIcon,error:XCircleIcon};
export type InlineNotificationType = keyof typeof glyphs;

export interface InlineNotificationProps {
  type?: InlineNotificationType;
  title?: string;
  description?: string;
  link?: {label: string; href: string};
  showTitle?: boolean;
  showDescription?: boolean;
  showIcon?: boolean;
  showDismiss?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
  showCta?: boolean;
  ctaLabel?: string;
  onCta?: () => void;
  /** Official product Isotipo; aspect ratio is preserved within 32 by 32 px. */
  isotipo?: {src: string; alt: string};
  className?: string;
}

export function InlineNotification({type='neutral',title,description,link,showTitle=true,showDescription=true,
  showIcon=true,showDismiss=true,onDismiss,dismissLabel='Cerrar notificación',
  showCta=false,ctaLabel='Ver detalles',onCta,isotipo,className}: InlineNotificationProps) {
  const Glyph=glyphs[type];
  const titleVisible=Boolean(showTitle&&title);
  const descriptionVisible=Boolean(showDescription&&(description||link));
  const dismissVisible=Boolean(showDismiss&&onDismiss);
  if(!titleVisible&&!descriptionVisible&&!showIcon&&!dismissVisible&&!showCta)return null;
  const role=type==='warning'||type==='error'?'alert':'status';
  return <div className={['bh-inline-notification',className].filter(Boolean).join(' ')}
    data-blueheart="inline-notification" data-type={type} data-show-cta={showCta}>
    <div className="bh-inline-content">
      {showIcon&&(isotipo
        ? <span className="bh-inline-isotipo"><img src={isotipo.src} alt={isotipo.alt}/></span>
        : <Glyph className="bh-inline-indicator" weight={type==='neutral'?'regular':'fill'} aria-hidden="true"/>)}
      <div className="bh-inline-body">
      {(titleVisible||descriptionVisible)&&<div className="bh-inline-text" role={role}>
        {titleVisible&&<p className="bh-inline-title">{title}</p>}
        {descriptionVisible&&<p className="bh-inline-description">{description}
          {description&&link?' ':null}
          {link&&<a className="bh-inline-link" href={link.href}>{link.label}</a>}
        </p>}
      </div>}
      {showCta&&<Button variant="secondary" size="small" label={ctaLabel} onClick={onCta}/>}
      </div>
    </div>
    {dismissVisible&&<IconButton variant="ghost" size="small" icon={XIcon} label={dismissLabel} onClick={onDismiss}/>}
  </div>;
}
