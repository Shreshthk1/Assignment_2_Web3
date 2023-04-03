const MovieModel = require("../Models/MovieModel")

const getMoviesFunc = (app, Movies) => {
    app.get("/api/movies" , (req, res) => {
        Movies.find()
        .then((data) => {
            if(data.length != 0){
                res.status(200).json(data)  
            } else {
                res.status(404).send({success: false, error:{message: "No Movies Found"}})
            }
        })
        .catch((err) => {
            res.json({message: "Unable to connect to database"})
        })
    }
    )
}


const getLimitedMovies = (app,Movies)=>{
    app.get("/api/movies/limit/:num",(req,res)=>{
        const num = req.params.num;
        if(parseInt(num)>=1 && parseInt(num) <=200){
            Movies.find().limit(num)
            .then((data)=>{
                if(data.length != 0){
                    res.status(200).json(data)  
                } else {
                    res.status(404).send({success: false, error:{message: "No Movies Found"}})
                }
            })
        }
    })
}



const getSpecificMovie =  (app, Movies) => {
    app.get("/api/movies/:id", (req, res) => {
        let movieID = req.params.id;
        Movies.findOne({id: movieID})
        .then((data) => {
            if (data != null) {
                res.status(200).json(data);
            } else {
                res.status(400).send({success: false, error:{message: "This ID is invalid, please try again with another ID"}})
            }
        })
    })
}

const getTmdbMovie = (app,Movies) =>{
    app.get("/api/movies/tmdb/:id",(req,res)=>{
        let movieId = req.params.id;
        Movies.findOne({ tmdb_id: movieId }).exec()
        .then((data)=>{
            if (data != null) {
                res.status(200).json(data);
            } else {
                res.status(400).send({success: false, error:{message: "This TMDB ID is invalid, please try again with another ID"}})
            }
        })
    })
}

const sortYear = (app,Movies) => {
    app.get("/api/movies/year/:min/:max",(req,res)=>{
        let minDate = `${req.params.min}-00-01`
        let maxDate = `${req.params.max}-00-01`
        if (parseInt(minDate)< parseInt(maxDate)){
            Movies.find(
                {$and:[
                    {release_date: {$gte: `${minDate}-01-01`}},
                    {release_date: {$lte: `${maxDate}-01-01`}}
                ]}
            )
            .then((data)=>{
                if(data!= null){
                    console.log(data);
                    res.status(200).json(data)
                }else{
                    res.status(400).send({success: false, error:{message: "Invalid date input"}})
                }
            })
        }else{
            res.status(400).send({success:false,error:{message:"The max date should be less than min date"}})
        }

    })

}

const sortRatings = (app, Movies) => {
    app.get("/api/movies/ratings/:min/:max",(req,res)=>{
        let minRatings = parseInt(req.params.min)
        let maxRatings = parseInt(req.params.max)
        if (minRatings<maxRatings){
            Movies.find({"ratings.average":{$gt:minRatings,$lt:maxRatings}})
            .then((data)=>{
                if(data!= null){
                    console.log(data);
                    res.status(200).json(data)
                }else{
                    res.status(400).send({success: false, error:{message: "Invalid rating input"}})
                }
            })
        }else{
            res.status(400).send({success:false,error:{message:"The max rating should be less than min rating"}})
        }

    })
}

const sortTitle = (app, Movies) => {
    app.get("/api/movies/title/:movieTitle", (req, res) => {
        let movieTitle = req.params.movieTitle;
        Movies.find({title: {$regex: movieTitle}})
        .then(data => {
            if(data != null){
                res.status(200).json(data);
            } else {
                res.status(400).send({success:false,error:{message:"No Matching Title Found. Please Check Spelling and Case"}})
            }
        })
    })
}
const sortGenre = (app, Movies) => {
    app.get("/api/movies/genre/:name", (req, res) => {
        let genreName = req.params.name;
        Movies.find({"details.genres.name" : genreName })
        .then(data => {
            if (data.length != 0) {
                res.status(200).json(data)
            } else {
                res.status(400).send({success:false,error:{message:"No Matching Genres Found. Please check spelling and Case"}})
            }
        })
    })
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

