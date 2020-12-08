const express = require('express');
const router = express.Router();
const data = require('./../data');
const propertyResults = require('./../db/propertyResults');


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
  const { scraperSession } = req.body;
  let query = '';

  const generatePropertiesListQuery = scraperSessionId => {
    if (Boolean(scraperSessionId)) return `
    SELECT 
      properties.id,
      properties.uri,
      properties.scraperSessionId,
      properties.isDeleted
      
      fields.id,
      fields.label,

      propertyDetails.propertyId,
      propertyDetails.sourceFieldId,
      propertyDetails.details,
      propertyDetails.isDeleted,

      sourceFields.id,
      sourceFields.fieldId,

      sources.label,
      sources.uri,

    
    FROM 
      properties,
      fields,
      propertyDetails,
      sources,
      sourceFields,

    WHERE
      propertyDetails.sourceFieldId = sourceFields.id
    AND sourceFields.fieldId = fields.id
    AND properties.isDeleted = 0
    AND propertyDetails.propertyId = properties.id
    AND propertyDetails.isDeleted = 0

    GROUPBY
      properties.id
    `;
  };
  if (Boolean(scraperSession)) {
    query = ``;
  } else {
    query = ``;
  }
});


module.exports = router;