const express = require('express');
const questions = require('../controllers/questions');
const answers = require('../controllers/answers');

const router = express.Router();

router
  .get(`/all`, questions.getAllQuestions)
  .get(`/:product_id/:page/:count`, questions.getQuestions)
  .get(`/:question_id/answers`, answers.getAnswers)

module.exports = router;