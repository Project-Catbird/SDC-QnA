const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/');
const Question = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('QUESTIONS'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/qa/questions', require('./routes/questions'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});