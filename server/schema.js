import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
} from 'graphql';

import {
    resolver,
    defaultArgs,
    defaultListArgs,
} from 'graphql-sequelize';

import models from './models';
import awardType from './types/award';
import personType from './types/person';

const {
  Person,
  Award,
} = models;

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    awards: {
      type: new GraphQLList(awardType),
      args: defaultListArgs(Award),
      resolve: resolver(Award),
    },
    person: {
      type: personType,
      args: defaultArgs(Person),
      resolve: resolver(Person),
    },
    people: {
      type: new GraphQLList(personType),
      args: defaultListArgs(Person),
      resolve: resolver(Person),
    },
  },
});

const schema = new GraphQLSchema({
  query,
});

export default schema;
