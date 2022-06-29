const express = require("express");
const passport = require("../daos/UsersPassport");

const usersRouter = express.Router();

// let usersContainer = new UsersDaoMongo();

//  INDEX
usersRouter.get('',(req, res) => {
    res.render('main')
})

//  LOGIN
usersRouter.get('login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.render('login');
    }
})

usersRouter.post('login', passport.authenticate('login', { failureRedirect: 'faillogin' }), postLogin);

usersRouter.get('faillogin', getFaillogin);

//  SIGNUP
usersRouter.get('signup', (req, res) => {
    res.render('signup');
})

usersRouter.post('signup', passport.authenticate('signup', { failureRedirect: 'failsignup' }), postSignup);

usersRouter.get('failsignup', getFailsignup);

//  LOGOUT
usersRouter.get('logout',(req, res) =>{
    req.logout( (err) => {
        if (!err) {
            res.render('main');
        } 
    });
})

// PROFILE
usersRouter.get('profile', (req, res) => {
    if (req.isAuthenticated()) {
        let user = req.user;
        res.render('profileUser', { user: user, isUser:true })
    } else {
        res.redirect('login')
    }
})

usersRouter.get('/ruta-protegida', checkAuthentication, (req, res) => {
    res.render('protected')
});

//////
function getFaillogin (req, res) {
    console.log('error en login');
    res.render('login-error', {});
}

function getFailsignup (req, res) {
    console.log('error en signup');
    res.render('signup-error', {});
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/login");
    }
}

function postLogin (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.redirect('login')
    }
}

function postSignup (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.redirect('login')
    }
}

module.exports = usersRouter;