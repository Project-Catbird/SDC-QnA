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
          a.id as id, a.body as body, date_written AS date, u.user_name AS answerer_name,
          a.helpful AS helpfulness, ap.url AS photos
        FROM
          answers AS a
        LEFT JOIN
          answers_photos AS ap
        ON
          a.id = ap.answer_id
        LEFT JOIN
          users AS u
        ON
          a.user_id = u.id
        WHERE
          a.question_id = ${question_id} AND a.reported = 0
        LIMIT ${count};
      `);

    const groupedAnswer = answer.rows.reduce((acc, d) => {
      const id = d.id;
      if (!acc.hasOwnProperty(id)) {
        if (d.photos) {
          acc[id] = {...d, photos: [d.photos]};
        } else {
          acc[id] = {...d, photos: []};
        }
      } else {
        acc[id].photos.push(d.photos);
      }
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