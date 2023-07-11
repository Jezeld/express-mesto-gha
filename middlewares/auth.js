const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
  }

  const token = authorization.startsWith('Bearer ') ? authorization.replace('Bearer ', '') : authorization;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Необходимо авторизоваться');
  }

  req.user = payload;
  next();
};

module.exports = auth;
