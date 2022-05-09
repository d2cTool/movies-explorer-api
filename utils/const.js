require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'top secret';
const JWTLiveTime = 7 * 24 * 3600 * 1000; // 7h

const PORT = process.env.PORT || 3001;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/moviesdb';

const RLWindowMs = 15 * 60 * 1000; // 15m
const RLMax = 100;

module.exports = {
  JWT_SECRET,
  JWTLiveTime,
  PORT,
  DB_CONNECTION_STRING,
  RLWindowMs,
  RLMax,
};
