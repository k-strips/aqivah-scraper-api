const { v4: uuid } = require('uuid');
const { getDb } = require('../db/db');
const { checkForId } = require('./helpers');


function create(params, callback) {
  const db = getDb();
  const id = uuid();
  const { startedAt, endedAt, scraperId, resultId, resultMessage } = params;

  const query = `
  INSERT INTO scraperSessions
    (id, startedAt, endedAt, scraperId, resultId, resultMessage)
  VALUES
    (?,?,?,?,?,?);
  `;

  // const result = 
  db.run(query, [id, startedAt, endedAt, scraperId, resultId, resultMessage], (err, rows) => callback(err, rows, id));
  //  (err, rows) => {
  //   console.log('was there an error ? -> ', err);
  //   if (err) {
  //     console.log('there was an error querying -> ', err);
  //     return ({ success: false, message: err });
  //   }

  //   console.log('result of creating scraper session -> ', rows);
  //   return ({ success: true, message: 'Success' });
  // });

  // return result;

}

function list(callback = () => { }) {
  const query = 'SELECT * FROM scraperSessions;';

  const db = getDb();
  db.all(query, callback);
}

function listByScraper(scraperId, callback = () => { }) {
  checkForId('models/scraperSessions.listByScraper', scraperId);

  const query = `SELECT * FROM scraperSessions where scraperId = ?`;

  const db = getDb();
  db.all(query, [scraperId], callback);
}

function get(id, callback = () => { }) {
  const query = 'SELECT * FROM scraperSession WHERE id = ?';

  const db = getDb();
  db.all(query, [id], callback);
}


module.exports = {
  create,
  list,
  listByScraper,
  get,
};