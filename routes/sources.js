const express = require('express');
const router = express.Router();
const data = require('./../data');
// const { db } = require('../index');
const { getDb, initialize } = require('../db/db');
const Source = require('./../models/sources');
// const sources = require('./../models/sources');

router.get('/', (req, res) => {
  const db = getDb();
  console.log("req.body", req.query);
  const requestOptions = {
    getNextSource: 'getNextSource',
  };

  let response = 'Invalid request';

  if (req.query.request === requestOptions.getNextSource) {
    console.log('called api /sources with req getnextsource');
    response = getNextSource();
    res.status(201).send(response);
  }

  if (!req.query.request) {
    const query = `
      SELECT
        sources.id,
        sources.label,
        sources.uri,
        sources.isActive,
        sources.createdAt,
        sources.lastScrapedTime,
        sources.paginationTypeId AS paginationType
      FROM
        sources,
        paginationTypes
      

    `;
    db.all(query, (err, rows) => {
      if (err) return err;
      console.log('results of fetching sources -> ', rows);
      res.send(rows);
    });
    // response = data.sources;
  }
  // res.send(response);
});

router.post('/', (req, res) => {
  console.log('received source -> ', req.body);

  try {
    const callback = (err, rows) => {
      console.log('any errors? -> ', err);
      console.log('any values? -> ', rows);
      if (err) {
        res.status(400).send({ message: err });
        return;
      }

      res.status(201).send({ message: 'Success' });
    };
    Source.create(req.body, callback);
  } catch (e) {
    console.log('error thrown -> ', e);
    res.status(400).send({ message: e.message || 'Something went wrong' });
  }
});

module.exports = router;


function getNextSource() {
  Source.getNextToScrape();
  return;
  console.log('source to use -> ', data.sources[2]);
  return data.sources[2];
}
