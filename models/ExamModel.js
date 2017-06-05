var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ExamSchema = new Schema({	'code' : {type: String, unique: true},	'title' : String,	'duration' : Number,	'mark' : Number,	'expirationDate' : String,	'questions' : Array,	'courseCode' : String,	'teacher' : String,	'candidats' : [{		'name': { type : String, default: ''},		'created': { type : Date, default: Date.now },		'client': Object	}]});

module.exports = mongoose.model('Exam', ExamSchema);
