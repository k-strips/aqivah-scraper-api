const express = require('express');
const router = express.Router();
const data = require('./../data');

router.get('/', (req, res) => {
  res.send(data.paginationTypes);
});


module.exports = router;