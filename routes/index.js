const express = require('express');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movie');

const NotFoundError = require('../errors/notFoundError');

const { signUpValidation, signInValidation } = require('../middlewares/validation');
const { createUser, login, logout } = require('../controllers/users');

const router = express.Router();

router.post('/signup', signUpValidation, createUser);
router.post('/signin', signInValidation, login);
router.post('/signout', logout);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('/', (req, res, next) => {
  next(new NotFoundError('Something went wrong'));
});

module.exports = router;
