const express = require('express');
const router = express.Router();

const { getDb } = require('../db/db');

router.get('/', (req, res) => {
  //trying to get the list of scraping sessions that have occurred.
  const db = getDb();
  const query = `
  SELECT
    scraperSessions.id,
    scraperSessions.startedAt,
    scraperSessions.endedAt,
    scraperSessions.scraperId,
    scraperSessions.resultId,
    scraperSessions.resultMessage
  FROM 
    scraperSessions;
    
  `;
  //todo: include a where clause, cos update scraper will be coming onlne soon

  db.all(query, (err, rows) => {
    if (err) return res.send(error);
    console.log('result of querying for scraping sessions -> ', { err, rows });
    res.send(rows);
  });
});

module.exports = router;