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
import { CreateFundraiser } from './scenes'
import theme from './theme'

function App() {
  return (

    <ThemeProvider theme={theme}>
      <Styled.root>
        <Nav />
        <Router>
            <Switch>
              <Route path="/create-fundraiser">
                <CreateFundraiser />
              </Route>
              <Route path="/fundraiser/:contractAddress">
                <Topic />
              </Route>
              <Route path="/">
                <Heading>Root path</Heading>
              </Route>
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
