// HOW TO SETUP GOOGLE SHEETS WEBHOOK
// 1. Go to Google Sheets and create a new sheet.
// 2. Add these exact column headers to row 1: timestamp, name, email, whatsapp, business, inquiryType
// 3. Click Extensions > Apps Script
// 4. Paste ALL of the code below into the script editor, replacing whatever is there.
// 5. Click Save.
// 6. Click Deploy > New deployment.
// 7. Select type "Web app".
// 8. Execute as: "Me", Who has access: "Anyone".
// 9. Click Deploy and authorize it.
// 10. Copy the Web App URL and set it as VITE_GOOGLE_SHEETS_WEBHOOK_URL in your app's variables or .env.

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Extract properties matching the frontend
    const timestamp = data.timestamp || new Date().toISOString();
    const name = data.name || '';
    const email = data.email || '';
    const whatsapp = data.whatsapp || '';
    const business = data.business || '';
    const inquiryType = data.inquiryType || '';

    // Append to the active sheet
    sheet.appendRow([timestamp, name, email, whatsapp, business, inquiryType]);

    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
