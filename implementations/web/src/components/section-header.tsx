import type { ReactNode } from 'react';

export interface SectionHeaderProps {
  title: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  description?: string;
  breadcrumbs?: ReactNode;
  metadata?: ReactNode;
  inputs?: ReactNode;
  actions?: ReactNode;
  showBreadcrumbs?: boolean;
  showDescription?: boolean;
  showMetadata?: boolean;
  showActions?: boolean;
  className?: string;
}

export function SectionHeader({title, headingLevel = 2, description, breadcrumbs, metadata, inputs, actions,
  showBreadcrumbs = true, showDescription = true, showMetadata = true, showActions = true,
  className}: SectionHeaderProps) {
  const Heading = (`h${headingLevel}`) as const;
  return <header className={['bh-section-header',className].filter(Boolean).join(' ')} data-blueheart="section-header">
    <div className="bh-section-header-content">
      <div className="bh-section-header-heading">
        {showBreadcrumbs && breadcrumbs}
        <Heading className="bh-section-header-title">{title}</Heading>
        {showDescription && description && <p className="bh-section-header-description">{description}</p>}
      </div>
      {showMetadata && metadata && <div className="bh-section-header-metadata">{metadata}</div>}
    </div>
    {showActions && (inputs || actions) && <div className="bh-section-header-main-actions">
      {inputs && <div className="bh-section-header-inputs">{inputs}</div>}
      {actions && <div className="bh-section-header-actions">{actions}</div>}
    </div>}
  </header>;
}
