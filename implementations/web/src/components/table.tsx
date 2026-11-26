'use client';

import type { ReactNode } from 'react';
import { Pagination, type PaginationProps } from './pagination';

export interface TableProps {
  label: string;
  viewportLabel?: string;
  /** Optional maximum viewport height in pixels. Content shorter than this hugs its rows. */
  viewportHeight?: number;
  columnWidths?: readonly number[];
  stickyActions?: boolean;
  children: ReactNode;
  pagination?: PaginationProps;
  className?: string;
}

export function Table({label, viewportLabel = `Desplazamiento de ${label}`, viewportHeight,
  columnWidths, stickyActions = false, children, pagination, className}: TableProps) {
  const widths = columnWidths?.length ? columnWidths : undefined;
  return <div className={['bh-table',className].filter(Boolean).join(' ')} data-blueheart="table" data-sticky-actions={stickyActions}>
    <div className="bh-table-viewport" role="region" aria-label={viewportLabel} tabIndex={0} style={viewportHeight === undefined ? undefined : {maxHeight: viewportHeight}}>
      <table className="bh-table-content" aria-label={label} style={{minWidth:widths?.reduce((sum,width)=>sum+width,0)}}>
        {widths && <colgroup>{widths.map((width,index)=><col key={index} style={{width}}/>)}</colgroup>}
        {children}
      </table>
    </div>
    {pagination && <div className="bh-table-pagination"><Pagination {...pagination}/></div>}
  </div>;
}
