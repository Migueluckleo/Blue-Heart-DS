import type { ReactNode } from 'react';
import { Header, type HeaderProps } from './header';
import { SectionHeader, type SectionHeaderProps } from './section-header';
import { Sidebar, type SidebarProps } from './sidebar';

export type AppShellBodyLayout = 'grid' | 'flex' | 'conversation' | 'conversation-preview';

export interface AppShellProps {
  header: HeaderProps;
  sidebar: SidebarProps;
  sectionHeader: SectionHeaderProps;
  children: ReactNode;
  rightSidebar?: ReactNode;
  documentPreview?: ReactNode;
  documentExpanded?: boolean;
  bodyLayout?: AppShellBodyLayout;
  contentAs?: 'main' | 'section';
  contentLabel?: string;
  className?: string;
}

export function AppShell({header, sidebar, sectionHeader, children, rightSidebar, documentPreview,
  documentExpanded = false, bodyLayout = 'grid',
  contentAs: Content = 'main', contentLabel, className}: AppShellProps) {
  return <div className={['bh-app-shell',className].filter(Boolean).join(' ')} data-blueheart="app-shell">
    <Header {...header}/>
    <div className="bh-app-shell-content">
      <Sidebar {...sidebar}/>
      <Content className="bh-app-shell-main" aria-label={contentLabel}>
        <SectionHeader {...sectionHeader}/>
        <div className="bh-app-shell-body" data-layout={bodyLayout}>
          {bodyLayout === 'conversation' || bodyLayout === 'conversation-preview' ? <>
            <div className="bh-app-shell-conversation" data-slot="body"
              hidden={bodyLayout === 'conversation-preview' && documentExpanded}
              inert={bodyLayout === 'conversation-preview' && documentExpanded ? true : undefined}>{children}</div>
            {bodyLayout === 'conversation-preview' && documentPreview &&
              <div className="bh-app-shell-document" data-slot="document-preview">{documentPreview}</div>}
            {rightSidebar && <div className="bh-app-shell-right" data-slot="right-sidebar">{rightSidebar}</div>}
          </> : children}
        </div>
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
