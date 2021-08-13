const query = require('./lib/query');
const db = require('../db/');

module.exports = {
  getAnswers: async (question_id, count = 5) => {
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

  },

  postAnswer: async (question_id, body, user_id, photos = [], date_written = new Date().toISOString().slice(0, 10)) => {
    const answer = await db.query(`
      INSERT INTO answers (question_id, body, date_written, user_id)
      VALUES (${question_id}, '${body}', '${date_written}', ${user_id}) RETURNING *`);

    const answer_id = answer.rows[0].id;

    for (let i = 0; i < photos.length; i++) {
      let url = photos[i];
      db.query(`INSERT INTO answers_photos (answer_id, url) VALUES (${answer_id}, '${url}')`);
    }

    return answer.rows;
  },


  addHelpful: async (answer_id) => {
    const helpful = await (db.query(`
      UPDATE answers
      SET helpful = helpful + 1
      WHERE id = ${answer_id}
      RETURNING *`));

    return helpful.rows;
  },

  addReport: async (answer_id) => {
    const reported = await (db.query(`
      UPDATE answers
      SET reported = reported + 1
      WHERE id = ${answer_id}
      RETURNING *`));

    return reported.rows;
  },

};