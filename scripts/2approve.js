
const { ethers, getChainId} = require('hardhat')
const { utils} = require('ethers')
const {readConfig } = require('./utils/helper')

const main = async () => {

    let gasPrice = 0x02540be400;
    let gasLimit = 0x7a1200;

    let chainID = await getChainId();
    //let chainID = 0;
    let accounts = await ethers.getSigners()
    let deployer = accounts[0];
    let bAccount = accounts[1];
    console.log("chainID is :" + chainID + " address : " + deployer.address + " B : " + bAccount.address);

    let tokenSwapAddress = await readConfig("0","TOKE_SWAP_ADDRESS");


    const testToken = await ethers.getContractFactory('TestToken',deployer)
    let erc20AAddress = await readConfig("0","ERC20_A_ADDRESS");
    console.log("erc20 A Address :",erc20AAddress);

    const testTokenAContract = await testToken.attach(
        erc20AAddress,
        { gasPrice: gasPrice, gasLimit: gasLimit}
    )
    console.log("erc20 A Contract :",testTokenAContract.address);

    await testTokenAContract.connect(deployer).approve(tokenSwapAddress,1000000000000);


    let erc20BAddress = await readConfig("0","ERC20_B_ADDRESS");
    console.log("erc20 B Address :",erc20BAddress);

    const testTokenBContract = await testToken.attach(
        erc20BAddress,
        { gasPrice: gasPrice, gasLimit: gasLimit}
    )

    console.log("erc20 B Contract :",testTokenBContract.address);
    await testTokenBContract.connect(bAccount).approve(tokenSwapAddress,1000000000000);

}



main();
