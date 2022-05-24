const router = require('express').Router();
const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  movieValidation,
  movieIdValidation,
} = require('../middlewares/validation');

router.get('/', getMovie);
router.post('/', movieValidation, createMovie);
router.delete('/:id', movieIdValidation, deleteMovie);

module.exports = router;
