import React, { Component } from 'react';
import { FormLayout, Stepbar, ContributionStep, LoanOutstandingStep } from '../compontents'
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
            constractState: 2,
        }
    }

    componentDidMount() {
        if(window.ethereum) {
            setInterval(() => {
                // TODO: Update the contract state
            }, 1000);
        }
    }
  
    render() {
        // Determine which state to render
        let stateComponent;
        console.log(this.state.constractState)
        switch (this.state.constractState) {
            case 1:
                stateComponent = <ContributionStep 
                    sponsorTokenAddress={this.state.contractAddress}
                    usdcTokenAddress={this.state.usdcAddress}    
                />
                break;
            case 2: 
                stateComponent = <LoanOutstandingStep 
                    sponsorTokenAddress={this.state.contractAddress}
                    usdcTokenAddress={this.state.usdcAddress}    
                />
                break;
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
                        <Stepbar numBars={3} highlightBar={this.state.constractState}/>
                    </Flex>
                    {stateComponent}
                </FormLayout>
        );
    }
}


export default Fundraiser;