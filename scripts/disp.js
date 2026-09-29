/* Disponibilidad marcada por los jugadores desde la web (hoja de Google) */
const DISP_URL=window.__DISP_URL||'';
const ls={get:k=>{try{return localStorage.getItem(k)||''}catch(e){return ''}},set:(k,v)=>{try{v?localStorage.setItem(k,v):localStorage.removeItem(k)}catch(e){}}};
S.miId=ls.get('egara_yo');S.codigo=window.__TEAM_CODE||ls.get('egara_codigo');S.remoto={};S.remotoEstado=DISP_URL?'cargando':'off';
function aplicarRemoto(){for(const jo of S.jornadas){const r=S.remoto[jo.id];if(!r)continue;jo.disp=Object.assign({},jo.disp||{},r)}}
async function cargarRemoto(){
  if(!DISP_URL)return;
  try{const r=await fetch(DISP_URL+(DISP_URL.includes('?')?'&':'?')+'t='+Date.now()).then(x=>x.json());
    if(r&&r.datos){S.remoto={};r.datos.forEach(d=>{(S.remoto[d.j]=S.remoto[d.j]||{})[d.p]=d.v});S.remotoEstado='ok';aplicarRemoto();render()}}
  catch(e){S.remotoEstado='error';render()}
}
async function guardarDisp(j,p,v){
  const prev=((S.remoto[j]||{})[p]);(S.remoto[j]=S.remoto[j]||{})[p]=v;aplicarRemoto();render();
  try{
    const r=await fetch(DISP_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({codigo:S.codigo,jornada:j,jugador:p,valor:v})}).then(x=>x.json());
    if(!r||!r.ok){
      if(r&&r.error==='codigo'){if(!window.__TEAM_CODE){S.codigo='';ls.set('egara_codigo','')}toast(window.__TEAM_CODE?'No se ha podido guardar. Avisa al capitán.':'El código del equipo no es correcto. Vuelve a escribirlo.')}
      else toast('No se ha podido guardar. Inténtalo de nuevo.');
      (S.remoto[j]=S.remoto[j]||{})[p]=prev||'';aplicarRemoto();render();return}
    toast('Guardado');
  }catch(e){toast('Sin conexión: no se ha guardado.');(S.remoto[j]=S.remoto[j]||{})[p]=prev||'';aplicarRemoto();render()}
}
function vMia(){
  const act=S.jugadores.filter(p=>p.activo!==false).sort((a,b)=>a.nombre.localeCompare(b.nombre,'es'));
  const yo=S.jugadores.find(p=>p.id===S.miId);
  if(!yo||!S.codigo){
    return `<div class="panel stack" style="max-width:460px"><div><div class="label">Mi disponibilidad</div><h2>¿Quién eres?</h2></div>
      <p class="muted" style="margin:0">${window.__TEAM_CODE?'Elige tu nombre. Solo se pide la primera vez en este teléfono.':'Elige tu nombre y escribe el código del equipo que ha enviado el capitán. Solo se pide la primera vez en este teléfono.'}</p>
      <form class="form" id="f-entrar"><label>Jugador<select id="f-yo" required><option value="">Elige tu nombre</option>${act.map(p=>`<option value="${p.id}"${p.id===S.miId?' selected':''}>${esc(p.nombre)}</option>`).join('')}</select></label>
      ${window.__TEAM_CODE?'':`<label>Código del equipo<input id="f-cod" autocomplete="off" autocapitalize="none" required value="${esc(S.codigo)}"></label>`}
      <div><button class="btn" type="submit">Entrar</button></div></form></div>`;
  }
  const h=hoy();const prox=jornadasOrd().filter(j=>(j.fecha||'')>=h);
  const estado=S.remotoEstado==='cargando'?'<span class="chip pend">Cargando respuestas…</span>':S.remotoEstado==='error'?'<span class="chip loss">No se han podido cargar las respuestas</span>':'';
  return `<div class="stack">
    <div class="row between" style="align-items:flex-end"><div><div class="label">Mi disponibilidad</div><h2>Hola, ${esc(yo.nombre.split(' ')[0])}</h2></div>
      <button class="link" type="button" data-act="salir">No soy ${esc(yo.nombre.split(' ')[0])}</button></div>
    <p class="muted" style="margin:0">Marca si puedes jugar cada jornada. Puedes cambiarlo cuando quieras; el equipo lo ve al momento en esta web.</p>${estado}
    ${prox.length?`<div class="jlist">${prox.map(jo=>{const v=(jo.disp||{})[yo.id]||'';const c=dispCounts(jo);const conv=(jo.conv||[]).includes(yo.id);
      return `<div class="panel stack" style="gap:10px;padding:12px 14px">
        <div class="row between"><div><div class="label">Jornada ${esc(jo.numero||'')} · ${esc(fFecha(jo.fecha))}${jo.hora?' · '+esc(jo.hora):''}</div>
          <div style="font-weight:600">${jo.local===false?'en':'vs'} ${esc(jo.rival||'Rival por definir')}</div><div class="muted" style="font-size:13px">${jo.local===false?'Fuera':'En casa'}${jo.sede?' · '+esc(jo.sede):''}</div></div>
          ${conv?'<span class="chip ball">Convocado</span>':''}</div>
        <div class="seg" role="group" aria-label="Mi disponibilidad jornada ${esc(jo.numero||'')}" style="align-self:flex-start">${[['si','Sí puedo'],['duda','Duda'],['no','No puedo']].map(([k,t])=>`<button type="button" class="mia ${k}${v===k?' on':''}" aria-pressed="${v===k}" data-act="mi-disp" data-id="${jo.id}" data-v="${k}" style="padding:9px 14px;font-size:15px">${t}</button>`).join('')}</div>
        <div class="muted" style="font-size:13px">${c.si} disponibles · ${c.duda} en duda · ${c.no} no pueden</div></div>`}).join('')}</div>`:'<p class="muted">No hay jornadas pendientes.</p>'}
  </div>`;
}
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-act]');if(!t)return;
  if(t.dataset.act==='salir'){S.miId='';ls.set('egara_yo','');render()}
  if(t.dataset.act==='mi-disp'){const jo=S.jornadas.find(j=>j.id===t.dataset.id);if(!jo)return;const cur=(jo.disp||{})[S.miId]||'';guardarDisp(jo.id,S.miId,cur===t.dataset.v?'':t.dataset.v)}
});
document.addEventListener('submit',e=>{
  if(e.target.id!=='f-entrar')return;e.preventDefault();
  const yo=document.getElementById('f-yo').value,ce=document.getElementById('f-cod'),cod=window.__TEAM_CODE||(ce?ce.value.trim():'');
  if(!yo||!cod){toast(window.__TEAM_CODE?'Elige tu nombre':'Elige tu nombre y escribe el código');return}
  S.miId=yo;S.codigo=cod;ls.set('egara_yo',yo);if(!window.__TEAM_CODE)ls.set('egara_codigo',cod);render();
});
