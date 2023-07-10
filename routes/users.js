const router = require('express').Router();
const {
  getUsers, getUser, updateUserInfo, updateAvatar, getUserInfo,
} = require('../controllers/users');

// router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);
router.get('/me', getUserInfo);

module.exports = router;
