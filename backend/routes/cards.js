const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
} = require('../controllers/cards.js');
const { validateMongooseId } = require('../middlewares/validate.js');

router.post('/cards', createCard);
router.get('/cards', getCards);
router.delete('/cards/:id', validateMongooseId, deleteCard);

module.exports = router;
