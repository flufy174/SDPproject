var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));


var url = "mongodb://localhost:27017/users";

/* GET home page. */
router.post('/', function (req, res, next) {
    console.log(req.body)
});

//Show the login page
router.get('/signin', function (req, res, next) {
    res.render('login.pug', { user: req.user });
});

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


/*
router.post('/register', function (req, res) {
    Account.register(new Account)

    console.log("registration recieved");


    var fullName = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var colour = req.body.usercolor;

    var upload = true
    if (!fullName || !username || !password || !email || !colour)
        upload = false

    if (upload == true)
        MongoClient.connect(url, function (err, db) {


            if (err) throw err;
            var newUser = {
                full_name: fullName,
                user_name: username,
                password: password,
                email_address: email,
                admin: false,
                colour_choice: colour
            };


            db.collection("users").insertOne(newUser, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
         });
        });


    if (upload == true) {
        res.redirect('/journals');
    } else {
        //var errormsg = "Please complete all required fields"
        res.render('register.pug', { errormsg: 'Please complete all required fields' })
    }

});
*/


//Show the journals page
router.get('/journals', function (req, res, next) {
    res.render('journals.pug', {user: req.user});
});

router.get('/searchJournals', function (req, res, next) {
    res.render('searchJournals.pug')
});

router.post('/signin', passport.authenticate('local'), function (req, res) {
    //console.log(user.username)
    res.redirect('/journals');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.pug', { user: req.user });
    //res.render('index.pug', { title: 'World!', example: ['hello', 'guys', 'this', 'is', 'an', 'example'] });
});

module.exports = router;
