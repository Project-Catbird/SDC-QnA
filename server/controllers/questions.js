const Questions = require('../models/questions');
const Answers = require('../models/answers');
const Users = require('../models/users');

module.exports = {
  getQuestions: async (req, res) => {
    const { product_id, page, count } = req.query;
    const result = {
      product_id,
      results: []
    };

    const questions = await Questions.getQuestions(product_id, count);
    result.results = questions;

    for (let i = 0; i < questions.length; i++) {
      let question_id = questions[i].question_id;
      let answers = await Answers.getAnswers(question_id);
      result.results[i].answers = answers;
    }

    res.send(result);

  },

  postQuestion: async (req, res) => {
    const { body, name, email, product_id } = req.body;
    let users = await Users.getUser(name);
    if (!users.length) {
      let newUser = await Users.createUser(name, email);
      users = newUsers.rows;
    }
    let user_id = users[0].id;
    const question = await Questions.postQuestion(product_id, body, user_id);
    if (question.length) {
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  },

  addHelpful: async (req, res) => {
    const { question_id } = req.params;
    const helpful = await Questions.addHelpful(question_id);
    if (helpful.length) {
      res.sendStatus(204);
    } else {
      res.sendStatus(400);
    }
  },

  addReport: async (req, res) => {
    const { question_id } = req.params;
    const reported = await Questions.addReport(question_id);
    if (reported.length) {
      res.sendStatus(204);
    } else {
      res.sendStatus(400);
    }
  },


};