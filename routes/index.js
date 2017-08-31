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

router.get('/signin', function (req, res, next) {
    res.render('Master/sign-in.pug');
});

router.post('/signin', function (req, res, next) {
    console.log("Signing recieved");
    var email = reqs.body.inputEmail;
    console.log(email);
});



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('Master/starter.pug', { title: 'Express' });
});

module.exports = router;
