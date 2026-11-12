export interface TooltipProps {
  id: string;
  label?: string;
  title?: string;
  type?: 'simple' | 'rich';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  arrow?: 'start' | 'center' | 'end';
  hidden?: boolean;
}

export function Tooltip({id, label = 'Tooltip', title = 'Title', type = 'simple',
  placement = 'top', arrow = 'start', hidden = false}: TooltipProps) {
  return <span id={id} role="tooltip" hidden={hidden} className="bh-tooltip"
    data-blueheart="tooltip" data-placement={placement} data-arrow={arrow} data-type={type}>
    <span className="bh-tooltip-body">
      {type === 'rich' && <span className="bh-tooltip-title">{title}</span>}
      <span className="bh-tooltip-label">{label}</span>
    </span>
    <span aria-hidden="true" className="bh-tooltip-arrow"><span/></span>
  </span>;
}
