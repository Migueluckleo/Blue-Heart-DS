"""Build one read-only evidence model and deterministic Markdown/YAML projections."""
from pathlib import Path
from collections import Counter, defaultdict
import hashlib,json,re,subprocess

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
raw=json.loads((HERE/'raw-evidence.json').read_text())
nodes=raw['nodes'];by_node={n['id']:n for n in nodes}
variables=raw['variables'];by_var={v['id']:v for v in variables}
root=raw['identity']['node'];source=raw['source']
evidence=[]
def ev(path,value,note=None):
 ident=f'E{len(evidence)+1:04d}'
 evidence.append({'id':ident,'source':path,'value':value,'note':note})
 return ident
def ref(node,key):return [ev('node:'+node['id']+'.'+key,node.get(key))] if key in node else []
def info(node):return {k:node.get(k) for k in ['id','name','type']}
def binding(node,key):
 value=node.get('boundVariables',{}).get(key)
 if isinstance(value,list):
  value=next((x for x in value if isinstance(x,dict) and x.get('type')=='VARIABLE_ALIAS'),None)
 return by_var.get(value.get('id')) if isinstance(value,dict) else None
def pv(value,unit=None,refs=None,availability='OBSERVED'):
 return {'resolved_value':value,'unit':unit,'availability':availability,'evidence_refs':refs or []}
def field(node,key,unit=None,value_key=None):
 val=node.get(key)
 if value_key and isinstance(val,dict):val=val.get(value_key)
 result=pv(val,unit,ref(node,key),'OBSERVED' if key in node else 'UNKNOWN')
 token=binding(node,key)
 if token:result={'token':{k:token[k] for k in ['id','key','name']},**result}
 return result
def fontfield(node,property_name,bound_field):
 value=node.get('fontName',{}).get(property_name)
 result=pv(value,None,ref(node,'fontName'))
 token=binding(node,bound_field)
 if token:result={'token':{k:token[k] for k in ['id','key','name']},**result}
 return result
def layout(node):
 return {'node':info(node),'position':{'x':node.get('x'),'y':node.get('y'),'absolute_x':None,'absolute_y':None,'unit':'px'},
  'layout_mode':node.get('layoutMode'),'layout_wrap':node.get('layoutWrap'),'layout_positioning':node.get('layoutPositioning'),
  'sizing':{'horizontal':node.get('layoutSizingHorizontal'),'vertical':node.get('layoutSizingVertical'),'primary_axis_mode':node.get('primaryAxisSizingMode'),'counter_axis_mode':node.get('counterAxisSizingMode')},
  'dimensions':{'width':field(node,'width','px'),'height':field(node,'height','px'),**{f'{a}_{b}':field(node,a+b.title(),'px') if a+b.title() in node else None for a in ['min','max'] for b in ['width','height']}},
  'spacing':{'gap':field(node,'itemSpacing','px') if 'itemSpacing' in node else None,'row_gap':field(node,'counterAxisSpacing','px') if 'counterAxisSpacing' in node else None,'column_gap':None},
  'padding':{side:field(node,'padding'+side.title(),'px') if 'padding'+side.title() in node else None for side in ['top','right','bottom','left']},
  'alignment':{'primary_axis':node.get('primaryAxisAlignItems'),'counter_axis':node.get('counterAxisAlignItems'),'self':node.get('layoutAlign')},
  'constraints':{'horizontal':node.get('constraints',{}).get('horizontal'),'vertical':node.get('constraints',{}).get('vertical')},
  'overflow':None,'clips_content':node.get('clipsContent'),'strokes_included_in_layout':node.get('strokesIncludedInLayout'),'grow':node.get('layoutGrow'),'grids':[],
  'evidence_refs':[ev('node:'+node['id']+'.layout', {k:node.get(k) for k in ['layoutMode','layoutSizingHorizontal','layoutSizingVertical','itemSpacing','constraints']})]}
def paint(p,node,group,index):
 refs=[ev(f'node:{node["id"]}.{group}[{index}]',p)]
 color=pv(p.get('color'),'color',refs,'OBSERVED' if 'color' in p else 'UNKNOWN') if 'color' in p else None
 alias=p.get('boundVariables',{}).get('color')
 if color and alias and alias.get('id') in by_var:
  v=by_var[alias['id']];color={'token':{k:v[k] for k in ['id','key','name']},**color}
 return {'type':pv(p.get('type'),None,refs),'visible':pv(p.get('visible'),None,refs),'opacity':pv(p.get('opacity'),'ratio',refs),'blend_mode':pv(p.get('blendMode'),None,refs),
  'color':color,'gradient_stops':p.get('gradientStops',[]),'image_ref':p.get('imageHash'),'scale_mode':p.get('scaleMode'),'transform':p.get('imageTransform'),'availability':'OBSERVED','evidence_refs':refs}
