const router = require('express').Router();

const {
  getUsers,
  getUser,
  getMyUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.js');
const { validateMongooseId } = require('../middlewares/validate.js');

router.get('/api/users', getUsers);
router.get('/api/users/me', getMyUser);
router.patch('/api/users/me/avatar', updateAvatar);
router.patch('/api/users/me', updateProfile);
router.get('/api/users/:id', validateMongooseId, getUser);

module.exports = router;
