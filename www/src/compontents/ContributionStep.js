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

import Loader from 'react-loader-spinner'

class ContributionStep extends Component {
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
            loading: false,
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

        const unformattedInterestRate = await getInterestRate();
        const interestRate = (unformattedInterestRate/100);
        const rawContribution = await getCurrentContribution(addr);
        const contribution = await formatTokenValueHuman(parseInt(rawContribution), 6)

        const totalContributedRaw = parseInt(await getCurrentAmountRaised());
        const totalContributed = await formatTokenValueHuman(totalContributedRaw, 6);

        // Timer Set Up
        const endTime = await getEndTimeFundraiser();
        const timeRemaining = (+endTime)*1000;

        this.setState({ name, symbol, targetAmount, interestRate, contribution, timeRemaining, totalContributed });
    }

    contributeUSDC = async () => {
        const amount = await formatTokenValueContract(this.state.contributionAmount, 6)
        const addr = await getAddress();
        this.setState({ loading: true });
        contribute(amount, addr, () => {this.setState({ loading: false })});
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
                  m={1, 3, 4}
                  color='black'
                  bg='white'
                  alignItems='left'
                  flexDirection={'column'}
                  p={[1, 2, 4]}
                >
                    <Flex justifyContent={['center', 'left']} alignItems={'center'} flexWrap={'wrap'} >
                        <Image mr={1} src={USDC} height='32px'/>
                        <Heading fontSize={[3, 5]} >Contribute to Fundraiser</Heading>
                        <Box mx={[0, 'auto']} />
                        <Heading fontSize={[1, 3]} ml={[10, 50]} my={10}>
                            Time Remaining: 
                            <Countdown date={timeRemaining} renderer={({ days, hours, minutes, seconds }) => <span> {days}:{hours}:{minutes}:{seconds}</span>}/>
                        </Heading>
                    </Flex>

                    <Flex py={0, 4}  flexWrap={'wrap'} >
                        <Flex width={[1, 1/2]} my={[20, 0]} flexDirection='column' alignItems={['center', 'flex-start']}>
                            <Text fontSize={[ 2, 3 ]} my={2}><span font-weight="500">Name: </span> {name}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Symbol: {symbol}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Target Amount: ${targetAmount}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Interest Rate: {interestRate}%</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>My Contribution: ${contribution}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Total Raised: ${totalContributed}</Text>
                        </Flex>
                        <Flex width={[1, 1/2]} py={0, 4}>
                            <Flex
                                as='form'
                                onSubmit={e => e.preventDefault()}
                                width={1}
                                justifyContent='center' 
                                alignItems='center'
                                flexWrap={['wrap', 'nowrap']}>
                                    <Box p={10} minWidth={200}>
                                        <Label htmlFor='contributionAmount' >Contribution Amount ($)</Label>
                                        <Input
                                        id='contributionAmount'
                                        name='contributionAmount'
                                        placeholder='0'
                                        type="number" 
                                        min="0.01" 
                                        step="0.01" 
                                        width={"100%"}
                                        onChange={this.handleInputChange}
                                        />
                                    </Box>

                                    <Box p={10} >
                                        <Button fontSize={3} onClick={this.contributeUSDC} minWidth={150}>
                                            {
                                                this.state.loading 
                                                ?
                                                <Loader
                                                    type="TailSpin"
                                                    color="white"
                                                    height={25}
                                                    width={25}
                                                />
                                                : 
                                                "Contribute"
                                            }

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