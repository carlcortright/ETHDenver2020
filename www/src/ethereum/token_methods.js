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

export const getCurrentContribution = async () => {
    return SponsorTokenContract.methods.getCurrentContribution(web3.eth.accounts[0]).call();
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

// Loan exchange methods:
// Get current SponsorToken to USDC value => getSponsorTokenValue()

export const getTotalLoanPayment = async () => {
    return SponsorTokenContract.methods.getTotalLoanPayment().call();
}

export const getSponsorTokenHeld = async () => {
    return SponsorTokenContract.methods.balanceOf(web3.eth.accounts[0]).call();
}

export const getTotalSponsorTokensExchanged = async () => {
    return SponsorTokenContract.methods.balanceOf(SponsorTokenContract.options.address).call();
}

// Could've merged this with the method below, don't hate me, clarity is nice
export const approveOnUSDC = async (amt) => {
    return USDCTokenContract.methods.approve(SponsorTokenContract.options.address, amt).send();
}

// Approve on SponsorToken (for repaying loan)
export const approveOnSponsorToken = async () => {
    return SponsorTokenContract.methods.approve(SponsorTokenContract.options.address, amt).send();
}

export const contribute = async () => {
    return SponsorTokenContract.methods.contribute(amt).send();
}

export const payLoan = async () => {
    return SponsorTokenContract.methods.payLoan(amt).send();
}
