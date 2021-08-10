const Question = require('../db/Question');

module.exports = {
  getAllQuestions: (req, res) => {
    Question.findAll()
      .then(questions => res.send(questions))
      .catch(err => console.log(err));
  },
  getQuestions: (req, res) => {
    const { product_id } = req.params;
    Question.findAll({where: {product_id: product_id}})
      .then(questions => res.send(questions))
      .catch(err => console.log(err));
  }
};