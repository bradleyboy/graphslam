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
  Appearance,
  Award,
  Team,
} = models;

const teamType = new GraphQLObjectType({
  name: 'Team',
  description: 'A team',
  fields() {
    return {
      ...attributeFields(Team),
    };
  },
});

const appearanceType = new GraphQLObjectType({
  name: 'Appearance',
  description: "Object representing a player's season with a team",
  fields() {
    return {
      ...attributeFields(Appearance),
      person: {
        type: personType,
        resolve: resolver(Appearance.Person),
      },
      team: {
        type: teamType,
        resolve(appearance) {
          return appearance.getTeam({
            where: {
              year: appearance.year,
            },
          });
        },
      },
    };
  },
});

const personType = new GraphQLObjectType({
  name: 'Person',
  description: 'A generic person object',
  fields() {
    return {
      ...attributeFields(Person),
      appearances: {
        type: new GraphQLList(appearanceType),
        args: defaultListArgs(Appearance),
        resolve: resolver(Person.Appearances),
      },
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
