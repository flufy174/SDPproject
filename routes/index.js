var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));


var url = "mongodb://localhost:27017/users";





//Show the registration page
router.get('/register', function (req, res, next) {
	res.render('register.pug', {errormsg: null})
});

router.post('/register', function (req, res) {
    console.log("Attempting to register")

    var fullName = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var colour = req.body.usercolor;

    User.register(new User({ full_name: fullName, username: username, email_address: email, admin: false, colour_choice: colour}), req.body.password, function (err, user) {
        if (err) {
            //console.log(err)
            return res.render('register', { user: user, errormsg: "Please complete all required fields" });
        }

        passport.authenticate('local')(req, res, function () {
            console.log("Should be logged")
            res.redirect('/journals');
        });
    });
});

//Show the journals page
router.get('/journals', function (req, res, next) {
    res.render('journals.pug', {user: req.user});
});

router.get('/searchJournals', function (req, res, next) {
    res.render('searchJournals.pug')
});

/* Logs the user in */
router.post('/signin', passport.authenticate('local'), function (req, res) {
    //console.log(user.username)
    res.redirect('/journals');
});

//Show the login page
router.get('/signin', function (req, res, next) {
    res.render('login.pug', { user: req.user });
});


/*NOT COMPLETE*/
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


/* Provides the index page */
router.get('/', function (req, res, next) {
    res.render('index.pug', { user: req.user });
    //res.render('index.pug', { title: 'World!', example: ['hello', 'guys', 'this', 'is', 'an', 'example'] });
});

/* Gets data from the index page. */
router.post('/', function (req, res, next) {
    console.log(req.body)
});

module.exports = router;
