const Sequelize = require('sequelize');
const db = require('./index.js');

const Question = db.define('question', {
  question_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  question_body: {
    type: Sequelize.STRING
  },
  question_date: {
    type: Sequelize.DATE
  },
  asker_name: {
    type: Sequelize.STRING
  },
  question_helpfulness: {
    type: Sequelize.INTEGER
  },
  reported: {
    type: Sequelize.BOOLEAN
  },
  answers: {
    type: Sequelize.JSON
  },
  product_id: {
    type: Sequelize.STRING
  }
},
{
  timestamps: false,
  createdAt: false,
  updatedAt: false
});

module.exports = Question;