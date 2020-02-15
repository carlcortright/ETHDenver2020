import BigNumber from 'bignumber.js';

import { web3 } from './ethereum.js'

import SponsorToken from '../abis/SponsorToken.json';
import ERC20 from '../abis/ERC20.json';

let SponsorTokenContract;
let USDCTokenContract;

// Initialize Contracts
export const setSponsorTokenContract = async (address) => {
    const abi = SponsorToken.abi
    SponsorTokenContract = web3.eth.Contract(abi, address);
}

export const setUSDCTokenContract = async (address) => {
    const abi = ERC20.abi
    USDCTokenContract = web3.eth.Contract(abi, address);
}

// TODO: Get loan state

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
    const from = { from: web3.eth.accounts[0] }
    return USDCTokenContract.methods.approve(SponsorTokenContract.options.address, amt).send({ from });
}

// Approve on SponsorToken (for repaying loan)
export const approveOnSponsorToken = async () => {
    const from = { from: web3.eth.accounts[0] }
    return SponsorTokenContract.methods.approve(SponsorTokenContract.options.address, amt).send({ from });
}

export const contribute = async () => {
    const from = { from: web3.eth.accounts[0] }
    return SponsorTokenContract.methods.contribute(amt).send({ from });
}

export const payLoan = async () => {
    const from = { from: web3.eth.accounts[0] }
    return SponsorTokenContract.methods.payLoan(amt).send({ from });
}
