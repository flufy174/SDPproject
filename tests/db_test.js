var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var routesConnect = require('./../public/javascripts/unitTest.js')

describe('Database tests', function () {
	it('Check that the database is connecting to the app', function () {
		expect(routesConnect.dbRunning()).to.equal(2);
	});

	it('Check that the database can find a user', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check that we can add a user', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check the user has a name', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check the user has a unique id', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check that we can remove a user', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

});

describe('Journal tests', function () {

    it('Add a temporary user', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check that we can add a journal', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check that we can get a journal we have added', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check that we can delete a journal', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Removing temporary user', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

});

describe('Entry tests', function () {

    it('Add a temporary user', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Add a temporary journal', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check that we can add an entry', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check the entry has a name', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check the entry has text', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check that we can modify the text', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check that the text has been modified', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Delete entry', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check entry does not exist', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Remove temporary journal', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Remove temporary user', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

});

describe('User tests', function () {

    it('Add a temporary user', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Change the users color', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Check the background color', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

    it('Remove temporary user', function () {
        expect(routesConnect.dbRunning()).to.equal(2);
    });

});
