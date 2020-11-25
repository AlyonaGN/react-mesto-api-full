const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  removeLikefromCard,
} = require('../controllers/cards.js');
const { validateMongooseId } = require('../middlewares/validate.js');

router.post('/api/cards', createCard);
router.put('/api/cards/:id/likes', validateMongooseId, likeCard);
router.delete('/api/cards/:id/likes', validateMongooseId, removeLikefromCard);
router.get('/api/cards', getCards);
router.delete('/api/cards/:id', validateMongooseId, deleteCard);

module.exports = router;
