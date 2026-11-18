'use client';

import { InputChoice } from './input';
import { PaginationItem, type PaginationDirection } from './pagination-item';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  type?: 'default' | 'compact';
  label?: string;
  range?: string;
  rangePosition?: 'left' | 'right';
  totalRecords?: number;
  pageSize?: number;
  pageLabel?: string;
  touchTargets?: boolean;
  rows?: {
    label?: string;
    value: number;
    options: readonly number[];
    onChange: (value: number) => void;
  };
}

type PageMarker = number | 'earlier' | 'later';
const pageRange = (start: number, count: number) => Array.from({length: count}, (_, index) => start + index);

function pageMarkers(current: number, total: number): PageMarker[] {
  if (total <= 7) return pageRange(1,total);
  if (current <= 4) return [...pageRange(1,5),'later',total];
  if (current >= total - 3) return [1,'earlier',...pageRange(total-4,5)];
  return [1,'earlier',current-1,current,current+1,'later',total];
}

export function Pagination({currentPage, totalPages, onPageChange, type = 'default', label = 'Paginación',
  range, rangePosition = 'left', totalRecords, pageSize = 20, pageLabel, touchTargets = false, rows}: PaginationProps) {
  const records = typeof totalRecords === 'number' && Number.isSafeInteger(totalRecords) && totalRecords >= 0
    ? totalRecords : undefined;
  const size = rows?.value ?? pageSize;
  const hasRecordRange = records !== undefined && Number.isSafeInteger(size) && size > 0;
  const pages = hasRecordRange ? Math.max(1, Math.ceil(records / size)) : totalPages;
  if (!Number.isSafeInteger(pages) || pages < 1 || (!hasRecordRange && pages < 2)) return null;
  const page = Number.isSafeInteger(currentPage) ? Math.max(1,Math.min(currentPage,pages)) : 1;
  const computedRange = hasRecordRange
    ? `${records === 0 ? 0 : (page - 1) * size + 1}-${Math.min(page * size, records)} de ${records} ${records === 1 ? 'registro' : 'registros'}`
    : undefined;
  const recordRange = range ?? computedRange;
  function arrow(direction: PaginationDirection, accessibleLabel: string, destination: number, disabled: boolean) {
    return <PaginationItem type="icon" direction={direction} accessibleLabel={accessibleLabel}
      disabled={disabled} touchTarget={touchTargets} onActivate={() => onPageChange(destination)}/>;
  }

  return <nav className="bh-pagination" data-blueheart="pagination" data-type={type} data-range-position={rangePosition} aria-label={label}>
    {recordRange && <span className="bh-pagination-range" aria-live="polite">{recordRange}</span>}
    {type === 'compact' ? <>
      {arrow('previous','Página anterior',page-1,page===1)}
      <span className="bh-pagination-position" aria-live="polite">{pageLabel ?? `Página ${page} de ${pages}`}</span>
      {arrow('next','Página siguiente',page+1,page===pages)}
    </> : <>
      <div className="bh-pagination-pages">
        {arrow('first','Primera página',1,page===1)}
        {arrow('previous','Página anterior',page-1,page===1)}
        {pageMarkers(page,pages).map(marker => typeof marker === 'number'
          ? <PaginationItem key={marker} type="page" label={String(marker)} accessibleLabel={`Página ${marker}`}
              selected={marker===page} touchTarget={touchTargets} onActivate={() => {
                if (marker !== page) onPageChange(marker);
              }}/>
          : <PaginationItem key={marker} type="ellipsis"/>)}
        {arrow('next','Página siguiente',page+1,page===pages)}
        {arrow('last','Última página',pages,page===pages)}
      </div>
      {rows && <div className="bh-pagination-rows">
        <InputChoice label={rows.label ?? 'Filas por página'} value={rows.value} options={rows.options} onValueChange={rows.onChange}/>
      </div>}
    </>}
  </nav>;
}
