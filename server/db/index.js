const { Pool, Client } = require('pg')
const { database, username, password } = require('./config/config');

const pool = new Pool({
  user: username,
  host: 'localhost',
  database,
  password,
  port: 5432,
});

// pool.query(`SELECT * FROM users WHERE user_name = 'Andy Vo';`)
//   .then(res => console.log(res.rows))
//   .catch(err => console.log(err));

// pool.query(`
//   INSERT INTO users (user_name, user_email)
//   VALUES ('Hi theashgfhdare!', 'naldjwa@gmail.com') RETURNING *;`
//   )
//   .then(res => console.log(res.rows[0]))
//   .catch(err => console.log(err));

module.exports = pool;