def visual(node):
 return {'node':info(node),'fills':[paint(p,node,'fills',i) for i,p in enumerate(node.get('fills',[]))],
  'backgrounds':[paint(p,node,'backgrounds',i) for i,p in enumerate(node.get('backgrounds',[]))],
  'strokes':[paint(p,node,'strokes',i) for i,p in enumerate(node.get('strokes',[]))],
  'stroke_width':field(node,'strokeWeight','px'),'stroke_widths':{side:field(node,'stroke'+side.title()+'Weight','px') if 'stroke'+side.title()+'Weight' in node else None for side in ['top','right','bottom','left']},
  'stroke_alignment':field(node,'strokeAlign'),'dash_pattern':field(node,'dashPattern','px'),
  'corner_radius':field(node,'cornerRadius','px') if 'cornerRadius' in node else None,
  'corner_radii':{snake:field(node,camel,'px') if camel in node else None for snake,camel in [('top_left','topLeftRadius'),('top_right','topRightRadius'),('bottom_right','bottomRightRadius'),('bottom_left','bottomLeftRadius')]},
  'opacity':field(node,'opacity','ratio'),'blend_mode':field(node,'blendMode'),'effects':node.get('effects',[]),'shadows':[],'blur':[],
  'clips_content':field(node,'clipsContent'),'is_mask':field(node,'isMask'),'mask_type':field(node,'maskType'),'evidence_refs':[]}

uses=defaultdict(list)
for identity,paths in raw['variable_uses'].items():uses[identity].extend({'node_id':x['nodeId'],'path':x['path'],'kind':'DIRECT_BINDING'} for x in paths)
for v in variables:
 for mode,value in v.get('valuesByMode',{}).items():
  if isinstance(value,dict) and value.get('type')=='VARIABLE_ALIAS':uses[value['id']].append({'variable_id':v['id'],'path':f'valuesByMode.{mode}','kind':'ALIAS_TARGET'})
for style in raw['styles']:
 for key,value in style.get('boundVariables',{}).items():
  if isinstance(value,dict) and value.get('type')=='VARIABLE_ALIAS':uses[value['id']].append({'style_id':style['id'],'path':'boundVariables.'+key,'kind':'STYLE_BINDING'})
def resolve(identity,mode,chain=()):
 assert identity not in chain,('cycle',identity)
 v=by_var[identity];c=v['collection'];mid=next((m['modeId'] for m in c['modes'] if m['name']==mode),c['defaultModeId']);value=v['valuesByMode'][mid]
 if isinstance(value,dict) and value.get('type')=='VARIABLE_ALIAS':return resolve(value['id'],mode,chain+(identity,))
 return value
variable_deps=[]
for v in sorted(variables,key=lambda x:(x['name'].casefold(),x['id'])):
 c=v['collection'];refs=[ev('variable:'+v['id'],v)]
 variable_deps.append({'id':v['id'],'key':v['key'],'name':v['name'],'type':v['resolvedType'],'collection':{k:c.get(k) for k in ['id','key','name']},'locality':'REMOTE' if v['remote'] else 'LOCAL',
  'resolved_value':resolve(v['id'],'Contable'),'resolved_mode':'Contable' if c['name']=='component' else 'Value','used_by':uses[v['id']],
  'resolution':{'status':'RESOLVED','evidence':refs,'missing_fields':[],'reason':None},'evidence_refs':refs})

grouped=defaultdict(list)
for n in nodes:
 if n['type']=='INSTANCE':grouped[n['mainComponent']['id']].append(n)
