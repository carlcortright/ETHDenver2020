import React, { Component } from 'react';
import { FormLayout } from '../compontents'
import { Flex, Heading, Box, Button } from 'rebass';

import Emoji from 'a11y-react-emoji'

import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
} from '@rebass/forms'

class Fundraiser extends Component {
  
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
                  <Heading fontSize={ 4, 6 } textAlign='center'>Fundraiser</Heading>

                
                </Flex>

            </FormLayout>
      );
    }
}


export default Fundraiser;