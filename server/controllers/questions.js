const Models = require('../db/models/');
const Questions = require('../models/questions');
const Answers = require('../models/answers');

module.exports = {
  getQuestions: async (req, res) => {
    const { product_id, page, count } = req.query;
    const result = {
      product_id,
      results: []
    };

    let questions = await Questions.getQuestions(product_id, count);
    result.results = questions;

    for (let i = 0; i < questions.length; i++) {
      let question_id = questions[i].question_id;
      let answers = await Answers.getAnswers(question_id);
      result.results[i].answers = answers;
    }

    res.send(result);

  }

};