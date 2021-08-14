const query = `
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
    a.question_id = 1 AND a.reported = 0
  ORDER BY
    id;
`

const current = [
  {
    id: 6879309,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo',
    helpfulness: 0,
    photos: null
  },
  {
    id: 6879314,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo2',
    helpfulness: 0,
    photos: 'https://source.unsplash.com/random'
  },
  {
    id: 6879314,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo2',
    helpfulness: 0,
    photos: 'https://source.unsplash.com/random'
  },
  {
    id: 6879308,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo',
    helpfulness: 0,
    photos: null
  },
  {
    id: 6879310,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo',
    helpfulness: 0,
    photos: 'https://source.unsplash.com/random'
  },
  {
    id: 6879310,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo',
    helpfulness: 0,
    photos: 'https://source.unsplash.com/random'
  },
  {
    id: 6879311,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo',
    helpfulness: 0,
    photos: 'https://source.unsplash.com/random'
  },
  {
    id: 6879311,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo',
    helpfulness: 0,
    photos: 'https://source.unsplash.com/random'
  },
  {
    id: 6879312,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo2',
    helpfulness: 0,
    photos: 'https://source.unsplash.com/random'
  },
  {
    id: 6879312,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo2',
    helpfulness: 0,
    photos: 'https://source.unsplash.com/random'
  },
  {
    id: 6879313,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo2',
    helpfulness: 0,
    photos: 'https://source.unsplash.com/random'
  },
  {
    id: 6879313,
    body: 'Hi there!',
    date: 2021-08-13T07:00:00.000Z,
    answerer_name: 'Andy Vo2',
    helpfulness: 0,
    photos: 'https://source.unsplash.com/random'
  },
  {
    id: 5,
    body: "Something pretty soft but I can't be sure",
    date: 2020-09-13T07:00:00.000Z,
    answerer_name: 'metslover',
    helpfulness: 5,
    photos: 'https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80'
  },
  {
    id: 5,
    body: "Something pretty soft but I can't be sure",
    date: 2020-09-13T07:00:00.000Z,
    answerer_name: 'metslover',
    helpfulness: 5,
    photos: 'https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
  },
  {
    id: 5,
    body: "Something pretty soft but I can't be sure",
    date: 2020-09-13T07:00:00.000Z,
    answerer_name: 'metslover',
    helpfulness: 5,
    photos: 'https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80'
  },
  {
    id: 7,
    body: 'Its the best! Seriously magic fabric',
    date: 2021-02-27T08:00:00.000Z,
    answerer_name: 'metslover',
    helpfulness: 7,
    photos: null
  },
  {
    id: 8,
    body: "DONT BUY IT! It's bad for the environment",
    date: 2020-09-19T07:00:00.000Z,
    answerer_name: 'metslover',
    helpfulness: 8,
    photos: null
  },
  {
    id: 57,
    body: 'Suede',
    date: 2021-04-11T07:00:00.000Z,
    answerer_name: 'metslover',
    helpfulness: 7,
    photos: null
  },
  {
    id: 95,
    body: 'Supposedly suede, but I think its synthetic',
    date: 2020-09-14T07:00:00.000Z,
    answerer_name: 'metslover',
    helpfulness: 3,
    photos: null
  }
]

const newQuery = `SELECT answers.id, question_id, body, date_written, reported, helpful, ARRAY_AGG(answers_photos.url) as photos
FROM answers
LEFT JOIN answers_photos ON answers.id = answers_photos.answer_id
WHERE reported = 0 AND question_id = 1
GROUP BY answers.id, question_id, body, date_written, reported, helpful
ORDER BY answers.id;`

const newResult = [
  {
    id: 5,
    question_id: 1,
    body: "Something pretty soft but I can't be sure",
    date_written: 2020-09-13T07:00:00.000Z,
    reported: 0,
    helpful: 5,
    photos: [
      'https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
      'https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
      'https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
    ]
  },
  {
    id: 7,
    question_id: 1,
    body: 'Its the best! Seriously magic fabric',
    date_written: 2021-02-27T08:00:00.000Z,
    reported: 0,
    helpful: 7,
    photos: [ null ]
  },
  {
    id: 8,
    question_id: 1,
    body: "DONT BUY IT! It's bad for the environment",
    date_written: 2020-09-19T07:00:00.000Z,
    reported: 0,
    helpful: 8,
    photos: [ null ]
  },
  {
    id: 57,
    question_id: 1,
    body: 'Suede',
    date_written: 2021-04-11T07:00:00.000Z,
    reported: 0,
    helpful: 7,
    photos: [ null ]
  },
  {
    id: 95,
    question_id: 1,
    body: 'Supposedly suede, but I think its synthetic',
    date_written: 2020-09-14T07:00:00.000Z,
    reported: 0,
    helpful: 3,
    photos: [ null ]
  },
  {
    id: 6879308,
    question_id: 1,
    body: 'Hi there!',
    date_written: 2021-08-13T07:00:00.000Z,
    reported: 0,
    helpful: 0,
    photos: [ null ]
  },
  {
    id: 6879309,
    question_id: 1,
    body: 'Hi there!',
    date_written: 2021-08-13T07:00:00.000Z,
    reported: 0,
    helpful: 0,
    photos: [ null ]
  },
  {
    id: 6879310,
    question_id: 1,
    body: 'Hi there!',
    date_written: 2021-08-13T07:00:00.000Z,
    reported: 0,
    helpful: 0,
    photos: [
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random'
    ]
  },
  {
    id: 6879311,
    question_id: 1,
    body: 'Hi there!',
    date_written: 2021-08-13T07:00:00.000Z,
    reported: 0,
    helpful: 0,
    photos: [
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random'
    ]
  },
  {
    id: 6879312,
    question_id: 1,
    body: 'Hi there!',
    date_written: 2021-08-13T07:00:00.000Z,
    reported: 0,
    helpful: 0,
    photos: [
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random'
    ]
  },
  {
    id: 6879313,
    question_id: 1,
    body: 'Hi there!',
    date_written: 2021-08-13T07:00:00.000Z,
    reported: 0,
    helpful: 0,
    photos: [
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random'
    ]
  },
  {
    id: 6879314,
    question_id: 1,
    body: 'Hi there!',
    date_written: 2021-08-13T07:00:00.000Z,
    reported: 0,
    helpful: 0,
    photos: [
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random'
    ]
  }
]