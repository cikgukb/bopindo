/**
 * Google Apps Script to handle form submissions from the Landing Page.
 * 
 * Instructions to link to your "mlm indonesia" sheet:
 * 1. Open your "mlm indonesia" Google Sheet.
 * 2. In the first row, add these headers: name, email, phone, city, timestamp (case-sensitive).
 * 3. Go to Extensions > Apps Script.
 * 4. Delete any existing code and paste this code.
 * 5. Click Save (disk icon) and name it "Landing Page Handler".
 * 6. Click "Deploy" > "New Deployment".
 * 7. Select Type: "Web App".
 * 8. Description: "MLM Form Handler".
 * 9. Execute as: "Me".
 * 10. Who has access: "Anyone".
 * 11. Click "Deploy" and Authorize access.
 * 12. Copy the "Web App URL" and paste it into your script.js file.
 */

var sheetName = 'Sheet1'; // Change this if your sheet name is different (e.g., 'Leads')
var scriptProp = PropertiesService.getScriptProperties();

function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', doc.getId());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
