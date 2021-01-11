const express = require('express');
const router = express.Router();
const data = require('./../data');
// const { db } = require('../index');
const { getDb, initialize } = require('../db/db');
const Source = require('../_models/sources');
const { sources } = require('./../data');
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
    return res.status(201).send(response);
  }

  if (!req.query.request) {
    // const query = `
    //   SELECT
    //     sources.id,
    //     sources.label,
    //     sources.uri,
    //     sources.isActive,
    //     sources.createdAt,
    //     sources.lastScrapedTime,
    //     sources.paginationTypeId AS paginationType
    //   FROM
    //     sources,
    //     paginationTypes
    //   WHERE paginationTypes.id = sources.paginationTypeId
    // ;
    // `;
    // db.all(query, (err, rows) => {
    //   if (err) return res.status(500).send({ message: 'Something went wrong' });
    //   // console.log('results of fetching sources -> ', rows);
    //   res.status(200).send(rows);
    // });
    // response = data.sources;
    const callback = (err, rows) => {
      console.log('results of query -> ', { err, rows });

      if (err) {
        console.log('error -> ', err);
        return res.status(500).send({ message: err || 'Something went wrong' });
      }


      res.status(200).send({ message: 'Success', data: rows });
    };
    Source.list(callback);
  }
  // res.send(response);
});

router.get('/next', (req, res) => {
  const callback = (err, rows) => {
    console.log('result of fetching next source -> ', { err, rows });
    if (err) return res.status(500).send({ message: err || 'Something went wrong', data: err });

    return res.status(200).send({ message: 'Success', data: rows });
  };

  const callbackToGetSourceFields = (err, rows) => {
    if (err) {
      console.log('error -> ', err);
      res.status(500).send({ message: err || 'Unable to get source details' });
      return;
    }

    const source = rows[0];
    console.log('fetched source. now getting fields -> ', source);
    Source.getSourceFieldsBySource(source.id, (err, rows) => {
      console.log('after getting fields -> ', { err, rows });
      const data = { ...source, fields: rows };
      callback(err, data);
    });
  };


  Source.getNextToScrape(callbackToGetSourceFields);
});

router.post('/', (req, res) => {
  console.log('received source -> ', JSON.stringify(req.body));

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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: 'No ID passed' });

  const callback = (err, rows) => {
    console.log('result of deleting source -> ', { err, rows });
    if (err) return res.status(400).send({ message: err || 'Unable to delete the source. Something went wrong' });



    res.status(200).send({ message: rows || 'Success' });
  };

  Source.remove(id, callback);
});

module.exports = router;


function getNextSource() {
  Source.getNextToScrape();
  return;
  console.log('source to use -> ', data.sources[2]);
  return data.sources[2];
}
