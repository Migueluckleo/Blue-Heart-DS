'use client';

import type { ReactNode } from 'react';
import { Pagination, type PaginationProps } from './pagination';

export interface TableProps {
  label: string;
  viewportLabel?: string;
  viewportHeight?: number;
  columnWidths?: readonly number[];
  children: ReactNode;
  pagination?: PaginationProps;
  className?: string;
}

export function Table({label, viewportLabel = `Desplazamiento de ${label}`, viewportHeight = 360,
  columnWidths, children, pagination, className}: TableProps) {
  const widths = columnWidths?.length ? columnWidths : undefined;
  return <div className={['bh-table',className].filter(Boolean).join(' ')} data-blueheart="table">
    <div className="bh-table-viewport" role="region" aria-label={viewportLabel} tabIndex={0} style={{height:viewportHeight}}>
      <table className="bh-table-content" aria-label={label} style={{minWidth:widths?.reduce((sum,width)=>sum+width,0)}}>
        {widths && <colgroup>{widths.map((width,index)=><col key={index} style={{width}}/>)}</colgroup>}
        {children}
      </table>
    </div>
    {pagination && <div className="bh-table-pagination"><Pagination {...pagination}/></div>}
  </div>;
}
