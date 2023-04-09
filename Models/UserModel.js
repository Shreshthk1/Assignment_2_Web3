const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    id: Number,
    details:{
        firstname: String,
        lastname: String,
        city: String, 
        country: String
    },
    picture:{
        large: String, 
        thumbnail: String
    }, 
    membership:{
        date_joined: String,
        'last-update': String,
        likes: Number
    },
    email: String,
    password_bcrypt: String,
    apikey: String,
    favorites:[]
})
module.exports = mongoose.model('Users', UserSchema);