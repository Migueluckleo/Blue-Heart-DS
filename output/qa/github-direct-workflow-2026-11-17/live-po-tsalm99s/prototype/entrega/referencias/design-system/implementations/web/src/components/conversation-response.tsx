'use client';

import { TableIcon } from '@phosphor-icons/react/dist/csr/Table';
import { forwardRef, useId, type ReactNode } from 'react';
import type { IconProps } from '@phosphor-icons/react';
import { Badge } from './badge';
import { Characters } from './characters';
import copy from '../generated/conversation-response-copy.json';

const category = { BENI: 'Fiscal y contable', NAVI: 'Super Agente' } as const;
const character = { BENI: 'beni', NAVI: 'navi' } as const;

export interface ConversationResponseProps {
  agent?: keyof typeof category;
  animateAgent?: boolean;
  body: ReactNode;
  previews?: ReactNode;
  secondaryContent?: ReactNode;
  additionalActions?: ReactNode;
  feedbackActions?: ReactNode;
  showPreviews?: boolean;
  showSecondaryContent?: boolean;
  showAdditionalActions?: boolean;
  className?: string;
}

export interface ConversationResponsePreviewProps {
  title: string;
}

export type ConversationResponseCopyIconProps = IconProps;

export const ConversationResponseCopyIcon = forwardRef<SVGSVGElement, ConversationResponseCopyIconProps>(
  function ConversationResponseCopyIcon({className, size = 16, ...props}, ref) {
    const maskId = useId();
    return <svg ref={ref} className={className} width={size} height={size} viewBox="0 0 16 16"
      focusable="false" aria-hidden="true" {...props}>
      <mask id={maskId} style={{maskType: 'alpha'}}>
        <image width="16" height="16" href={copy.dataUri}/>
      </mask>
      <rect width="16" height="16" fill="currentColor" mask={`url(#${maskId})`}/>
    </svg>;
  },
);

export function ConversationResponsePreview({title}: ConversationResponsePreviewProps) {
  return <div className="bh-response-preview flex items-start" data-blueheart="conversation-response-preview">
    <TableIcon className="bh-response-table-icon shrink-0" weight="light" aria-hidden="true"/>
    <div className="bh-response-stack flex min-w-0 flex-1 flex-col items-start">
      <p className="bh-response-preview-title">{title}</p>
      <Badge type="subtle" size="medium" label="Tabla"/>
    </div>
  </div>;
}

export function ConversationResponse({
  agent = 'BENI', animateAgent = false, body, previews, secondaryContent, additionalActions, feedbackActions,
  showPreviews = true, showSecondaryContent = true, showAdditionalActions = true, className,
}: ConversationResponseProps) {
  const nameId = useId();
  return <article aria-labelledby={nameId} data-blueheart="conversation-response" data-agent={agent}
    className={['bh-response flex min-w-0 items-start', className].filter(Boolean).join(' ')}>
    <Characters character={character[agent]} width={32} className="shrink-0" playing={animateAgent}/>
    <div className="bh-response-stack flex min-w-0 flex-1 flex-col">
      <div className="bh-response-identity flex flex-wrap items-center">
        <strong id={nameId}>{agent}</strong>
        <Badge type="subtle" size="medium" label={category[agent]}/>
      </div>
      <div className="bh-response-slot bh-response-stack flex min-w-0 flex-col" data-slot="body">{body}</div>
      {showPreviews && <div className="bh-response-slot bh-response-stack flex min-w-0 flex-col" data-slot="previews">{previews}</div>}
      {showSecondaryContent && <div className="bh-response-slot bh-response-stack flex min-w-0 flex-col"
        data-slot="secondary-content">{secondaryContent}</div>}
      {showAdditionalActions && <div className="bh-response-slot bh-response-stack flex flex-wrap"
        data-slot="additional-actions">{additionalActions}</div>}
      <div className="bh-response-slot bh-response-stack flex flex-wrap" data-slot="feedback-actions">{feedbackActions}</div>
    </div>
  </article>;
}
