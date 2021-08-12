const Models = require('../db/models/');
const Questions = require('../models/questions');
const Answers = require('../models/answers');

module.exports = {
  getAllQuestions: (req, res) => {
    Models.Question.findAll()
      .then(questions => res.send(questions))
      .catch(err => console.log(err));
  },
  getQuestions: async (req, res) => {
    const { product_id, page, count } = req.params;
    const result = {
      product_id,
      results: []
    };

    let questions = await Questions.getQuestions(product_id, count);
    result.results = questions[0];

    for (let i = 0; i < questions[0].length; i++) {
      let question_id = questions[0][i].question_id;
      let answers = await Answers.getAnswers(question_id);
      result.results[i].answers = answers;
    }

    res.send(result);
  }

  };