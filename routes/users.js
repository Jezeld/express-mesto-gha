const router = require('express').Router();
const {
  createUser, getUsers, getUser, updateUserInfo, updateAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
