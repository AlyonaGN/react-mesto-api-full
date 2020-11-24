const { ObjectId } = require('mongoose').Types;
const { celebrate, Joi } = require('celebrate');

const validateMongooseId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().required().custom((value, helpres) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpres.message('Невалидный id');
    }),
  }),
});

const validateSignupBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string(),
    password: Joi.string().required().min(5),
  }),
});

const validateSigninBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(5),
  }),
});

module.exports = {
  validateMongooseId,
  validateSignupBody,
  validateSigninBody,
};
