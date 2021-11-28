# Alephium-GoogleAppScripts
Fun script to use with Google Sheet to query funny and interesting things on Alephium crypto project


This repository contains basic Google AppScripts that can be used in your GoogleSheet. All these scripts are related to Alephium project. Below you can find basic explaination about how to use these scripts

### ALPH_makeHttpRequest()
This core function make HTTP Get request to mainet backend of Alephium against a specific address to retrieve all information about this wallet address

### ALPH_getTotalAlph()
This function first call **ALPH_makeHttpRequest()** and return the total number of ALPH token for the specified wallet 

### ALPH_getTotalTransaction()
This function first call **ALPH_makeHttpRequest()** and return the total number of transaction for the specified wallet