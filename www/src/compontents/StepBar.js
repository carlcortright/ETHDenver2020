import React, { Component } from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';

class StepBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
        let bars = []
        for (let i = 0; i < this.props.numBars; i++) {
            if (i <= this.props.highlightBar) {
                bars.push(<SingleBar highlight={true} key={i}/>)
            } else {
                bars.push(<SingleBar key={i}/>)
            }
        }
		return (
			<Flex 
                justifyContent='center'
                width={4/5}>
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