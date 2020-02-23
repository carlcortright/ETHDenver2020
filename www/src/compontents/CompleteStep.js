import React, { Component } from 'react';
import { Flex, Heading, Image, Box, Text, Button } from 'rebass';
import Emoji from 'a11y-react-emoji'

import CountUp from 'react-countup';

function CompleteStep(props) {
    return (
        <Flex
            m={1, 3, 4}
            color='black'
            bg='white'
            alignItems='center'
            flexDirection={'column'}
            p={[1, 2, 4]}
        >

            <Heading my={2} fontSize={[3, 4, 5]}><Emoji symbol="🎉" label="tada" /></Heading>
            <Heading my={2} fontSize={[3, 4, 5]}>Loan Complete!</Heading>
                    
        </Flex>
    );
}

export default CompleteStep;