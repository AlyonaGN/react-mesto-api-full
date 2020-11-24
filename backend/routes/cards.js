const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
} = require('../controllers/cards.js');
const { validateMongooseId } = require('../middlewares/validate.js');

router.post('/api/cards', createCard);
router.get('/api/cards', getCards);
router.delete('/api/cards/:id', validateMongooseId, deleteCard);

module.exports = router;
