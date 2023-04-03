const mongoose = require('mongoose');
const connect = () => { 
 const opt = {
 useUnifiedTopology: true,
 useNewUrlParser: true, 
 dbName: 'Assign2DB' 
 };
 
 mongoose.connect("mongodb+srv://admin:7HPj193FTcC2OZA8@web3assign2.kwq43gx.mongodb.net/test", opt);
 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function callback () {
 console.log("connected to mongo");
 });
}; 

module.exports = { 
    connect 
}; 