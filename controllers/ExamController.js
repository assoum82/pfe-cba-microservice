var ExamModel = require('../models/ExamModel.js');
var AnswerModel = require('../models/AnswerModel.js');

/**
 * ExamController.js
 *
 * @description :: Server-side logic for managing Exams.
 */
module.exports = {
    /**
     * Get exam questions for the given code, Add the student to the candidats array and return JSON
     */
    openExam: function (req, res) {
      var examCode = req.body.code;
      var name = req.body.name;
      var client = {
        'ipadress': req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        'browser' : req.headers["user-agent"],
      }

      // TODO setup expiration date
      ExamModel.findOne({code: examCode}, function(err, Exam){
        if (err || !Exam) {
          return res.status(404).json({
            'message': "No such exam!",
          });
        }

        Exam.candidats.push({name: name, client: client});
        Exam.save(function(error, ExamObject){
            if (err || !Exam) {
              return res.status(404).json({
                'message': "No such exam!",
              });
          }
          return res.render('exam/body', { title: 'Exam '+ Exam.code,exam: Exam});
        });
      });

    },
    answerController: function(req, res){
      var code = req.body.code || '';
      var name = req.body.name || '';
      var candidatsLog = req.body.candidat || '';
      var answers = [];

      ExamModel.findOne({code: code}, function(err, Exam){
        if (err || !Exam) {
          return res.status(500).json({
            'message': "No such exam!",
          });
        }

        Exam.questions.forEach(function(question, index){
          answers.push({
            "question": question.text,
            "answer": req.body['_q_' + index]
          });
        });

        var Answer = new AnswerModel({
          'code': code,
          'name': name,
          'candidatsLog': candidatsLog,
          'answers': answers
        });

        Answer.save(function(err, Answer){
          if (err || !Answer) {
            return res.status(500).json({
              'message': "No such exam!",
            });
          }
          return res.redirect('/exam/login');
        });
      });
    },
    /**
    * Get Answers for a given exam code
    * @return JSON Array
    */
    getAnswers: function(req, res){
      AnswerModel.find({code: req.body.code}, function(err, Answers){
        if (err || !Answers) {
          return res.status(404).json({
            'message': "No such exam!",
          });
        }
        console.log(Answers);
        return res.status(200).json(Answers);
      });
    },
    /**
    * Get Exam object by code where exam is still active
    * @return JSON object
    */
    getExam: function(req, res){
      // TODO: Exam is still active with examDuration & date..
      console.log(req.body.examCode);
      ExamModel.findOne({code: req.body.examCode}, function(err, Exam){
        if (err || !Exam) {
          return res.status(404).json({
            'message': "No such exam!",
          });
        }

        return res.status(200).json(Exam);
      });
    },
    /**
     * ExamController.list()
     */
    list: function (req, res) {
        ExamModel.find(function (err, Exams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Exam.',
                    error: err
                });
            }
            return res.json(Exams);
        });
    },

    /**
     * ExamController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ExamModel.findOne({_id: id}, function (err, Exam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Exam.',
                    error: err
                });
            }
            if (!Exam) {
                return res.status(404).json({
                    message: 'No such Exam'
                });
            }
            return res.json(Exam);
        });
    },

    /**
     * ExamController.create()
     */
    create: function (req, res) {
      var exam = JSON.parse(req.body.exam);
      var Exam = new ExamModel({
        code : exam.code,
  			title : exam.title,
  			duration : exam.duration,
  			mark : exam.mark,
  			questions : exam.questions,
  			courseCode : exam.courseCode,
  			teacher : exam.teacher,
      });
      Exam.save(function (err, Exam) {
          if (err) {
              return res.status(500).json({
                  message: 'Error when creating Exam',
                  error: err
              });
          }
          return res.status(201).json(Exam);
      });
    },

    /**
     * ExamController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ExamModel.findOne({_id: id}, function (err, Exam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Exam',
                    error: err
                });
            }
            if (!Exam) {
                return res.status(404).json({
                    message: 'No such Exam'
                });
            }

            Exam.code = req.body.code ? req.body.code : Exam.code;			Exam.title = req.body.title ? req.body.title : Exam.title;			Exam.duration = req.body.duration ? req.body.duration : Exam.duration;			Exam.mark = req.body.mark ? req.body.mark : Exam.mark;			Exam.expirationDate = req.body.expirationDate ? req.body.expirationDate : Exam.expirationDate;			Exam.questions = req.body.questions ? req.body.questions : Exam.questions;			Exam.courseCode = req.body.courseCode ? req.body.courseCode : Exam.courseCode;			Exam.teacher = req.body.teacher ? req.body.teacher : Exam.teacher;			Exam.candidats = req.body.candidats ? req.body.candidats : Exam.candidats;
            Exam.save(function (err, Exam) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Exam.',
                        error: err
                    });
                }

                return res.json(Exam);
            });
        });
    },

    /**
     * ExamController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ExamModel.findByIdAndRemove(id, function (err, Exam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Exam.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
