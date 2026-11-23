'use client';

import { useState, type CSSProperties } from 'react';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { AppShell } from '../components/app-shell';
import { MenuItem } from '../components/menu-item';
import { Button } from '../components/button';
import { IconButton } from '../components/icon-button';
import { Badge } from '../components/badge';
import { Checkbox } from '../components/checkbox';
import { LinearProgress } from '../components/linear-progress';

export function BodyPlayground() {
  const [theme,setTheme] = useState('Contable');
  const [collapsed,setCollapsed] = useState(true);
  const [matches,setMatches] = useState(true);
  const [pending,setPending] = useState(false);
  const [notice,setNotice] = useState('');
  const completion=25+(matches?50:0)+(pending?25:0);
  const demo=(name:string)=>setNotice(`Vista de demostración: ${name}.`);
  return <main data-ds-theme={theme.toLowerCase()} className="bh-body-playground">
    <h1 className="bh-body-h1">Playground · Body</h1>
    <label>Tema del Playground
      <select value={theme} onChange={event=>setTheme(event.target.value)}>
        {['Contable','Administrativo','Servicios','Personas'].map(value=><option key={value}>{value}</option>)}
      </select>
    </label>
    <div className="bh-body-playground-scroll">
      <AppShell className="bh-body-playground-shell" bodyLayout="flex"
        contentAs="section" contentLabel="Contenido de producto en Playground"
        header={{actions:{actions:3}}}
        sidebar={{label:'Navegación de Playground',collapsed,onCollapsedChange:setCollapsed,
          collapsedMenuItems:<MenuItem label="Inicio de Playground" href="#body-demo" current showRightIcon={false} showBeta={false}/>,
          expandedMenuItems:<MenuItem type="expanded" label="Inicio de Playground" href="#body-demo" current showRightIcon={false} showBeta={false}/>}}
        sectionHeader={{title:'Resumen de la operación',headingLevel:2,
          description:'Datos de demostración para explorar contenido propio de cada producto.'}}>
        <div className="bh-body-content" id="body-demo">
          <div className="bh-body-demo-row" data-columns="2">
            <article className="bh-body-demo-card" data-demo-kind="summary" aria-label="Resumen operativo">
              <div className="bh-body-title-description"><h3 className="bh-body-h2">Resumen operativo</h3><p className="bh-body-description">Saldos, ingresos y avance de tu operación.</p></div>
              <div className="bh-body-metrics">
                <div className="bh-body-title-description"><p className="bh-body-h1 bh-body-brand">$248,500</p><p className="bh-body-description">Saldo disponible</p></div>
                <div className="bh-body-title-description"><p className="bh-body-h1">$86,420</p><p className="bh-body-description">Ventas del periodo</p></div>
              </div>
              <div className="bh-body-widget"><p className="bh-body-h3">Objetivo mensual</p><LinearProgress label="Avance del objetivo" value={75} showHelperText={false}/></div>
              <div className="bh-body-toolbar"><Button size="small" label="Ver balance" onClick={()=>demo('balance')}/><Button variant="text" size="small" label="Ver movimientos" onClick={()=>demo('movimientos')}/></div>
              <p className="bh-body-caption" data-body-tone="information">Datos de ejemplo · Noviembre</p>
            </article>
            <article className="bh-body-demo-card" data-demo-kind="receivables" aria-label="Cobranza prioritaria">
              <div className="bh-body-title-description"><h3 className="bh-body-h2">Cobranza prioritaria</h3><p className="bh-body-description">Anticipa · Cuentas que necesitan seguimiento.</p></div>
              <div className="bh-body-information-segment">
                {[['Comercial del Norte','$12,500','Vence hoy'],['Servicios del Centro','$8,240','En 3 días'],['Operadora del Sur','$4,600','En 5 días']].map(([name,amount,due])=><div className="bh-body-detail-row" key={name}>
                  <div className="bh-body-title-description bh-body-grow"><p className="bh-body-description bh-body-primary">{name}</p><p className="bh-body-caption">Vencimiento de ejemplo</p></div>
                  <div className="bh-body-title-description bh-body-amount"><p className="bh-body-h3">{amount}</p><Badge type="warning" size="small" label={due}/></div>
                </div>)}
              </div>
              <div className="bh-body-toolbar"><Button variant="secondary" size="small" label="Revisar cobranza" onClick={()=>demo('cobranza')}/><p className="bh-body-caption" data-body-tone="warning">3 de 18 pendientes</p></div>
            </article>
          </div>
          <div className="bh-body-demo-row" data-columns="3">
            <article className="bh-body-demo-card" data-demo-kind="channels" aria-label="Ventas por canal">
              <div className="bh-body-title-description"><h3 className="bh-body-h2">Ventas por canal</h3><p className="bh-body-description">Vende · Distribución del objetivo del mes.</p></div>
              <div className="bh-body-segments"><LinearProgress label="Tienda en línea" value={75} showHelperText={false}/><LinearProgress label="Mostrador" value={50} showHelperText={false}/><LinearProgress label="Distribuidores" value={25} showHelperText={false}/></div>
              <div className="bh-body-toolbar"><Badge type="info" size="small" label="Meta en progreso"/><Button variant="text" size="small" label="Ver reporte" onClick={()=>demo('reporte de ventas')}/></div>
              <p className="bh-body-caption" data-body-tone="success">Mayor actividad en línea · Datos ficticios</p>
            </article>
            <article className="bh-body-demo-card" data-demo-kind="reconciliation" aria-label="Conciliación">
              <div className="bh-body-title-description"><h3 className="bh-body-h2">Conciliación</h3><p className="bh-body-description">Configura y continúa la revisión del periodo.</p></div>
              <div className="bh-body-toolbar"><p className="bh-body-h1 bh-body-brand">{completion} %</p><Badge type="info" size="small" label="En proceso"/></div>
              <LinearProgress label="Movimientos conciliados" value={completion} type="success" showHelperText={false}/>
              <div className="bh-body-information-segment"><Checkbox label="Revisar coincidencias" showLabel selected={matches} onSelectedChange={setMatches}/><Checkbox label="Incluir movimientos pendientes" showLabel selected={pending} onSelectedChange={setPending}/></div>
              <Button variant="secondary" size="small" label="Continuar conciliación" onClick={()=>demo(`conciliación al ${completion} %`)}/>
            </article>
            <article className="bh-body-demo-card" data-demo-kind="review" aria-label="Revisión pendiente">
              <div className="bh-body-title-description"><h3 className="bh-body-h2">Revisión pendiente</h3><p className="bh-body-description">Casos que requieren atención de tu equipo.</p></div>
              <div className="bh-body-widget"><p className="bh-body-description" data-body-tone="danger">3 casos requieren atención</p><p className="bh-body-caption">Hay diferencias en los datos de ejemplo.</p></div>
              <div className="bh-body-information-segment">{['Referencia y RFC','Comprobante duplicado'].map(label=><div className="bh-body-detail-row" key={label}><p className="bh-body-description bh-body-primary bh-body-grow">{label}</p><IconButton variant="ghost" size="small" icon={EyeIcon} label={`Ver ${label}`} onClick={()=>demo(label)}/></div>)}</div>
              <div className="bh-body-toolbar"><Button size="small" label="Revisar casos" onClick={()=>demo('casos pendientes')}/><Button variant="text" size="small" label="Ver todos" onClick={()=>demo('todos los casos')}/></div>
            </article>
          </div>
          {notice && <p role="status" className="bh-body-caption" id="body-demo-feedback">{notice}</p>}
        </div>
      </AppShell>
    </div>
    <section className="bh-body-color-specimen" aria-labelledby="body-color-title">
      <div className="bh-body-title-description">
        <h2 className="bh-body-h2" id="body-color-title">Body · Colores por propiedad</h2>
        <p className="bh-body-description">Roles para contenido específico de producto: texto, fondos, bordes y formas.</p>
      </div>
      <div className="bh-body-color-scroll">
        <div className="bh-body-color-head bh-body-caption" aria-hidden="true">
          <span>Rol</span><span>Texto</span><span>Fondo</span><span>Borde</span><span>Forma / icono</span>
        </div>
        <dl className="bh-body-color-rows">
          {(['primary','secondary','brand','warning','caution','success','danger','information'] as const).map(tone=>{
            const labels={primary:'Principal',secondary:'Secundario',brand:'Marca',warning:'Advertencia',caution:'Precaución',success:'Éxito',danger:'Peligro',information:'Información'};
            const bg=tone==='secondary'?'emphasis':tone;
            return <div className="bh-body-color-row" key={tone} data-color-tone={tone} style={{
              '--bh-body-sample-text':`var(--body-color-text-${tone})`,
              '--bh-body-sample-bg':`var(--body-color-bg-${bg})`,
              '--bh-body-sample-stroke':`var(--body-color-stroke-${tone})`,
              '--bh-body-sample-shape':`var(--body-color-shape-${tone})`,
            } as CSSProperties}>
              <dt className="bh-body-h3">{tone}</dt>
              <dd className="bh-body-color-text bh-body-description" data-color-property="text" aria-label={`Texto ${tone}`}>{labels[tone]}</dd>
              <dd className="bh-body-color-bg bh-body-description" data-color-property="bg" aria-label={`Fondo ${bg}`}>{labels[tone]}</dd>
              <dd className="bh-body-color-stroke bh-body-caption" data-color-property="stroke" aria-label={`Borde ${tone}`}>{tone==='secondary'?'Decorativo':'Contorno'}</dd>
              <dd className="bh-body-color-shape bh-body-caption" data-color-property="shape" aria-label={`Forma ${tone}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>Relleno
              </dd>
            </div>;
          })}
        </dl>
      </div>
      <div className="bh-body-inverse-sample" data-color-role="inverse">
        <span className="bh-body-h3">shape/inverse</span>
        <svg viewBox="0 0 80 48" width="80" height="48" role="img" aria-label="Forma blanca inverse sobre una forma de marca">
          <rect width="80" height="48" />
          <circle cx="40" cy="24" r="12" />
        </svg>
        <p className="bh-body-caption">Blanco para formas e iconos sobre superficies gráficas oscuras o intensas. Consume neutral-base → neutral/100 (#FFFFFF); solo SHAPE_FILL.</p>
      </div>
      <p className="bh-body-caption">Borde secondary es un separador decorativo. Figma comparte SHAPE_FILL para formas e iconos; los fondos de shapes también aparecen en ese selector.</p>
    </section>
  </main>;
}
