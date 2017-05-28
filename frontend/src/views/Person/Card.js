import React from 'react';
import { gql, graphql } from 'react-apollo';
import { shape, string } from 'prop-types';

import LoadingContainer from '../../components/LoadingContainer';
import PersonCard from '../../components/Person/Card';

const PersonCardWithData = graphql(gql`
  query PersonQuery($id: String!) {
    person(id: $id) {
      id
      fullName
      awards {
        award
        year
      }
      appearances {
        year
        team {
          name
        }
      }
    }
  }
`, {
  options: ({ id }) => ({ variables: { id } }),
})(LoadingContainer(PersonCard));

const PersonCardView = ({ match }) => (
  <div>
    <PersonCardWithData id={match.params.person} />
  </div>
);

PersonCardView.propTypes = {
  match: shape({
    params: shape({
      person: string.isRequired,
    }),
  }).isRequired,
};

export default PersonCardView;
