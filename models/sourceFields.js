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

  console.log('incoming source fields -> ', data);
  if (data.length === 0) {
    throw new Error('No source fields provided');
    // return;
  }

  const db = getDb();
  const values = data.reduce((final, each, index) => {
    console.log('current final value -> ', final);
    console.log('each -> ', each);
    const id = uuid();
    const { name: fieldId, sourceId, type: typeId, querySelector: selector } = each;
    if (!fieldId || !sourceId || !typeId) return final;

    return `
      ${final}${index > 0 ? ',' : ''}("${id}", "${fieldId}", "${sourceId}", "${typeId}", "${selector}")`;
  }, '');

  console.log('after creating all values -> ', values);

  const query = `
  INSERT INTO sourceFields
    (id, fieldId, sourceId, typeId, selector)
  VALUES
    ${values} 
  ;`;

  console.log('query to batch create source fields -> ', query);

  db.run(query, callback);
}

function removeBySourceId(id, callback = () => { }) {
  if (!id) throw new Error('models/sourceFields.removeBySourceId : no source id passed');

  const query = `DELETE FROM sourceFields WHERE sourceId = ?`;

  const db = getDb();
  db.run(query, [id], callback);
}

function remove(id, callback = () => { }) {
  if (!id) throw new Error('models/sourcefields.remove: no sourceField id passed in');

  const query = `DELETE FROM sourceFields where id = ?`;

  const db = getDb();
  db.run(query, [id], callback);
}

module.exports = {
  create,
  batchCreate,
  remove,
  removeBySourceId,
};