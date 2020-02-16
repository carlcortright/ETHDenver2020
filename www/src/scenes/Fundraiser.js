import React, { Component } from 'react';
import { FormLayout, Stepbar, ContributionStep, LoanOutstandingStep } from '../compontents'
import { Flex } from 'rebass';
import { config } from '../config'

import Emoji from 'a11y-react-emoji'

import { getWeb3 } from '../ethereum/ethereum';

import { 
    getLoanState, 
    setSponsorTokenContract,  
    setUSDCTokenContract
} from '../ethereum/token_methods';

class Fundraiser extends Component {

    constructor(props) {
        super(props);
        const { contractAddress } = this.props.match.params;
        this.state = {
            contractAddress: contractAddress,
            usdcAddress: config.usdcAddress,
            constractState: 0,
        }
    }

    componentDidMount() {
        if(window.ethereum) {
            setInterval(async () => {
                const { contractAddress, usdcAddress } = this.state;
                const web3 = await getWeb3();
                await setSponsorTokenContract(contractAddress, web3);
                await setUSDCTokenContract(usdcAddress, web3);
                const contractState = await getLoanState();
                this.setState({ contractState });
                console.log("Contract state " + this.state.contractState);
            }, 1000);
        }
    }
  
    render() {
        // Determine which state to render
        let stateComponent;
        console.log("Render hit");
        console.log("In render: " + this.state.contractState);
        console.log("Type: " + typeof(this.state.contractState));
        switch (this.state.contractState) {
            case "0":
                stateComponent = <ContributionStep 
                    sponsorTokenAddress={this.state.contractAddress}
                    usdcTokenAddress={this.state.usdcAddress}    
                />
                break;
            case "1": 
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