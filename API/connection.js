const mongoose = require('mongoose');
require('dotenv').config();

//Creates and ensures connection with the MongoDB database
const connect = () => { 
 const opt = {
 useUnifiedTopology: true,
 useNewUrlParser: true, 
 dbName: 'Assign2DB' 
 };
 mongoose.connect(process.env.MONGO_URL, opt);
 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function callback () {
 console.log("connected to mongo");
 });
}; 

module.exports = { 
    connect 
}; 