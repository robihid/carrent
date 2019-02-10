const Joi = require('joi');

const Rental = require('../models/rental');
const Customer = require('../models/customer');
const Car = require('../models/car');
const sequelize = require('../util/database');

exports.getRentals = async (req, res) => {
  const rentals = await Rental.findAll();
  res.send(rentals);
};

exports.postRental = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByPk(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer');

  const car = await Car.findByPk(req.body.carId);
  if (!car) return res.status(400).send('Invalid car');

  const rental = new Rental({
    customerId: customer.id,
    carId: car.id
  });

  // get transaction
  const transaction = await sequelize.transaction();
  try {
    // step 1
    await rental.save();

    // step 2
    car.numberInStock -= 1;
    await car.save();

    // commit
    await transaction.commit();
    res.send(rental);
  } catch (err) {
    await transaction.rollback();
    res.status(500).send('Something failed.');
  }
};

exports.getRental = async (req, res) => {
  const rental = await Rental.findByPk(req.params.id);
  if (!rental)
    return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
};

function validate(rental) {
  const schema = {
    customerId: Joi.number().required(),
    carId: Joi.number().required()
  };

  return Joi.validate(rental, schema);
}
