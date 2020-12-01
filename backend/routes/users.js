const router = require('express').Router();

const {
  getUsers,
  getMyUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.js');
const { validateAvatar, validateToken, validateUpdatesToProfile } = require('../middlewares/validate.js');

router.get('/api/users', getUsers);
router.get('/api/users/me', validateToken, getMyUser);
router.patch('/api/users/me/avatar', validateAvatar, updateAvatar);
router.patch('/api/users/me', validateUpdatesToProfile, updateProfile);

module.exports = router;
