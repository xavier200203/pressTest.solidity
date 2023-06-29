
const { ethers, getChainId} = require('hardhat')
const { utils} = require('ethers')
const {readConfig,sleep } = require('./utils/helper')
var Web3 = require('web3');

const main = async () => {

    let gasPrice = 0x02540be400;
    let gasLimit = 0x7a1200;

    let chainID = await getChainId();
    //let chainID = 0;
    let accounts = await ethers.getSigners()
    let deployer = accounts[2];
    let bAccount = accounts[3];
    console.log("chainID is :" + chainID + " address :" + deployer.address);


    // hre.network.provider is an EIP1193-compatible provider.
    hre.web3 = new Web3(hre.network.provider);
    let nonce = await hre.web3.eth.getTransactionCount(deployer.address, 'pending')
    console.log("xxl nonce ",nonce);


    let times = 50;
    let i = 0;
    //1s 50次 ==>
    // .都能成功
    // .每一笔上链时间
    while(true){
        
        console.log("noncue is :",nonce  + i);
        hre.web3.eth.sendTransaction({
            from: deployer.address,
            to: bAccount.address,
            value: '1'
        },{
            nonce
        })

        i ++ ;
        await sleep(1000/times)


    }

}


main();
