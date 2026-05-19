/**
 * Mint House by Kasa – Dallas Downtown
 * FF&E / OS&E Checklist — Google Apps Script Backend
 * File: Code.gs
 *
 * Deploy this as a Web App:
 *   Execute as:  Me (your Google account)
 *   Who has access:  Anyone
 *
 * After deploying, copy the Web App URL and paste it into
 * the APPS_SCRIPT_URL constant in script.js.
 */

/**
 * Handles POST requests from the checklist app.
 * Appends rows to the specified sheet tab,
 * creating the tab with a header row if it doesn't exist.
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    const sheetId   = payload.sheetId;
    const tabName   = payload.tabName;
    const headerRow = payload.headerRow;
    const rows      = payload.rows;

    if (!sheetId || !tabName || !rows || !rows.length) {
      return jsonResponse({ status: 'error', message: 'Missing required fields.' });
    }

    const ss  = SpreadsheetApp.openById(sheetId);
    let sheet = ss.getSheetByName(tabName);

    // Create tab with header if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      sheet.appendRow(headerRow);

      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, headerRow.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#112438');   // Kasa Midnight Blue
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFrozenRows(1);
    }

    // Append all data rows
    rows.forEach(row => sheet.appendRow(row));

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, headerRow.length);

    return jsonResponse({
      status:  'success',
      message: `${rows.length} rows appended to tab "${tabName}".`,
      rows:    rows.length
    });

  } catch (err) {
    return jsonResponse({ status: 'error', message: err.toString() });
  }
}

/**
 * Handles GET requests — useful for testing that the web app is live.
 */
function doGet() {
  return HtmlService.createHtmlOutput(
    '<h2 style="font-family:sans-serif;color:#112438">' +
    '✓ Kasa FF&amp;E OS&amp;E — Apps Script is running</h2>' +
    '<p style="font-family:sans-serif;color:#5F738B">POST endpoint ready.</p>'
  );
}

/**
 * Returns a JSON ContentService response.
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
