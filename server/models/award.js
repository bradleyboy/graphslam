export default (sequelize, { STRING, INTEGER }) => {
  const Award = sequelize.define('Award', {
    personId: {
      type: STRING,
      field: 'playerID',
      primaryKey: true,
    },
    award: {
      type: STRING,
      field: 'awardID',
      primaryKey: true,
    },
    year: {
      type: INTEGER,
      field: 'yearID',
      primaryKey: true,
    },
  }, {
    tableName: 'AwardsPlayers',
    classMethods: {
      associate({ Person }) {
        Award.Person = Award.belongsTo(Person, {
          foreignKey: 'personId',
        });
      },
    },
  });

  return Award;
};
