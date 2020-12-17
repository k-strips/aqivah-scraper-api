const { v4: uuid } = require('uuid');
const { getDb } = require('../db/db');

function create(data, callback) {
  const { label, isRequired = false, isAqivahField = false } = data;
  const id = uuid();
  const db = getDb();

  const query = `
  INSERT INTO 
    fields (id, label, isRequired, isAqivahField)
  VALUES
    (?,?,?,?)
  ;
  `;

  db.run(query, [id, label, isRequired, isAqivahField], callback);

}

function edit(data = {}, callback) {
  const { id, label, isRequired = false, isAqivahField = false } = data;

  if (!id || !label) {
    console.log('apparently some values are missing -> ', data);
    throw new Error('value missing.');
  }


  const db = getDb();
  const query = `
    UPDATE 
      fields
    SET
      label = ?,
      isRequired = ?,
      isAqivahField = ?
    WHERE
      id = ?
    
  `;

  db.run(query, [label, isRequired, isAqivahField, id], callback);
}


function remove(id, callback) {
  if (!id) {
    console.log('no id passed');
    throw new Error('No ID passed');
  }

  const db = getDb();
  const query = `
  DELETE FROM fields
  WHERE id = ?
  `;

  db.run(query, [id], callback);
}

function get(id, callback) {
  if (!id) {
    console.log('no id passed');
    throw new Error('No ID passed');
  }

  const db = getDb();
  const query = `
  SELECT * FROM fields
  WHERE id = ?
  `;
  db.run(query, [id], callback);
}

module.exports = {
  create,
  edit,
  remove,
  get,
};

