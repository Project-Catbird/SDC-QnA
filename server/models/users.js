const db = require('../db/');

module.exports = {
  getUser: async (user_name, user_email) => {
    try {
      const users = await db.query(`SELECT * FROM users WHERE user_name = '${user_name}';`);
      return users.rows;
    } catch (error) {
      res.status(400).json({message: error});
    }

  },

  createUser: async (user_name, user_email) => {
    try {
      const users = db.query(`
        INSERT INTO users (user_name, user_email)
          VALUES ('${user_name}', '${user_email}') RETURNING *;`);
      return users;
    } catch (error) {
      res.status(400).json({message: error});
    }
  }

};