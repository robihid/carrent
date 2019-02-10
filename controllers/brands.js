const Joi = require('joi');

const Brand = require('../models/brand');

exports.getBrands = async (req, res, next) => {
  const brands = await Brand.findAll();
  res.send(brands);
};

exports.postBrand = (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const name = req.body.name;
  Brand.create({
    name: name
  })
    .then(brand => {
      res.send(brand.dataValues);
    })
    .catch(err => console.log(err));
};

exports.putBrand = (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  Brand.findById(id)
    .then(brand => {
      if (!brand) {
        return res
          .status(404)
          .send('The brand with the given ID was not found.');
      }
      brand.name = req.body.name;
      return brand.save();
    })
    .then(result => {
      res.send(result.dataValues);
    })
    .catch(err => console.log(err));
};

exports.deleteBrand = (req, res) => {
  const id = req.params.id;
  Brand.findById(id)
    .then(brand => {
      if (!brand) {
        return res
          .status(404)
          .send('The brand with the given ID was not found.');
      }
      return brand.destroy();
    })
    .then(result => {
      res.send(result.dataValues);
    })
    .catch(err => console.log(err));
};

exports.getBrand = (req, res) => {
  const id = req.params.id;
  Brand.findById(id).then(brand => {
    if (!brand) {
      return res.status(404).send('The brand with the given ID was not found.');
    }
    res.send(brand);
  });
};

function validate(brand) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(brand, schema);
}
