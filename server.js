require('dotenv').config();
require('./API/connection.js').connect(); 

const express = require('express'); 
const app = express(); 
const port = process.env.port; 
const Movie = require('./Models/MovieModel')
app.listen(port, () => { 
 console.log("Server running at port= " + port); 
});

app.use(express.urlencoded({extended: true}));
app.use("/api/movies",require('./Controllers/movie_controller').getMoviesFunc(app, Movie))