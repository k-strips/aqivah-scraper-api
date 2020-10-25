const express = require('express');
const routes = express.Router();
const { getDb, initialize } = require('../db/db');
const { v4: uuid } = require('uuid');
// const db = require('../db/db');

routes.get('/', (req, res) => {
  const query = `
  SELECT id, label
  FROM fieldTypes
  `;
  const db = getDb();

  db.all(query, (err, rows) => {
    if (err) return error;
    res.send(rows);
  });
});

routes.post('/', (req, res) => {
  const db = getDb();
  const { name } = req.body;
  console.log('incoming name -> ', name);
  const id = uuid();
  const query = `
  INSERT INTO fieldTypes
  (id, label)
  VALUES
  (?, ?)
  `;
  db.run(query, [id, name], (err) => {
    if (err) {
      console.log('error -> ', err);
      res.sendStatus(400).send(err);
      return;
    };
    res.send(name);
  });
  // res.send(name);
});


module.exports = routes;