import React, { Component } from 'react';
import { Flex, Heading, Image, Box, Text, Button } from 'rebass';
import styled from 'styled-components';
import USDC from '../img/usdc.svg';

import Countdown from "react-countdown-now";

import {
    Label,
    Input,
    Select,
    Textarea,
    Radio,
    Checkbox,
  } from '@rebass/forms'

class ContributionStep extends Component {
	constructor(props) {
		super(props);
        const { address } = this.props;
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
                            <Text fontSize={[ 2, 3 ]} my={2}>Name: {}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Symbol: {}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Target Amount: {}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Interest Rate: {}</Text>
                            <Text fontSize={[ 2, 3 ]} my={2}>Description: {}</Text>
                        </Flex>
                        <Flex width={1/2}>
                            <Flex
                                as='form'
                                onSubmit={e => e.preventDefault()}
                                width={1}
                                justifyContent='center' 
                                alignItems='center'>
                                    <Box p={10}>
                                        <Label htmlFor='amount'>Contribution Amount ($)</Label>
                                        <Input
                                        id='amount'
                                        name='amount'
                                        placeholder='0'
                                        type="number" 
                                        min="0.01" 
                                        step="0.01" 
                                        />
                                    </Box>

                                    <Box p={10} >
                                        <Button fontSize={3} >
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