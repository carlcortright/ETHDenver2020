import React, { Component } from 'react';
import { Button } from 'rebass';

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
	}

	render() {
		const { userAddress, walletConnected } = this.state;
		return (
			<div>
				{!walletConnected
				?
				<Button variant='primary' fontWeight={500} mr={4} onClick={this.connnectWallet}>Connect Wallet</Button>
				:
				<div>{userAddress}</div>
				}
			</div>
		);
	}
}

export default WalletConnect;