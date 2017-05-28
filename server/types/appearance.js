import {
  GraphQLObjectType,
} from 'graphql';

import {
  resolver,
  attributeFields,
} from 'graphql-sequelize';

import models from '../models';
import personType from './person';
import teamType from './team';

const { Appearance } = models;

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

export default appearanceType;
