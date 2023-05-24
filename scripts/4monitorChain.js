
const { ethers, getChainId} = require('hardhat')
const { utils} = require('ethers')
const {readConfig,sleep } = require('./utils/helper')
var Web3 = require('web3');

const main = async () => {


    let chainID = await getChainId();
    console.log("chainID is :" + chainID );

    var web3 = new Web3("http://45.77.131.215:20656")
    let waitTime = 5;

    while(true){
        
        //console.log(web3.eth);

        var currentHeight = await web3.eth.getBlockNumber()
        var preHeight = currentHeight - 1000

        if(preHeight  < 0) {
            preHeight = 1;
        }

        var count = currentHeight - preHeight
        var block1 = await web3.eth.getBlock(currentHeight);
        var timestamp1 = block1.timestamp

        var block2 = await web3.eth.getBlock(preHeight);
        var timestamp2 = block2.timestamp
        avg = (timestamp1 - timestamp2) / count
        console.log("from %s to %s avg time:%s",preHeight,currentHeight,avg);
        await sleep(waitTime * 1000)


    }

}


main();
