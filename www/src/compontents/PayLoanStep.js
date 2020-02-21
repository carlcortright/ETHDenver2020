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

import Countdown from "react-countdown-now";

import { Line } from 'rc-progress';

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
    getEndTimeFundraiser,
    getCurrentAmountRaised
 } from '../ethereum/token_methods';

class PayLoanStep extends Component {
	constructor(props) {
		super(props);
        this.state = {
            name: 'Loading...',
            symbol: 'Loading...',
            targetAmount: 'Loading...',
            interestRate: 'Loading...',
            contribution: 'Loading...',
            contributionAmount: 0.0,
            timeRemaining: 0,
            targetAmount: 0,
            totalContributed: 0,
        }
    }

    componentDidMount() {
        this.intializeContractData();
    }

    intializeContractData = async () => {
        if(window.ethereum) {
            setInterval(this.updateContractState, 1000);
        }
    }

    updateContractState = async () => {
        const { sponsorTokenAddress, usdcTokenAddress } = this.props;
        const web3 = await getWeb3();
        await setSponsorTokenContract(sponsorTokenAddress, web3);
        await setUSDCTokenContract(usdcTokenAddress, web3);
        const name = await getName();
        const symbol = await getSymbol();

        const addr = await getAddress();

        // Need to format the amount from the smallest amount to dollar amount 
        const decimalTargetAmount = await getTargetFundraiseAmount();
        const decimals = 6;
        const targetAmount = await formatTokenValueHuman(decimalTargetAmount, decimals);

        const amountRepaid = await getAmountRepaid();

        this.setState({ name, symbol, targetAmount, interestRate, contribution, timeRemaining, totalContributed });
    }

    contributeUSDC = async () => {
        const amount = await formatTokenValueContract(this.state.contributionAmount, 6)
        const addr = await getAddress();
        await contribute(amount, addr);
    }

    makeLoanPayment = async () => {
        const amount = await formatTokenValueContract(this.state.paymentAmount, 6)
        const addr = await getAddress();
        await payLoan(amount, addr);
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
            contribution,
            timeRemaining,
            totalContributed
        } = this.state; 
        const percentComplete = (totalContributed / targetAmount) * 100
		return (
			<Flex
                  m={2, 3, 4, 5}
                  color='black'
                  bg='white'
                  alignItems='left'
                  flexDirection={'column'}
                  width= {800}
                >

                    <Flex py={4}>
                        <Flex width={1/2} flexDirection='column'>
                            <Text fontSize={[ 2, 3 ]} my={2}><span font-weight="500">Name: </span> {name}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Symbol: {symbol}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Target Amount: ${targetAmount}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Interest Rate: {interestRate}%</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>My Contribution: ${contribution}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Total Raised: ${totalContributed}</Text>
                        </Flex>
                        <Flex width={1/2}>
                            <Flex
                                as='form'
                                onSubmit={e => e.preventDefault()}
                                width={1}
                                justifyContent='center' 
                                alignItems='center'>
                                    <Box p={10}>
                                        <Label htmlFor='paymentAmount'>Payment Amount ($)</Label>
                                        <Input
                                        id='paymentAmount'
                                        name='paymentAmount'
                                        placeholder='0'
                                        type="number" 
                                        min="0.01" 
                                        step="0.01" 
                                        onChange={this.handleInputChange}
                                        />
                                    </Box>

                                    <Box p={10} >
                                        <Button fontSize={3} onClick={this.makeLoanPayment}>
                                            Make Payment
                                        </Button>
                                    </Box>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Heading my={2}>Fundraiser Progress: {percentComplete}%</Heading>
                    <Line percent={percentComplete} strokeWidth="2" strokeColor="#00CD90" />
                    
            </Flex>
		);
	}
}

export default ContributionStep;