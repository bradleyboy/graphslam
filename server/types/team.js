import {
  GraphQLObjectType,
} from 'graphql';

import {
  attributeFields,
} from 'graphql-sequelize';

import models from '../models';

const {
  Team,
} = models;

const teamType = new GraphQLObjectType({
  name: 'Team',
  description: 'A team',
  fields: () => attributeFields(Team),
});

export default teamType;
