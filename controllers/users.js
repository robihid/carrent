const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.postUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.find({ where: { email: req.body.email } });
  if (user) return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.getAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
};

exports.myProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: {
      exclude: ['password']
    }
  });
  res.send(user);
};

function validate(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .required()
  };

  return Joi.validate(user, schema);
}
