import React, { Component } from 'react';
import { FormLayout } from '../compontents'
import { Flex, Heading, Box, Button } from 'rebass';
import { withRouter } from 'react-router-dom';

// Ethereum
import { deployContract } from '../ethereum/deploy';
import { formatTokenValueContract } from '../ethereum/ethereum';

import Emoji from 'a11y-react-emoji'

import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
} from '@rebass/forms'

class CreateFundraiser extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      symbol: '',
      decimals: '6',
      fundraiseAmount: '0',
      interestRate: '0',
      endTime: '0',
      description: '',
      addressUSDC: '',
      recipient: ''
    }
  }

  handleInputChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  handleTokenInputAmount = async (event) => {
    const value = event.target.value;
    const fundraiseAmount = await formatTokenValueContract(value, 6);
    this.setState({
      fundraiseAmount: +fundraiseAmount
    });
  }

  handleInterestRate = event => {
    const interestRate = (event.target.value * 100);
    this.setState({
      interestRate
    });
  }

  handleDate = event => {
    const days = event.target.value;
    const endTime = Date.now() + (days * 86400);
    this.setState({
      endTime
    })
  }

  createContract = async() => {
    const {
      name,
      symbol,
      decimals,
      fundraiseAmount,
      interestRate,
      endTime,
      description,
      addressUSDC,
      recipient
    } = this.state;

    try{
      const sponsorContractAddress = await deployContract(
        name,
        symbol,
        decimals,
        fundraiseAmount,
        interestRate,
        endTime,
        description,
        addressUSDC,
        recipient
    );

    this.props.history.push(`/fundraiser/${sponsorContractAddress}`);
    }
    
    catch (error){
      window.alert('Error with deploying contract');
      console.log(error);
    }
  }

    // this.props.history.push(`/fundraiser/${sponsorContractAddress}`);
  
    render() {
      const {
        name,
        symbol,
        decimals,
        fundraiseAmount,
        interestRate,
        endTime,
        description,
        addressUSDC,
        recipient
      } = this.state;
      return (
            <FormLayout>
                <Flex
                  m={2, 3, 4, 5}
                  color='black'
                  bg='white'
                  alignItems='center'
                  flexDirection={'column'}
                >
                  <Heading fontSize={ 4, 6 } textAlign='center'>Create Fundraiser</Heading>

                  <Box
                    as='form'
                    onSubmit={e => e.preventDefault()}
                    py={3}
                    px={2}
                    width={1}>
                    <Flex mx={-2} mb={3} flexDirection={'column'}>
                      <Box p={10}>
                        <Label htmlFor='name'>Token Name</Label>
                        <Input
                          id='name'
                          name='name'
                          placeholder='Token Name'
                          onChange={this.handleInputChange}
                          value={name}
                        />
                      </Box>
                      <Box p={10}>
                        <Label htmlFor='symbol'>Token Symbol</Label>
                        <Input
                          id='symbol'
                          name='symbol'
                          placeholder='Token Symbol'
                          onChange={this.handleInputChange}
                          value={symbol}
                        />
                      </Box>

                      <Box p={10}>
                        <Label htmlFor='fundraiseAmount'>Fundraise Amount ($)</Label>
                        <Input
                          id='fundraiseAmount'
                          name='fundraiseAmount'
                          placeholder='0'
                          type="number" 
                          min="0.01" 
                          step="0.01" 
                          onChange={this.handleTokenInputAmount}
                        />
                      </Box>

                      <Box p={10}>
                        <Label htmlFor='interestRate'>Interest Rate (% Annual)</Label>
                        <Input
                          id='interestRate'
                          name='interestRate'
                          placeholder='0'
                          type="number" 
                          min="0"
                          max="100" 
                          step="0.01"
                          onChange={this.handleInterestRate}
                        />
                      </Box>

                      <Box p={10}>
                        <Label htmlFor='endTime'>Fundraise Length (Days)</Label>
                        <Input
                          id='endTime'
                          name='endTime'
                          placeholder='0'
                          type="number" 
                          min="1" 
                          step="0.01"
                          onChange={this.handleDate}
                        />
                      </Box>

                      <Box p={10}>
                        <Label htmlFor='recipient'>Recipient Address</Label>
                        <Input
                          id='recipient'
                          name='recipient'
                          placeholder='0x0000....'
                          onChange={this.handleInputChange}
                          value={recipient}
                        />
                      </Box>

                      <Box p={10}>
                        <Label htmlFor='addressUSDC'>USDC Token Address</Label>
                        <Input
                          id='addressUSDC'
                          name='addressUSDC'
                          placeholder='0x0000....'
                          onChange={this.handleInputChange}
                          value={addressUSDC}
                        />
                      </Box>

                      <Box p={10}>
                        <Label htmlFor='description'>Description</Label>
                        <Input
                          id='description'
                          name='description'
                          placeholder='Description'
                          onChange={this.handleInputChange}
                          value={description}
                        />
                      </Box>

                      <Box p={10} ml={'auto'} mr={'auto'}>
                        <Button fontSize={3} onClick={this.createContract}>
                          Deploy <Emoji symbol="🚀" label="rocket" />
                        </Button>
                      </Box>
                    </Flex>
                  </Box>
                </Flex>

            </FormLayout>
      );
    }
}


export default withRouter(CreateFundraiser);