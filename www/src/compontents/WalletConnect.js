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
		this.checkIfConnected()
	}

	componentDidMount() {
		setInterval(this.checkIfConnected, 1000);
	}

	checkIfConnected = () => {
		if (window.ethereum) {
			this.setState({ walletConnected: true })
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
				<Button variant='primary' fontWeight={500} mr={[1, 4]} fontSize={[1, 2]} onClick={this.connnectWallet}>Connect Wallet</Button>
				:
                <Link mr={[1, 4]} href={"https://etherscan.io/address/" + userAddress}>
                    <Button variant='primary' fontWeight={500} mr={[1, 4]} fontSize={[1, 2]}>Wallet Connected</Button>
                </Link>
				}
			</div>
		);
	}
}

export default WalletConnect;