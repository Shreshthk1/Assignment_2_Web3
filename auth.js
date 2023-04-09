const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy; 
const Users = require('./Models/UserModel')

const localOpt = {
    usernameField : 'email',
    passwordField : 'password'
}; 

//User Strategy required for session and passport
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
passport.use('localLogin', strategy); 

//Serializing the User
passport.serializeUser( (user, done) => done(null, user.email) );

//Deserializing the user
passport.deserializeUser( (email, done) => {
 Users.findOne({ email: email })
 .then((user) => done(null, user));
}); 
