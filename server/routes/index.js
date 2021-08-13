const express = require('express');
const questions = require('../controllers/questions');
const answers = require('../controllers/answers');

const router = express.Router();

router
  .get(`/`, questions.getQuestions)
  .post(`/`, questions.postQuestion)
  .put(`/:question_id/helpful`, questions.addHelpful)
  .put(`/:question_id/report`, questions.addReport)
  .get(`/:question_id/answers`, answers.getAnswers)
  .post(`/answers`, answers.postAnswer)
  .put(`/answers/:answer_id/helpful`, answers.addHelpful)
  .put(`/answers/:answer_id/report`, answers.addReport)

module.exports = router;