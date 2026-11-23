import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { InlineNotification } from '../src/components/inline-notification.tsx';

const render=props=>renderToStaticMarkup(createElement(InlineNotification,{title:'Revisión pendiente',description:'Hay comprobantes por revisar.',...props}));

test('Inline Notification keeps CTA off by default and uses one Secondary small when enabled',()=>{
  const configured={ctaLabel:'Revisar comprobantes',onCta:()=>{}};
  assert.doesNotMatch(render(configured),/<button/);
  const html=render({...configured,showCta:true,type:'warning',link:{href:'#detalle',label:'Ver historial'}});
  assert.equal((html.match(/<button/g)??[]).length,1);
  assert.match(html,/data-variant="secondary"/);assert.match(html,/data-size="small"/);
  assert.match(html,/Revisar comprobantes/);assert.match(html,/role="alert"/);assert.match(html,/href="#detalle"/);
});

test('Inline Notification CTA visibility is independent from description and dismissal',()=>{
  const html=render({showCta:true,showDescription:false,showDismiss:false});
  assert.match(html,/Ver detalles/);assert.doesNotMatch(html,/Hay comprobantes por revisar|Cerrar notificación/);
  assert.match(html,/role="status"/);
  const empty=render({showTitle:false,showDescription:false,showIcon:false,showDismiss:false});
  assert.equal(empty,'');
});

test('Inline Notification uses the provided Isotipo only when the indicator is visible',()=>{
  const isotipo={src:'/assets/inline-notification-isotipo-contabilidad.svg',alt:'Contabilidad'};
  assert.match(render({isotipo}),/<img[^>]+alt="Contabilidad"/);
  assert.doesNotMatch(render({isotipo,showIcon:false}),/<img|bh-inline-indicator/);
  assert.doesNotMatch(render({}),/<img/);
});
