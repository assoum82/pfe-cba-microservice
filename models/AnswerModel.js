var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var AnswerSchema = new Schema({
    'code': String,
    'name': String,
    'candidatsLog': Object,
    'answers': Array
});

module.exports = mongoose.model('Answer', AnswerSchema);
