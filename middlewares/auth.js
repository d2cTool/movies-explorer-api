const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const { JWT_SECRET = 'top secret' } = process.env;

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError('Invalid token');
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    throw new UnauthorizedError('Invalid token');
  }

  next();
};

module.exports = auth;
