const brands = require('../routes/brands');
const cars = require('../routes/cars');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = app => {
  app.use('/api/brands', brands);
  app.use('/api/cars', cars);
  app.use('/api/customers', customers);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
};
