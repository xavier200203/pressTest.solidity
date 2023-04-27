
const { ethers, getChainId} = require('hardhat')
const { utils} = require('ethers')

const {NAME721,SYMBOL721,BASEURI, writeConfig,deployERC20 } = require('./utils/helper')

const main = async () => {


    let chainID = await getChainId();
    //let chainID = 0;
    let accounts = await ethers.getSigners()
    let deployer = accounts[0];
    console.log("chainID is :" + chainID + " address :" + deployer.address);

    let erc20Contract = await deployERC20("A","SA",deployer);
    await writeConfig("0","0","ERC20_A_ADDRESS",erc20Contract.address);

    erc20Contract = await deployERC20("B","SB",deployer);
    await writeConfig("0","0","ERC20_B_ADDRESS",erc20Contract.address);

}



main();
