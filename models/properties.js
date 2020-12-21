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

function get(id, callback = () => {}){
  checkForId('models/properties.get', id);

  const query = 'SELECT * FROM properties WHERE id = ?'
}



module.exports = {
  createProperty,
  createPropertyDetail,

  listPropertiesBySessionId,
};