definitions={d['main']['id']:d for d in raw['dependencies']}
deps=[];external=[]
for identity,instances in sorted(grouped.items(),key=lambda row:(row[1][0]['mainComponent']['name'].casefold(),row[0])):
 d=definitions[identity];m=d['main'];parent=d['parent'];refs=[ev('component:'+identity,d)]
 dep={'dependency_id':m['key'] or source['file_key']+':'+identity,'kind':'COMPONENT','instance_ids':[n['id'] for n in instances],'instance_count':len(instances),
  'main_component':{k:m[k] for k in ['id','key','name']},'component_set':{k:parent[k] for k in ['id','key','name']} if parent else None,'locality':'REMOTE' if m['remote'] else 'LOCAL',
  'active_properties':[{'instance_id':n['id'],'values':n.get('componentProperties',{}),'availability':'OBSERVED','evidence_refs':ref(n,'componentProperties')} for n in instances],
  'property_definitions':[{'name':k,**v,'availability':'AVAILABLE'} for k,v in m.get('componentPropertyDefinitions',{}).items()],
  'variants':{'observed':[m.get('variantProperties',{})],'available':[{'name':k,'values':v.get('variantOptions',[]),'availability':'AVAILABLE'} for k,v in m.get('componentPropertyDefinitions',{}).items() if v.get('type')=='VARIANT'],'unknown':[]},
  'swaps':{'active':[],'preferred_values':[],'preferred_candidate_count':0,'alternatives_deeply_resolved':False},'slots':[],'overrides':[{'instance_id':n['id'],'values':n.get('overrides',[])} for n in instances],
  'resolution':{'status':'RESOLVED','evidence':refs,'missing_fields':[],'reason':None},'contract_ref':{'status':'NOT_GENERATED','suggested_path':'dependencies/'+m['key']+'/component-contract.yaml'}}
 deps.append(dep)
 if m['remote']:
  external.append({'kind':'COMPONENT','id':identity,'key':m['key'],'name':m['name'],'remote':True,'collection':None,'component_set':dep['component_set'],
   **{k:'NOT_EXPOSED_BY_FIGMA_MCP' for k in ['library_name','source_file','source_url','project','organization','library_version']},'resolution':{'status':'PARTIALLY_RESOLVED','evidence':refs,'missing_fields':['library_name','source_file','source_url','project','organization','library_version'],'reason':'La identidad y superficie activas se resolvieron; MCP no expone la procedencia externa completa.'}})

style_deps=[];typography_styles=[]
for s in raw['styles']:
 used=[{'node_id':n['id'],'path':'textStyleId'} for n in nodes if n.get('textStyleId')==s['id']];refs=[ev('style:'+s['id'],s)]
 style_deps.append({'id':s['id'],'key':s['key'],'name':s['name'],'type':s['type'],'locality':'REMOTE' if s['remote'] else 'LOCAL','used_by':used,'resolution':{'status':'RESOLVED','evidence':refs,'missing_fields':[],'reason':None},'evidence_refs':refs})
 typography_styles.append({'style':{**{k:s[k] for k in ['id','key','name']},'locality':'LOCAL'},'font_family':s['fontName']['family'],'font_style':s['fontName']['style'],'font_weight':s['fontName'].get('variationSettings',{}).get('wght'),'font_size':s['fontSize'],'line_height':s['lineHeight'],'letter_spacing':s['letterSpacing'],'paragraph_spacing':s['paragraphSpacing'],'paragraph_indent':s['paragraphIndent'],'text_align_horizontal':None,'text_align_vertical':None,'text_case':s['textCase'],'text_decoration':s['textDecoration'],'bound_variables':s['boundVariables'],'used_by':used,'evidence_refs':refs})
texts=[]
for n in nodes:
 if n['type']!='TEXT':continue
 s=next((s for s in raw['styles'] if s['id']==n.get('textStyleId')),None)
 texts.append({'node':{'id':n['id'],'name':n['name']},'characters':n['characters'],'range':{'start':0,'end':len(n['characters'])},'font_family':fontfield(n,'family','fontFamily'),'font_style':fontfield(n,'style','fontStyle'),
  'font_weight':field(n,'fontWeight'),'font_size':field(n,'fontSize','px'),'line_height':field(n,'lineHeight','px'),'letter_spacing':field(n,'letterSpacing','px'),
  'paragraph_spacing':field(n,'paragraphSpacing','px'),'paragraph_indent':field(n,'paragraphIndent','px'),'text_align_horizontal':n.get('textAlignHorizontal'),'text_align_vertical':n.get('textAlignVertical'),
  'text_case':n.get('textCase'),'text_decoration':n.get('textDecoration'),'text_style':{'id':s['id'] if s else None,'key':s['key'] if s else None,'name':s['name'] if s else None,'locality':'LOCAL' if s else 'UNKNOWN'},
  'auto_resize':n.get('textAutoResize'),'truncation':n.get('textTruncation'),'max_lines':n.get('maxLines'),'bound_variables':n.get('boundVariables',{}),'mixed_fields':[],
  'styled_segments':[{'range':{'start':seg['start'],'end':seg['end']},'characters':seg['characters'],'font_family':seg.get('fontName',{}).get('family'),'font_style':seg.get('fontName',{}).get('style'),'font_weight':seg.get('fontWeight'),'font_size':seg.get('fontSize'),'line_height':seg.get('lineHeight'),'letter_spacing':seg.get('letterSpacing'),'paragraph_spacing':None,'paragraph_indent':None,'text_align_horizontal':None,'text_align_vertical':None,'text_case':seg.get('textCase'),'text_decoration':seg.get('textDecoration'),'fills':seg.get('fills',[]),'text_style':{'id':seg.get('textStyleId') or None,'key':s['key'] if s else None,'name':s['name'] if s else None},'bound_variables':n.get('boundVariables',{}),'evidence_refs':ref(n,'textRuns')} for seg in n.get('textRuns',[])],
  'hyperlinks':[],'evidence_refs':ref(n,'characters')})
