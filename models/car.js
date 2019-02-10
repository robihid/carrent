const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Car = sequelize.define('car', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numberInStock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dailyRentalRate: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Car;
