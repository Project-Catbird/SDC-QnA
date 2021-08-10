const express = require('express');
const router = express.Router();
const Question = require('../db/Question');
const question = require('../db/exampleData');

router.get(`/questions`, (req, res) => {
  Question.findAll()
    .then(questions => {
      res.send(questions);
    })
    .catch(err => console.log(err));
});

module.exports = router;