import React, { Component } from 'react';
import { Button, Link } from 'rebass';
import { getWeb3 } from '../ethereum/ethereum';

class WalletConnect extends Component {
	constructor() {
		super();
		this.state = {
			walletConnected: false,
			userAddress: ''
		}
	}

	connnectWallet = async () => {
		if(!window.ethereum) {
			window.alert('No Ethereum wallet found');
		}
		else {
			const accounts = await window.ethereum.enable();
			const userAddress = accounts[0];
			this.setState({ userAddress, walletConnected: true });
		}
		// const web3 = await getWeb3();
		// console.log(web3)
	}

	render() {
		const { userAddress, walletConnected } = this.state;
		return (
			<div>
				{!walletConnected
				?
				<Button variant='primary' fontWeight={500} mr={4} onClick={this.connnectWallet}>Connect Wallet</Button>
				:
                <Link mr={4} href={"https://etherscan.io/address/" + userAddress}>
                    <Button variant='primary' fontWeight={500} mr={4}>{userAddress.substr(0, 6)}...{userAddress.substr(37, 42)} Connected</Button>
                </Link>
				}
			</div>
		);
	}
}

export default WalletConnect;