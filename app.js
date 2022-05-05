require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, DB_CONNECTION_STRING = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();

mongoose.connect(DB_CONNECTION_STRING);

app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
