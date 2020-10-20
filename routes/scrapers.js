const express = require('express');
const router = express.Router();
const data = require('./../data');

router.patch('/:id', (req, res) => {
  const { status } = req.body;
  console.log('id of scraper is -> ', req.params.id);
  console.log(`current status of scraper with id set to ${status}`);
  res.send({ data: 'Success' });
});



module.exports = router;