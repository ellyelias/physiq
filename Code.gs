/**
 * PhysiQ pretest/posttest backend.
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
 * Re-deploying later (after editing this file again): Deploy -> Manage
 * deployments -> pencil icon -> New version -> Deploy. The URL stays the
 * same, so you don't need to update index.html again.
 */

var SHEET_NAME = 'Results';

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, 2).setValues([['key', 'value']]);
  }
  return sheet;
}

function readValue_(key) {
  var sheet = getSheet_();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === key) return data[i][1];
  }
  return '';
}

function writeValue_(key, value) {
  var sheet = getSheet_();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      sheet.getRange(i + 1, 2).setValue(value);
      return;
    }
  }
  sheet.appendRow([key, value]);
}

function doGet(e) {
  var key = (e.parameter && e.parameter.key) || 'test-results';
  var value = readValue_(key);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, value: value }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    writeValue_(body.key, body.value);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
