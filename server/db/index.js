const { Pool, Client } = require('pg')
const { database, username, password } = require('./config/config');

const pool = new Pool({
  user: username,
  host: '3.239.104.125',
  database,
  password,
  port: 5432
});

module.exports = pool;
