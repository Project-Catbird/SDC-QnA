const db = require('../db/');

module.exports = {
  getAnswers: async (question_id, count = 5) => {
    try {
      const answer = await db.query(`
      SELECT
        a.id as answer_id,
        body,
        date_written AS date,
        u.user_name AS answerer_name,
        a.helpful AS helpfulness,
        ARRAY_REMOVE(ARRAY_AGG(CASE WHEN answers_photos.url IS NOT NULL THEN answers_photos.url ELSE NULL END), NULL) as photos
      FROM
        answers AS a
      LEFT JOIN
        answers_photos
      ON
        a.id = answers_photos.answer_id
      LEFT JOIN
        users AS u
      ON
        a.user_id = u.id
      WHERE
        a.reported = 0 AND
        question_id = ${question_id}
      GROUP BY
        a.id, question_id, body, date_written, u.user_name
      ORDER BY
        a.id
      LIMIT ${count};
      `);

      return answer.rows;
    } catch (error) {
      res.status(400).json({message: error});
    }
  },

  postAnswer: async (question_id, body, user_id, photos = [], date_written = new Date().toISOString().slice(0, 10)) => {
    try {
      const answer = await db.query(`
        INSERT INTO answers (question_id, body, date_written, user_id)
        VALUES (${question_id}, '${body}', '${date_written}', ${user_id}) RETURNING *`);

      const answer_id = answer.rows[0].id;

      for (let i = 0; i < photos.length; i++) {
        let url = photos[i];
        db.query(`INSERT INTO answers_photos (answer_id, url) VALUES (${answer_id}, '${url}')`);
      }

      return answer.rows;
    } catch (error) {
      res.status(400).json({message: error});
    }
  },


  addHelpful: async (answer_id) => {
    try {
      const helpful = await (db.query(`
        UPDATE answers
        SET helpful = helpful + 1
        WHERE id = ${answer_id}
        RETURNING *`));

      return helpful.rows;
    } catch (error) {
      res.status(400).json({message: error});
    }
  },

  addReport: async (answer_id) => {
    try {
      const reported = await (db.query(`
        UPDATE answers
        SET reported = reported + 1
        WHERE id = ${answer_id}
        RETURNING *`));

      return reported.rows;
    } catch (error) {
      res.status(400).json({message: error});
    }
  },

};