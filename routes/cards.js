const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  valCreateCard,
  valDeleteCard,
  valDislikeCard,
  valLikeCard,
} = require('../utils/celebrate');

router.get('/', getCards);
router.post('/', valCreateCard, createCard);
router.put('/:id/likes', valLikeCard, likeCard);
router.delete('/:id/likes', valDislikeCard, dislikeCard);
router.delete('/:id', valDeleteCard, deleteCard);

module.exports = router;
