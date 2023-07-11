/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

const regex = /https?:\/\/(www\.)?[\w\d\-._~:\/?#[\]@!$&'()*+,;=]{2,256}\.[\w\d.\/?#-]{2,}$/;

const valGetUser = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }).unknown(true),
});

const valUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

const valUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex).required(),
  }).unknown(true),
});

const valCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regex).required(),
  }).unknown(true),
});

const valDeleteCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }).unknown(true),
});

const valDislikeCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }).unknown(true),
});

const valLikeCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }).unknown(true),
});

const valCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().regex(regex).optional(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

const valLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

module.exports = {
  valGetUser,
  valUpdateUser,
  valUpdateAvatar,
  valCreateCard,
  valDeleteCard,
  valDislikeCard,
  valLikeCard,
  valCreateUser,
  valLogin,
};
