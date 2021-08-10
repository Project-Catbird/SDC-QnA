const express = require('express');
const questions = require('../controllers/questions');

const router = express.Router();

router
  .get(`/all`, questions.getAllQuestions)
  .get(`/:product_id`, questions.getQuestions)

module.exports = router;