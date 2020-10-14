const bodyParser = require('body-parser');
const cors = require('express-cors');
const sqlite3 = require('sqlite3');

const express = require('express');
const db = new sqlite3.Database(
  './db/data.db',
  (error) => {
    if (error) return console.log('Failed to connect to database', error);
    console.log('Connected to database');
  });

const sourceRoutes = require('./routes/sources');
const fieldRoutes = require('./routes/fields');
// const responser = require('@zarcobox/responser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors({
  allowedOrigins: [
    'localhost:*',
  ]
}));

//close db connection on error
app.use((err, req, res, next) => {
  db.close();
  next(err);
});


app.use('/sources', sourceRoutes);
app.use('/fields', fieldRoutes);

app.get('/', (req, res) => res.send('welcome to the aqivah api'));

app.listen(PORT, () => console.log('listening on port ' + PORT));

module.exports.db = db;