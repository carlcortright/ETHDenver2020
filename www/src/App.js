import React from 'react';
import './App.css'
import { Heading } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import { Styled } from 'theme-ui'

import { Nav } from './compontents';
import { CreateFundraiser, Fundraiser, Repay } from './scenes'
import theme from './theme'

function App() {
  return (

    <ThemeProvider theme={theme}>
      <Styled.root>
        <Nav />
        <Router>
            <Switch>
              <Route path="/create-fundraiser" component={CreateFundraiser} />
              <Route path="/fundraiser/:contractAddress" component={Fundraiser} />
              <Route path="/repay/:contractAddress" component={Repay} />
              
            </Switch>
        </Router>
      </Styled.root>
    </ThemeProvider>
  );
}

function Topic() {
  let { contractAddress } = useParams();
  return <h3>contractAddress: {contractAddress}</h3>;
}

export default App;
