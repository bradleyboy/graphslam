import React from 'react';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';

import SearchablePersonList from './views/Person/SearchableList';
import PersonCard from './views/Person/Card';

const createClient = () => (
  new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:4000/graphql',
    }),
  })
);

const App = () => (
  <ApolloProvider client={createClient()}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={SearchablePersonList} />
          <Route
            path="/person/:person"
            component={PersonCard}
          />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
