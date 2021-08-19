const Answers = require('../models/answers');
const Users = require('../models/users');

module.exports = {
  getAnswers: async (req, res) => {
    try {
      const { question_id } = req.params;
      const { count } = req.query;
      const result = {
        question: question_id,
        results: []
      };

      let answers = await Answers.getAnswers(question_id, count);
      result.results = answers;

      res.send(result);
    } catch (error) {
      res.status(400).json({message: error});
    }
  },

  postAnswer: async (req, res) => {
    try {
      const { question_id } = req.query;
      const { body, name, email, photos } = req.body;
      let users = await Users.getUser(name);
      if (!users.length) {
        let newUser = await Users.createUser(name, email);
        users = newUser.rows;
      }
      let user_id = users[0].id;
      const answer = await Answers.postAnswer(question_id, body, user_id, photos);
      if (answer.length) {
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.status(400).json({message: error});
    }
  },


  addHelpful: async (req, res) => {
    try {
      const { answer_id } = req.params;
      const helpful = await Answers.addHelpful(answer_id);
      if (helpful.length) {
        res.sendStatus(204);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.status(400).json({message: error});
    }
  },

  addReport: async (req, res) => {
    try {
      const { answer_id } = req.params;
      const reported = await Answers.addReport(answer_id);
      if (reported.length) {
        res.sendStatus(204);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.status(400).json({message: error});
    }
  },
};