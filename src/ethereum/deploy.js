const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const path = require('path');
const fs = require('fs-extra');
const lottery = require('./build/Lottery.json');

//Add your mnemonic here
const RINKEBY_MNEM = 'pull vintage tag universe cancel oval inner program mule praise strike tooth';
//Add your provider URL or infura network URL or leave it as it is if you wish you use mine
const PROVIDER_URL = 'https://rinkeby.infura.io/L8Yx8J89L13yZbFG30ey';

const provider = new HDWalletProvider(
    //mnemonic for ethereum account to deploy with
    RINKEBY_MNEM,
    //using infuria as no local node running and not in browser
    PROVIDER_URL
);
//this will create web3 instance with provider for rinkeby network
const web3 = new Web3(provider);

const deploy = async () =>    {
    
    //get list of accounts from web3 eth
    const accounts = await web3.eth.getAccounts();
    //
    console.log("\nAttempting to deploy with: \n" + accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(lottery.interface))
        .deploy({data: '0x' + lottery.bytecode})
        .send({gas: '10000000', from: accounts[0]});
    
    console.log("\nContract deployed to: \n" + result.options.address);

};

deploy();