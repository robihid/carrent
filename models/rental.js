const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Rental = sequelize.define('rental', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  dateOut: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now
  },
  dateReturned: {
    type: Sequelize.DATE
  },
  rentalFee: {
    type: Sequelize.DOUBLE
  }
});

module.exports = Rental;
