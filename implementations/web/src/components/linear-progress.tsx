import { useId, type CSSProperties } from 'react';

export type LinearProgressType = 'primary' | 'success' | 'warning' | 'error';
export type LinearProgressSize = 'small' | 'medium' | 'large';

export interface LinearProgressProps {
  id?: string;
  label: string;
  helperText?: string;
  /** Omit while the total is unknown. */
  value?: number;
  valueText?: string;
  size?: LinearProgressSize;
  type?: LinearProgressType;
  showLabel?: boolean;
  showValue?: boolean;
  showHelperText?: boolean;
  /** Collapse the reserved header when showing only the rail. */
  showHeader?: boolean;
  className?: string;
}

export function LinearProgress({id, label, helperText, value, valueText, size = 'small', type = 'primary',
  showLabel = true, showValue = true, showHelperText = true, showHeader = true, className}: LinearProgressProps) {
  const instance = useId();
  const trackId = id ?? instance;
  const helperId = `${trackId}-helper`;
  const determinate = value !== undefined && Number.isFinite(value);
  const percent = determinate ? Math.min(100, Math.max(0, value)) : undefined;
  const visibleValue = valueText ?? (percent === undefined ? '—' : `${Math.round(percent)}%`);
  const visibleHelper = showHelperText && Boolean(helperText);
  const style = { '--bh-progress-width': percent === undefined ? undefined : `${percent}%` } as CSSProperties;

  return <div className={['bh-linear-progress', className].filter(Boolean).join(' ')} data-blueheart="linear-progress"
    data-size={size} data-type={type} data-determinate={determinate} style={style}>
    {showHeader && <div className="bh-linear-progress-header">
      {showLabel && <span>{label}</span>}
      {showValue && visibleValue && <span aria-hidden="true" className="bh-linear-progress-value">{visibleValue}</span>}
    </div>}
    <div id={trackId} className="bh-linear-progress-track" role="progressbar" aria-label={label}
      aria-describedby={visibleHelper ? helperId : undefined} aria-valuemin={0} aria-valuemax={100}
      aria-valuenow={percent} aria-valuetext={determinate ? valueText : undefined}>
      <span aria-hidden="true" className="bh-linear-progress-indicator"/>
    </div>
    {visibleHelper && <p className="bh-linear-progress-helper" id={helperId}>{helperText}</p>}
  </div>;
}
