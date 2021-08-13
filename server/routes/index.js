const express = require('express');
const questions = require('../controllers/questions');
const answers = require('../controllers/answers');

const router = express.Router();

router
  .get(`/`, questions.getQuestions)
  .post(`/`, questions.postQuestion)
  .put(`/:question_id/helpful`, questions.addHelpful)
  .get(`/:question_id/answers`, answers.getAnswers)
  .post(`/answers`, answers.postAnswer);

module.exports = router;