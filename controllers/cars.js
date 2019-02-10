const Joi = require('joi');

const Brand = require('../models/brand');
const Car = require('../models/car');

exports.getCars = (req, res) => {
  Car.findAll({ order: ['model'] })
    .then(cars => {
      res.send(cars);
    })
    .catch(err => console.log(err));
};

exports.postCar = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const brand = await Brand.findById(req.body.brandId);
  // console.log(brand);
  if (!brand) return res.status(400).send('Invalid brand');

  const car = new Car({
    model: req.body.model,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    brandId: req.body.brandId
  });

  const result = await car.save();
  res.send(result.dataValues);
};

exports.putCar = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const brand = await Brand.findById(req.body.brandId);
  if (!brand) return res.status(400).send('Invalid brand');

  const car = await Car.findById(req.params.id);
  if (!car)
    return res.status(404).send('The car with the given ID was not found.');

  car.model = req.body.model;
  car.numberInStock = req.body.numberInStock;
  car.dailyRentalRate = req.body.dailyRentalRate;
  car.brandId = req.body.brandId;

  const result = await car.save();
  res.send(result.dataValues);
};

exports.deleteCar = async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car)
    return res.status(404).send('The car with the given ID was not found.');

  const result = await car.destroy();
  res.send(result.dataValues);
};

exports.getCar = async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car)
    return res.status(404).send('The car with the given ID was not found.');

  res.send(car);
};

function validate(car) {
  const schema = {
    model: Joi.string()
      .min(5)
      .max(50)
      .required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required(),
    brandId: Joi.number().required()
  };

  return Joi.validate(car, schema);
}
