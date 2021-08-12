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
        a.question_id = ${question_id}
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

  }

};