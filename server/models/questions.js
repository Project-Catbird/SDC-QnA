const db = require('../db/');

module.exports = {
  getQuestions: async (product_id, count = 5) => {
    try {
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
    } catch (error) {
      res.status(400).json({message: error});
    }
  },

  getAnswers: async (question_id, count = 5) => {
    try {
      const answer = await db.query(`
        SELECT
          a.question_id as question_id,
          a.id as id,
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
          reported = 0 AND
          question_id = ANY(ARRAY[${question_id}])
        GROUP BY
          question_id, a.id, question_id, body, date_written, u.user_name
        ORDER BY
          a.id
        LIMIT ${count};
      `);

    const groupedAnswer = answer.rows.reduce((acc, d) => {
      acc[d.question_id] = {[d.id]: d};
      delete acc[d.question_id][d.id].question_id;
      return acc;
    }, {});

    return groupedAnswer;

    } catch (error) {
      res.status(400).json({message: error});
    }
  },

  postQuestion: async (product_id, body, user_id, date_written = new Date().toISOString().slice(0, 10)) => {
    try {
      const question = await db.query(`
        INSERT INTO questions (product_id, body, date_written, user_id)
        VALUES (${product_id}, '${body}', '${date_written}', ${user_id}) RETURNING *`);
      return question.rows;
    } catch (error) {
      res.status(400).json({message: error});
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
      res.status(400).json({message: error});
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
      res.status(400).json({message: error});
    }
  },

};