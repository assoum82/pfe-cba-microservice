var express = require('express');
var router = express.Router();
var ExamController = require('../controllers/ExamController.js');

/*
* Login to exam
*/
router.get('/login/', function(req, res, next) {
  res.render('exam/login', { title: 'Login to exam'});
});

router.post('/login', ExamController.openExam);
router.post('/answer', ExamController.answerController);
router.post('/answers/get', ExamController.getAnswers);

/**
* Get Exam by posting examCode and @return JSON
*/
router.post('/code', ExamController.getExam);

/*
 * GET
 */
router.get('/', ExamController.list);

/*
 * GET
 */
router.get('/:id', ExamController.show);

/*
 * POST
 */
router.post('/', ExamController.create);

/*
 * PUT
 */
router.put('/:id', ExamController.update);

/*
 * DELETE
 */
router.delete('/:id', ExamController.remove);

module.exports = router;
