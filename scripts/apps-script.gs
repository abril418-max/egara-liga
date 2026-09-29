// Hoja de Google "Egara disponibilidad" > Extensiones > Apps Script. Pega este código y publícalo como aplicación web.
const CODIGO = 'CAMBIA-ESTE-CODIGO'; // código del equipo que compartirás por WhatsApp

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Disponibilidad');
  if (!sh) { sh = ss.insertSheet('Disponibilidad'); sh.appendRow(['jornada', 'jugador', 'valor', 'actualizado']); }
  return sh;
}
function salida_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doGet() {
  const v = hoja_().getDataRange().getValues(); v.shift();
  return salida_({ ok: true, datos: v.map(r => ({ j: String(r[0]), p: String(r[1]), v: String(r[2]), t: r[3] instanceof Date ? r[3].toISOString() : String(r[3]) })) });
}

function doPost(e) {
  let d; try { d = JSON.parse(e.postData.contents); } catch (err) { return salida_({ ok: false, error: 'formato' }); }
  if (String(d.codigo || '').trim().toLowerCase() !== CODIGO.toLowerCase()) return salida_({ ok: false, error: 'codigo' });
  if (['si', 'duda', 'no', ''].indexOf(d.valor) < 0 || !/^[\w-]{1,40}$/.test(d.jornada || '') || !/^[\w-]{1,40}$/.test(d.jugador || '')) return salida_({ ok: false, error: 'datos' });
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const sh = hoja_(); const v = sh.getDataRange().getValues(); let fila = -1;
    for (let i = 1; i < v.length; i++) if (String(v[i][0]) === d.jornada && String(v[i][1]) === d.jugador) { fila = i + 1; break; }
    const row = [d.jornada, d.jugador, d.valor, new Date()];
    if (fila > 0) sh.getRange(fila, 1, 1, 4).setValues([row]); else sh.appendRow(row);
  } finally { lock.releaseLock(); }
  return salida_({ ok: true });
}
