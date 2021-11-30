const BASE_URL = "https://mainnet-backend.alephium.org/";
const ALPH_UNIT = Math.pow(10, 18);
const UNIT_BASE = 10;
const TOKEN_HARDCAP = 1000000000;
const TOKEN_SOFTCAP = 140000000;

//Enter your wallet address here
var wallet_address = "1DxSgjSjsweEoyiykwnWARhws9f26TZLfGXRevLx44NXw";

function ALPH_makeHttpRequest() {

  var response = UrlFetchApp.fetch(BASE_URL + "addresses/" +  wallet_address);
  Logger.log(response.getContentText());

  return response;
}

function ALPH_getTotalAlph() {

  var response = ALPH_makeHttpRequest();
  var total_alph = parseInt(JSON.parse(response.getContentText()).balance,UNIT_BASE);
  Logger.log(total_alph);

  return total_alph/ALPH_UNIT;
}

function ALPH_getTotalTransaction() {

  var response = ALPH_makeHttpRequest();
  var total_tx = JSON.parse(response.getContentText()).txNumber;

  Logger.log(total_tx);

  return total_tx;
}

function ALPH_getTotalCirculatingSupply() {

  var response = UrlFetchApp.fetch(BASE_URL + "infos/supply/circulating-alph");
  var total_circulating = parseFloat(response.getContentText(), UNIT_BASE);
  Logger.log(response.getContentText());

  return total_circulating;
}

function ALPH_getTotalSupplySoftCap() {

  var response = UrlFetchApp.fetch(BASE_URL + "infos/supply/total-alph");
  var total_alph = parseFloat(response.getContentText(), UNIT_BASE);
  Logger.log(response.getContentText());

  return total_alph;
}

function ALPH_getTotalCirculatingSupplySoftCapPercentage() {

  var percentage = (100 * ALPH_getTotalCirculatingSupply()) / ALPH_getTotalSupplySoftCap();
  Logger.log(percentage + "%");

  return percentage;
}

function ALPH_getTotalCirculatingSupplyHardCapPercentage() {

  var percentage = (100 * ALPH_getTotalCirculatingSupply()) / TOKEN_HARDCAP;
  Logger.log(percentage + "%");

  return percentage;
}