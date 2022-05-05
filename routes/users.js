const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { userInfoValidation } = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', userInfoValidation, updateUser);

module.exports = router;
