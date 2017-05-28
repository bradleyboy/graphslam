export default (sequelize, { STRING, VIRTUAL }) => {
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
    fullName: {
      type: new VIRTUAL(STRING, ['firstName', 'lastName']),
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
  }, {
    tableName: 'Master',
    classMethods: {
      associate({ Appearance, Award }) {
        Person.Awards = Person.hasMany(Award, {
          foreignKey: 'personId',
        });

        Person.Appearances = Person.hasMany(Appearance, {
          foreignKey: 'personId',
        });
      },
    },
  });

  return Person;
};
