import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { parse, stringify } from 'query-string';
import { shape, string, func } from 'prop-types';

import PlayersList from '../../components/Person/List';
import LoadingContainer from '../../components/LoadingContainer';

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
})(LoadingContainer(PlayersList));

class SearchablePersonList extends Component {
  static propTypes = {
    location: shape({
      search: string,
      pathname: string.isRequired,
    }).isRequired,
    history: shape({
      push: func.isRequired,
    }).isRequired,
  }

  getPage = () => {
    const query = this.parseQuery();
    return Number(query.page || 1);
  }

  getQuery = () => {
    const query = this.parseQuery();
    return query.q || '';
  }

  nextPage = () => {
    this.navigate({ page: this.getPage() + 1 });
  }

  parseQuery = () => (
    parse(this.props.location.search)
  )

  navigate(params) {
    const { pathname, search } = this.props.location;

    this.props.history.push({
      pathname,
      search: stringify({
        ...parse(search),
        ...params,
      }),
    });
  }

  prevPage = () => {
    this.navigate({ page: this.getPage() - 1 });
  }

  updateQuery = (e) => {
    this.navigate({
      q: e.target.value.length ? e.target.value : undefined,
      page: undefined,
    });
  }

  render() {
    const page = this.getPage();
    const query = this.getQuery();

    return (
      <div>
        <input type="search" value={query} onChange={this.updateQuery} />
        <PlayersListWithData
          offset={(page - 1) * 10}
          query={query}
        />
        <button onClick={this.prevPage} disabled={page === 1}>-</button>
        <button onClick={this.nextPage}>+</button>
      </div>
    );
  }
}

export default SearchablePersonList;
