/**
 * Google Apps Script to handle form submissions (Simplified Version)
 * 
 * Instructions:
 * 1. Open your "mlm indonesia" Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete ALL existing code and paste this new code.
 * 4. Click Save.
 * 5. Click "Deploy" > "New Deployment".
 * 6. Select "Web App".
 * 7. Execute as: "Me", Who has access: "Anyone".
 * 8. Click "Deploy".
 * 9. Copy the NEW Web App URL and update it in your script.js.
 */

var sheetName = 'Sheet1'; 

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // Get the sheet directly without needing an ID
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(sheetName);

    // Parse the incoming JSON data
    var contents = JSON.parse(e.postData.contents);
    
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      if (header === 'timestamp') return new Date();
      return contents[header] || "";
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
