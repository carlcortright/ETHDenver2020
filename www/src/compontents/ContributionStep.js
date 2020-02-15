import React, { Component } from 'react';
import { Flex, Heading, Image } from 'rebass';
import styled from 'styled-components';
import USDC from '../img/usdc.svg';

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
                    </Flex>
                    
            </Flex>
		);
	}
}

export default ContributionStep;