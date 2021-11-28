var BASE_URL = "https://mainnet-backend.alephium.org/addresses/";

//Enter your wallet address here
var WALLET_ADDRESS = "1DxSgjSjsweEoyiykwnWARhws9f26TZLfGXRevLx44NXw";

function ALPH_makeHttpRequest() {

  var response = UrlFetchApp.fetch(BASE_URL + WALLET_ADDRESS);
  Logger.log(response.getContentText());

  return response;
}

function ALPH_getTotalAlph() {

  var response = ALPH_makeHttpRequest();

  var TOTAL_ALPH = response.getContentText().split(":")[1].split(",")[0].replace(/"/g, "");
  Logger.log(TOTAL_ALPH);

  return TOTAL_ALPH;
}

function ALPH_getTotalTransaction() {

  var response = ALPH_makeHttpRequest();
  var TOTAL_TX = response.getContentText().split(":")[2].split(",")[0].replace(/}/g, "");

  Logger.log(TOTAL_TX);

  return TOTAL_TX;
}