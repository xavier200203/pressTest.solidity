
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
    let deployer = accounts[0];
    let bAccount = accounts[1];
    console.log("chainID is :" + chainID + " address :" + deployer.address);

    const tokenSwap = await ethers.getContractFactory('TokenSwap',deployer)


    let tokenSwapAddress = await readConfig("0","TOKE_SWAP_ADDRESS");
    console.log("tokenSwapAddress :",tokenSwapAddress);

    const tokenSwapAContract = await tokenSwap.attach(
        tokenSwapAddress,
        { gasPrice: gasPrice, gasLimit: gasLimit}
    )
    console.log("erc20 A Contract :",tokenSwapAContract.address);
    let erc20AAddress = await readConfig("0","ERC20_A_ADDRESS");
    let erc20BAddress = await readConfig("0","ERC20_B_ADDRESS");

    // function swap(
    //     address _token1,
    //     address _owner1,
    //     uint _amount1,
    //     address _token2,
    //     address _owner2,
    //     uint _amount2

    var web3 = new Web3("http://45.76.163.231:20656")
    let nonce = await web3.eth.getTransactionCount(deployer.address, 'pending')
    console.log("xxl nonce ",nonce);

    // let loopNum = 10;
    let times = 50;
    let i = 0;
    var start = new Date().getTime()
    

    //1s 50次 ==>
    // .都能成功
    // .每一笔上链时间
    while(true){
        
        // tokenSwapAContract.swap(erc20AAddress,deployer.address,1,erc20BAddress,bAccount.address,1,{
        //     nonce:(nonce  + i)
        // });
        console.log("noncue is :",nonce  + i);
        // let tx = await tokenSwapAContract.swap(erc20AAddress,deployer.address,1,erc20BAddress,bAccount.address,1,{
        //     gasLimit:4000000,gasPrice:1000000000 , nonce:(nonce  + i)
        // })
        // console.log(tx);

        // let rep = await tx.wait();
        // console.log(rep.gasUsed);

        // tokenSwapAContract.swap(erc20AAddress,deployer.address,1,erc20BAddress,bAccount.address,1)


        tokenSwapAContract.swap(erc20AAddress,deployer.address,1,erc20BAddress,bAccount.address,1,{
            gasLimit:4000000,gasPrice:1000000000 , nonce:(nonce  + i)
        })
        i ++ ;
        await sleep(1000/times)

        return ;


    }

}


main();
