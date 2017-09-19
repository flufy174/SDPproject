var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    full_name: String,
    username: String,
    password: String,
    email_address: String,
    admin: Boolean,
    colour_choice: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);