export default (sequelize, { STRING, INTEGER }) => {
  const Appearance = sequelize.define('Appearance', {
    personId: {
      type: STRING,
      field: 'playerID',
      primaryKey: true,
    },
    teamId: {
      type: STRING,
      field: 'teamID',
      primaryKey: true,
    },
    year: {
      type: INTEGER,
      field: 'yearID',
      primaryKey: true,
    },
  }, {
    tableName: 'Appearances',
    classMethods: {
      associate({ Person, Team }) {
        Appearance.Person = Appearance.belongsTo(Person, {
          foreignKey: 'personId',
        });

        Appearance.Team = Appearance.belongsTo(Team, {
          foreignKey: 'teamId',
        });
      },
    },
  });

  return Appearance;
};
