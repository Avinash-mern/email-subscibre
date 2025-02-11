var sheetName = 'Sheet1';
var scriptProp = PropertiesService.getScriptProperties();

function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', doc.getId());
}

// Function to handle signup
function doPost(e) {
  var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
  var sheet = doc.getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();

  var email = e.parameter.Email;
  var password = e.parameter.Password;

  // Check if email already exists
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Email already registered" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // Add new user
  var newRow = [email, e.parameter.Firstname, e.parameter.Lastname, password, new Date()];
  sheet.appendRow(newRow);

  return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to handle login
function doGet(e) {
  var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
  var sheet = doc.getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();

  var email = e.parameter.email;
  var password = e.parameter.password;

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === email && data[i][3] === password) {
      return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ "result": "failed", "message": "Invalid email or password" }))
    .setMimeType(ContentService.MimeType.JSON);
}
