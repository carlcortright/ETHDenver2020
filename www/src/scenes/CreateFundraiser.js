import React, { Component } from 'react';
import { FormLayout } from '../compontents'
import { Flex, Heading, Box, Button } from 'rebass';

// Ethereum
import { deployContract } from '../ethereum/deploy';

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
  
    render() {
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
                        />
                      </Box>
                      <Box p={10}>
                        <Label htmlFor='symbol'>Token Symbol</Label>
                        <Input
                          id='symbol'
                          name='symbol'
                          placeholder='Token Symbol'
                        />
                      </Box>

                      <Box p={10}>
                        <Label htmlFor='amount'>Fundraise Amount ($)</Label>
                        <Input
                          id='amount'
                          name='amount'
                          placeholder='0'
                          type="number" 
                          min="0.01" 
                          step="0.01" 
                        />
                      </Box>

                      <Box p={10}>
                        <Label htmlFor='rate'>Interest Rate (% Annual)</Label>
                        <Input
                          id='rate'
                          name='rate'
                          placeholder='0'
                          type="number" 
                          min="0"
                          max="100" 
                          step="0.01" 
                        />
                      </Box>

                      <Box p={10}>
                        <Label htmlFor='length'>Fundraise Length (Days)</Label>
                        <Input
                          id='length'
                          name='length'
                          placeholder='0'
                          type="number" 
                          min="1" 
                          step="0.01" 
                        />
                      </Box>

                      <Box p={10}>
                        <Label htmlFor='address'>Recipient Address</Label>
                        <Input
                          id='address'
                          name='address'
                          placeholder='0x0000....'
                        />
                      </Box>

                      <Box p={10}>
                        <Label htmlFor='description'>Description</Label>
                        <Input
                          id='description'
                          name='description'
                          placeholder='Description'
                        />
                      </Box>

                      <Box p={10} ml={'auto'} mr={'auto'}>
                        <Button fontSize={3} onClick={deployContract}>
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


export default CreateFundraiser;