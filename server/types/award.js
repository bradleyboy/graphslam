import {
  GraphQLObjectType,
} from 'graphql';

import {
  resolver,
  attributeFields,
} from 'graphql-sequelize';

import models from '../models';
import personType from './person';

const {
  Award,
} = models;

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

export default awardType;
