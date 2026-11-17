import type { ReactNode } from 'react';
export function DSNode({id,component,props,children,verifiedExport}:{id:string;component:string;props:Record<string,unknown>;children:ReactNode;verifiedExport?:string}) {
  return <div style={{display:'contents'}} data-ds-node={id} data-ds-component={component}
    data-ds-props={JSON.stringify(props)} data-ds-export={verifiedExport}>{children}</div>;
}
