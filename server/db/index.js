const Sequelize = require('sequelize');

const db = new Sequelize('sdc-qna', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

db.authenticate()
.then(() => {
  console.log('Database connected!');
})
.catch(err => console.log(err));

module.exports = db;