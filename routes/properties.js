const express = require('express');
const router = express.Router();
const data = require('./../data');
const propertyResults = require('./../db/propertyResults');



router.get('/', (req, res) => {
  console.log('received properties -> ', req.body);
  
  console.log('property results -> ', propertyResults);
  //for each property,
  // create a new property in the properties table.
  // then create the entries in the property details 

  

  return res
    .send(propertyResults);
});


module.exports = router;