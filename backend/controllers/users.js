const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const IncorrectInputError = require('../errors/incorrect-input-err');
const UnauthorizedError = require('../errors/unauthoriszed-err');

const getUsers = (req, res, next) => {
  User.find({})
    .then((usersData) => {
      res.send({ data: usersData });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(new Error('NotFound'))
    .then((userData) => {
      res.send({ data: userData });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new IncorrectInputError('Переданы некорректные данные');
      } else if (error.message === 'NotFound') {
        throw new NotFoundError('Объект не найден');
      }
      throw error;
    })
    .catch(next);
};

const getMyUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(new Error('NotFound'))
    .then((userData) => {
      res.send({ data: userData });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new IncorrectInputError('Переданы некорректные данные');
      } else if (error.message === 'NotFound') {
        throw new NotFoundError('Объект не найден');
      }
      throw error;
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((newUser) => {
      res.send({ data: newUser });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new IncorrectInputError('Переданы некорректные данные');
      }
      throw error;
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'my-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      throw new UnauthorizedError(err.message);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getMyUser,
  createUser,
  login,
};
