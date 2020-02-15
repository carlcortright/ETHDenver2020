import Web3 from 'web3';
import BigNumber from 'bignumber.js';

let web3;

export const getWeb3 = async () => {
    if(!web3) {
        web3 = new Web3(Web3.givenProvider);
    }
    return web3;
}

export const getAddress = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}


BigNumber.config({ DECIMAL_PLACES: 2 });

export const formatTokenValueHuman = async (value, decimals) => {
    const bn = new BigNumber(value);
    
    return bn.shiftedBy(-decimals).toString(10);
};

export const formatTokenValueContract = async (value, decimals) => {
    const bn = new BigNumber(value);
    
    return bn.shiftedBy(decimals).toString(10);
}