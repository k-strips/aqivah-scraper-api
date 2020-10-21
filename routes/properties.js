const express = require('express');
const router = express.Router();
const data = require('./../data');


router.post('/', (req, res) => {
  console.log('received properties -> ', req.body);

  return res.send('Success');
});


module.exports = router;