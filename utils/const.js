require('dotenv').config();

export const JWT_SECRET = process.env.JWT_SECRET || 'top secret';
export const JWTLiveTime = 7 * 24 * 3600 * 1000; // 7h

export const PORT = process.env.PORT || 3001;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/moviesdb';

export const RLWindowMs = 15 * 60 * 1000; // 15m
export const RLMax = 100;
