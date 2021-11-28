# Alephium-GoogleAppScripts
Fun script to use with Google Sheet to query funny and interesting things on Alephium crypto project.
This repository contains basic Google AppScripts that can be used in your GoogleSheet. All these scripts are related to Alephium project. Below you can find basic explaination about how to use these scripts

### Constant variables
To use these functions, two variables are set.
> - BASE_URL : fixed to "https://mainnet-backend.alephium.org/addresses/"
> - WALLET_ADDRESS : add your Alephium's wallet address here

## Available functions

### ALPH_makeHttpRequest()
This core function make HTTP Get request to mainet backend of Alephium against a specific address to retrieve all information about this wallet address

### ALPH_getTotalAlph()
This function first call **ALPH_makeHttpRequest()** and return the total number of ALPH token for the specified wallet.
**Important** : this function returns the raw number of ALPH. You must divide it by 1000000000000000000 in GoogleSheet. 

### ALPH_getTotalTransaction()
This function first call **ALPH_makeHttpRequest()** and return the total number of transaction for the specified wallet

## How to use them
Go to https://script.google.com/ and create a new project named **Alephium**. 
This will automatically create a file named **code.gs**. Open it and past the functions you want in it.
Once done, you can simply save your project and run the code to be sure that all data are retrieved correctly 
If all is working as expected, you can call these functions into GoogleSheet :-)

