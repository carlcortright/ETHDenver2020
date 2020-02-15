import React, { Component } from 'react';
import { Button } from 'rebass';

class WalletConnect extends Component {
	render() {
		return (
            <Button variant='primary' fontWeight={500} mr={4}>Connect Wallet</Button>
		);
	}
}

export default WalletConnect;