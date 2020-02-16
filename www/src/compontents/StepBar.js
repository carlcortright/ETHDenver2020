import React, { Component } from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';

class StepBar extends Component {
	constructor(props) {
		super(props);
        const { numBars, highlightBar } = this.props;
        this.numBars = numBars;
        this.highlightBar = highlightBar;
	}

	render() {
        let bars = []
        for (let i = 0; i < this.numBars; i++) {
            if (i === this.highlightBar) {
                bars.push(<SingleBar highlight={true} key={i}/>)
            }
            bars.push(<SingleBar key={i}/>)
        }
        console.log(bars)
		return (
			<Flex 
                justifyContent='center'
                width={'100%'}>
                    { bars }
            </Flex>
		);
	}
}

const SingleBar = styled.div`
  background: ${props => props.highlight ? '#00CD90' : 'lightgray'};
  height: 3px;
  border-radius: 1px;
  flex: 1;
  margin-right: 5px;
  margin-left: 5px;
`;

export default StepBar;