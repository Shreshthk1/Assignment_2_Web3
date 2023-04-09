const mongoose = require('mongoose');

//Mongo DB Movie Schema
const MovieSchema = new mongoose.Schema({
    id: Number,
    tmdb_id: Number,
    imdb_id: String,
    release_date: String,
    title: String,
    runtime: Number,
    revenue: Number,
    tagline: String,
    poster: String, 
    backdrop: String,
    ratings:{
        popularity: Number,
        average: Number,
        count: Number
    },
    details: {
        overview: String,
        genres: [{
            id: Number,
            name: String
        }
        ]
    }
})
module.exports = mongoose.model('Movies', MovieSchema);