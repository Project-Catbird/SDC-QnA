const Questions = require('../models/questions');
const Answers = require('../models/answers');
const Users = require('../models/users');

module.exports = {
  getQuestions: async (req, res) => {
    try {
      const { product_id, page, count } = req.query;
      const result = {
        product_id,
        results: []
      };

      const questions = await Questions.getQuestions(product_id, count);
      result.results = questions;

      const questionIds = questions.reduce((acc, d) => {
        acc.push(d.question_id);
        return acc;
      }, []);

      const answers = await Questions.getAnswers(questionIds);

      result.results.forEach(question => {
        if (answers.hasOwnProperty(question.question_id)) {
          question.answers = answers[question.question_id];
        } else {
          question.answers = {};
        }
      });

      res.send(result);
    } catch (error) {
      res.status(400).json({message: error});
    }
  },

  postQuestion: async (req, res) => {
    try {
      const { body, name, email, product_id } = req.body;
      let users = await Users.getUser(name);
      if (!users.length) {
        let newUser = await Users.createUser(name, email);
        users = newUser.rows;
      }
      let user_id = users[0].id;
      const question = await Questions.postQuestion(product_id, body, user_id);
      if (question.length) {
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
      const { question_id } = req.params;
      const helpful = await Questions.addHelpful(question_id);
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
      const { question_id } = req.params;
      const reported = await Questions.addReport(question_id);
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