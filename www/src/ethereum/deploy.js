import { getWeb3, getAddress } from './ethereum';
import SponsorToken from '../abis/SponsorToken.json';

export const deployContract = async () => {
    const web3 = await getWeb3();
    const from = await getAddress();
    // const gas

    const data = SponsorToken.bytecode;
    const abi = SponsorToken.abi;

    const SponsorContract = new web3.eth.Contract(abi, null, { data });

    console.log(SponsorContract.deploy)

    const argumentArray = [
        'Test',
        'TES',
        6,
        5000000000000,
        4,
        5555555555555,
        'Yes',
        '0xFB54a6869F7291ff4fCC0e581ce6c0dA04C29E5a',
        '0x5E573d2374aebf5EC39F74B853f65c41d8B54141'
    ]

    const sponsor = await SponsorContract.deploy({ data, arguments: argumentArray}).send({ from });

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