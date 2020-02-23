import React, { Component } from 'react';
import { FormLayout, CompleteStep } from '../compontents'
import { Flex, Heading, Box, Button } from 'rebass';
import { withRouter } from 'react-router-dom';

// Ethereum
import { formatTokenValueContract } from '../ethereum/ethereum';

import {
  Label,
  Input
} from '@rebass/forms'

import { getUSDCAddress } from '../ethereum/addresses';
import { getWeb3, getAddress } from '../ethereum/ethereum';

import { 
    getRemainingRepayment, 
    setSponsorTokenContract,  
    setUSDCTokenContract, 
    payLoan, 
} from '../ethereum/token_methods';

class Repay extends Component {
  constructor() {
    super();

    this.state = {
        repaymentAmount: '0',
        amountRemaining: '0'
    }
  }

  componentDidMount() {
    if(window.ethereum) {
        setInterval(async () => {
            const web3 = await getWeb3();
            const usdcAddress = await getUSDCAddress(web3);
            const { contractAddress } = this.props.match.params;
            await setSponsorTokenContract(contractAddress, web3);
            await setUSDCTokenContract(usdcAddress, web3);
            const amountRemaining = await getRemainingRepayment();
            this.setState({ amountRemaining })
        }, 1000);
    }
}

  handleRepaymentAmount = async (event) => {
    const value = event.target.value;
    this.setState({
      repaymentAmount: +value,
    });
  }

  repay = async() => {
    try{
      const amount = await formatTokenValueContract(this.state.repaymentAmount, 6)
      const addr = await getAddress();
      await payLoan(amount, addr);
    }
    
    catch (error){
      window.alert('Error repaying loan');
      console.log(error);
    }
  }

    render() {
      const {
        amountRemaining
      } = this.state;
      console.log(amountRemaining)
      if (amountRemaining == 0) {
        return (
            <FormLayout>
                <CompleteStep />
            </FormLayout>  
        )
      }
      return (
            <FormLayout>
                <Flex
                  m={[3, 4, 5]}
                  color='black'
                  bg='white'
                  alignItems='center'
                  flexDirection={'column'}
                >
                  <Heading fontSize={[5, 6]} textAlign='center'>Repay Lenders</Heading>
                  <Heading fontSize={[2, 4] } m={2} textAlign='center'>Amount Remaining: ${this.state.amountRemaining}</Heading>

                  <Box
                    as='form'
                    onSubmit={e => e.preventDefault()}
                    py={3}
                    px={2}
                    width={1}>
                    <Flex mx={-2} mb={3} flexDirection={'column'}>

                      <Box p={10}>
                        <Label htmlFor='amount'>Repayment Amount ($)</Label>
                        <Input
                          id='amount'
                          name='amount'
                          placeholder='0'
                          type="number" 
                          min="0.01" 
                          step="0.01" 
                          onChange={this.handleRepaymentAmount}
                        />
                      </Box>

                      <Box p={10} ml={'auto'} mr={'auto'}>
                        <Button fontSize={3} onClick={this.repay}>
                          Repay Loan
                        </Button>
                      </Box>
                    </Flex>
                  </Box>
                </Flex>

            </FormLayout>
      );
    }
}

export default Repay;