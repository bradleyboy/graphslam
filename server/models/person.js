export default (sequelize, { STRING }) => {
  const Person = sequelize.define('Person', {
    id: {
      type: STRING,
      field: 'playerID',
      primaryKey: true,
    },
    firstName: {
      type: STRING,
      field: 'nameFirst',
    },
    lastName: {
      type: STRING,
      field: 'nameLast',
    },
  }, {
    tableName: 'Master',
    classMethods: {
      associate({ Award }) {
        Person.Awards = Person.hasMany(Award, {
          foreignKey: 'personId',
        });
      },
    },
  });

  return Person;
};
