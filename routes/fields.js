const express = require('express');
const router = express.Router();
// const data = require('../data');
const { getDb, initialize } = require('../db/db');

const db = getDb();

router.get('/', (req, res) => {
  const query = `
  SELECT id, label, isRequired, isAqivahField
  FROM fields;
  `;

  db.all(query, (err, rows) => {
    if (err) {
      res.sendStatus(500);
      return;
    };

    res.send(rows);

  });
  // res.send(data.fields);
});

module.exports = router;