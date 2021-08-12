const Models = require('../db/models/');
const db = require('../db/');

const query = async (q) => {
  return db.query(q);
}

module.exports = {
  getAllQuestions: (req, res) => {
    Models.Question.findAll()
      .then(questions => res.send(questions))
      .catch(err => console.log(err));
  },
  getQuestions: async (req, res) => {
    const { product_id } = req.params;
    const result = {
      product_id,
      results: []
    };

    let questions = await query(`
    SELECT q.id AS question_id, q.body AS question_body, q.date_written AS question_date, q.reported AS reported, u.user_name AS asker_name, q.helpful AS question_helpfulness, q.reported AS reported
    FROM questions AS q
    INNER JOIN users AS u
    ON q.user_id = u.id
    WHERE q.product_id = ${product_id}`);

    result.results = questions[0];

    for (let i = 0; i < result.results.length; i++) {
      const answer = await query(`
      SELECT a.id as id, a.body as body, date_written AS date, u.user_name AS answerer_name, a.helpful AS helpfulness, ap.url AS photos
      FROM answers AS a
      LEFT JOIN answers_photos AS ap
      ON a.id = ap.answer_id
      LEFT JOIN users AS u
      ON a.user_id = u.id
      WHERE a.question_id = ${result.results[i].question_id}
      `)
      result.results[i].answer = answer[0];
    }

    res.send(result);
    }
  };