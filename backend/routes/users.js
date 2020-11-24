const router = require('express').Router();

const {
  getUsers,
  getUser,
  getMyUser,
} = require('../controllers/users.js');
const { validateMongooseId } = require('../middlewares/validate.js');

router.get('/users', getUsers);
router.get('/users/me', getMyUser);
router.get('/users/:id', validateMongooseId, getUser);

module.exports = router;
