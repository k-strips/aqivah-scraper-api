const express = require('express');
const { getDb } = require('../db/db');
const router = express.Router();
const data = require('./../data');

router.get('/', (req, res) => {
  const db = getDb();
  const query = `
    SELECT
      paginationTypes.id,
      paginationTypes.label
    FROM
      paginationTypes;
  `;
  db.all(query, (err, rows) => {
    if (err) {
      res.send(err)
      console.log('failed to fetch pagination types -> ', err);
    };
    res.send(rows);
  });
});


module.exports = router;