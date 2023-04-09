const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

//Mongo DB User Schema
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

//makes sure the password provided is correct
UserSchema.methods.isValidPassword = async function(formPassword) {
    const user = this;
    const hash = user.password_bcrypt;
    const compare = await bcrypt.compare(formPassword, hash);
    return compare;
} 
module.exports = mongoose.model('Users', UserSchema);