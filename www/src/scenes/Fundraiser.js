import React, { Component } from 'react';
import { FormLayout, Stepbar, ContributionStep } from '../compontents'
import { Flex, Heading, Box, Button } from 'rebass';

import Emoji from 'a11y-react-emoji'

class Fundraiser extends Component {

    constructor(props) {
        super(props);
        const { contractAddress } = props.match.params;
        this.state = {
            contractAddress: contractAddress,
            usdcAddress: '0x123456',
            step: 1,
        }
    }

    
  
    render() {
        // Determine which state to render
        let stateComponent;
        switch (this.state.step) {
            case 1:
                stateComponent = <ContributionStep 
                    sponsorTokenContract={this.contractAddress}
                    usdcTokenContract={this.usdcAddress}    
                />
        }

        return (
                <FormLayout>
                    <Flex
                    m={2, 3, 4, 5}
                    color='black'
                    bg='white'
                    alignItems='center'
                    flexDirection={'column'}
                    width= {800}
                    >
                        <Stepbar numBars={3} highlightBar={this.state.step}/>
                    </Flex>
                    {stateComponent}
                </FormLayout>
        );
    }
}


export default Fundraiser;