const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const Movie = require('../models/movie');

const getMovie = (req, res, next) => Movie.find()
  .then((movies) => res.send(movies))
  .catch((err) => next(err));

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  Movie.findById(req.params.id)
    .orFail(() => new NotFoundError('Movie is not found'))
    .then((movie) => {
      if (!movie.owner.equals(userId)) {
        throw new ForbiddenError("You cannot delete someone else's movie");
      } else {
        return movie.remove().then(() => res.send(movie));
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovie,
};