def inventory(items):
 local=Counter(x['locality'] for x in items)
 return {'total':len(items),'local':local['LOCAL'],'remote':local['REMOTE'],'unknown_locality':local['UNKNOWN'],'resolved':len(items),'partially_resolved':0,'unresolved':0}
token_categories=defaultdict(list)
for v in variable_deps:
 category='Color' if v['type']=='COLOR' else 'Typography' if '/font/' in v['name'] or 'font-' in v['name'] else 'Spacing' if 'spacing' in v['name'] else 'Radius' if 'radius' in v['name'] else 'Border' if 'stroke' in v['name'] or 'border' in v['name'] else 'Size'
 token_categories[category].append({'name':v['name'],'id':v['id'],'key':v['key'],'type':v['type'],'category':category,'collection':v['collection'],'remote':v['locality']=='REMOTE','resolved_value':v['resolved_value'],'resolved_mode':v['resolved_mode'],'used_by':v['used_by'],'evidence_refs':v['evidence_refs']})
anatomy=[{**row,'evidence_refs':[ev('node:'+row['id']+'.structure',row)]} for row in raw['inventory']['nodes'] if row['type']!='VECTOR']
unresolved=[{'id':'EXT-'+str(i+1),'category':'MCP_LIMITATION','subject':x['key'],'reason':'NOT_EXPOSED_BY_FIGMA_MCP','missing_fields':x['resolution']['missing_fields'],'evidence_refs':x['resolution']['evidence'],'impact':'No impide describir la dependencia activa; no se certifica versión/origen de biblioteca.'} for i,x in enumerate(external)]
unresolved += [{'id':'RESPONSIVE-NOT-EXECUTED','category':'REQUIRES_DEFINITION','subject':'Resize y overflow en otros anchos','reason':'Inspección de solo lectura; no se redimensionaron maestros ni instancias.','missing_fields':['runtime_responsive_test'],'evidence_refs':ref(root,'width'),'impact':'Se documentan FILL/HUG y el ancho observado, no resultados de pruebas a 320 px.'},
 {'id':'LOCAL-BEFORE-NOT-CAPTURED','category':'EVIDENCE_LIMITATION','subject':'Geometría de 222:111 inmediatamente anterior al cambio','reason':'La referencia anterior disponible corresponde a 218:1228 importado, no una captura local inmediatamente anterior.','missing_fields':['pre_change_local_geometry'],'evidence_refs':[ev('historical:sources/figma-snapshots/conversation-response-2026-11-12/selection.json.dependencyReads[node.id=218:1228].node.box',[544,115])],'impact':'No se presenta 115→82 como una medición antes/después del mismo ID local.'}]
