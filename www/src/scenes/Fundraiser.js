import React, { Component } from 'react';
import { FormLayout, Stepbar, ContributionStep } from '../compontents'
import { Flex } from 'rebass';
import { config } from '../config'

import Emoji from 'a11y-react-emoji'

class Fundraiser extends Component {

    constructor(props) {
        super(props);
        const { contractAddress } = this.props.match.params;
        this.state = {
            contractAddress: contractAddress,
            usdcAddress: config.usdcAddress,
            step: 1,
        }
    }
  
    render() {
        // Determine which state to render
        let stateComponent;
        switch (this.state.step) {
            case 1:
                stateComponent = <ContributionStep 
                    sponsorTokenAddress={this.state.contractAddress}
                    usdcTokenAddress={this.state.usdcAddress}    
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