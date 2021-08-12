const Sequelize = require('sequelize');
const { database, username, password } = require('./config/config');

const db = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres'
});

db.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch(err => console.log(err));

module.exports = db;