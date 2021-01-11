const express = require('express');
const router = express.Router();
// const data = require('../data');
const { getDb, initialize } = require('../db/db');
const Fields = require('../_models/fields');

const db = getDb();

router.get('/', (req, res) => {
  const { id } = req.params || {};

  const query = `
  SELECT id, label, isRequired, isAqivahField
  FROM fields;`;

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ message: e });
      return;
    };
    console.log('rows fetched for fields -> ', rows);
    res.send(rows);

  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params || {};

  if (!id) return res.status(400).send({ message: 'Missing ID' });

  const query = `
  SELECT 
    id, label, isRequired, isAqivahField
  FROM 
    fields 
  WHERE 
    id = ?
  ;
  `;

  db.all(query, [id], (err, rows) => {
    if (err) {
      res.status(500).json({ message: e });
      return;
    };
    console.log('rows fetched for fields -> ', rows);
    res.send(rows[0]);

  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  // const { label, isRequired, isAqivahField } = req.body;
  const callback = (err, rows) => {
    console.log('result of query -> ', { err, rows });
    if (err) return res.status(400).send({ message: err || 'Failed to edit field' });

    res.status(200).send({ message: 'Success', data: rows });
  };

  Fields.edit({ id, ...req.body }, callback);
});


router.post('/', (req, res) => {
  // const id = req.params.id;
  // const { label, isRequired, isAqivahField } = req.body;
  const callback = (err, rows) => {
    console.log('result of query -> ', { err, rows });
    if (err) return res.status(400).send({ message: err || 'Failed to create field' });

    res.status(201).send({ message: 'Success', data: rows });
  };

  Fields.create(req.body, callback);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const callback = (err, rows) => {
    console.log('result of query to delete -> ', { err, rows });
    if (err) return res.status(400).send({ message: err || 'Failed to delete.' });

    res.status(200).send({ message: 'Success' });
  };

  Fields.remove(id, callback);
});

module.exports = router;