# Lottery Smart Contract and DApp

Ehtereum network lottery smart contract written in solidity.
Web3 integreated React front end with node and redux.



### Deploy
>Please edit "src/ethereum/deploy.js" to add your network mnomonic so that RINKEBY_MNEM is a string with
>your mnemonic. You can also add your own network URL or infura api key/URL on line 8 so that PROVIDER_URL has 
>the string equavalent of your specific netwrok URL or infura URL your api key. You can leave it as it is and use
>my infura URL

Once done please run the following command on the command line while in ethereum folder location:

```
npm run deploy
```

This will output the address where the contract gets deployed and also the address that was used for deployment.

You can use this contract address for further interactive testing on http://remix.ethereum.org/ 

## If you face any issues, please contact me via github or on ali@purple7.com