import type { ReactNode } from 'react';
export function DSNode({id,component,props,children}:{id:string;component:string;props:Record<string,unknown>;children:ReactNode}) {
  return <div style={{display:'contents'}} data-ds-node={id} data-ds-component={component} data-ds-props={JSON.stringify(props)}>{children}</div>;
}
