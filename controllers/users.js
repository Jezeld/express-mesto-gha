const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../errors/errors');
const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not Found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
  updateAvatar,
};
