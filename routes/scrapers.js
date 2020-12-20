const express = require('express');
const router = express.Router();
const data = require('./../data');
const { v4: uuid } = require('uuid');
const { getDb } = require('../db/db');
const ScraperSession = require('../models/scraperSessions');
const Scrapers = require('../models/scrapers');


router.get('/', (req, res) => {
  const callback = (err, rows) => {
    if (err) return res.status(500).send({ message: 'Something went wrong' });

    res.status(200).send({ message: 'Success', data: rows });
  };

  Scrapers.list(callback);
});

router.post('/:id/sessions', (req, res) => {
  const { id } = req.params;

  console.log('called /scrapers/id/sessions with id of scraper is ', id);

  const params = {
    startedAt: Date.now(),
    scraperId: id,
  };

  const callback = (err, rows, id) => {
    if (err) {
      console.log('there was an error querying ');
      return res.status(400).send({ message: err });
    }

    return res.status(201).send({ message: 'Success', scraperSessionId: id });
  };

  ScraperSession.create(params, callback);

});

router.patch('/:id', (req, res) => {
  const { status } = req.body;
  console.log('id of scraper is -> ', req.params.id);
  const { id } = req.params;

  console.log(`current status of scraper with id ${id} set to ${status}`);
  res.status(204).send({ message: 'Success', sessionId: 1, });
});

router.delete('/:id', (req, res) => {
  const callback = (err, rows) => {
    if (err) return res.status(500).send({ message: e || 'Something went wrong' });

    res.status(200).send({ message: 'Success' });
  };
  Scrapers.remove(id, callback);
});



module.exports = router;