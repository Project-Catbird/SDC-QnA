const query = require('./lib/query');
const db = require('../db/');

module.exports = {
  getUser: async (user_name, user_email) => {

    const users = await db.query(`SELECT * FROM users WHERE user_name = '${user_name}';`);

    return users.rows;

  },

  createUser: async (user_name, user_email) => {

    const users = db.query(`
      INSERT INTO users (user_name, user_email)
        VALUES ('${user_name}', '${user_email}') RETURNING *;`);

    return users;
  }

};