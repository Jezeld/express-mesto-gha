const Card = require('../models/card');

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданные данные некорректны' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.stack.startsWith('CastError')) {
        res.status(400).send({ message: 'Переданные данные некорректны' });
      } else if (err.message === 'Not Found') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.stack.startsWith('CastError')) {
        res.status(400).send({ message: 'Переданные данные некорректны' });
      } else if (err.message === 'Not Found') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.stack.startsWith('CastError')) {
        res.status(400).send({ message: 'Переданные данные некорректны' });
      } else if (err.message === 'Not Found') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
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
