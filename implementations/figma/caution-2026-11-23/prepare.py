"""Materializa la decisión del chat en datos delegados y enmienda acotada."""
import hashlib, json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
RUN = Path(__file__).resolve().parent
PALETTE = ['#FDEADB','#F6C39A','#F5A86B','#F28F3D','#EE7A1A','#C45C0A','#9A3F06','#662904','#3B1702']
MODES = ['Contable','Administrativo','Servicios','Personas']
def write(p, value):
    path = ROOT / p
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n')
def var(name, collection, desc, value, scopes=None):
    ident = 'caution:'+collection+':'+name
    css = '--'+('primitive-' if collection=='primitive' else '')+name.replace('/','-')
    return dict(id=ident,name=name,resolvedType='COLOR',description=desc,scopes=scopes or [],codeSyntax={'WEB':f'var({css})'},valuesByMode={m:value for m in (MODES if collection=='component' else ['Value'])})
primitives=[]
for i,h in enumerate(PALETTE,1):
    rgba={c:int(h[j:j+2],16)/255 for c,j in [('r',1),('g',3),('b',5)]};rgba['a']=1
    primitives.append(var(f'caution-orange/{i*100}','primitive',f'Caution · Primitiva naranja {i*100}, {h}. Gama independiente de orange y la marca Servicios; escala aprobada en el chat.',rgba))
semantics=[]
for role,step,desc in [('subtle',100,'Superficie suave'),('accent',200,'Acento suave para composición'),('default',500,'Indicador y énfasis gráfico'),('strong',700,'Texto, iconos y contornos legibles')]:
    semantics.append(var('caution-'+role,'semantic',f'Caution · {desc}. Alias a caution-orange/{step}; invariante entre los cuatro temas.',{'type':'VARIABLE_ALIAS','id':f'caution:primitive:caution-orange/{step}'}))
components=[]
for name,role,scopes,desc in [
    ('body/color/bg/caution','subtle',['FRAME_FILL','SHAPE_FILL'],'Fondo de contenido de producto que requiere precaución'),
    ('body/color/text/caution','strong',['TEXT_FILL'],'Texto de precaución en contenido de producto'),
    ('body/color/stroke/caution','strong',['STROKE_COLOR'],'Contorno de precaución en contenido de producto; no prescribe borde para Badge'),
    ('body/color/shape/caution','strong',['SHAPE_FILL'],'Forma o icono de precaución en contenido de producto'),
    ('badge/color/bg/caution','subtle',[],'Fondo de Badge Caution sin stroke'),
    ('badge/color/text/caution','strong',[],'Texto de Badge Caution'),
    ('badge/color/icon/caution','strong',[],'Iconos decorativos opcionales de Badge Caution'),
    ('linear-progress/color/indicator/caution','default',[],'Indicador Caution determinado e indeterminado; conserva avance y geometría'),
]:
    components.append(var(name,'component',f'{desc}. Consume caution-{role} → caution-orange; invariante en Contable, Administrativo, Servicios y Personas.',{'type':'VARIABLE_ALIAS','id':'caution:semantic:caution-'+role},scopes))
