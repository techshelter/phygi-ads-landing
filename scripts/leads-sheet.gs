/**
 * Google Apps Script webhook: appends each lead from the landing page to this sheet.
 *
 * Setup (once):
 * 1. In the Google Sheet: Extensions → Apps Script, paste this file, save.
 * 2. Project Settings → Script properties → add LEADS_SHEET_SECRET = <a long random string>.
 * 3. Deploy → New deployment → type "Web app", Execute as "Me", Who has access "Anyone".
 *    Copy the web app URL.
 * 4. In Vercel → Settings → Environment Variables (Production only):
 *    LEADS_SHEET_WEBHOOK_URL = <web app URL>
 *    LEADS_SHEET_SECRET      = <same secret as step 2>
 *    then redeploy.
 *
 * Column order is defined in lib/sheet.ts (SHEET_HEADERS); headers are written on the first lead.
 * After editing this script, use Deploy → Manage deployments → Edit → New version (the URL stays the same).
 */
var HEADERS = [
  'Date', 'Profile', 'First name', 'Last name', 'Company', 'Phone', 'Email',
  'Target communes', 'Budget', 'Shop type', 'Commune', 'Customers per day', 'Consent',
];

function doPost(e) {
  var secret = PropertiesService.getScriptProperties().getProperty('LEADS_SHEET_SECRET');
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return respond({ ok: false, error: 'bad json' });
  }
  if (!secret || body.secret !== secret) return respond({ ok: false, error: 'unauthorized' });
  if (!Array.isArray(body.row) || body.row.length !== HEADERS.length) return respond({ ok: false, error: 'bad row' });

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    sheet.appendRow(body.row.map(String));
  } finally {
    lock.releaseLock();
  }
  return respond({ ok: true });
}

function respond(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
