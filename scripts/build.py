"""Genera index.html (versión de consulta) a partir de scripts/app.html y de los datos
descargados de la aplicación en data/ (jugadores/, jornadas/, config/, liga/, historico/).
Uso: python3 scripts/build.py   (desde la raíz del repositorio)"""
import json,os,re,datetime
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D=lambda *p:os.path.join(ROOT,'data',*p)
s=open(os.path.join(ROOT,'scripts','app.html')).read()
def unwrap(o):
    return dict(o['data']) if isinstance(o.get('data'),dict) and len(o)<=4 and 'id' in o else dict(o)
def rd(d):
    out=[]
    if not os.path.isdir(d): return out
    for f in sorted(os.listdir(d)):
        if not f.endswith('.json'): continue
        b=unwrap(json.load(open(os.path.join(d,f))));b['id']=f[:-5];out.append(b)
    return out
def one(*p):
    f=D(*p)
    return unwrap(json.load(open(f))) if os.path.exists(f) else None
jug=[{k:v for k,v in p.items() if k!='telefono'} for p in rd(D('jugadores'))]
jor=rd(D('jornadas'))
cfg={'nombre':'Club Egara','temporada':'2026-27','pistas':4,'stb':True}
c=one('config','equipo.json')
if c: cfg.update({k:c[k] for k in ('nombre','temporada','pistas','stb') if k in c})
data={'jugadores':jug,'jornadas':jor,'config':cfg,
 'clas':one('liga','clasificacion.json'),'cal':one('liga','calendario.json'),'jug':one('liga','actas.json'),'plant':one('liga','plantillas.json'),'t2526':one('historico','t2526.json')}
import hashlib
cfgw0=json.load(open(os.path.join(ROOT,'config.json'))) if os.path.exists(os.path.join(ROOT,'config.json')) else {}
huella=hashlib.sha256((json.dumps(data,sort_keys=True,ensure_ascii=False)+s+json.dumps(cfgw0)+open(os.path.join(ROOT,'scripts','disp.js')).read()+open(os.path.join(ROOT,'scripts','i18n.js')).read()+open(__file__).read()).encode()).hexdigest()[:16]
dest=os.path.join(ROOT,'index.html')
if os.path.exists(dest) and ('<!-- datos:'+huella+' -->') in open(dest).read():
    print('Sin cambios: index.html no se modifica');raise SystemExit(0)
