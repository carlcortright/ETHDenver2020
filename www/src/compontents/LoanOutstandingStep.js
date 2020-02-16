import React, { Component } from 'react';
import { Flex, Heading, Image, Box, Text, Button } from 'rebass';
import styled from 'styled-components';
import USDC from '../img/usdc.svg';

import { 
    getWeb3, 
    getAddress, 
    formatTokenValueHuman, 
    formatTokenValueContract 
} from '../ethereum/ethereum';

import { 
    getName,
    getSymbol,
    getTargetFundraiseAmount,
    getInterestRate,
    setSponsorTokenContract,
    getCurrentContribution,
    contribute,
    setUSDCTokenContract,
    getEndTimeFundraiser,
    getStartTimeFundraiser
 } from '../ethereum/token_methods';

class LoanOutstandingStep extends Component {
	constructor(props) {
		super(props);
        this.state = {}
    }

	render() {
		return (
			<Flex
                  m={2, 3, 4, 5}
                  color='black'
                  bg='white'
                  alignItems='left'
                  flexDirection={'column'}
                  width= {800}
                >
                    <Heading my={2}>Interest Earned</Heading>
            </Flex>
		);
	}
}

export default LoanOutstandingStep;