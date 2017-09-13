var express = require('express');
var router = express.Router();
var ExamController = require('../controllers/ExamController.js');

/*
 * GET
 */
router.get('/:id', ExamController.show);

/*
 * Create new exam, save it to DB
 */
router.post('/', ExamController.create);
router.post('/answers/get', ExamController.getAnswers);


module.exports = router;
