const BASE_URL = "https://mainnet-backend.alephium.org/addresses/";

//Enter your Alephium' wallet address here
var wallet_address = "14kXEBykCLgMQr7PV94v4ygtHuPRmFtMvyc42DcDjA5Cu";

function ALPH_makeHttpRequest() {

  var response = UrlFetchApp.fetch(BASE_URL + wallet_address);
  Logger.log(response.getContentText());

  return response;
}

function ALPH_getTotalAlph() {

  var response = ALPH_makeHttpRequest();
  var total_alph = parseInt(JSON.parse(response.getContentText()).balance,10);

  Logger.log(total_alph);

  return total_alph/Math.pow(10, 18);
}

function ALPH_getTotalTransaction() {

  var response = ALPH_makeHttpRequest();
  var total_tx = parseInt(JSON.parse(response.getContentText()).txNumber,10);

  Logger.log(total_tx);

  return total_tx;
}