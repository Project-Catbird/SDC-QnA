const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  user_name: {
    type: Sequelize.STRING
  },
  user_email: {
    type: Sequelize.STRING
  },
},
{
  timestamps: false,
  createdAt: false,
  updatedAt: false
});

module.exports = User;