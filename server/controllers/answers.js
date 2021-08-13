const Answers = require('../models/answers');
const Users = require('../models/users');

module.exports = {
  getAnswers: async (req, res) => {
    const { question_id } = req.params;
    const { count } = req.query;
    const result = {
      question_id,
      results: []
    };

    let answers = await Answers.getAnswers(question_id, count);
    result.results = answers;

    res.send(result);

  },

  postAnswer: async (req, res) => {
    const { question_id } = req.query;
    const { body, name, email, photos } = req.body;
    let users = await Users.getUser(name);
    if (!users.length) {
      users = Users.createUser(name, email);
    }
    let user_id = users[0].id;
    const answer = await Answers.postAnswer(question_id, body, user_id, photos);
    if (answer.length) {
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  }
};