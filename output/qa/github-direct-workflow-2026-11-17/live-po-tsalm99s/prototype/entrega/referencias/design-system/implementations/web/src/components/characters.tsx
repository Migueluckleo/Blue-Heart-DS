import type { SVGProps } from 'react';
import artwork from '../generated/characters.json';

export type CharacterFrame = '01' | '02' | '03' | '04' | '05' | '06' | '07';

export type CharactersProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'viewBox'> & {
  /** Opt in to the source loop. Reduced motion keeps the selected pose. */
  playing?: boolean;
  /** The illustration is decorative when no label is provided. */
  label?: string;
} & (
  | { character: 'beni'; frame?: Exclude<CharacterFrame, '07'> }
  | { character: 'navi'; frame?: CharacterFrame }
);

interface Layer {
  id: string;
  d: string;
  transform: number[];
  rule: 'evenodd' | 'nonzero';
  opacity: number;
  token: string;
}

const characters = artwork.characters as Record<CharactersProps['character'], {
  frames: Partial<Record<CharacterFrame, Record<string, Layer>>>;
  order: string[];
}>;

export function Characters({
  character, frame = '01', playing = false, label, className,
  width = artwork.width, height, ...props
}: CharactersProps) {
  const asset = characters[character];
  const layers = asset.frames[frame] ?? asset.frames['01']!;
  return (
    <svg {...props} className={className ? `bh-character ${className}` : 'bh-character'}
      data-blueheart="characters" data-character={character} data-frame={frame} data-playing={playing}
      viewBox={`0 0 ${artwork.width} ${artwork.height}`} width={width}
      height={height ?? (typeof width === 'number' ? width * artwork.height / artwork.width : undefined)}
      overflow="visible" focusable="false" role={label ? 'img' : undefined}
      aria-label={label} aria-hidden={label ? undefined : true}>
      {asset.order.map(part => {
        const layer = layers[part];
        return <path key={part} data-part={part} data-node-id={layer.id} d={layer.d}
          fillRule={layer.rule} fill={`var(${layer.token})`} opacity={layer.opacity}
          transform={`matrix(${layer.transform.join(' ')})`}/>;
      })}
    </svg>
  );
}
