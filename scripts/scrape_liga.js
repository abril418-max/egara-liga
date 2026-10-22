// Ejecutar en una página de redpenya.cdterrassa.cat (navegador). Devuelve JSON con
// clasificación, calendario, actas y plantillas de la 1. Or de la temporada actual.
(async()=>{
const T='/tournaments/9644084-52ª-penya-arlequinada-2026-27',E=T+'/events/9644086',R=E+'/rounds/9644087';
const get=async u=>new DOMParser().parseFromString(await fetch(u).then(r=>r.text()),'text/html');
const lines=el=>el.innerText.split('\n').map(s=>s.trim()).filter(Boolean);
// Clasificación
const sd=await get(R+'/standings/view');
const k='P EJ EG EE EP PJ PG PP SG SP DS JG JP DJ'.split(' ');
const filas=[...sd.querySelector('main table').querySelectorAll('tbody tr')].map(tr=>{const c=[...tr.cells].map(td=>td.innerText.trim());const o={pos:c[0],equipo:c[1]};k.forEach((x,i)=>o[x]=+c[i+2]);return o}).filter(f=>f.equipo);
// Calendario
const fd=await get(R+'/fixtures/view?matchdays=all');
const L=lines(fd.querySelector('main'));const cal=[];let cur=null;
for(let i=0;i<L.length;i++){
  const m=L[i].match(/^Jornada (\d+) \((\d\d\/\d\d\/\d{4})/);
  if(m){cur={j:+m[1],fecha:m[2],hora:'20:00',partidos:[],descansa:''};cal.push(cur);continue}
  if(!cur)continue;
  if(L[i].startsWith('Descansa:')){cur.descansa=L[i].replace('Descansa:','').trim();continue}
  if(/^(\d+:\d+|-)$/.test(L[i])&&L[i-1]!=='Resultado'){
    const hora=(L[i+2]||'').split(' ')[1];if(hora)cur.hora=hora;
    cur.partidos.push({local:L[i-1],visitante:L[i+1],res:L[i],sede:L[i+3],validado:L[i+4]==='Validado'});
  }
}
// Actas
const links=[...new Set([...fd.querySelectorAll('a[href*="/games/"]')].map(a=>a.getAttribute('href')))];
const nm=el=>[...el.querySelectorAll('.players-names .player')].map(s=>s.innerText.trim()).filter(Boolean);
const parseSet=t=>{const [a,b]=t.split('-');if((a.length>1||b.length>1)&&'67'.includes(a[0])&&'67'.includes(b[0])&&a[0]!==b[0])return {l:+a[0],v:+b[0]};return {l:+a,v:+b}};
const encuentros=[];
for(const l of links){
  const d=await get(l);const main=d.querySelector('main');if(!main)continue;
  const all=lines(main);if(!all.includes('Finalizado'))continue;
  const t=all.slice(all.indexOf('Acciones')+1);const jm=all.find(s=>/^Jornada \d+$/.test(s));
  const partidos=[];
  for(const c of main.querySelectorAll('[id^="clash-game-"]')){
    const cols=c.querySelectorAll('.card-body .row > div');if(cols.length<3)continue;
    const s=(cols[1].innerText||'').replace(/\s+/g,'');const Lp=nm(cols[0]),Vp=nm(cols[2]);
    if(!Lp.length||s===''||s==='vs')continue;
    const pista=+(c.querySelector('.card-footer .h2')?.innerText.trim()||0);
    let sets=[],ganador,retirada=null;
    if(s.includes(':')){const [a,b]=s.split(':');retirada=(b==='RET'||b==='WO')?'V':'L';ganador=retirada==='V'?'L':'V'}
    else{sets=s.split('|').map(parseSet);const wl=sets.filter(x=>x.l>x.v).length,wv=sets.filter(x=>x.v>x.l).length;ganador=wl>wv?'L':'V'}
    partidos.push({pista,L:Lp,V:Vp,sets,ganador,retirada});
  }
  if(partidos.length)encuentros.push({game:l.match(/games\/(\d+)/)[1],jornada:jm?+jm.split(' ')[1]:null,local:t[1],visitante:t[5],res:t[2]+':'+t[4],partidos});
}
// Plantillas
const pd=await get(T+'/participants?e_id=9644086');const equipos={};
for(const a of pd.querySelectorAll('a[href*="team/members?team_id="]')){
  const tr=a.closest('tr');const eq=tr?tr.querySelector('a[href*="viewCard"]')?.innerText.trim():null;if(!eq)continue;
  const md=await get(a.getAttribute('href'));
  equipos[eq]=[...new Set([...md.querySelectorAll('main table tbody tr')].flatMap(tr=>[...tr.cells].map(td=>td.innerText.trim()).filter(Boolean)))];
}
return JSON.stringify({filas,cal,encuentros,equipos});
})()
