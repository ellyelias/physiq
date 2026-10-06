/**
 * PhysiQ backend (pretest/posttest results + chapter/semester test attempts).
 *
 * What this does: receives the student results PhysiQ sends, keeps a running
 * list in this spreadsheet's "Results" sheet, and hands that list back to
 * every student's browser so the Teacher Dashboard stays in sync across
 * devices.
 *
 * SETUP (one-time, about 3 minutes):
 *  1. Create a new Google Sheet (any name, e.g. "PhysiQ Results").
 *  2. In the Sheet: Extensions -> Apps Script.
 *  3. Delete anything in the editor and paste this whole file in.
 *  4. Click Deploy -> New deployment -> type "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone
 *  5. Click Deploy, authorize when prompted, then copy the Web app URL
 *     it gives you (ends in /exec).
 *  6. Send that URL back to Claude (or paste it yourself into index.html,
 *     replacing PASTE_WEBAPP_URL_HERE on the GAS_WEBAPP_URL line near the
 *     top of the <script> block) and republish the site.
 *
 * UPDATE (chapter & semester tests): after pasting this newer version into your
 * existing script, you MUST redeploy: Deploy -> Manage deployments -> pencil icon
 * -> Version: New version -> Deploy. The URL stays the same. It adds:
 *   - a readable "Tests" sheet (one row per chapter/semester test attempt),
 *   - a readable "ResearchTable" sheet (one row per pretest/posttest),
 *   - safe handling of many students submitting at the same time,
 *   - storage of values longer than one cell (Google limits a cell to 50,000 characters).
 *
 * Re-deploying later (after editing this file again): Deploy -> Manage
 * deployments -> pencil icon -> New version -> Deploy. The URL stays the
 * same, so you don't need to update index.html again.
 */

var SHEET_NAME = 'Results';
var TESTS_SHEET = 'Tests';
var RESEARCH_SHEET = 'ResearchTable';
var CHUNK = 45000;   // a Google Sheets cell holds at most 50,000 characters

var TEST_HEADERS = ['id', 'timestamp', 'name', 'batch', 'group', 'semester', 'kind', 'test', 'title',
  'score', 'total', 'percentage', 'durationSec', 'elapsedSec', 'easy', 'medium', 'hard', 'byTopic', 'perQuestion'];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, 2).setValues([['key', 'value']]);
  }
  return sheet;
}

function getNamedSheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/* ---- key/value store (values longer than one cell are split over several rows: key, key#1, key#2 ...) ---- */

function readValue_(key) {
  var data = getSheet_().getDataRange().getValues();
  var parts = [];
  for (var i = 1; i < data.length; i++) {
    var k = String(data[i][0]);
    if (k === key) parts.push([0, String(data[i][1])]);
    else if (k.indexOf(key + '#') === 0) parts.push([parseInt(k.substring(key.length + 1), 10) || 0, String(data[i][1])]);
  }
  if (!parts.length) return '';
  parts.sort(function (a, b) { return a[0] - b[0]; });
  return parts.map(function (p) { return p[1]; }).join('');
}

function writeValue_(key, value) {
  value = (value === undefined || value === null) ? '' : String(value);
  var sheet = getSheet_();
  var data = sheet.getDataRange().getValues();
  var exactRow = -1, otherRows = [];
  for (var i = 1; i < data.length; i++) {
    var k = String(data[i][0]);
    if (k === key) exactRow = i + 1;
    else if (k.indexOf(key + '#') === 0) otherRows.push(i + 1);
  }
  if (value.length <= CHUNK && !otherRows.length) {
    if (exactRow > 0) sheet.getRange(exactRow, 2).setValue(value);
    else sheet.appendRow([key, value]);
    return;
  }
  // long value (or one that used to be long): delete this key's rows, then write the chunks
  var all = otherRows.slice();
  if (exactRow > 0) all.push(exactRow);
  all.sort(function (a, b) { return b - a; });
  for (var d = 0; d < all.length; d++) sheet.deleteRow(all[d]);
  for (var p = 0, n = 0; p < value.length || n === 0; p += CHUNK, n++) {
    sheet.appendRow([n === 0 ? key : key + '#' + n, value.substring(p, p + CHUNK)]);
  }
}

/* ---- research results: merge instead of overwrite, so two students finishing together never lose a record ---- */

function recId_(r) { return [r.name, r.type, r.semester || 1, r.timestamp].join('|'); }

function mergeResults_(incomingJson) {
  var incoming = [], existing = [];
  try { incoming = JSON.parse(incomingJson) || []; } catch (e) { return incomingJson; }
  try { var cur = readValue_('test-results'); existing = cur ? (JSON.parse(cur) || []) : []; } catch (e2) { existing = []; }
  var seen = {}, out = [];
  existing.concat(incoming).forEach(function (r) {
    var id = recId_(r);
    if (!seen[id]) { seen[id] = true; out.push(r); }
  });
  return JSON.stringify(out);
}

function refreshResearchTable_(json) {
  try {
    var arr = JSON.parse(json) || [];
    var headers = ['timestamp', 'name', 'batch', 'group', 'semester', 'type', 'score', 'total', 'percentage', 'byTopic'];
    var sheet = getNamedSheet_(RESEARCH_SHEET, headers);
    sheet.clearContents();
    var rows = [headers].concat(arr.map(function (r) {
      return [r.timestamp || '', r.name || '', r.batch || '', r.group || '', r.semester || 1, r.type || '',
        r.score, r.total, r.percentage, JSON.stringify(r.byTopic || {})];
    }));
    sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
    sheet.setFrozenRows(1);
  } catch (err) { /* the readable table is a convenience; never block saving */ }
}

/* ---- chapter / semester test attempts: one row each ---- */

function appendTest_(row) {
  var sheet = getNamedSheet_(TESTS_SHEET, TEST_HEADERS);
  var ids = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues() : [];
  for (var i = 0; i < ids.length; i++) if (String(ids[i][0]) === String(row.id)) return false;   // already stored
  sheet.appendRow(TEST_HEADERS.map(function (h) {
    var v = row[h];
    if (v === undefined || v === null) return '';
    return (typeof v === 'object') ? JSON.stringify(v) : v;
  }));
  return true;
}

function listTests_() {
  var sheet = getNamedSheet_(TESTS_SHEET, TEST_HEADERS);
  if (sheet.getLastRow() < 2) return [];
  var vals = sheet.getRange(2, 1, sheet.getLastRow() - 1, TEST_HEADERS.length).getValues();
  return vals.map(function (r) {
    var o = {};
    TEST_HEADERS.forEach(function (h, i) { o[h] = r[i]; });
    return o;
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === 'list-tests') return json_({ ok: true, rows: listTests_() });
  var key = p.key || 'test-results';
  return json_({ ok: true, value: readValue_(key) });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(25000);
    var body = JSON.parse(e.postData.contents);
    if (body.action === 'append-test') {
      var added = appendTest_(body.row || {});
      return json_({ ok: true, added: added });
    }
    var value = body.value;
    if (body.key === 'test-results') {
      value = mergeResults_(value);
      writeValue_(body.key, value);
      refreshResearchTable_(value);
    } else {
      writeValue_(body.key, value);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e3) {}
  }
}
