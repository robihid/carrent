const sequelize = require('../util/database');
const Brand = require('../models/brand');
const Car = require('../models/car');
const Customer = require('../models/customer');
const Rental = require('../models/rental');
const User = require('../models/user');

module.exports = () => {
  // Set up database relation
  Brand.hasMany(Car);
  Customer.belongsToMany(Car, { through: Rental });
  Car.belongsToMany(Customer, { through: Rental });

  sequelize.sync({ force: true });
  //   .then(() => app.listen(3000))
  //   .catch(err => console.log(err));
};
