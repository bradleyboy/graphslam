import React from 'react';
import { gql, graphql } from 'react-apollo';

import PersonCard from '../../components/Person/Card';

const PersonCardContainer = ({ data }) => {
  const { loading, person } = data;

  if (loading) {
    return <p>Loading...</p>;
  }

  return <PersonCard person={person} />;
};

const PersonCardWithData = graphql(gql`
  query PersonQuery($id: String!) {
    person(id: $id) {
      id
      fullName
    }
  }
`, {
  options: ({ id }) => ({ variables: { id } }),
})(PersonCardContainer);

const PersonCardView = ({ match }) => (
  <div>
    <PersonCardWithData id={match.params.person} />
  </div>
);

export default PersonCardView;
