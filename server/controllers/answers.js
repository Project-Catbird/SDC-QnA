const Models = require('../db/models/');
const Answers = require('../models/answers');

module.exports = {
  getAnswers: async (req, res) => {
    const { question_id } = req.params;
    const result = {
      question_id,
      results: []
    };

    let answers = await Answers.getAnswers(question_id);
    result.results = answers;

    res.send(result);
  }

};