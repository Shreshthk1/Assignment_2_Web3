require('./API/connection.js').connect(); 

const express = require('express'); 
const app = express(); 
const port = 8080
const Movies = require('./Models/MovieModel')
const movieController = require('./Controllers/movie_controller')

app.listen(port, () => { 
 console.log("Server running at port= " + port); 
});

app.use(express.urlencoded({extended: true}));

movieController.getMoviesFunc(app, Movies)
movieController.getLimitedMovies(app, Movies)
movieController.getSpecificMovie(app, Movies)
movieController.getTmdbMovie(app, Movies)
movieController.sortYear(app, Movies)
movieController.sortRatings(app, Movies)
movieController.sortTitle(app, Movies)
movieController.sortGenre(app, Movies)