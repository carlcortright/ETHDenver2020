import React, { Component } from 'react';
import { Flex, Heading, Image, Box, Text, Button } from 'rebass';
import styled from 'styled-components';
import USDC from '../img/usdc.svg';

import { getWeb3, formatTokenValueHuman } from '../ethereum/ethereum';

import Countdown from "react-countdown-now";

import {
    Label,
    Input,
  } from '@rebass/forms'

import { 
    getName,
    getSymbol,
    getTargetFundraiseAmount,
    getInterestRate,
    setSponsorTokenContract,
    getCurrentContribution,
    contribute,
    setUSDCTokenContract,
 } from '../ethereum/token_methods';

class ContributionStep extends Component {
	constructor(props) {
		super(props);
        this.state = {
            name: 'Loading...',
            symbol: 'Loading...',
            targetAmount: 'Loading...',
            interestRate: 'Loading...',
            contribution: 'Loading...',
            contributionAmount: 0.0
        }
    }

    componentDidMount() {
        this.intializeContractData();
    }

    intializeContractData = async () => {
        const { sponsorTokenAddress, usdcTokenAddress } = this.props;
        console.log(sponsorTokenAddress)
        console.log(window.ethereum)
        if(window.ethereum) {
            const web3 = await getWeb3();
            await setSponsorTokenContract(sponsorTokenAddress, web3);
            await setUSDCTokenContract(usdcTokenAddress, web3);
            const name = await getName();
            const symbol = await getSymbol();

            // Need to format the amount from the smallest amount to dollar amount 
            const decimalTargetAmount = await getTargetFundraiseAmount();
            const decimals = 6;
            const targetAmount = await formatTokenValueHuman(decimalTargetAmount, decimals);

            const unformattedInterestRate = await getInterestRate();
            const interestRate = (unformattedInterestRate/100);
            const contribution = await getCurrentContribution();
            this.setState({ name, symbol, targetAmount, interestRate, contribution });
        }
        // TODO: alert to download metamask
    }

    contributeUSDC = async () => {
        const amount = await formatTokenValueContract(this.state.contributionAmount, 6)
        await contribute(amount);
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
      }

	render() {
        const {
            name,
            symbol,
            targetAmount,
            interestRate,
            contribution
        } = this.state; 
		return (
			<Flex
                  m={2, 3, 4, 5}
                  color='black'
                  bg='white'
                  alignItems='left'
                  flexDirection={'column'}
                  width= {800}
                >
                    <Flex alignItems='center'>
                        <Image mr={1} src={USDC} height='32px'/>
                        <Heading fontSize={4, 5}>Contribute to Fundraiser</Heading>
                        <Box mx='auto' />
                        <Heading fontSize={2, 3}>
                            Time Remaining: 
                            <Countdown date={Date.now() + 1000000} renderer={({ hours, minutes, seconds }) => <span> {hours}:{minutes}:{seconds}</span>}/>
                        </Heading>
                    </Flex>

                    <Flex py={4}>
                        <Flex width={1/2} flexDirection='column'>
                            <Text fontSize={[ 2, 3 ]} my={2}>Name: {name}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Symbol: {symbol}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Target Amount: {targetAmount}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Interest Rate: {interestRate}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>My Contribution: {contribution}</Text>
                        </Flex>
                        <Flex width={1/2}>
                            <Flex
                                as='form'
                                onSubmit={e => e.preventDefault()}
                                width={1}
                                justifyContent='center' 
                                alignItems='center'>
                                    <Box p={10}>
                                        <Label htmlFor='contributionAmount'>Contribution Amount ($)</Label>
                                        <Input
                                        id='contributionAmount'
                                        name='contributionAmount'
                                        placeholder='0'
                                        type="number" 
                                        min="0.01" 
                                        step="0.01" 
                                        onChange={this.handleInputChange}
                                        />
                                    </Box>

                                    <Box p={10} >
                                        <Button fontSize={3} onClick={this.contributeUSDC}>
                                            Contribute
                                        </Button>
                                    </Box>
                            </Flex>
                        </Flex>
                    </Flex>
                    
            </Flex>
		);
	}
}

export default ContributionStep;