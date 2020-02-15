import { getWeb3, getAddress } from './ethereum';
import SponsorToken from '../abis/SponsorToken.json';

export const deployContract = async (argumentObj) => {
    const web3 = await getWeb3();
    const from = getAddress();
    // const gas
    const data = SponsorToken.bytecode;
    const abi = SponsorToken.abi;
    const SponsorContract = new web3.eth.Contract(abi, null, { data });

    const sponsor = await SponsorContract.deploy(argumentObj).send({ from });

    console.log(sponsor.options.address);
}

// function deploy(
//     name,
//     symbol,
//     decimals,
//     fundraiseAmount,
//     interestRate,
//     endTime,
//     description,
//     addressUSDC,
//     recipient,
// ) {
//     console.log("deploying")
//     return
// }