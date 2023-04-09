const passport = require("passport");
const bcrypt = require('bcrypt'); 
const LocalStrategy = require('passport-local').Strategy; 
const Users = require('../Models/UserModel')

const localOpt = {
    usernameField : 'email',
    passwordField : 'password'
}; 

const strategy = new LocalStrategy(localOpt, async (email,
    password, done) => {
     try {
        const userChosen = await Users.findOne({ email: email }); 
        if( !userChosen ){
            return done(null, false, { message : 'User not found'});
        } 
        const validate = await userChosen.isValidPassword(password);
        if( !validate ){
            return done(null, false, { message : 'Wrong Password'});
        } 
        return done(null, userChosen, { message : 'Logged in Successfully'});
    }
    catch (error) {
        return done(error);
    }
}); 
// If successful, it should redirect to the home page. This can be a very simple page that says
// “Home Page” and “Login Successful”. This page must also provide a way logout the user (which
//     will redirect to the login page). If the user isn’t logged in yet, redirect to login form.
const login = (app, Users) => {
    app.post('/login', (req, res) => {
        console.log(req.body)
        const { email, password } = req.body;
        let foundUser;
        Users.findOne({email: email})
        .then((data) => {
            foundUser = data;
            console.log(password,data.password_bcrypt);
            if(verifyPassword(password,data.password_bcrypt)){
                //res.send()
            }

        })
    })
}

const  verifyPassword = async (plainTextPassword, hash) => {
    try {
        const result = await bcrypt.compare(plainTextPassword, hash);
        
        if(!result){
            throw new Error("password mismatched")
        }
        console.log("its a match", result)
        return result;
       
    } catch (err) {
        console.log(err);
    }
}

module.exports={
    login
}