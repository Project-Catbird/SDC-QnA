const Models = require('../db/models/');
const Answers = require('../models/answers');

module.exports = {
  getAnswers: async (req, res) => {
    const { question_id, count } = req.query;
    const result = {
      question_id,
      results: []
    };

    let answers = await Answers.getAnswers(question_id, count);
    result.results = answers;

    res.send(result);

  }

};