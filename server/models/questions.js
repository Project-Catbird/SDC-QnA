const query = require('./lib/query');

module.exports = {
  getQuestions: async (product_id, count) => {
    const questions = await query(`
      SELECT
        q.id AS question_id, q.body AS question_body, q.date_written AS question_date,
        q.reported AS reported, u.user_name AS asker_name,
        q.helpful AS question_helpfulness, q.reported AS reported
      FROM
        questions AS q
      INNER JOIN
        users AS u
      ON
        q.user_id = u.id
      WHERE
        q.product_id = ${product_id}
      LIMIT ${count};`
      );
    return questions;
  }
}