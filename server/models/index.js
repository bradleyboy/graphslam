import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const sequelize = new Sequelize('lahman2016', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});

const models = {};

fs
  .readdirSync(__dirname)
  .filter(file => (
      file.indexOf('.') !== 0) && (file !== 'index.js'
  ))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

export default models;
