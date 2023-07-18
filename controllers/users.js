// const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../errors/errors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/badrequest');
const ConflictError = require('../errors/conflict');
const NotFoundError = require('../errors/notfound');
const UnauthorizedError = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданные данные некорректны'));
        return;
      } if (err.code === 11000) {
        next(new ConflictError('Данный email уже зарегистрирован'));
        return;
      }
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        next(res.send(user));
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Переданные данные некорректы'));
        return;
      }
      next(err);
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
            res.send({ token });
          } else {
            throw new UnauthorizedError('Некорректные почта или пароль');
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
  updateAvatar,
  getUserInfo,
  login,
};