cfgw=json.load(open(os.path.join(ROOT,'config.json'))) if os.path.exists(os.path.join(ROOT,'config.json')) else {}
DISP=cfgw.get('disp_url','')
DISPJS=open(os.path.join(ROOT,'scripts','disp.js')).read()
I18NJS=open(os.path.join(ROOT,'scripts','i18n.js')).read()
hoy=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=2))).strftime('%d/%m/%Y %H:%M')
RO=['config','nuevo-jugador','editar-jugador','nueva-jornada','editar-jornada','disp','conv','convocar-disp','borrar-jugador','borrar-jornada','borrar-ejemplos']
rep=[
 ("const TABS=[['resumen','Resumen'],['liga','Clasificación'],",
  "const TABS=[...(window.__DISP_URL?[['mia','Mi disponibilidad']]:[]),['resumen','Resumen'],['liga','Clasificación'],['calendario','Calendario'],"),
 ("S.tab==='liga'?vLiga():","S.tab==='liga'?vLiga():S.tab==='calendario'?vCalendario():S.tab==='mia'?vMia():"),
 ('<button class="btn-ghost" data-act="config" type="button">Ajustes</button>',''),
 ("const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act,id=t.dataset.id;",
  "const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act,id=t.dataset.id;if(S.mode==='static'&&RO.has(a))return;"),
 ("  const s=e.target;\n  if(s.matches('select[data-liga-j]'))","  const s=e.target;if(S.mode==='static'&&s.matches('select[data-pair]'))return;\n  if(s.matches('select[data-liga-j]'))"),
 ("  const s=e.target;if(!s.matches('input[data-score]'))return;","  const s=e.target;if(!s.matches('input[data-score]')||S.mode==='static')return;"),
 ("render();init();",DISPJS+"\n"+I18NJS+"\nconst RO=new Set("+json.dumps(RO)+");(function(){const D=window.__DATA;S.jugadores=D.jugadores;S.jornadas=D.jornadas;S.config=D.config;S.liga={clas:D.clas,cal:D.cal,jug:D.jug,plant:D.plant,t2526:D.t2526};S.loaded={jugadores:true,jornadas:true};S.mode='static';S.tab=window.__DISP_URL?'mia':'resumen';document.body.classList.add('ro');const _r=render;render=function(){_r();document.querySelectorAll('#main input[data-score],#main select[data-pair]').forEach(x=>x.disabled=true);traducir(document.body)};ponerBotonIdioma();render();cargarRemoto()})();"),
 ('<div class="brand"><h1 id="tNombre">','<div class="brand" style="display:flex;align-items:center;gap:12px"><span style="background:#fff;border-radius:50%;width:52px;height:52px;flex:none;display:grid;place-items:center"><img src="escudo.png" alt="Escudo del Club Egara" style="height:40px;width:auto"></span><div><h1 id="tNombre">'),
 ('<p id="tTemp">Seguimiento del equipo</p></div>','<p id="tTemp">Seguimiento del equipo</p></div></div>'),
 ("<title>Liga de Dobles</title>","<title>Club Egara · Penya Arlequinada</title>\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\">\n<meta charset=\"utf-8\">\n<link rel=\"manifest\" href=\"manifest.json\">\n<link rel=\"apple-touch-icon\" href=\"icon-180.png\">\n<link rel=\"icon\" href=\"icon-192.png\">\n<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n<meta name=\"mobile-web-app-capable\" content=\"yes\">\n<meta name=\"apple-mobile-web-app-title\" content=\"Egara\">\n<meta name=\"theme-color\" content=\"#1d4e89\">"),
 ("Pídeme que la actualice desde la web de la federación y aparecerá aquí.","Todavía no hay datos."),
 ("Pulsa un jugador para editarlo.",""),
]
rep.append(("toLocaleDateString('es-ES',largo?","toLocaleDateString(window.__LOC||'es-ES',largo?"))
rep.append(("toLocaleDateString('es-ES',{day:'numeric',month:'short'})+' a la","toLocaleDateString(window.__LOC||'es-ES',{day:'numeric',month:'short'})+' a la"))
for a,b in rep:
    assert s.count(a)==1,a[:70]
    s=s.replace(a,b)
css=".ro "+", .ro ".join(f'[data-act="{a}"]' for a in ['nuevo-jugador','nueva-jornada','editar-jornada','convocar-disp','borrar-ejemplos'])+"{display:none!important}\n.ro .seg button,.ro .conv,.ro tr.click{pointer-events:none;cursor:default}\n.ro .seg button:not(.on),.ro .conv:not(.on){opacity:.55}\n.ro .seg button.mia,.ro .seg button[data-act=h-copa],.ro .seg button[data-act=clas-prov]{pointer-events:auto;cursor:pointer;opacity:1}\n.ro .pista select:disabled,.ro .sets input:disabled{opacity:1;color:var(--ink)}\n"
s=s.replace('@media (prefers-reduced-motion:reduce)',css+'@media (prefers-reduced-motion:reduce)',1)
s=s.replace('<script>\nconst $=','<script>window.__DISP_URL='+json.dumps(DISP)+';window.__TEAM_CODE='+json.dumps(cfgw.get('team_code',''))+';window.__DATA='+json.dumps(data,ensure_ascii=False).replace('</','<\\/')+';</script>\n<script>\nconst $=',1)
doc='<!doctype html>\n<html lang="es">\n<head>\n'+s.split('<header')[0]+'\n<style>body{margin:0}</style>\n</head>\n<body>\n<header'+s.split('<header',1)[1]+'\n<footer class="wrap muted" style="padding-block:0 32px;font-size:12px">Versión de consulta. Actualizado el '+hoy+'.</footer>\n</body>\n</html>\n'
doc=doc.replace('<!doctype html>','<!doctype html>\n<!-- datos:'+huella+' -->',1)
open(dest,'w').write(doc)
print('index.html generado',len(doc),'bytes')
