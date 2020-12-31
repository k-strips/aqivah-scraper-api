const express = require('express');
const router = express.Router();
const data = require('./../data');
const propertyResults = require('./../db/propertyResults');
const Properties = require('./../models/properties');

const { getDb } = require('../db/db');
const { v4: uuid } = require('uuid');
const { createPropertyDetail } = require('../models/properties');


function createNewProperty(params) {
  const db = getDb();
  const { id, scraperSessionId, uri } = params;

  let newPropertyId = id;
  if (Boolean(id)) newPropertyId = uuid();

  const query = `
    INSERT INTO properties
      (id, uri, scraperSessionId)
    VALUES
      (?,?,?)
    ;
  `;

  db.run(query, [id, uri, scraperSessionId], (err) => {
    if (err) return ({ success: false, message: err });

    return ({ success: true, message: 'Successfully created property' });
  });

}

router.post('/', (req, res) => {
  console.log('received properties -> ', req.body);

  // if (propertyResults.length === 0) return res.status(400).send({ message: 'No property Details sent' });

  const { scraperSessionId = '', properties = null } = req.body || {};

  if (!Boolean(scraperSessionId)) return res.status(400).send({ message: 'Scraper session ID (scraperSessionId) is required' });

  if ((!properties || properties.length === 0)) return res.status(400).send({ message: 'At least 1 property required.' });

  //for each property, create a new property obj in the db.
  let propertiesWithIds = [];
  properties.some(each => {
    const id = uuid();
    const { uri } = each;

    if (!Boolean(uri)) return res.status(400).send({ message: 'Property URI cannot be empty' });

    const result = createNewProperty({ id, uri, scraperSessionId });
    console.log('result of creating property -> ', result);
    if (!result.success) return res.status(500).send({ message: response.message });

    propertiesWithIds = [...propertiesWithIds, { id, uri, scraperSessionId }];

  });

  console.log('created properties -> ', propertiesWithIds);
  // then create the entries in the property details 

  propertiesWithIds.some(each => {
    const { sourceFieldId, details, propertyId } = each;
    const params = { sourceFieldId, details, propertyId };

    const response = createPropertyDetail(params);

    //todo: check to see if this error returning works well
    if (!response.success) return res.status(400).send(response);
  });

  return res.status(201).send({ message: 'Success' });
});

router.get('/', (req, res) => {
  //get the scraper session whose properties you want to show. if there's no scraper session, then return paginated list of all 
  const { sessionId } = req.query;
  console.log('incoming session id -> ', { sessionId, body: req.body, req, });
  const callback = (err, rows) => {
    console.log('response of gettin gproperties by session id -> ', { err, rows });
    if (err) return res.status(400).send({ message: err || 'Something went wrong' });

    res.status(200).send({ message: 'Success', data: rows, });
  };

  Properties.listPropertiesBySessionId(sessionId, callback);

});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const callback = (err, rows) => {
    if (err) return res.status(400).send({ message: err || 'Something went wrong' });

    res.status(200).send({ message: 'Success', data: rows[0] });
  };

  Properties.get(id, callback);
});

router.get('/:id/details', (req, res) => {
  const { id } = req.params;

  const callback = (err, rows) => {
    if (err) {
      console.log('error fetching properties -> ', err);
      return res.status(400).send({ message: err || 'Something went wrong' });
    }

    res.status(200).send({ message: 'Success', data: rows });
  };

  Properties.getDetails(id, callback);
});

router.post('/batch', (req, res) => {
  // means it's coming from the scraper, in this format:
  /** {
   * id, 
   * scraperSessionId, 
   * properties: {
   *  [id]: {id, sourceFieldId: details, uri: ' }
   * }} */

  console.log('incoming properties -> ', req.body);
  req.body.properties.map(each => console.log(each.details));

  const { scraperSessionId, properties } = req.body;

  const mainCallback = (err, rows) => {
    console.log("result of creating property details -> ", { err, rows });
    if (err) return res.status(400).send({ message: err || 'Something went wrong', data: err, });

    return res.status(201).send({ message: 'Success', data: rows });
  };
  //after creating the properties, if there were no issues, it means properties with the ids we have will be present in the db. we can go ahead to batch-create the fields.
  const callbackToCreatePropertyDetails = (err, rows) => {
    console.log('result of creating properties -> ', { err, rows });
    if (err) return res.status(400).send({ message: err || 'something went wrong', data: err });

    Properties.batchCreateDetails(properties, mainCallback);
  };
  Properties.batchCreate(scraperSessionId, properties, callbackToCreatePropertyDetails);

});


module.exports = router;