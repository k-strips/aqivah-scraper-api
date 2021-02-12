const bodyParser = require('body-parser');
const cors = require('express-cors');
// const sqlite3 = require('sqlite3');
// const { sequelize } = require('./__models');
const express = require('express');
const db = require('./models');


const sourceRoutes = require('./routes/sources');
const fieldRoutes = require('./routes/fields');
const propertyRoutes = require('./routes/properties');
const fieldTypeRoutes = require('./routes/fieldTypes');
const scrapingSessionRoutes = require('./routes/scrapingSessions');

const app = express();
const PORT = process.env.port || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
app.use('/properties', propertyRoutes);
app.use('/field-types', fieldTypeRoutes);
app.use('/scraper-sessions', scrapingSessionRoutes);

app.get('/', (req, res) => res.status(200).send('welcome to the aqivah api'));

//404
app.use((req, res, next) => {
  return res.status(404).send({ message: `${req.url} not found` });
});

//500
// app.use((err, req, res, next) => {
//   return res.status(500).send({ message: 'Something went wrong.', details: err });
// });

app.listen(PORT, async () => {
  // await db.sequelize.sync({force:true});
  await db.sequelize.sync();
  console.log('listening on port ' + process.env.PORT || PORT);
});

// module.exports.db = db;
module.exports.db = db;

