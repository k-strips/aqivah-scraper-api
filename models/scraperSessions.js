const { v4: uuid } = require('uuid');
const { getDb } = require('../db/db');


function create(params) {
  const db = getDb();
  const id = uuid();
  const { startedAt, endedAt, scraperId, resultId, resultMessage } = props;

  const query = `
  INSERT INTO scraperSessions
    (id, startedAt, endedAt, scraperId, resultId, resultMessage)
  VALUES
    (?,?,?,?,?,?);
  `;

  db.run(query, [id, startedAt, endedAt, scraperId, resultId, resultMessage], (err, rows) => {
    if (err) return { success: false, message: err };

    console.log('result of creating scraper session -> ', rows);
    return { success: true, message: 'Success' };
  });

}


module.exports = {
  create,
};