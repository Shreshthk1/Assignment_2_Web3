//Require Items
require('./API/connection.js').connect(); 
const bodyParser = require('body-parser')
const express = require('express'); 
const app = express(); 
const passport = require('passport'); 
const Movies = require('./Models/MovieModel')
const Users = require('./Models/UserModel')
const movieController = require('./Controllers/movie_controller')
const userController = require('./Controllers/user_controller.js')
const session = require('express-session');
const cookieParser = require('cookie-parser'); 
const flash = require('express-flash'); 
require('./auth.js'); 
const cors = require('cors')

//Setting up server 
app.set('views', './views');
app.set('view engine', 'ejs'); 
app.use(express.static('Views'))
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser('oreos'));
app.use(
 session({
 secret: "LOGINSECRET",
 resave: true,
 saveUninitialized: true
 })
);

app.use(flash()); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(cookieParser('User'));

//Starting the Server
app.listen(process.env.PORT, () => { 
    console.log("Server running at port= " + process.env.PORT); 
});

//Login Route
app.get('/', userController.ensureAuthenticated,(req, res) => {
    res.render('login.ejs', {message: req.flash('error')});
});
app.get('/home', userController.ensureAuthenticated,(req, res) => {
    res.render('home.ejs', {message: req.flash('error')});
});


//User Route
userController.login(app, Users)
userController.logout(app, Users)

//Movie Routes
movieController.getMoviesFunc(app, Movies)
movieController.getLimitedMovies(app, Movies)
movieController.getSpecificMovie(app, Movies)
movieController.getTmdbMovie(app, Movies)
movieController.sortYear(app, Movies)
movieController.sortRatings(app, Movies)
movieController.sortTitle(app, Movies)
movieController.sortGenre(app, Movies)