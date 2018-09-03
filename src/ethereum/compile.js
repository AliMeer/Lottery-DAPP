const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
 const buildPath = path.resolve(__dirname, 'build');
 fs.removeSync(buildPath);
 const contractPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
 const source = fs.readFileSync(contractPath, 'utf8');
 const output = solc.compile(source, 1).contracts;
//console.log(solc.compile(source, 1));
//module.exports = solc.compile(source, 1).contracts[':Lottery'];
 //fs.ensureDirSync(buildPath);
 console.log(output);
for(let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
}
/* old code below 
const buildPath = path.resolve(__dirname, 'build');
 fs.removeSync(buildPath);
 const contractPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
 const source = fs.readFileSync(contractPath, 'utf8');
 const output = solc.compile(source, 1).contracts;
 //fs.ensureDirSync(buildPath);
 console.log(output);
for(let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
}
*/