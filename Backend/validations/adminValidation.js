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


exports.createCategorySchema = Joi.object({
  categoryName: Joi.string().min(2).max(50).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `"name" is a required field`,
  }),
});

exports.updateCategorySchema = Joi.object({
  categoryName: Joi.string().min(2).max(50).optional(),
});

exports.createSubcategorySchema = Joi.object({
  subcategoryName: Joi.string().min(2).max(50).required(),
  productName: Joi.string().min(2).max(50).required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  description: Joi.string().required(),
  categoryId: Joi.string().required().messages({
    "string.empty": `"categoryId" is required`,
    "any.required": `"categoryId" is a required field`,
  })
});

exports.updateSubcategorySchema = Joi.object({
  subcategoryName: Joi.string().min(2).max(50).optional(),
});
