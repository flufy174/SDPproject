var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var routesConnect = require('./../public/javascripts/unitTest.js')

describe('databaseTest', function () {
	it('Check that the database is connecting to the app', function () {
		expect(routesConnect.dbRunning()).to.equal(2);
	});

	it('Check that the database can find a user', function () {
		//console.log('***');
		console.log(routesConnect.findUser());
		//console.log('***');
		expect(routesConnect.findUser()).to.not.equal(undefined);
	});

});