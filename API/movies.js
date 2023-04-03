const express = require('express');
const router = express.Router();
const movieController = require('../Controllers/movie_controller')

router.route('/movies')
    .get(movieController.getAllMovies);

router.route('/movies/limit/:num')
    .get(movieController.getLimitedMovies)

router.route('/movies/')
    .get(movieController.getSpecificMovie)

router.route('/movies/tmdb/')
    .get(movieController.getTmdbMovie)

router.route('/movies/year/')
    .get(movieController.sortYear)

router.route('/movies/ratings/')
    .get(movieController.sortRatings)

router.route('/movies/title/')
    .get(movieController.sortTitle)

router.route('/movies/genre/')
    .get(movieController.sortGenre)

module.exports = router;