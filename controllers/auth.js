const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.authUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.find({ where: { email: req.body.email } });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = user.getAuthToken();
  res.send(token);
};

function validate(req) {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .required()
  };

  return Joi.validate(req, schema);
}
