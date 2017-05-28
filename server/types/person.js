import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import {
  resolver,
  attributeFields,
  defaultListArgs,
} from 'graphql-sequelize';

import models from '../models';
import appearanceType from './appearance';
import awardType from './award';

const {
  Person,
  Award,
  Appearance,
} = models;

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

export default personType;
