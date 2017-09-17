var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));


var url = "mongodb://localhost:27017/mydb";

/* GET home page. */
router.post('/', function (req, res, next) {
    console.log(req.body)
});

//Show the login page
router.get('/signin', function (req, res, next) {
    res.render('login.pug');
});

//Show the registration page
router.get('/register', function (req, res, next) {
	res.render('register.pug');
});

//Show the journals page
router.get('/journals', function (req, res, next) {
	res.render('journals.pug');
});

//Show the main search page
router.get('/search', function (req, res, next) {
	res.render('search.pug')
});

router.post('/signin', function (req, res) {
    console.log("Signing recieved");
    var email = req.body.Email;
    console.log(email);
    res.redirect('/');
});



/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index.pug');
    //res.render('index.pug', { title: 'World!', example: ['hello', 'guys', 'this', 'is', 'an', 'example'] });
});

module.exports = router;
