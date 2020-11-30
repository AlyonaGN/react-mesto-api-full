const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  removeLikefromCard,
} = require('../controllers/cards.js');
const { validateMongooseIdInParams, validateCard } = require('../middlewares/validate.js');

router.post('/api/cards', validateCard, createCard);
router.put('/api/cards/:id/likes', validateMongooseIdInParams, likeCard);
router.delete('/api/cards/:id/likes', validateMongooseIdInParams, removeLikefromCard);
router.get('/api/cards', getCards);
router.delete('/api/cards/:id', validateMongooseIdInParams, deleteCard);

module.exports = router;