data={'schema_version':1,'kind':'DELEGATED_TOKEN_DATA','contract':'FOUNDATIONS-CAUTION-001','version':'1.0.0','source':'Chat 2026-11-20: propuesta final y retiro de stroke de Badge; instrucción de construcción y namespace caution-orange autorizados 2026-11-23.','collections':[{'name':n,'modes':[{'name':m,'modeId':m} for m in (MODES if n=='component' else ['Value'])],'variables':v} for n,v in [('primitive',primitives),('semantic',semantics),('component',components)]]}
path='specs/tokens/caution.v1.0.0.json';write(path,data)
digest=hashlib.sha256((ROOT/path).read_bytes()).hexdigest()
amendment=f'''---
contract_schema: sdd-project/0.2
contract_id: FOUNDATIONS-CAUTION-001
name: Caution
type: foundation-amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
date: 2026-11-23
amends: [FOUNDATIONS-BLUEHEART-VARIABLES-001, FOUNDATIONS-BODY-001, BADGE-001, LINEAR-PROGRESS-001]
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: {path}
source_data_digest_sha256: {digest}
data_refs: [{path}]
consumption_targets: [figma, web]
---

# Caution · ampliación semántica

## Autoridad y alcance

EXPLICIT: el usuario adoptó la propuesta final de nueve tonos del chat, retiró el stroke del badge y solicitó construcción e implementación en Figma para Body, Linear Progress Bar y Badge. El 23 de noviembre eligió crear `caution-orange/100–900` y conservar Servicios. La gama `orange` existente conserva identidad y valores. Esta enmienda amplía exclusivamente Caution; success, warning, danger y las marcas permanecen vigentes.

Los datos JSON delegados gobiernan valores, IDs lógicos, aliases, modos, scopes, codeSyntax y la única description canónica por token. El nombre local Figma de la colección primitiva es `primitives`; el adaptador web conserva el identificador histórico `primitive`. Los IDs reales de destino se registran en el mapa de implementación, separados de los lógicos.

## Requisitos

- REQ-CAUTION-01 MUST crear nueve primitivas `caution-orange/100–900` exactamente como el JSON. No sustituir `orange` ni crear una cuarta colección.
- REQ-CAUTION-02 MUST crear semantic `caution-subtle` → 100, `caution-accent` → 200, `caution-default` → 500 y `caution-strong` → 700. Todos consumen aliases locales; no hay literales en semantic/component.
- REQ-CAUTION-03 MUST crear ocho tokens component del JSON: cuatro Body, tres Badge y uno Linear Progress. Cada uno apunta a semantic en Contable, Administrativo, Servicios y Personas. Solo Body aparece en selectores, con scopes por propiedad; el resto conserva scopes vacíos y codeSyntax WEB válido.
- REQ-CAUTION-04 MUST añadir `type=caution` a Badge en small, medium y large: fondo subtle (#FDEADB), texto e iconos strong (#9A3F06), strokes vacíos. Conservar HUG, alturas, tipografía, Label, booleanas, swaps Phosphor y default subtle/small; total resultante 21 variantes.
- REQ-CAUTION-05 MUST añadir `type=caution` a los tres sets públicos de Linear Progress Bar, con 0/25/50/75/100% e indeterminate. Indicador default (#EE7A1A). Conservar tokens internos restantes, geometría, Header, Label, Value, Helper text, visibilidad y mínimo 120 px; total 30 variantes por set.
- REQ-CAUTION-06 MUST ampliar el auxiliar privado con tres fases Caution rest/exit/enter. Los enlaces y el ciclo apuntan exclusivamente a las nuevas variantes Caution, con los mismos triggers/transiciones del baseline. Las tres instancias públicas indeterminadas consumen ese auxiliar. Las muestras determinadas conservan su secuencia dentro de Caution. Total 15 fases privadas y 105 variantes Progress (90 públicas + 15 privadas).
- REQ-CAUTION-07 MUST exponer Body Caution como roles de contenido libre, no como nueva familia ni una Card maestra. Se conserva la convención de páginas Badge y Linear Progress Bar y sus IDs. La comparación editable vive en Playground.
- REQ-CAUTION-08 MUST extender la API web con `type="caution"`, aliases CSS generados, muestras y documentación. Sin lógica de negocio añadida: el anfitrión decide los umbrales y aporta los datos, mensajes y significado concreto; Caution no impone automáticamente un rango porcentual.

## Guía semántica

Caution comunica precaución mediante la familia naranja de la propuesta, visualmente distinguible de Warning ámbar y Danger rojo. Acompañar el color con una etiqueta explícita. Badge permanece informativo y sin interacción ni borde. Linear Progress conserva el valor real y permite un mensaje de contexto; el color no representa una transición automática de estado. Body proporciona fondo, texto, contorno y formas para contenido de producto; un token stroke disponible en Body no añade un borde al Badge.

## Construcción y QA

UPDATE aditivo de las páginas existentes Badge 64:2 (set 64:90), Linear Progress Bar 39:2 (sets 39:29, 39:87, 40:175, 40:348). Reutilizar dependencias y clonar las variantes warning equivalentes como baseline estructural, reemplazando únicamente el tipo y los bindings Caution. P-SLOTS NOT_APPLICABLE: esta ampliación de color no modifica anatomía, cardinalidad ni el mecanismo de contenido.

Verificar 21 tokens, 21 variantes Badge, 105 Progress, ausencia de cambios en variantes anteriores, cadena por ID y modo, scopes, codeSyntax y descripción, swaps/booleanas y reacciones. Comprobar una muestra editable con instancias en Playground y sus cuatro temas. QA web: generación, ds:check, typecheck, build y comprobaciones de Caution determinado/indeterminado y ausencia de stroke en Badge. No atribuir QA histórico nuevo ni revisión humana no ejecutada.
'''
(ROOT/'specs/foundations/caution.amendment.v1.0.0.md').write_text(amendment)
qa='''# QA documental · Caution 1.0.0

Fecha: 2026-11-23. CONTRACT_REVIEW: PASS. user_audit: NOT_REQUIRED.

DOC-01..18: PASS en el alcance de la enmienda. Fuente: decisiones explícitas del chat y contratos vigentes de variables, Body, Badge y Linear Progress; datos delegados con SHA-256 calculado en la enmienda. La nueva familia primitiva fue decidida explícitamente para conservar Servicios. Se mantienen las reglas de visibilidad Body-only y la cadena de tres capas. Los requisitos definen cantidades, mapeos y comportamiento comprobables. No se inventan umbrales de producto. P-SLOTS: NOT_APPLICABLE por ampliación de color sin cambio de anatomía.

Delegación técnica: DELEGATED_FOR_BUILD, alcance aditivo de Caution bajo la solicitud del usuario. No equivale a auditoría humana de cada detalle. Figma READY tras preflight de colecciones, modos, páginas y variantes existentes; escritura efectiva y QA de implementación se registran por separado.
'''
(ROOT/'qa/contracts/caution.v1.0.0.review.md').write_text(qa)
config=json.loads((ROOT/'config/web-inputs.json').read_text())
if not any(e['path']==path for e in config['token_sources']):
    config['token_sources'].append({'path':path,'sha256':digest})
write('config/web-inputs.json',config)
print(json.dumps({'tokens':sum(len(c['variables']) for c in data['collections']),'sha256':digest,'contract':'specs/foundations/caution.amendment.v1.0.0.md'}))
