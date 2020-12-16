const { getDb } = require('../db/db');
const { v4: uuid } = require('uuid');
// const db = require('../db/db');

function create(data, callback) {
  const { sourceId, fieldId, typeId, selector = '' } = data;
  if (!sourceId || !fieldId || !typeId) throw new Error('Required info not provided');

  const db = getDb();
  const id = uuid();
  const query = `
  INSERT INTO sourceFields
    (id, fieldId, sourceId, typeId, selector)
  VALUES
    (?,?,?,?,?)
  ;
  `;
  db.run(query, [id, fieldId, typeId, selector], callback);

}

function batchCreate(data = [], callback) {

  console.log('incoming data -> ', data);
  if (data.length === 0) {
    throw new Error('No source fields provided');
    // return;
  }

  const db = getDb();

  const query = `
  INSERT INTO sourceFields
    (id, fieldId, sourceId, typeId, selector)
  VALUES
  ${data.reduce((final, each, index) => {
    const id = uuid();
    const { fieldId, sourceId, typeId, selector } = each;
    if (!fieldId || !sourceId || !typeId) return finalValue;

    return `
      ${final}${index > 0 && ','}
     (${id}, ${fieldId, sourceId, typeId, selector})
    `;
  }, '')}`;
  console.log('query to batch create source fields -> ', query);

  db.run(query, callback);
}

module.exports = {
  create,
  batchCreate,
};