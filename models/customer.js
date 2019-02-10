const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Customer = sequelize.define('customer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isGold: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Customer;
