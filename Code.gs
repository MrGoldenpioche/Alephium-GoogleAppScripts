const BASE_URL = "https://mainnet-backend.alephium.org/";
const ALPH_UNIT = Math.pow(10, 18);
const UNIT_BASE = 10;
const TOKEN_HARDCAP = 1000000000;
const TOKEN_SOFTCAP = 140000000;
const CMC_TOKEN = "ALPH";

//Enter your wallet address here
var wallet_address = "1DxSgjSjsweEoyiykwnWARhws9f26TZLfGXRevLx44NXw";

//Enter your CoinMarketCap API key here => https://pro.coinmarketcap.com/signup/
var cmc_api_key = "876631df-bae8-4b55-bc71-7ab92ff63f96";

//switch to make your code more verbose
var isDebug = true;

function ALPH_makeHttpRequest() {

  var response = UrlFetchApp.fetch(BASE_URL + "addresses/" +  wallet_address);
  
  if(isDebug) {
    Logger.log(response.getContentText());
  }

  return response;
}

function ALPH_getTotalAlph() {

  var response = ALPH_makeHttpRequest();
  var total_alph = parseInt(JSON.parse(response.getContentText()).balance,UNIT_BASE);

  if(isDebug){
    Logger.log(total_alph);
  }

  return total_alph/ALPH_UNIT;
}

function ALPH_getTotalTransaction() {

  var response = ALPH_makeHttpRequest();
  var total_tx = JSON.parse(response.getContentText()).txNumber;

  if(isDebug){
    Logger.log(total_tx);
  }

  return total_tx;
}

function ALPH_getTotalCirculatingSupply() {

  var response = UrlFetchApp.fetch(BASE_URL + "infos/supply/circulating-alph");
  var total_circulating = parseFloat(response.getContentText(), UNIT_BASE);
  
  if(isDebug){
    Logger.log(response.getContentText());
  }

  return total_circulating;
}

function ALPH_getTotalSupplySoftCap() {

  var response = UrlFetchApp.fetch(BASE_URL + "infos/supply/total-alph");
  var total_alph = parseFloat(response.getContentText(), UNIT_BASE);
  
  if(isDebug){
    Logger.log(response.getContentText());
  }

  return total_alph;
}

function ALPH_getTotalCirculatingSupplySoftCapPercentage() {

  var percentage = (100 * ALPH_getTotalCirculatingSupply()) / ALPH_getTotalSupplySoftCap();

  if(isDebug){
    Logger.log(percentage + "%");
  }

  return percentage;
}

function ALPH_getTotalCirculatingSupplyHardCapPercentage() {

  var percentage = (100 * ALPH_getTotalCirculatingSupply()) / TOKEN_HARDCAP;
  
  if(isDebug){
    Logger.log(percentage + "%");
  }

  return percentage;
}

function ALPH_getCurrentTokenPrice() {
  
  var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
  
  var headers = {
    "Accept" : "application/json",
    "Accept-Encoding" : "deflate, gzip",
    "X-CMC_PRO_API_KEY" : cmc_api_key
  };

  //workaround => set parameter directly to the URL request
  var params = "?symbol=" + CMC_TOKEN;
  url += params;

  var options = {
    'contentType' : "application/json",
    'method' : 'GET',
    'headers' : headers
  };

  if(isDebug){
    var test = UrlFetchApp.getRequest(url, options);
    for(i in test){
      Logger.log(i + ": " + test[i]);
    }
  }

  var response = UrlFetchApp.fetch(url, options);
  var current_price = 0.168;

  //parsing interesting fields in the response
  var full_data = JSON.parse(response.getContentText()).data;
  var is_cmc_active = JSON.parse(response.getContentText()).data.ALPH.is_active;

  if(is_cmc_active != 0){
    current_price = JSON.parse(response.getContentText()).data.ALPH.quote.USD.price;
  }
  
  if(isDebug){
    Logger.log("Full response = " + response.getContentText());
    Logger.log("Price = " + current_price);
    Logger.log("Data = " + full_data);
  }

  return current_price;
}