const Sequelize = require('sequelize');
const db = require('../index.js');

const AnswerPhoto = db.define('answers_photos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  answer_id: {
    type: Sequelize.INTEGER,
    references: {
      deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED
    }
  },
  url: {
    type: Sequelize.STRING
  }
},
{
  timestamps: false,
  createdAt: false,
  updatedAt: false
});

module.exports = AnswerPhoto;