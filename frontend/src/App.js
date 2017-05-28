import React, { Component } from 'react';
import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql } from 'react-apollo';

import './App.css';

const createClient = () => (
  new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:4000/graphql',
    }),
  })
);

const PlayersList = ({ data }) => {
  const { people, loading } = data;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {people.map(({ id, firstName, lastName }) => <p key={id}>{`${firstName} ${lastName}`}</p>)}
    </div>
  );
};

const PlayersListWithData = graphql(gql`
  query PlayersListQuery {
    people(limit: 10) {
      id
      firstName
      lastName
    }
  }
`)(PlayersList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={createClient()}>
        <PlayersListWithData />
      </ApolloProvider>
    );
  }
}

export default App;
