var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');
var User = require('../models/user');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');

var journal = new mongoose.Schema({
    journalID: String,
    journalName: String,
    description: String,
    timestamp: String,
    userName: String,
});
var userJournal = mongoose.model('Journal', journal)
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

    User.register(new User({
        full_name: fullName,
        username: username,
        email_address: email,
        admin: false,
        colour_choice: colour
        }), req.body.password, function (err, user) {
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
    var name = req.user.username;
    //journal.find({ username: 'flufy174' })
    console.log("**");
    var pageJournals = 
    userJournal.find({ userName: name }, function (err, ujournal) {
            console.log(ujournal);
            var pageJournals = ujournal;
            console.log("**");

            res.render('journals.pug', { user: req.user, journals: pageJournals });

    })


});


router.get('/searchJournals', function (req, res, next) {
    res.render('searchJournals.pug')
});

/* Logs the user in */
router.post('/signin', passport.authenticate('local'), function (req, res) {
    //console.log(user.username)
    res.redirect('/journals');

//Show the main search page
router.get('/search', function (req, res, next) {
	res.render('search.pug')
});

router.get('/entry',function(req, res, next){
    res.render('entryeditor.pug')
});

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

/* Provides the create journals page */
router.get('/createJournal', function (req, res, next) {
    res.render('createJournals.pug', { user: req.user });
    //res.render('index.pug', { title: 'World!', example: ['hello', 'guys', 'this', 'is', 'an', 'example'] });
});

/* Provides the journal entries page */
router.get('/entries', function (req, res, next) {
    res.render('entries.pug', { user: req.user });
});

/* Provides the entry editor page */
router.get('/entryeditor', function (req, res, next) {
    res.render('entryeditor.pug', { user: req.user });
});


/* Provides the create journals page */
router.post('/createJournals', function (req, res, next) {

    //var userJournal = mongoose.model('Journal', journal)
    var name = req.user.username;
    console.log(name);

    var userSubmitJournal = new userJournal({
        journalID: 'Temp',
        journalName: req.body.journalName,
        description: req.body.journalDescription,
        timestamp: 'Temp',
        userName: name,
    });

    userSubmitJournal.save(function (err) {
        if (err) return handleError(err);
        // saved!
    })
    console.log(req.body)
    res.redirect('/journals')

    //res.redirect('createJournals.pug', { user: req.user });
    //res.render('index.pug', { title: 'World!', example: ['hello', 'guys', 'this', 'is', 'an', 'example'] });
});

/* Gets data from the index page. */
router.post('/journals', function (req, res, next) {

    
});

module.exports = router;
