import BigNumber from 'bignumber.js';

import { web3, formatTokenValueHuman } from './ethereum.js'

import SponsorToken from '../abis/SponsorToken.json';
import ERC20 from '../abis/ERC20.json';

let SponsorTokenContract;
let USDCTokenContract;

// Initialize Contracts
export const setSponsorTokenContract = async (address, web3) => {
    const abi = SponsorToken.abi
    SponsorTokenContract = new web3.eth.Contract(abi, address);
}

export const setUSDCTokenContract = async (address, web3) => {
    const abi = ERC20.abi
    USDCTokenContract = new web3.eth.Contract(abi, address);
}

// TODO: Get loan state
export const getLoanState = async () => {
    return SponsorTokenContract.methods.getLoanState().call();
}

export const getName = async () => {
    return SponsorTokenContract.methods.name().call();
}

export const getSymbol = async () => {
    return SponsorTokenContract.methods.symbol().call();
}

// Fundraising methods:
export const getTargetFundraiseAmount = async () => {
    return SponsorTokenContract.methods.getFundraiseAmount().call();
}

export const getCurrentAmountRaised = async () => {
    return SponsorTokenContract.methods.getContractBalanceUSDC().call();
}

export const getEndTimeFundraiser = async () => {
    return SponsorTokenContract.methods.getEndTimeFundraiser().call();
}

export const getStartTimeFundraiser = async () => {
    return SponsorTokenContract.methods.getStartTimeFundraiser().call();
}

export const getStartTimeOpenLoan = async () => {
    return SponsorTokenContract.methods.getStartTimeOpenLoan().call();
}

export const getCurrentContribution = async (addr) => {
    return SponsorTokenContract.methods.getCurrentContribution(addr).call();
}

export const getInterestRate = async () => {
    return SponsorTokenContract.methods.getInterestRate().call();
}

// Loan open methods:
export const getAmountRepaid = async () => {
    return SponsorTokenContract.methods.getContractBalanceUSDC().call();
}

// Get interest rate => getInterestRate()

export const getSponsorTokenValue = async () => {
    return SponsorTokenContract.methods.sponsorTokenToUSDC().call();
}

export const getRemainingRepayment = async () => {
    const rawContribution = await SponsorTokenContract.methods.getRemainingRepayment().call();
    const intContribution = parseInt(rawContribution);
    return formatTokenValueHuman(intContribution, 6);
}

// Loan exchange methods:
// Get current SponsorToken to USDC value => getSponsorTokenValue()

export const getTotalLoanPayment = async () => {
    return SponsorTokenContract.methods.getTotalLoanPayment().call();
}

export const getSponsorTokenHeld = async (addr) => {
    return SponsorTokenContract.methods.balanceOf(addr).call();
}

export const getTotalSponsorTokensExchanged = async () => {
    return SponsorTokenContract.methods.balanceOf(SponsorTokenContract.options.address).call();
}

// Could've merged this with the method below, don't hate me, clarity is nice
// OLD
export const approveOnUSDC = async (amt, addr) => {
    return USDCTokenContract.methods.approve(SponsorTokenContract.options.address, amt).send({ from: addr });
}

// Approve on SponsorToken (for repaying loan)
export const approveOnSponsorToken = async (amt, addr) => {
    return SponsorTokenContract.methods.approve(SponsorTokenContract.options.address, amt).send({ from: addr });
}

export const contribute = async (amt, addr, callback) => {
    USDCTokenContract.methods.approve(SponsorTokenContract.options.address, amt).send({ from: addr }).on('receipt', function(){
        SponsorTokenContract.methods.contribute(amt).send({ from: addr }).on('receipt', () => {
            callback();
        });
    }); 
}

export const payLoan = async (amt, addr) => {
    return USDCTokenContract.methods.approve(SponsorTokenContract.options.address, amt).send({ from: addr }).on('receipt', function(){
        SponsorTokenContract.methods.payLoan(amt).send({ from: addr });
    });
}
