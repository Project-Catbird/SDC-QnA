const Question = require('../db/models/Question');
const Answer = require('../db/models/Answer');
const AnswerPhoto = require('../db/models/AnswerPhoto');
const db = require('../db/');

module.exports = {
  getAllQuestions: (req, res) => {
    Question.findAll()
      .then(questions => res.send(questions))
      .catch(err => console.log(err));
  },
  getQuestions: (req, res) => {
    const { product_id } = req.params;
    Question.findAll({where: {product_id}})
      .then(questions => {
        res.send(questions);
      })
      .catch(err => console.log(err));
    }
  };