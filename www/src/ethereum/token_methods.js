import Web3 from 'web3';
import BigNumber from 'bignumber.js';

import SponsorToken from '../abis/SponsorToken.json';
import ERC20 from '../abis/ERC20.json';

let web3;

let SponsorTokenContract;
let USDCTokenContract;

// Initialize Contracts
export const getSponsorTokenContract = async (address) => {
    const abi = SponsorToken.abi
    SponsorTokenContract = web3.eth.Contract(abi, address);
}

export const getUSDCTokenContract = async (address) => {
    const abi = ERC20.abi
    USDCTokenContract = web3.eth.Contract(abi, address);
}

// TODO: Get loan state

export const getName = async () => {
    return SponsorTokenContract.methods.name().call();
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

// TODO: Get your current contribution

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

// Loan exchange methods:
// Get current SponsorToken to USDC value => getSponsorTokenValue()


export const getTotalLoanPayment = async () => {
    return SponsorTokenContract.methods.getTotalLoanPayment().call();
}

// TODO: Get current sponsortoken balance of end user
// TODO: Get amount exchanged
