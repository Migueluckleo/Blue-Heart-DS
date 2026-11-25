'use client';

import { DownloadSimpleIcon } from '@phosphor-icons/react/dist/csr/DownloadSimple';
import { useState } from 'react';
import { Button, FloatingActions } from '../index';

// example: floating-actions
export function FloatingActionsExample() {
  const [count,setCount]=useState(3);
  const [message,setMessage]=useState('');
  const countLabel=count.toLocaleString('es-MX');
  return <div className="my-4 space-y-3">
    <Button id="demo-floating-open" label="Preparar selección" onClick={()=>{setCount(3);setMessage('');}}/>
    {count>0&&<div className="overflow-x-auto">
      <FloatingActions className="w-[1024px]" count={countLabel} label="Elementos seleccionados"
        selection={{
          page:{countLabel:'50 comprobantes',context:'Página 1 de 12'},
          all:{countLabel:'2,600 comprobantes',context:'Todas las páginas'},
          onSelect:scope=>setCount(scope==='page'?50:2600),
        }}
        actions={<>
          <Button variant="text" label="Descargar XML" showLeftIcon leftIcon={{component:DownloadSimpleIcon}}
            onClick={()=>setMessage(`Selección de muestra para XML: ${countLabel} comprobantes.`)}/>
          <Button variant="text" label="Descargar PDF" showLeftIcon leftIcon={{component:DownloadSimpleIcon}}
            onClick={()=>setMessage(`Selección de muestra para PDF: ${countLabel} comprobantes.`)}/>
        </>}
        onDismiss={()=>{setCount(0);document.getElementById('demo-floating-open')?.focus();}}/>
    </div>}
    <p id="demo-floating-result" role="status">{message}</p>
  </div>;
}
