const MovieModel = require("../Models/MovieModel")
const getMoviesFunc = (app, Movie) => {
    async (req, res) => {
        Movie.find()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json({message: "Unable to connect to database"})
        })
    }
}


const getLimitedMovies = async (req, res) => {

}

const getSpecificMovie = async (req, res) => {

}

const getTmdbMovie = async (req, res) => {

}

//FILTERS

const sortYear = async (req, res) => {

}

const sortRatings = async (req, res) => {

}

const sortTitle = async (req, res) => {

}
const sortGenre = async (req, res) => {

}

module.exports ={
    getMoviesFunc,
    getLimitedMovies,
    getSpecificMovie, 
    getTmdbMovie, 
    sortYear,
    sortRatings,
    sortTitle,
    sortGenre
}

