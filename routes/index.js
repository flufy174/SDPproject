var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
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

var entry = new mongoose.Schema({
    parentID: String,
    journaName: String,
    description: String,
    timestamp: String,
    userName: String,
});

var entryRecord = new mongoose.Schema({
    parentID: String,
    description: String,
    timestamp: String,
    userName: String,
});


var entryRecord = mongoose.model('entryRecord', entryRecord)
var userJournal = mongoose.model('Journal', journal)
var userEntry = mongoose.model('Entry', entry)
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
    //var pageJournals = 
    userJournal.find({ userName: name }, function (err, ujournal) {
        
        var pageJournals = ujournal;
        res.render('journals.pug', { user: req.user, journals: pageJournals });
    })
});

/* Logs the user in */
router.post('/signin', passport.authenticate('local'), function (req, res) {
    //console.log(user.username)
    res.redirect('/journals');
});
//Show the main search page
router.get('/search', function (req, res, next) {
	res.render('search.pug', { user: req.user});
});

router.get('/entry',function(req, res, next){
    res.render('entryeditor.pug')
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

/* Provides the create journals page */
router.get('/journal/:jid', function (req, res, next) {

    var name = req.user.username;
    var journalId = req.params.jid;

    userEntry.find({ userName: name, parentID: journalId }, function (err, uentries) {
        var pageEntries = uentries;
        res.render('entries.pug/', { user: req.user, entries: pageEntries, journalId: journalId });
            
    })

    //res.render('createJournals.pug', { user: req.user,  });
    //res.render('index.pug', { title: 'World!', example: ['hello', 'guys', 'this', 'is', 'an', 'example'] });
});

/* Provides the create journals page */
router.get('/entryeditor/:id', function (req, res, next) {
    res.render('entryeditor.pug', { user: req.user, journalId: req.params.id});
});

/* Provides the create journals page */
router.post('/entryeditor/:id', function (req, res, next) {

    //var userJournal = mongoose.model('Journal', journal)
    var name = req.user.username;
    //console.log(name);
    console.log(req.body.entry + '*');
    console.log(req.body.userEntry + '**');

    var userSubmitEntry = new userEntry({
        parentID: req.params.id,
        journalName: 'Temp',
        description: req.body.userEntry,
        timestamp: 'Temp',
        userName: req.user.username,
    });

    userSubmitEntry.save(function (err) {
        if (err) return handleError(err);
        // saved!
    })
    console.log(req.body)
    res.redirect('/journals')

    //res.redirect('createJournals.pug', { user: req.user });
    //res.render('index.pug', { title: 'World!', example: ['hello', 'guys', 'this', 'is', 'an', 'example'] });
});

/* Provides the create journals page */
router.get('/entrychanger/:jid/:id', function (req, res, next) {

    var o_id = new mongo.ObjectID(req.params.id);
    var name = req.user.username;
    var currentRecord = null;
    var oldRecords = null;

    userEntry.find({ userName: name, 'parentID': req.params.id}, function (err, uRecords) {
        oldRecords = uRecords;
        console.log(uRecords);
        userEntry.findOne({ userName: name, '_id': req.params.id }, function (err, uentries) {
            currentRecord = uentries;

            res.render('entrychanger.pug', { user: req.user, journalId: req.params.jid, oldRecords: oldRecords, currentRecord: currentRecord });
        })
    })

    
    

    
});

router.post('/entrychanger/:jid/:id', function (req, res, next) {


    var objectId = mongo.ObjectID;
    var newObjectID = new objectId;
    var name = req.user.username;
    console.log(newObjectID + '');
    var o_id = new mongo.ObjectID(req.params.id);

    var userEntryRecord = new userEntry({
        _id: newObjectID,
        parentID: req.params.jid,
        journalName: 'Temp',
        description: req.body.userEntry,
        timestamp: 'Temp',
        userName: req.user.username,
    });

    userEntry.collection.updateMany({ userName: name, '_id': o_id },
        { $set: { parentID: newObjectID + '' } });
    userEntry.collection.updateMany({ userName: name, 'parentID': req.params.id },
        { $set: { parentID: newObjectID + '' } });

    userEntryRecord.save(function (err) {
        if (err) return handleError(err);
        // saved!
        res.redirect('/journal' + '/' + req.params.jid);
    })
    
});


module.exports = router;
