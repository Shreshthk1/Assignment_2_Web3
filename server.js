require('./API/connection.js').connect(); 
const bodyParser = require('body-parser')
const express = require('express'); 
const app = express(); 
const port = 8080
const Movies = require('./Models/MovieModel')
const Users = require('./Models/UserModel')
const movieController = require('./Controllers/movie_controller')
const userController = require('./Controllers/user_controller.js')

app.listen(port, () => { 
 console.log("Server running at port= " + port); 
});

app.set('views', './views');
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('login.ejs');
}); 

//User Route
userController.login(app, Users)


//Movie Routes
movieController.getMoviesFunc(app, Movies)
movieController.getLimitedMovies(app, Movies)
movieController.getSpecificMovie(app, Movies)
movieController.getTmdbMovie(app, Movies)
movieController.sortYear(app, Movies)
movieController.sortRatings(app, Movies)
movieController.sortTitle(app, Movies)
movieController.sortGenre(app, Movies)