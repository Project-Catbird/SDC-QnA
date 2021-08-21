require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/');
const Question = require('./routes/');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('files'));
app.get('/', (req, res) => res.send('QUESTIONS'));
app.get('/test', (req, res) => res.send('Test'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/qa/questions', require('./routes/'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});