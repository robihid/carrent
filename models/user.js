const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const config = require('config');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isAdmin: Sequelize.BOOLEAN
});

User.prototype.getAuthToken = function() {
  const token = jwt.sign(
    { id: this.id, isAdmin: this.isAdmin },
    config.get('jwtPrivateKey')
  );
  return token;
};

module.exports = User;
