'use client';

import { Badge, type BadgeProps } from './badge';
import { CompanySelector, type CompanySelectorProps } from './company-selector';
import { HeaderActions, type HeaderActionsProps } from './header-actions';
import { UserSelector, type UserSelectorProps } from './user-selector';

export interface HeaderProps {
  version?: string;
  showVersion?: boolean;
  showReleaseBadge?: boolean;
  showCompany?: boolean;
  showActions?: boolean;
  showUser?: boolean;
  badge?: Pick<BadgeProps,'label'|'showLeftIcon'|'showRightIcon'|'leftIcon'|'rightIcon'>;
  company?: CompanySelectorProps;
  actions?: HeaderActionsProps;
  user?: UserSelectorProps;
}

export function Header({version='2.0.0',showVersion=true,showReleaseBadge=true,showCompany=true,
  showActions=true,showUser=true,badge,company,actions,user}:HeaderProps) {
  return <header className="bh-header" data-blueheart="header">
    <img className="bh-header-logo" src="/assets/contabilidad-header.png" alt="CONTPAQi Contabilidad"/>
    <div className="bh-header-content">
      {showVersion && <div className="bh-header-block">
        <span className="bh-header-version">{version}</span>
        {showReleaseBadge && <Badge type="info" size="medium" label="Alpha 1" {...badge}/>}
        <span className="bh-header-divider" aria-hidden="true"/>
      </div>}
      {showActions && actions && <div className="bh-header-block">
        <HeaderActions {...actions}/><span className="bh-header-divider" aria-hidden="true"/>
      </div>}
      {showCompany && company && <div className="bh-header-block">
        <CompanySelector {...company}/><span className="bh-header-divider" aria-hidden="true"/>
      </div>}
      {showUser && user && <UserSelector {...user}/>}
    </div>
  </header>;
}
