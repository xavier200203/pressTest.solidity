
const { ethers, getChainId} = require('hardhat')
const { utils} = require('ethers')
const {writeConfig } = require('./utils/helper')

const main = async () => {

    let gasPrice = 0x02540be400;
    let gasLimit = 0x7a1200;

    let chainID = await getChainId();
    //let chainID = 0;
    let accounts = await ethers.getSigners()
    let deployer = accounts[0];
    console.log("chainID is :" + chainID + " address :" + deployer.address);


    const TokenSwap = await ethers.getContractFactory('TokenSwap',deployer)

    const tokenSwapContract = await TokenSwap.deploy(
        { gasPrice: gasPrice, gasLimit: gasLimit}
    )

    console.log("token Swap Contract :",tokenSwapContract.address);
    await writeConfig("0","0","TOKE_SWAP_ADDRESS",tokenSwapContract.address);

    
}



main();
