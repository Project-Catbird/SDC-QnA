const db = require('../db/');

module.exports = {
  getQuestions: async (product_id, count = 5) => {

    const questions = await db.query(`
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
        q.product_id = ${product_id} AND q.reported = 0
      LIMIT ${count};`
      );

    return questions.rows;

  },

  postQuestion: async (product_id, body, user_id, date_written = new Date().toISOString().slice(0, 10)) => {
    const question = await db.query(`
      INSERT INTO questions (product_id, body, date_written, user_id)
      VALUES (${product_id}, '${body}', '${date_written}', ${user_id}) RETURNING *`);

    return question.rows;
  },

  addHelpful: async (question_id) => {
    const helpful = await (db.query(`
      UPDATE questions
      SET helpful = helpful + 1
      WHERE id = ${question_id}
      RETURNING *`));

    return helpful.rows;
  },

  addReport: async (question_id) => {
    const reported = await (db.query(`
      UPDATE questions
      SET reported = reported + 1
      WHERE id = ${question_id}
      RETURNING *`));

    return reported.rows;
  },

};