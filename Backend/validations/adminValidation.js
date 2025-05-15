const Joi = require('joi');

exports.registerAdminSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

exports.loginAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
