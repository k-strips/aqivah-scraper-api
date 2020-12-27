const { v4: uuid } = require('uuid');
const { getDb } = require('../db/db');
const { checkForId } = require('./helpers');


function createProperty() {


}

function createPropertyDetail(params) {
  const { sourceFieldId, details, propertyId } = params || {};
  const id = uuid();
  const db = getDb();

  const query = `
  INSERT INTO propertyDetails
    (id, sourceFieldId, details, sourceFieldId)
  VALUES
    (?,?,?,?);
  `;
  return db.run(query, [id, sourceFieldId, details, propertyId], (err, rows) => {
    if (err) return ({ success: false, message: err });

    console.log('created property details -> ', rows);
    return ({ success: true, message: 'Success' });
  });
}

function listPropertiesBySessionId(sessionId, callback = () => { }) {
  checkForId('models/properties.listPropertiesBySessionId', sessionId);

  const query = `
  SELECT * FROM 
    properties, propertyDetails 
  WHERE 
    propertyDetails.propertyId = properties.id 
  AND properties.scraperSessionId = ?
  ;`;

  const db = getDb();
  db.all(query, [sessionId], callback);
}

function get(id, callback = () => { }) {
  checkForId('models/properties.get', id);

  const query = 'SELECT * FROM properties WHERE id = ?';
  const db = getDb();
  db.all(query, [id], callback);
}

function getDetails(id, callback = () => { }) {
  checkForId('models/properties.getDetails', id);
  const db = getDb();

  //get the property's basic info, using the 'get' fn.

  // use the property's id to get the details from 'propertyDetails', the array of fields that belong to the property.
  const callbackToGetPropertyDetails = (err, rows) => {
    if (err) throw error;

    const formatDataForTransmission = (err, data) => {
      if (err) throw err;

      console.log('format data for trans -> ', { data, rows, err });
      const finalValue = {
        fields: data,
        id,
        uri: rows[0].uri,
      };
      callback(null, finalValue);
    };

    const getPropertyDetailsQuery = `SELECT 
      propertyDetails.propertyId,
      propertyDetails.sourceFieldId,
      propertyDetails.details,
      fields.label
    FROM propertyDetails, fields
    WHERE propertyDetails.propertyId = ?
    AND propertyDetails.sourceFieldId = fields.id;
    `;

    db.all(getPropertyDetailsQuery, [id], formatDataForTransmission);
  };

  //create callback for fetching the property details and adding it to these



  // const query = `SELECT * FROM propertyDetails, fields where propertyDetails.propertyId = ? and propertyDetails.sourceFieldId = fields.id`;
  const query = `SELECT * FROM properties WHERE id = ?`;

  // const db = getDb();
  db.all(query, [id], callbackToGetPropertyDetails);
}



module.exports = {
  createProperty,
  createPropertyDetail,
  get,
  getDetails,
  listPropertiesBySessionId,
};