component_inventory={'total_instances':sum(x['instance_count'] for x in deps),**inventory(deps)}
model={
 'schema_version':'0.1.0','generated_at':raw['captured_at'],'generator':{'skill':'figma-component-contract','skill_version':'0.1.0'},
 'inspection':{'status':'COMPLETE','read_only':True,'traversal':{'discovered_nodes':len(nodes),'inspected_nodes':len(nodes),'pending_nodes':0,'invisible_nodes_inspected':sum(n['visible'] is False for n in nodes),'truncated':False,'limit':None},'mcp_limitations':raw['limitations']},
 'component':{'id':root['id'],'key':root['key'],'name':root['name'],'type':root['type'],'description':root['description'],'parent':raw['identity']['ancestors'][0],'page':{k:raw['identity']['ancestors'][0][k] for k in ['id','name']},'source':source},
 'classification':{'kind':'component','reusable':True,'composition':False,'evidence_refs':ref(root,'type')},
 'identity':{'position':{k:root[k] for k in ['x','y']},'dimensions':{k:root[k] for k in ['width','height']},'visible':root['visible'],'clips_content':root['clipsContent'],'opacity':root['opacity'],'blend_mode':root['blendMode']},
 'direct_children':[{**row,'evidence_refs':[ev('node:'+row['id']+'.direct_child',row)]} for row in raw['identity']['children']],
 'anatomy':{'functional_tree':anatomy,'graphical_details_omitted':[{'id':n['id'],'name':n['name'],'reason':'Vector interno retenido en evidencia cruda; agregado bajo su icono funcional.'} for n in nodes if n['type']=='VECTOR']},
 'dependency_inventory':{'components':component_inventory,'variables':inventory(variable_deps),'styles':inventory(style_deps)},
 'dependencies':deps,'variable_dependencies':variable_deps,'style_dependencies':style_deps,
 'properties':{'definitions':[{'name':k,**v,'availability':'AVAILABLE','evidence_refs':ref(root,'componentPropertyDefinitions')} for k,v in root['componentPropertyDefinitions'].items()],
  'observed':[{'name':'Title#765:0','value':by_node['222:114']['characters'],'availability':'OBSERVED','evidence_refs':ref(by_node['222:114'],'componentPropertyReferences')}],'available':[],'unknown':[]},
 'variants':{'observed_combinations':[],'available_values':[],'unknown':[]},
 'states':{'observed':[{'name':'Referencia visible','availability':'OBSERVED','evidence_refs':ref(root,'visible')}],'available':[],'unknown':['No se exponen estados interactivos propios en este COMPONENT sin variantes.']},
 'layout':{'node':layout(by_node[root['id']]),'children':[layout(n) for n in nodes if n['id']!=root['id']],
  'relationships':[{'parent_id':row['parent'],'child_id':row['id'],'relationship':'AUTO_LAYOUT_CHILD' if by_node[row['parent']].get('layoutMode') in ['HORIZONTAL','VERTICAL'] else 'STRUCTURAL_CHILD','parent_layout_mode':by_node[row['parent']].get('layoutMode'),'child_layout_positioning':by_node[row['id']].get('layoutPositioning'),'child_sizing':{'horizontal':by_node[row['id']].get('layoutSizingHorizontal'),'vertical':by_node[row['id']].get('layoutSizingVertical')},'evidence_refs':[ev('node:'+row['id']+'.parent',row['parent'])]} for row in raw['inventory']['nodes'] if row['parent']]},
 'visual':{'node':visual(by_node[root['id']]),'descendants':[visual(n) for n in nodes if n['id']!=root['id']],
  'icons':[{'node':info(n),'dimensions':{'width':n['width'],'height':n['height'],'unit':'px'},'format':definitions[n['mainComponent']['id']]['main'].get('variantProperties',{}).get('Format'),'weight':definitions[n['mainComponent']['id']]['main'].get('variantProperties',{}).get('Weight'),'vector_descendant_count':1,'fills':n.get('fills',[]),'strokes':n.get('strokes',[]),'evidence_refs':[ev('instance:'+n['id']+'.mainComponent',n['mainComponent'])]} for n in nodes if n['type']=='INSTANCE' and n['mainComponent']['remote']]},
 'typography':{'styles':typography_styles,'text_runs':texts},
 'tokens':{'summary':{'total':len(variable_deps),'local':len(variable_deps),'remote':0},'categories':dict(token_categories),'source':'variable_dependencies'},
 'content':{'example_content':{'observed_strings':[{'node_id':n['id'],'value':n['characters'],'availability':'OBSERVED','evidence_refs':ref(n,'characters')} for n in nodes if n['type']=='TEXT']},
  'component_rules':[{'property':'Title#765:0','type':'TEXT','description':'Título editable expuesto por el maestro; el texto observado es un ejemplo.','evidence_refs':ref(root,'componentPropertyDefinitions')}],
  'truncation_and_wrapping':[{'node_id':n['id'],'auto_resize':n.get('textAutoResize'),'truncation':n.get('textTruncation'),'max_lines':n.get('maxLines'),'evidence_refs':ref(n,'textAutoResize')+ref(n,'textTruncation')+ref(n,'maxLines')} for n in nodes if n['type']=='TEXT']},
 'interactions':{'status':'UNDEFINED','reason':'Las reacciones leídas en el maestro, descendientes y definiciones activas están vacías; no se infiere una acción de navegación.','rules':[]},
 'semantic_contract':{'explicit_descriptions':[{'node_id':root['id'],'value':root['description'],'evidence_refs':ref(root,'description')}],
  'purpose':{'status':'DEFINED','value':'Mostrar el título de un resultado tabular dentro de Previews de Conversation Response.','evidence_refs':ref(root,'description')},
  'usage_rules':{'status':'DEFINED','value':'Inserción en Previews, conforme a la Description y las dos instancias observadas.','evidence_refs':[ev('consumers',raw['consumers'])]}},
 'accessibility':{'status':'REQUIRES_DEFINITION','observed':[{'description':'Título y etiqueta Tabla visibles; icono Table de 24 × 24 px.','evidence_refs':ref(by_node['222:114'],'characters')+ref(by_node['I222:120;64:118'],'characters')+ref(by_node['222:112'],'width')}],
  'undefined':['La API no expone roles ARIA, nombre accesible, foco de navegador o teclas.','No se realizó evaluación de conformidad WCAG.']},
 'external_dependencies':external,'unresolved':unresolved,
 'implementation_notes':[{'layer':'DERIVED','text':'29 variables ligadas directamente (14 Conversation Response, 15 Badge), más 44 dependencias transitivas de alias; total 73, todas locales.'},
  {'layer':'FIGMA_DIRECT','text':'BENI 222:172 y NAVI 222:267 conservan el maestro 222:111 y heredan Preview details HORIZONTAL, título FILL/HUG y Badge HUG/HUG.','evidence_refs':[ev('consumer_inheritance',raw['inheritance'])]},
  {'layer':'DERIVED','text':'470 = 544 − 2×(16+1) − 24 − 16; 416 = 470 − 8 − 46; 82 = max(48,24) + 2×(16+1). Dimensiones de la referencia, no un tamaño universal.'},
  {'layer':'REQUIRES_DEFINITION','text':'La implementación web inspeccionada conserva flex-col para título y Badge; se registra como pendiente de sincronización, sin generar código en este encargo.'},
  {'layer':'FIGMA_DIRECT','text':'Title devuelve textStyleId vacío, con bindings tipográficos de Conversation Response. Badge usa badge/label-medium local. No se inventa un estilo compartido para Title.'}],
 'evidence':{'figma_direct':evidence,'derived':[{'id':'D001','source':'inventory','value':{'nodes':len(nodes),'instances':4,'unique_components':3,'direct_bound_variables':29,'alias_dependencies':44,'named_styles':1},'note':'Conteos mecánicos y agrupaciones por identidad.'}],
  'requires_definition':[{'id':'R001','source':'inspection_scope','value':'Comportamiento de producto, accesibilidad y pruebas de redimensionamiento no definidos por esta lectura.'}],
  'confidence':{'level':'HIGH','reason':'Se inspeccionaron los 11 nodos sin pendientes, cuatro instancias agrupadas en tres componentes, 73 variables con cadenas completas y un estilo; las limitaciones externas y de alcance están identificadas.'}}
}

