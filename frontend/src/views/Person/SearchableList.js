import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import PlayersList from '../../components/Person/List';

const PlayersListContainer = ({ data }) => {
  const { loading, people } = data;

  if (loading) {
    return <p>Loading...</p>;
  }

  return <PlayersList people={people} />;
};

const PlayersListWithData = graphql(gql`
  query PlayersListQuery($offset: Int = 0, $where: SequelizeJSON = {}) {
    people(limit: 10, offset: $offset, where: $where) {
      id
      fullName
    }
  }
`, {
  options: ({ offset, query }) => {
    if (query.length) {
      const like = `%${query}%`;

      return {
        variables: {
          offset,
          where: {
            $or: {
              firstName: {
                like,
              },
              lastName: {
                like,
              },
            },
          },
        },
      };
    }

    return { variables: { offset } };
  },
})(PlayersListContainer);

class SearchablePersonList extends Component {
  state = {
    page: 1,
    query: '',
  }

  nextPage = () => {
    this.setState({
      page: this.state.page + 1,
    });
  }

  prevPage = () => {
    this.setState({
      page: this.state.page - 1,
    });
  }

  updateQuery = (e) => {
    this.setState({
      query: e.target.value,
      page: 1,
    });
  }

  render() {
    return (
      <div>
        <input type="search" value={this.state.query} onChange={this.updateQuery} />
        <PlayersListWithData
          offset={(this.state.page - 1) * 10}
          query={this.state.query}
        />
        <button onClick={this.prevPage} disabled={this.state.page === 1}>-</button>
        <button onClick={this.nextPage}>+</button>
      </div>
    );
  }
}

export default SearchablePersonList;
