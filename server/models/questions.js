const db = require('../db/');

module.exports = {
  getQuestions: async (product_id, count = 5) => {
    try {
      const query = `
      SELECT ${product_id} AS product_id,
      coalesce(json_agg(json_build_object(
        'question_id', q.id, 'question_body', q.body, 'question_date', q.date_written,
        'question_helpfulness', q.helpful, 'reported', q.reported, 'asker_name', u.user_name, 'answers',
        (
          SELECT coalesce(json_object_agg(a.id, json_build_object(
            'id', a.id, 'body', a.body, 'date', a.date_written,
            'answerer_name', u.user_name, 'helpfulness', a.helpful, 'photos', (
            SELECT
              coalesce(json_agg(json_build_object(
                'id', answers_photos.id, 'url', answers_photos.url
                )), '[]'::json)
            FROM
              answers_photos
            WHERE
              answers_photos.answer_id = a.id
              )
              )), '{}'::json)
          FROM
          answers AS a
          LEFT JOIN
          users AS u
          ON
          a.user_id = u.id
          WHERE
          a.question_id = q.id AND
          a.reported = 0
        )
      )), '[]'::json) AS results
      FROM
      questions as q
      LEFT JOIN
      users AS u
      ON
      q.user_id = u.id
      WHERE
      q.product_id = ${product_id} AND
      q.reported = 0;
      `
      const questions = await db.query(query);

      return questions.rows[0];
    } catch (error) {
      console.log(error);
    }
  },

  postQuestion: async (product_id, body, user_id, date_written = new Date().toISOString().slice(0, 10)) => {
    try {
      const question = await db.query(`
        INSERT INTO questions (product_id, body, date_written, user_id)
        VALUES (${product_id}, '${body}', '${date_written}', ${user_id}) RETURNING *`);
      return question.rows;
    } catch (error) {
      console.log(error);
    }
  },

  addHelpful: async (question_id) => {
    try {
      const helpful = await (db.query(`
        UPDATE questions
        SET helpful = helpful + 1
        WHERE id = ${question_id}
        RETURNING *`));

      return helpful.rows;
    } catch (error) {
      console.log(error);
    }
  },

  addReport: async (question_id) => {
    try {
      const reported = await (db.query(`
        UPDATE questions
        SET reported = reported + 1
        WHERE id = ${question_id}
        RETURNING *`));

      return reported.rows;
    } catch (error) {
      console.log(error);
    }
  },

};