import type { ReactNode } from 'react';
import { Header, type HeaderProps } from './header';
import { SectionHeader, type SectionHeaderProps } from './section-header';
import { Sidebar, type SidebarProps } from './sidebar';

export type AppShellBodyLayout = 'grid' | 'flex';

export interface AppShellProps {
  header: HeaderProps;
  sidebar: SidebarProps;
  sectionHeader: SectionHeaderProps;
  children: ReactNode;
  bodyLayout?: AppShellBodyLayout;
  contentAs?: 'main' | 'section';
  contentLabel?: string;
  className?: string;
}

export function AppShell({header, sidebar, sectionHeader, children, bodyLayout = 'grid',
  contentAs: Content = 'main', contentLabel, className}: AppShellProps) {
  return <div className={['bh-app-shell',className].filter(Boolean).join(' ')} data-blueheart="app-shell">
    <Header {...header}/>
    <div className="bh-app-shell-content">
      <Sidebar {...sidebar}/>
      <Content className="bh-app-shell-main" aria-label={contentLabel}>
        <SectionHeader {...sectionHeader}/>
        <div className="bh-app-shell-body" data-layout={bodyLayout}>{children}</div>
      </Content>
    </div>
  </div>;
}

export function AppShellGridItem({span = 1, children, className}: {
  span?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}) {
  return <div className={className} style={{gridColumn: `span ${span}`, minInlineSize: 0}}>{children}</div>;
}
