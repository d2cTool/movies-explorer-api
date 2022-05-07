const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_CONNECTION_STRING } = require('./utils/const');

const app = express();

mongoose.connect(DB_CONNECTION_STRING);

app.use(express.json());
app.use(requestLogger);
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(cookieParser());

app.use('/', indexRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
