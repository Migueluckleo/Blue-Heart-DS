import type { CSSProperties } from 'react';
import data from '../generated/loader-recipes.json';

export const loaderSizes = ['extra-small', 'small', 'medium', 'large', 'extra-large', '2x-large'] as const;
export const loaderColors = ['brand', 'neutral', 'strong', 'on-color'] as const;
export type LoaderSize = typeof loaderSizes[number];
export type LoaderColor = typeof loaderColors[number];
export type LoaderKey = `${LoaderSize}/${LoaderColor}`;

export interface LoaderProps {
  size?: LoaderSize;
  color?: LoaderColor;
  /** Set when this instance provides the host's status announcement. */
  label?: string;
  className?: string;
}

export const token = (name: string) => `var(${name})`;
export const length = (name: string) => `calc(${token(name)} * 1px)`;
export const loaderRecipes = data satisfies Record<LoaderKey, {
  id: string; diameter: string; weight: string; track: string; arc: string; trackOpacity: number;
}>;
export const loaderKeyById = Object.fromEntries(
  Object.entries(loaderRecipes).map(([key, recipe]) => [recipe.id, key as LoaderKey]),
);

export function Loader({size = 'extra-small', color = 'brand', label, className}: LoaderProps) {
  const recipe = loaderRecipes[`${size}/${color}`];
  const diameter = length(recipe.diameter);
  const style = {width: diameter, height: diameter, '--bh-loader-stroke': length(recipe.weight)} as CSSProperties;
  return (
    <span className={['bh-loader', className].filter(Boolean).join(' ')} style={style}
      data-blueheart="loader" data-size={size} data-color={color}
      role={label ? 'status' : undefined} aria-live={label ? 'polite' : undefined} aria-hidden={label ? undefined : true}>
      {label && <span className="sr-only">{label}</span>}
      <svg aria-hidden="true" focusable="false" width="100%" height="100%">
        <circle className="bh-loader-ring" cx="50%" cy="50%" fill="none"
          stroke={token(recipe.track)} strokeOpacity={recipe.trackOpacity}/>
        <circle className="bh-loader-ring bh-loader-arc" cx="50%" cy="50%" fill="none" pathLength="4"
          stroke={token(recipe.arc)} strokeDasharray="1 3" strokeLinecap="round"/>
      </svg>
    </span>
  );
}
