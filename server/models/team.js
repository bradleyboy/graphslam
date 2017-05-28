export default (sequelize, { STRING, INTEGER }) => {
  const Team = sequelize.define('Team', {
    id: {
      type: STRING,
      field: 'teamID',
      primaryKey: true,
    },
    year: {
      type: INTEGER,
      field: 'yearID',
    },
    name: {
      type: STRING,
    },
  }, {
    tableName: 'Teams',
  });

  return Team;
};

