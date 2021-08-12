const Sequelize = require('sequelize');
const db = require('../index.js');
const Question = require('./Question');

const Answer = db.define('answers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  question_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'questions',
      key: 'id'
    }
  },
  body: {
    type: Sequelize.STRING
  },
  date_written: {
    type: Sequelize.STRING
  },
  reported: {
    type: Sequelize.INTEGER
  },
  helpful: {
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },

},
{
  timestamps: false,
  createdAt: false,
  updatedAt: false
});

module.exports = Answer;