const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
  }

  const token = authorization.startsWith('Bearer ') ? authorization.replace('Bearer ', '') : authorization;

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError('Необходимо авторизоваться');
  }

  req.user = payload;
  next();
};

module.exports = auth;
