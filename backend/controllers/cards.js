const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const IncorrectInputError = require('../errors/incorrect-input-err');
const ForbiddenError = require('../errors/forbidden-err');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => {
      res.send({ data: newCard });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new IncorrectInputError('Переданы некорректные данные');
      }
      throw error;
    })
    .catch((err) => {
      next(err);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .then((card) => {
      if (req.user._id !== card.owner) {
        throw new ForbiddenError('Невозможно удалить карточку другого пользователя');
      }

      Card.deleteOne({ _id: id })
        .orFail(new Error('NotFound'))
        .then((deletedCard) => res.send({ data: deletedCard }))
        .catch((error) => {
          if (error.name === 'CastError') {
            throw new IncorrectInputError('Переданы некорректные данные');
          } else if (error.message === 'NotFound') {
            throw new NotFoundError('Не удалось найти и удалить карточку');
          }
          throw error;
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new IncorrectInputError('Переданы некорректные данные');
      } else if (error.message === 'NotFound') {
        throw new NotFoundError('Не удалось найти и удалить карточку');
      }
      throw error;
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
};
