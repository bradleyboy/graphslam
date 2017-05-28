import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
} from 'graphql';

import {
    resolver,
    attributeFields,
    defaultArgs,
    defaultListArgs,
} from 'graphql-sequelize';

import models from './models';

const {
    Person,
    Award,
} = models;

const personType = new GraphQLObjectType({
  name: 'Person',
  description: 'A generic person object',
  fields() {
    return {
      ...attributeFields(Person),
      awards: {
        type: new GraphQLList(awardType),
        args: defaultListArgs(Award),
        resolve: resolver(Person.Awards),
      },
    };
  },
});

const awardType = new GraphQLObjectType({
  name: 'Award',
  description: 'An award for some sort of accomplishment',
  fields() {
    return {
      ...attributeFields(Award),
      person: {
        type: personType,
        resolve: resolver(Award.Person),
      },
    };
  },
});

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