def quote(s):
 if not s or s!=s.strip() or s.lower() in ['null','true','false','yes','no','on','off','~'] or s[0].isdigit() or s[0] in '-?:,[]{}#&*!|>\'"%@`' or any(c in s for c in '\n\r\t') or ': ' in s or ' #' in s or re.search(r'(?:^|\b)(?:VariableID|VariableCollectionId|S|I\d+):',s) or re.fullmatch(r'[0-9]+:[0-9:;]+',s):
  return json.dumps(s,ensure_ascii=False)
 return s
def scalar(x):
 if x is None:return 'null'
 if x is True:return 'true'
 if x is False:return 'false'
 if isinstance(x,str):return quote(x)
 return json.dumps(x,ensure_ascii=False,separators=(',',':'))
def yaml_lines(x,level=0):
 pad='  '*level;out=[]
 if isinstance(x,dict):
  for k,v in x.items():
   prefix=pad+quote(str(k))+':'
   if isinstance(v,(dict,list)) and v:out.append(prefix);out+=yaml_lines(v,level+1)
   else:out.append(prefix+' '+scalar(v))
 elif isinstance(x,list):
  for v in x:
   if isinstance(v,(dict,list)) and v:out.append(pad+'-');out+=yaml_lines(v,level+1)
   else:out.append(pad+'- '+scalar(v))
 return out
(HERE/'component-contract.json').write_text(json.dumps(model,ensure_ascii=False,indent=2)+'\n')
(HERE/'component-contract.yaml').write_text('\n'.join(yaml_lines(model))+'\n')

