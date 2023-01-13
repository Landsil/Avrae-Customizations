/**
This script should be attached to a sheet, you can find example template here:
- https://docs.google.com/spreadsheets/d/1T0cp85_WnmzSBw7bt3uBVgjEShGV-RbH8n5MYabkww0
If you copy template it will also copy the code.

First time you will have to click Extensions > Apps Script and run it manually by pressing "play" icon on top.
After you give it permissions it will show itself in the new menu in sheet called "Actions"

This code takes a list of items and their rarities, checks if tick box is ticked and then makes a JSON that can be used as gvar with this Magic Store.
https://github.com/Landsil/Avrae-Customizations/blob/main/Server%20Tools/magictrade.alias
(you will have to replace gvar in code)
*/


// Menu options
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name: 'Make JSON',
    functionName: 'makeJSON'
  },
  ];
  sheet.addMenu('Actions', entries);
};

// Load all of items from Current
function load_current() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var current = SpreadsheetApp.setActiveSheet(ss.getSheetByName("current"));
  var lastRowG = current.getRange('A1:A').getValues().filter(String).length + 1;
  var currentList = current.getRange(2, 1, lastRowG, 3).getValues();  // start row, start column, number of rows, number of columns
  return currentList
};

function makeJSON() {
  var currentList = load_current()
  var currentJSON = []
  var currentCommon = []
  var currentUncommon = []
  var currentrare = []
  var currentVeryrare = []
  var currentLegendary = []


  for (let i = 0; i < currentList.length; i++) {
    if (currentList[i][2] & currentList[i][1] == "common") {
        currentCommon.push(currentList[i][0])}
    else if (currentList[i][2] & currentList[i][1] == "uncommon") {
        currentUncommon.push(currentList[i][0])}
    else if (currentList[i][2] & currentList[i][1] == "rare") {
        currentrare.push(currentList[i][0])}
    else if (currentList[i][2] & currentList[i][1] == "veryrare") {
        currentVeryrare.push(currentList[i][0])}
    else if (currentList[i][2] & currentList[i][1] == "legendary") {
        currentLegendary.push(currentList[i][0])}
  }

  currentJSON.push({"common" : currentCommon, "uncommon" : currentUncommon, "rare" : currentrare, "veryrare" : currentVeryrare, "legendary" : currentLegendary} )

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var current = SpreadsheetApp.setActiveSheet(ss.getSheetByName("current"));
  current.getRange("F1").setValue(JSON.stringify(currentJSON))

}
