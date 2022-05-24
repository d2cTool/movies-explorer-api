const rateLimit = require('express-rate-limit');
const { RLWindowMs, RLMax } = require('../utils/const');

const limiter = rateLimit({
  windowMs: RLWindowMs,
  max: RLMax,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
