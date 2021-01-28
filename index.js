const bodyParser = require('body-parser');
const cors = require('express-cors');
// const sqlite3 = require('sqlite3');
// const { sequelize } = require('./__models');
const express = require('express');
const db = require('./models');
// const db = new sqlite3.Database(
//   './db/data.db',
//   (error) => {
//     if (error) return console.log('Failed to connect to database', error);
//     console.log('Connected to database');
//   });



const sourceRoutes = require('./routes/sources');
const fieldRoutes = require('./routes/fields');
const scraperRoutes = require('./routes/scrapers');
// const paginationTypeRoutes = require('./routes/paginationTypes');
const propertyRoutes = require('./routes/properties');
const fieldTypeRoutes = require('./routes/fieldTypes');
const scrapingSessionRoutes = require('./routes/scrapingSessions');
// const responser = require('@zarcobox/responser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  allowedOrigins: [
    '*/*',
  ]
}));

//close db connection on error
app.use((err, req, res, next) => {
  db.close();
  next(err);
});

app.use('/sources', sourceRoutes);
app.use('/fields', fieldRoutes);
app.use('/scrapers', scraperRoutes);
// app.use('/pagination-types', paginationTypeRoutes);
app.use('/properties', propertyRoutes);
app.use('/field-types', fieldTypeRoutes);
app.use('/scraper-sessions', scrapingSessionRoutes);

app.get('/', (req, res) => res.send('welcome to the aqivah api'));

//404
app.use((req, res, next) => {
  return res.status(404).send({ message: `${req.url} not found` });
});

//500
// app.use((err, req, res, next) => {
//   return res.status(500).send({ message: 'Something went wrong.', details: err });
// });

app.listen(PORT, async () => {
  await db.sequelize.sync();
  console.log('listening on port ' + process.env.PORT || PORT);
});

// module.exports.db = db;
module.exports.db = db;

// exports.db = db;
// exports.getDb = getDb;

// module.exports = { db, getDb };