const { Pool, Client } = require('pg')
const { database, username, password } = require('./config/config');

const pool = new Pool({
  user: username,
  host: '172.20.0.2',
  database,
  password,
  port: 5432
});

module.exports = pool;