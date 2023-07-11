const router = require('express').Router();
const {
  getUsers, getUser, updateUserInfo, updateAvatar, getUserInfo,
} = require('../controllers/users');

const {
  valGetUser,
  valUpdateUser,
  valUpdateAvatar,
} = require('../utils/celebrate');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', valGetUser, getUser);
router.patch('/me', valUpdateUser, updateUserInfo);
router.patch('/me/avatar', valUpdateAvatar, updateAvatar);

module.exports = router;
