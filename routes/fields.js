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
      res.status(500).json({ message: e });
      return;
    };

    res.send(rows);

  });
});

module.exports = router;