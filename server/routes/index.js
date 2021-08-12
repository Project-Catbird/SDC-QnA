const express = require('express');
const questions = require('../controllers/questions');
const answers = require('../controllers/answers');

const router = express.Router();

router
  .get(`/`, questions.getQuestions)
  .get(`/answers`, answers.getAnswers)
  .post(`/`, questions.postQuestions);

module.exports = router;