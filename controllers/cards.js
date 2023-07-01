const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../errors/errors');
const Card = require('../models/card');

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
