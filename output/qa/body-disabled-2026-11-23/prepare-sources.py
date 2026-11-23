from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parents[3]
roles=[('text','neutral-soft','VariableID:6:169',['TEXT_FILL']),('bg','neutral-subtle','VariableID:6:167',['FRAME_FILL','SHAPE_FILL']),('stroke','neutral-muted','VariableID:6:168',['STROKE_COLOR']),('shape','neutral-soft','VariableID:6:169',['SHAPE_FILL'])]
labels={'text':'Texto','bg':'Superficie de fondo','stroke':'Borde','shape':'Relleno de formas e iconos'}
variables=[]
for role,alias,source_id,scopes in roles:
 name='body/color/'+role+'/disabled'
 variables.append({'id':'body-disabled:component:'+role,'name':name,'resolvedType':'COLOR','description':f'Body · {labels[role]} para contenido de producto no disponible (disabled). Consume {alias} en los cuatro temas. Scope exclusivo por propiedad; el color no deshabilita interacciones.','scopes':scopes,'codeSyntax':{'WEB':'var(--body-color-'+role+'-disabled)'},'valuesByMode':{m:{'type':'VARIABLE_ALIAS','id':source_id} for m in ['Contable','Administrativo','Servicios','Personas']}})
d={'schema_version':1,'kind':'DELEGATED_TOKEN_DATA','contract':'FOUNDATIONS-BODY-DISABLED-001','version':'1.0.0','source':'Solicitud explícita del usuario 2026-11-23: colores disabled de Body con focus/scopes por propiedad. Mapeos DERIVED de Button/Input y de la escala neutral vigente.','collections':[{'name':'component','modes':[{'name':m,'modeId':m} for m in ['Contable','Administrativo','Servicios','Personas']],'variables':variables}]}
path=ROOT/'specs/tokens/body.disabled.v1.0.0.json'
if path.exists():raise ValueError('Source already exists; inspect before updating')
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n');h=hashlib.sha256(path.read_bytes()).hexdigest()
policy_path=ROOT/'specs/tokens/visibility.body-only.correction.json';p=json.loads(policy_path.read_text());body=p['selectorVisibilityPolicy']['bodyTokens']
assert len(body)==57
body.extend({'name':v['name'],'resolvedType':'COLOR','scopes':v['scopes']} for v in variables)
policy_path.write_text(json.dumps(p,ensure_ascii=False,indent=2)+'\n');ph=hashlib.sha256(policy_path.read_bytes()).hexdigest()
config_path=ROOT/'config/web-inputs.json';cfg=json.loads(config_path.read_text())
for source in cfg['token_sources']:
 if source['path']==str(policy_path.relative_to(ROOT)):source['sha256']=ph
cfg['token_sources'].append({'path':str(path.relative_to(ROOT)),'sha256':h});config_path.write_text(json.dumps(cfg,ensure_ascii=False,indent=2)+'\n')
contract=ROOT/'specs/foundations/token-visibility.contract.v1.0.0.md';s=contract.read_text();old='99f113fd06a414b17d3865f3c9a5ef95e0bd1860278db46a0bff8c512fb30f1e';assert old in s;s=s.replace(old,ph);contract.write_text(s)
(Path(__file__).parent/'source-pins.json').write_text(json.dumps({'body_disabled_sha256':h,'visibility_sha256':ph},indent=2)+'\n')
print(json.dumps({'tokens_added':len(variables),'body_total':len(body),'body_disabled_sha256':h,'visibility_sha256':ph}))
