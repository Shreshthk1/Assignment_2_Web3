const bcrypt = require('bcrypt'); 
const passport = require('passport'); 
function ensureAuthenticated (req, resp, next) {
    if (req.isAuthenticated()) {
    return next();
    }
    req.flash('info', 'Incorrect Password, Please try again');
    resp.render('login', {message: req.flash('info')} );
}
   
const login = (app, Users) => {
    app.post('/login', (req, res, next) => {
        console.log(req.body)
        const { email, password } = req.body;
        let foundUser;
        Users.findOne({email: email})
        .then((data) => {
            foundUser = data;
            console.log(password,data.password_bcrypt);
            if(verifyPassword(password,data.password_bcrypt)){
                passport.authenticate('localLogin',
                { successRedirect: '/home',
                failureRedirect: '/',
                failureFlash: true })(req, res, next);
            }
        })
    })
}

const logout = (app,Users)=>{
    app.post('/logout', (req,res,next)=>{
        req.logout(function(err){
            if(err){return next(err)}
            res.redirect("/")
        });
    })
}

const verifyPassword = async (plainTextPassword, hash) => {
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
    login,
    logout,
    ensureAuthenticated
}