def table(headers,rows):
 esc=lambda x:str(x).replace('|','\\|').replace('\n',' ')
 return '\n'.join(['| '+' | '.join(headers)+' |','| '+' | '.join('---' for _ in headers)+' |',*['| '+' | '.join(esc(v) for v in row)+' |' for row in rows]])
title=by_node['222:114'];details=by_node['222:113'];badge=by_node['222:120']
md=[f'# {root["name"]} · contrato de evidencia',f'Fuente: [{source["node_id"]}]({source["url"]}). Inspección **COMPLETE**, generada {model["generated_at"]}. **Evidencia Figma de solo lectura**; no se modificó el archivo ni se generó código de aplicación.',
'## Component Identity',table(['Campo','Observado en Figma'],[['ID / key',root['id']+' / '+root['key']],['Página',model['component']['page']['name']+' '+model['component']['page']['id']],['Tipo',root['type']],['Referencia',f'{root["width"]} × {root["height"]} px'],['Description',root['description']]]),
'## Anatomy','**Observado en Figma:** 11 nodos, sin pendientes; dos instancias con visible=false y sus vectores incluidos en la lectura. Los vectores se agregan bajo su icono funcional.\n\n```text\n'+ '\n'.join('  '*row['depth']+row['name']+' ['+row['type']+'] '+row['id'] for row in raw['inventory']['nodes'] if row['type']!='VECTOR')+'\n```',
'## Dependencies',f'**Estructura derivada:** {component_inventory["total_instances"]} instancias, {len(deps)} componentes únicos ({component_inventory["local"]} local y {component_inventory["remote"]} remotos), todos RESOLVED para su superficie activa.\n\n'+table(['Main component','Key','Instancias','Activo'],[[x['main_component']['id'],x['main_component']['key'],x['instance_count'],definitions[x['main_component']['id']]['parent']['name']+' / '+definitions[x['main_component']['id']]['main']['name']] for x in deps]),
'## Properties','**Observado en Figma:** el maestro expone únicamente `Title#765:0` (TEXT). Su default y el texto observado coinciden. Las propiedades de Badge pertenecen a la dependencia y no se exponen como nuevos props del Preview. El label observado es «Tabla»; Show left icon y Show right icon están apagados.',
'## Variants','Es un COMPONENT sin ejes de variantes propios. Las variantes activas de dependencias y sus alternativas expuestas están en YAML; no se inspeccionaron profundamente las alternativas.',
'## States','Referencia visible. No se exponen estados hover, pressed, loading o disabled propios; los dos iconos opcionales de Badge están ocultos.',
'## Layout','**Observado en Figma:**\n\n'+table(['Nodo','Layout / sizing','Caja','Separación'],[[root['id'],'HORIZONTAL, NO_WRAP; FIXED/HUG','544 × 82 px','Gap 16; padding 16 por lado'],[details['id'],'HORIZONTAL, NO_WRAP; FILL/HUG','470 × 48 px','Gap 8; padding 0; MIN/MIN'],[title['id'],'FILL/HUG, auto-resize HEIGHT','416 × 48 px','Sin truncamiento ni máximo de líneas'],[badge['id'],'HUG/HUG','46 × 24 px','Label Tabla, sin iconos'],['222:112','FIXED/FIXED','24 × 24 px','Table Outline Light']]),
'**Estructura derivada:** `470 = 544 − 2×(16+1) − 24 − 16`; `416 = 470 − 8 − 46`; `82 = max(48,24) + 2×(16+1)`. Stroke incluido en layout. Los dos consumidores BENI/NAVI usan el Preview FILL/HUG y heredan la fila horizontal; solo tienen overrides de tamaño. No se ejecutaron redimensionamientos.',
'## Visual Styles','**Observado en Figma:** superficie blanca, borde 1 px INSIDE, radio 8 px, sin efectos; todos sus bindings propios consumen Conversation Response. El borde resuelve `blue/200` en las cuatro cadenas leídas; no se inventa un acento distinto por producto. Badge mantiene sus tokens propios.',
'## Typography',table(['Texto','Familia / peso','Tamaño / interlineado','Estilo'],[['Title','Manrope Bold / 700','16 / 24 px','textStyleId vacío; bindings component'],['Label','Manrope Regular / 400','12 / 16 px','badge/label-medium local']]),
'Ambos tienen tracking 0 px. El título observado ocupa dos líneas por wrapping, no por un salto de línea insertado. Su contenido es un ejemplo.',
'## Tokens',f'**Estructura derivada:** {len(variable_deps)} variables locales resueltas: 29 ligadas directamente (14 Conversation Response y 15 Badge) y 44 dependencias de aliases (22 semantic + 22 primitives). Cero referencias sin resolver y un estilo tipográfico local. Los cuatro modos se resolvieron por lectura de sus cadenas.\n\n'+table(['Token de Conversation Response','ID real','Valor Contable'],[[v['name'],v['id'],json.dumps(resolve(v['id'],'Contable'),ensure_ascii=False)] for v in variable_deps if v['name'].startswith('conversation-response/')]),
'El YAML conserva las 73 referencias con key, colección, valor resuelto, used_by y evidencia. Los inventarios de componentes, variables y estilos se contabilizan por separado. No se cambiaron tokens, aliases o scopes.',
'## Content','Texto de ejemplo: «'+title['characters']+'». Label de ejemplo observado: «Tabla». Title es editable; el texto y la fecha del ejemplo no son reglas de negocio. No se define otro formato de documento por la mera presencia de un Badge.',
'## Interactions','**Requiere definición:** reactions=[] en maestro y descendientes; no se documenta un nuevo gesto para abrir documentos, navegar o descargar. El cambio de posición no acredita comportamiento de producto.',
'## Accessibility','**Requiere definición:** título y etiqueta visibles e icono de 24 px observados. Figma no expone ARIA, foco de navegador o teclado. No se realizó una evaluación WCAG.',
'## External Dependencies',table(['Main','Remote','Procedencia / versión'],[[x['id'],True,'NOT_EXPOSED_BY_FIGMA_MCP'] for x in external]),
'Las dos dependencias remotas son los iconos activos Table y Presentation descritos arriba; los Presentation son interiores ocultos heredados de Badge. La identidad/key están resueltas; no se reconstruye el archivo fuente o versión desde el nombre.',
'## Unresolved Information','No hay nodos, componentes activos, variables o estilos pendientes. Las limitaciones son: procedencia externa no expuesta; reflow en otros anchos no probado; falta de captura local inmediatamente anterior; interacción/semántica accesible no definida por la lectura.',
'## Implementation Notes','La fuente histórica del 12 de noviembre usa el ID remoto 218:1228, con Preview details VERTICAL y caja 544 × 115 px. No se presenta ese alto como el before del ID local 222:111. La implementación web actual todavía usa flex-col para título/Badge: se registra una diferencia pendiente de sincronización, sin modificar código en este encargo.',
'Se conserva el auxiliar dentro de Conversation Response, en la página actual; no se crea una familia pública nueva ni contratos profundos de sus dependencias. La Description actual continúa describiendo su propósito.',
'## Evidence / Confidence',f'Confianza **{model["evidence"]["confidence"]["level"]}**: {model["evidence"]["confidence"]["reason"]}\n\n[Modelo YAML](component-contract.yaml) · [Modelo JSON de generación](component-contract.json) · [Evidencia cruda](raw-evidence.json) · [Captura](preview.png). Las propiedades materiales tienen fuentes `node:`, `variable:` o `style:` e IDs de evidencia en el YAML.'
]
(HERE/'component-contract.md').write_text('\n\n'.join(md)+'\n')

