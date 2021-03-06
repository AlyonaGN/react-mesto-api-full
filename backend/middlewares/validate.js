const { ObjectId } = require('mongoose').Types;
const { celebrate, Joi } = require('celebrate');

const validateMongooseIdInParams = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().required().custom((value, helpres) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpres.message('Невалидный id');
    }),
  }),
});

const validateToken = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().custom((value, helpres) => {
        if (/^Bearer.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(value)) {
          return value;
        }
        return helpres.message('Невалидный токен');
      }),
    })
    .unknown(true),
});

const validateSignupBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().custom((value, helpres) => {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
        return value;
      }
      return helpres.message('Невалидный email');
    }),
    password: Joi.string().required().min(5).trim(),
  }),
});

const validateUpdatesToProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().custom((value, helpres) => {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
        return value;
      }
      return helpres.message('Невалидный email');
    }),
    password: Joi.string().min(5).trim(),
  }),
});

const validateSigninBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(5),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helpres) => {
      if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/.test(value)) {
        return value;
      }
      return helpres.message('Невалидная ссылка');
    }),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpres) => {
      if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/.test(value)) {
        return value;
      }
      return helpres.message('Невалидная ссылка');
    }),
  }),
});

module.exports = {
  validateMongooseIdInParams,
  validateSignupBody,
  validateSigninBody,
  validateToken,
  validateCard,
  validateAvatar,
  validateUpdatesToProfile,
};
