'use client';

import { BuildingsIcon } from '@phosphor-icons/react/dist/csr/Buildings';
import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';

export interface CompanySelectorProps {
  id?: string;
  companyName: string;
  rfc: string;
  open?: boolean;
  controls?: string;
  onToggle?: () => void;
}

export function CompanySelector({id,companyName,rfc,open=false,controls,onToggle}:CompanySelectorProps) {
  return <button id={id} type="button" className="bh-company-selector" data-blueheart="company-selector"
    aria-label={`Empresa activa: ${companyName}, ${rfc}`} aria-haspopup="listbox" aria-expanded={open}
    aria-controls={controls} onClick={onToggle}>
    <span className="bh-company-tile"><BuildingsIcon weight="light" aria-hidden="true"/></span>
    <span className="bh-company-info">
      <span className="bh-company-name">{companyName}</span>
      <span className="bh-company-rfc">{rfc}</span>
    </span>
    <CaretDownIcon className="bh-company-caret" weight="light" aria-hidden="true"/>
  </button>;
}
