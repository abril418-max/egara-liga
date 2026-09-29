"""Compara la disponibilidad marcada en la web (hoja de Google, guardada en data/disp.json
como la lista de filas [jornada, jugador, valor, actualizado], con o sin encabezado) con la
de la aplicación (data/jornadas/*.json) e imprime en JSON los cambios a aplicar:
[{"doc_id": ..., "data": {"disp": {jugador: valor | {"__delete__": true}}}}]"""
import json,os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
filas=json.load(open(os.path.join(ROOT,'data','disp.json')))
if isinstance(filas,dict): filas=filas.get('values',[])
jd=os.path.join(ROOT,'data','jornadas')
jor={f[:-5]:json.load(open(os.path.join(jd,f))) for f in os.listdir(jd) if f.endswith('.json')}
cambios={}
for r in filas:
    if len(r)<3 or r[0]=='jornada': continue
    j,p,v=str(r[0]),str(r[1]),str(r[2])
    if j not in jor or v not in ('si','duda','no',''): continue
    actual=(jor[j].get('disp') or {}).get(p,'')
    if actual==v: continue
    cambios.setdefault(j,{})[p]=v if v else {'__delete__':True}
print(json.dumps([{'doc_id':j,'data':{'disp':d}} for j,d in cambios.items()],ensure_ascii=False))
