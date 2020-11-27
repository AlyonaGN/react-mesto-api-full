const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const IncorrectInputError = require('../errors/incorrect-input-err');
const UnauthorizedError = require('../errors/unauthoriszed-err');
const ConflictError = require('../errors/conflict-err');

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
    name, about, avatar, password,
  } = req.body;
  const userEmail = req.body.email;

  User.findOne({ email: userEmail })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email уже зарегистрирован');
      }
      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name, about, avatar, email: userEmail, password: hash,
          })
            .then(({ email, _id }) => {
              res.send({ email, _id });
            });
        })
        .catch((error) => {
          if (error.name === 'ValidationError') {
            throw new IncorrectInputError('Переданы некорректные данные');
          }
          throw error;
        })
        .catch(next);
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const id = req.user._id;
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOneAndUpdate({ _id: id }, {
    name, about, avatar, email, password,
  }, {
    new: true,
    runValidators: true,
    upsert: true,
    omitUndefined: true,
  })
    .then((user) => res.send({ data: user }))
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

const updateAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: id }, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send({ data: user }))
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
  updateProfile,
  updateAvatar,
};
