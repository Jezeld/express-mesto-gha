const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  valCreateUser,
  valLogin,
} = require('../utils/celebrate');

router.post('/signup', valCreateUser, createUser);
router.post('/signin', valLogin, login);
router.use(auth);
router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

module.exports = router;
