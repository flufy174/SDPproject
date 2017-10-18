require('./../../app.js');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var passport = require('passport');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('./../../models/user');

exports.myDateTime = function () {
	return Date();
};

exports.dbRunning = function () {
	return mongoose.connection.readyState;
};

exports.findUser = function () {

	let findUsertest = new Promise(function (resolve, reject) {
		var user;
		User.find({ username: 'test' }, function (err, userEntry) {
			entry = userEntry;
			//console.log(userEntry[0]);
			if (entry[0] != null) {
				resolve(entry[0]);
			}
			return entry[0];
		})
	});

	findUsertest.then(function (resolution) {
		//console.log(resolution);
		console.log('Success');
		return ('Success');
	}).catch(function (rejection) {
		console.log(rejection)
		console.log('******');
		return (rejection);
	})

};