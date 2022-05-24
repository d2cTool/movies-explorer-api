const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');
const User = require('../models/user');
const { JWT_SECRET, JWTLiveTime } = require('../utils/const');

const getUser = (req, res, next) => User.findById(req.user._id)
  .orFail(() => new NotFoundError('User is not found'))
  .then((usr) => res.send(usr))
  .catch((err) => next(err));

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User
    .create({ name, email, password })
    .then((usr) => res.send({
      id: usr._id,
      name,
      email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('User already exist'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true, runValidators: true,
    },
  )
    .orFail(() => new NotFoundError('User is not found'))
    .then((usr) => res.send(usr))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('User with email already exist'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUser(email, password)
    .then((usr) => {
      const token = jwt.sign({ _id: usr._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: JWTLiveTime,
        httpOnly: true,
        sameSite: true,
        // secure: true,
      });
      res.send({ id: usr._id, email });
    })
    .catch((err) => next(new UnauthorizedError(err.message)));
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.send({ message: 'You logged out' });
};

module.exports = {
  createUser,
  updateUser,
  login,
  logout,
  getUser,
};
