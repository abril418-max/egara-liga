/* Traducción al catalán de la web de consulta. El idioma se guarda en este teléfono. */
const LANG=(()=>{try{return localStorage.getItem('egara_lang')||'es'}catch(e){return 'es'}})();
window.__LOC=LANG==='ca'?'ca-ES':'es-ES';
document.documentElement.lang=LANG;
const CA_EXACT={
'% juegos':'% jocs','% juegos ganados':'% jocs guanyats','% partidos':'% partits','% partidos ganados':'% partits guanyats','% victorias':'% victòries',
'Abrir jornada':'Obre la jornada','Alineaciones':'Alineacions','Calendario':'Calendari','Clasificación':'Classificació','Clasificación final de la liga':'Classificació final de la lliga',
'Con nuestros resultados':'Amb els nostres resultats','Contra nosotros':'Contra nosaltres','Convocado':'Convocat','Convocar':'Convoca','Convocatoria':'Convocatòria','Copiar convocatoria':'Copia la convocatòria',
'Datos de la web de la federación':'Dades del web de la federació','Datos de la web de la federación.':'Dades del web de la federació.','Descanso':'Descans','Dif. juegos por partido':'Dif. jocs per partit',
'Disponibilidad':'Disponibilitat','Disponibilidad y convocatoria':'Disponibilitat i convocatòria','Duda':'Dubte','Elegir jugador':'Tria jugador','Elige tu nombre':'Tria el teu nom',
'Elige tu nombre. Solo se pide la primera vez en este teléfono.':'Tria el teu nom. Només es demana la primera vegada en aquest telèfon.',
'Elige tu nombre y escribe el código del equipo que ha enviado el capitán. Solo se pide la primera vez en este teléfono.':'Tria el teu nom i escriu el codi de l’equip que ha enviat el capità. Només es demana la primera vegada en aquest telèfon.',
'Código del equipo':'Codi de l’equip','Entrar':'Entra','Equipo':'Equip','Equipo rival':'Equip rival','Estado':'Estat','Fuerza de los equipos':'Força dels equips',
'Ganado':'Guanyat','Ganó':'Va guanyar','Perdió':'Va perdre','Ha jugado con':'Ha jugat amb','Inscritos':'Inscrits','Jornadas':'Jornades','Jornadas G–P':'Jornades G–P','Juegos':'Jocs',
'Jugadores':'Jugadors','Jugadores usados':'Jugadors utilitzats','Liga + Copa Or':'Lliga + Copa Or','Solo liga':'Només lliga','Solo oficial':'Només oficial',
'Marca si puedes jugar cada jornada. Puedes cambiarlo cuando quieras; el equipo lo ve al momento en esta web.':'Marca si pots jugar cada jornada. Ho pots canviar quan vulguis; l’equip ho veu al moment en aquest web.',
'Mejores porcentajes':'Millors percentatges','Mi disponibilidad':'La meva disponibilitat','Nivel de los equipos':'Nivell dels equips','No puedo':'No puc','Sí puedo':'Sí que puc',
'Nosotros':'Nosaltres','Pareja':'Parella','Parejas':'Parelles','Parejas más habituales':'Parelles més habituals','Partidos G–P':'Partits G–P','Partidos y resultados':'Partits i resultats',
'Pendiente':'Pendent','Perdido':'Perdut','Pistas':'Pistes','Pos. liga':'Pos. lliga','Próxima jornada':'Propera jornada','Puesto en la liga':'Lloc a la lliga','Puesto global':'Lloc global',
'Ranking':'Rànquing','Ranking de jugadores por equipo':'Rànquing de jugadors per equip','Ranking del equipo':'Rànquing de l’equip','Ranking global':'Rànquing global',
'Ranking global de la liga':'Rànquing global de la lliga','Ranking liga':'Rànquing lliga','Rendimiento de cada combinación de jugadores que ha jugado junta.':'Rendiment de cada combinació de jugadors que ha jugat junta.',
'Resaltados los que ya han jugado en la liga.':'Destacats els que ja han jugat a la lliga.','Resultado':'Resultat','Resultados':'Resultats','Resultados de la liga':'Resultats de la lliga',
'Resumen':'Resum','Retirada / no presentado local':'Retirada / no presentat local','Retirada / no presentado visitante':'Retirada / no presentat visitant','Retirada del rival':'Retirada del rival',
'Se retiraron':'Es van retirar','Rivales':'Rivals','Sede':'Seu','Sin pareja':'Sense parella','Sin resultado':'Sense resultat',
'Solo resultados validados por la federación.':'Només resultats validats per la federació.','Todavía nadie':'Encara ningú','Todos':'Tots',
'Incluye resultados de nuestro equipo que la federación aún no ha validado.':'Inclou resultats del nostre equip que la federació encara no ha validat.',
'Todos los equipos de la categoría':'Tots els equips de la categoria','Todos los equipos, uno a uno':'Tots els equips, un per un','Validado':'Validat','Pendiente de validar':'Pendent de validar','Ver':'Veure',
'Ver la clasificación en la web de la federación':'Mira la classificació al web de la federació','Ver rival':'Veure el rival','Ver todos los jugadores':'Veure tots els jugadors',
'Visitante':'Visitant','¿Quién eres?':'Qui ets?','Últimos resultados':'Últims resultats','← Todas las jornadas':'← Totes les jornades',
'Enfrentamientos G–E–P':'Enfrontaments G–E–P','Posición en la liga':'Posició a la lliga','Posición en la liga (provisional)':'Posició a la lliga (provisional)','Plantilla activa':'Plantilla activa',
'Anota los juegos de cada set desde el punto de vista de tu equipo; el tercer set es el super tie-break (a 10 puntos).':'Anota els jocs de cada set des del punt de vista del teu equip; el tercer set és el super tie-break (a 10 punts).',
'Calculado con las actas de la temporada. Orden: partidos ganados, % de victorias, % de juegos y diferencia de juegos. Los partidos por retirada o no presentado cuentan como ganados o perdidos, sin juegos. En «Pistas» se indica cuántas veces jugó en cada una.':'Calculat amb les actes de la temporada. Ordre: partits guanyats, % de victòries, % de jocs i diferència de jocs. Els partits per retirada o no presentat compten com a guanyats o perduts, sense jocs. A «Pistes» s’indica quantes vegades va jugar a cadascuna.',
'Conv.: jornadas convocado. Disp.: porcentaje de respuestas «sí».':'Conv.: jornades convocat. Disp.: percentatge de respostes «sí».',
'Orden: partidos ganados, porcentaje de victorias, porcentaje de juegos ganados y diferencia de juegos. Calculado a partir de las actas de los encuentros validados y de los resultados de nuestro equipo anotados aquí («provisional» hasta que la federación los valide). «ret.» indica un partido que acabó por retirada: cuenta como ganado o perdido, pero sin juegos. La pista indica dónde jugó (la 1 suele ser la pareja más fuerte).':'Ordre: partits guanyats, percentatge de victòries, percentatge de jocs guanyats i diferència de jocs. Calculat a partir de les actes dels enfrontaments validats i dels resultats del nostre equip anotats aquí («provisional» fins que la federació els validi). «ret.» indica un partit que va acabar per retirada: compta com a guanyat o perdut, però sense jocs. La pista indica on va jugar (la 1 sol ser la parella més forta).',
'Ordenados por el porcentaje de juegos ganados, que refleja mejor el nivel que el resultado final cuando hay pocas jornadas jugadas.':'Ordenats pel percentatge de jocs guanyats, que reflecteix millor el nivell que el resultat final quan s’han jugat poques jornades.',
'Puntos: 3 por enfrentamiento ganado, 2 por empate y 1 por derrota. Desempates: enfrentamiento directo, diferencia de sets, diferencia de juegos, sets ganados y juegos ganados. Con nuestros resultados, el desempate es aproximado (no aplica el enfrentamiento directo).':'Punts: 3 per enfrontament guanyat, 2 per empat i 1 per derrota. Desempats: enfrontament directe, diferència de sets, diferència de jocs, sets guanyats i jocs guanyats. Amb els nostres resultats, el desempat és aproximat (no s’aplica l’enfrontament directe).',
'Puntos: 3 por enfrentamiento ganado, 2 por empate y 1 por derrota. Desempates: enfrentamiento directo, diferencia de sets, diferencia de juegos, sets ganados y juegos ganados. Solo cuentan los resultados validados por la federación.':'Punts: 3 per enfrontament guanyat, 2 per empat i 1 per derrota. Desempats: enfrontament directe, diferència de sets, diferència de jocs, sets guanyats i jocs guanyats. Només compten els resultats validats per la federació.',
'Solo jugadores que ya han jugado algún partido. Mismo orden que el ranking de la liga: partidos ganados, % de victorias, % de juegos y diferencia de juegos.':'Només jugadors que ja han jugat algun partit. Mateix ordre que el rànquing de la lliga: partits guanyats, % de victòries, % de jocs i diferència de jocs.',
'Cargando respuestas…':'Carregant respostes…','No se han podido cargar las respuestas':'No s’han pogut carregar les respostes','No hay jornadas pendientes.':'No hi ha jornades pendents.',
'Sin partidos validados para este equipo.':'Sense partits validats per a aquest equip.','Todavía no tiene partidos validados en la web.':'Encara no té partits validats al web.',
'Sin resultados.':'Sense resultats.','Aparecerá cuando haya resultados de nuestro equipo.':'Apareixerà quan hi hagi resultats del nostre equip.','Aún no hay resultados.':'Encara no hi ha resultats.',
'Aparecerán cuando haya partidos con resultado.':'Apareixeran quan hi hagi partits amb resultat.','Sin datos todavía':'Encara sense dades','Sin jornadas':'Sense jornades',
'Las parejas aparecen cuando anotes resultados en las jornadas.':'Les parelles apareixen quan hi ha resultats a les jornades.','Sin clasificación todavía':'Encara sense classificació',
'Guardado':'Desat','No se ha podido guardar. Inténtalo de nuevo.':'No s’ha pogut desar. Torna-ho a provar.','No se ha podido guardar. Avisa al capitán.':'No s’ha pogut desar. Avisa el capità.',
'Sin conexión: no se ha guardado.':'Sense connexió: no s’ha desat.','El código del equipo no es correcto. Vuelve a escribirlo.':'El codi de l’equip no és correcte. Torna’l a escriure.',
'Convocatoria copiada. Pégala en WhatsApp o en un correo.':'Convocatòria copiada. Enganxa-la al WhatsApp o en un correu.','Selecciona el texto y cópialo.':'Selecciona el text i copia’l.','Cerrar':'Tanca',
'Competición':'Competició','Diferencia de juegos':'Diferència de jocs','Diferencia de sets':'Diferència de sets','Empatados':'Empatats','Enfrentamientos jugados':'Enfrontaments jugats',
'Escudo del Club Egara':'Escut del Club Egara','Ganados':'Guanyats','Perdidos':'Perduts','Juegos ganados–perdidos':'Jocs guanyats–perduts','Partidos ganados–perdidos':'Partits guanyats–perduts',
'Sets ganados–perdidos':'Sets guanyats–perduts','Secciones':'Seccions','Tipo de clasificación':'Tipus de classificació','Idioma':'Idioma'
};
const CA_RX=[
[/^Calendario de (.+)$/,'Calendari de $1'],[/^Hola, (.+)$/,'Hola, $1'],[/^No soy (.+)$/,'No sóc $1'],
[/^(\d+) convocados · (\d+) necesarios$/,'$1 convocats · $2 necessaris'],[/^Convocados \((\d+) de (\d+) necesarios\)$/,'Convocats ($1 de $2 necessaris)'],
[/(\d+) en duda/g,'$1 en dubte'],[/(\d+) no pueden/g,'$1 no poden'],[/^(\d+) sin respuesta$/,'$1 sense resposta'],[/^(\d+) duda$/,'$1 dubte'],
[/^Jugadores que han jugado \((\d+)\)$/,'Jugadors que han jugat ($1)'],[/^Ganada (.+)$/,'Guanyada $1'],[/^Perdida (.+)$/,'Perduda $1'],[/^Empate (.+)$/,'Empat $1'],
[/^Ganado (\d.+)$/,'Guanyat $1'],[/^Perdido (\d.+)$/,'Perdut $1'],[/ en juego$/,' en joc'],[/ \(nosotros\)$/,' (nosaltres)'],
[/^Disponibilidad de ([AEIOUÀÈÉÍÒÓÚaeiouh].*)$/,'Disponibilitat d’$1'],[/^Disponibilidad de (.+)$/,'Disponibilitat de $1'],[/^Mi disponibilidad jornada (.+)$/,'La meva disponibilitat jornada $1'],[/^Jugador (\d) pista (\d)$/,'Jugador $1 pista $2'],
[/ nosotros$/,' nosaltres'],[/^Versión de consulta\. Actualizado el (.+)$/,'Versió de consulta. Actualitzat el $1'],
[/^Actualizada el (.+)$/,'Actualitzada el $1'],[/actualizados el /,'actualitzades el '],[/ a las /g,' a les '],[/ en la liga · /,' a la lliga · '],[/· solo Copa Or/,'· només Copa Or'],
[/(^| · )En casa( · |$)/g,'$1A casa$2'],[/(^| · )Fuera( · |$)/g,'$1Fora$2'],[/(^| · )en casa( · | vs |$)/g,'$1a casa$2'],[/(^| · )fuera( · | vs |$)/g,'$1fora$2'],
[/^en (?!casa)(.+)$/,'a $1'],[/^Descansa: /,'Descansa: '],
[/ de enero de /g,' de gener de '],[/ de febrero de /g,' de febrer de '],[/ de marzo de /g,' de març de '],[/ de abril de /g,' d’abril de '],[/ de mayo de /g,' de maig de '],
[/ de junio de /g,' de juny de '],[/ de julio de /g,' de juliol de '],[/ de agosto de /g,' d’agost de '],[/ de septiembre de /g,' de setembre de '],[/ de octubre de /g,' d’octubre de '],
[/ de noviembre de /g,' de novembre de '],[/ de diciembre de /g,' de desembre de '],[/Lliga Regular/,'Lliga Regular']
];
function tr(s){
  if(LANG!=='ca'||!s)return s;
  const t=s.trim();if(!t)return s;
  if(CA_EXACT[t])return s.replace(t,CA_EXACT[t]);
  let r=t;for(const [a,b] of CA_RX)r=r.replace(a,b);
  return r===t?s:s.replace(t,r);
}
function traducir(root){
  if(LANG!=='ca')return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
  while(n=w.nextNode()){if(n.parentElement&&n.parentElement.closest('script,style'))continue;const v=tr(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v}
  root.querySelectorAll('[aria-label],[placeholder],[title],[alt]').forEach(e=>['aria-label','placeholder','title','alt'].forEach(a=>{const v=e.getAttribute(a);if(v){const x=tr(v);if(x!==v)e.setAttribute(a,x)}}));
}
(function(){const _t=toast;toast=m=>_t(tr(m));})();
function ponerBotonIdioma(){
  const wrap=document.querySelector('.top .wrap');if(!wrap||document.getElementById('lang-btn'))return;
  const b=document.createElement('button');b.id='lang-btn';b.type='button';b.className='btn-ghost';
  b.textContent=LANG==='ca'?'Castellano':'Català';b.setAttribute('aria-label',LANG==='ca'?'Canviar a castellà':'Cambiar a catalán');
  b.addEventListener('click',()=>{try{localStorage.setItem('egara_lang',LANG==='ca'?'es':'ca')}catch(e){}location.reload()});
  wrap.appendChild(b);
}
