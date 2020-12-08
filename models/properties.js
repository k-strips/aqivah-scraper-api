const { v4: uuid } = require('uuid');
const { getDb } = require('../db/db');


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



module.exports = {
  createProperty,
  createPropertyDetail,
};