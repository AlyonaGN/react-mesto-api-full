const router = require('express').Router();

const {
  getUsers,
  getMyUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.js');
const { validateMongooseIdInRequest, validateAvatar, validateUpdatesToProfile } = require('../middlewares/validate.js');

router.get('/api/users', getUsers);
router.get('/api/users/me', validateMongooseIdInRequest, getMyUser);
router.patch('/api/users/me/avatar', validateAvatar, validateMongooseIdInRequest, updateAvatar);
router.patch('/api/users/me', validateMongooseIdInRequest, validateUpdatesToProfile, updateProfile);

module.exports = router;
