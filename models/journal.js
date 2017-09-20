var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Journal = new Schema({
    journalID: String,
    journalName: String,
    description: String,
    timestamp: String,
    userName: String,
});

module.exports = mongoose.model('journal', Journal);