assert len({n['id'] for n in nodes})==11
assert component_inventory['total_instances']==4 and len(deps)==3
assert len(variable_deps)==73 and all(v['used_by'] for v in variable_deps)
assert len(style_deps)==1 and all(s['used_by'] for s in style_deps)
assert all(len(v['valuesByMode']) in [1,4] for v in variables)
for v in variables:
 for mode in ['Contable','Administrativo','Servicios','Personas']:resolve(v['id'],mode)
parsed=subprocess.check_output(['ruby','-rjson','-ryaml','-e','puts JSON.generate(YAML.safe_load(File.read(ARGV[0]), permitted_classes: [], aliases: false))',str(HERE/'component-contract.yaml')],text=True)
assert json.loads(parsed)==model,'YAML roundtrip differs from the normalized model'
report={'status':'PASS','scope':'read-only extraction and deterministic documentation','nodes':11,'pending':0,'instances':4,'unique_components':3,'variables':73,'direct_bound_variables':29,'alias_dependencies':44,'named_styles':1,'yaml_json_roundtrip':'PASS','markdown_projection':'same normalized model','figma_writes':0,'application_code_changes':0,'files':{name:hashlib.sha256((HERE/name).read_bytes()).hexdigest() for name in ['raw-evidence.json','component-contract.json','component-contract.yaml','component-contract.md','preview.png']}}
(HERE/'validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False))
