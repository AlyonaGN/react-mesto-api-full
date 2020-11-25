const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
} = require('../controllers/cards.js');
const { validateMongooseId } = require('../middlewares/validate.js');

router.post('/api/cards', createCard);
router.put('/api/cards/:cardId/likes', likeCard);
router.get('/api/cards', getCards);
router.delete('/api/cards/:id', validateMongooseId, deleteCard);

module.exports = router;
