const db = require('../../db/');

const query = async (q) => {
  return db.query(q);
};

module.exports = query;