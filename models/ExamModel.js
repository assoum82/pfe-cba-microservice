var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ExamSchema = new Schema({

module.exports = mongoose.model('Exam', ExamSchema);