const Joi = require('joi');

const Customer = require('../models/customer');

exports.getCustomers = async (req, res) => {
  const customers = await Customer.findAll();
  res.send(customers);
};

exports.postCustomer = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });

  const result = await customer.save();
  res.send(result.dataValues);
};

exports.putCustomer = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByPk(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send('The customer with the given ID was not found.');

  customer.name = req.body.name;
  customer.isGold = req.body.isGold;
  customer.phone = req.body.phone;

  const result = await customer.save();
  res.send(result.dataValues);
};

exports.deleteCustomer = async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send('The customer with the given ID was not found.');

  const result = await customer.destroy();
  res.send(result.dataValues);
};

exports.getCustomer = async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send('The customer with the given ID was not found.');

  res.send(customer);
};

function validate(customer) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isGold: Joi.boolean(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(customer, schema);
}
