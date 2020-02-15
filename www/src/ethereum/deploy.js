import { getWeb3, getAddress } from './ethereum';
import SponsorToken from '../abis/SponsorToken.json';

export const deployContract = async (
    name,
    symbol,
    decimals,
    fundraiseAmount,
    interestRate,
    endTime,
    description,
    addressUSDC,
    recipient
) => {
    const web3 = await getWeb3();
    const from = await getAddress();
    // const gas

    const data = SponsorToken.bytecode;
    const abi = SponsorToken.abi;

    const SponsorContract = new web3.eth.Contract(abi, null, { data });

    const argumentArray = [
        name,
        symbol,
        decimals,
        fundraiseAmount,
        interestRate,
        endTime,
        description,
        addressUSDC,
        recipient
    ]

    const sponsor = await SponsorContract.deploy({ data, arguments: argumentArray}).send({ from });

    console.log(sponsor.options.address);

    const sponsorTokenAddress = sponsor.options.address;

    return sponsorTokenAddress;
    // const SponsorContractDeployed = new web3.eth.Contract(abi, sponsorTokenAddress);
    // const description = await SponsorContractDeployed.methods.getDescription().call();
    // console.log('description', description);
}