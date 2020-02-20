import React, { Component } from 'react';
import { Box, Flex, Text, Link, Image } from 'rebass';
import Logo from '../img/logo.svg';
import WalletConnect from './WalletConnect'
import styled from 'styled-components' 

class Nav extends Component {
	render() {
		return (
			<Flex
				px={2}
				color='black'
				bg='white'
				alignItems='center'>
				<Image 
					ml={4}
					src={Logo}
					height='36px'
				/>
				<Bar />
				<Text p={4} pl={0} fontSize={[ 2, 4 ]}>
				Peer Lending
				</Text>
				<Box mx='auto' />
				<WalletConnect />
			</Flex>
		);
	}
}

const Bar = styled.div`
	margin: 0px 15px;
	border-left: 1px solid black;
	height: 40px;
`;

export default Nav;