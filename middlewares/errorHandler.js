module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: 'Invalid data' });
  } else {
    res.status(statusCode).send({ message });
  }
  next();
};
