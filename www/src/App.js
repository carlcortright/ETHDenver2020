import React from 'react';
import { Heading } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

function App() {
  return (

    <ThemeProvider theme={preset}>
      <Heading>Hello world</Heading>
      <Router>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/recipient">
              <Heading>Recipient Path</Heading>
            </Route>
            <Route path="/">
              <Heading>Root path</Heading>
            </Route>
          </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
