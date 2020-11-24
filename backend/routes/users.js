const router = require('express').Router();

const {
  getUsers,
  getUser,
  getMyUser,
} = require('../controllers/users.js');
const { validateMongooseId } = require('../middlewares/validate.js');

router.get('/api/users', getUsers);
router.get('/api/users/me', getMyUser);
router.get('/api/users/:id', validateMongooseId, getUser);

module.exports = router;
