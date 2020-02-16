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
    getStartTimeOpenLoan,
    getEndTimeFundraiser,
    getStartTimeFundraiser
 } from '../ethereum/token_methods';

import CountUp from 'react-countup';

class LoanOutstandingStep extends Component {
	constructor(props) {
		super(props);
        this.state = {
            contribution: 0,
            timeSinceStart: 0,
            rate: 0,
        }
    }

    componentDidMount() {
        this.getContributionDetails()
    }

    getContributionDetails = async () => {
        console.log(window.ethereum)
        if (window.ethereum) {
            const { sponsorTokenAddress, usdcTokenAddress } = this.props;
            const web3 = await getWeb3();
            await setSponsorTokenContract(sponsorTokenAddress, web3);
            await setUSDCTokenContract(usdcTokenAddress, web3);

            const addr = await getAddress();
            const rawContribution = await getCurrentContribution(addr);
            const intContribution = parseInt(rawContribution)
            const contribution = await formatTokenValueHuman(intContribution, 6);
            const rate = await getInterestRate();
            const startTime = await getStartTimeOpenLoan();
            const timeSinceStart = ((Date.now() / 1000 ) - startTime) / (365 * 86400);

            this.setState({contribution, rate, timeSinceStart});
        }
    }

	render() {
        const rate = this.state.rate / 10000;
        const currentTokenValue = this.state.contribution * ( 1 + rate) ** this.state.timeSinceStart;

		return (
			<Flex
                  m={2, 3, 4, 5}
                  color='black'
                  bg='white'
                  alignItems='center'
                  justifyContent='center'
                  flexDirection={'column'}
                  width= {800}
                >
                    <Heading my={2} fontSize={7}>$<CountUp end={currentTokenValue + (currentTokenValue * rate)} start={currentTokenValue} duration={1000000} decimals={6}/></Heading>
                    <Heading my={2}>Contribution Value</Heading>
            </Flex>
		);
	}
}

export default LoanOutstandingStep;