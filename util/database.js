const Sequelize = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(
  config.get('dbName'),
  config.get('dbUser'),
  config.get('dbPassword'),
  {
    dialect: 'postgres',
    host: config.get('dbHost')
  }
);

module.exports = sequelize;
