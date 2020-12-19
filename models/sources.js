// const db = require('../db/db');
const { getDb } = require('../db/db');
const { v4: uuid } = require('uuid');
const SourceField = require('./sourceFields');


function list(callback = () => { }) {
  const db = getDb();
  const query = `SELECT id, label, uri, isActive, createdAt, lastScrapedTime, paginationTypeId
  FROM sources;`;

  db.run(query, callback);
}

function getNextToScrape(callback = () => { }) {
  // select them, ordered by timestamp (least recent first), then select the first from the list, 
  const db = getDb();
  const query = `
  SELECT 
    sources.id, 
    sources.label, 
    sources.uri, 
    sources.lastScrapedTime, 
    sources.paginationTypeId,
    paginationTypes.label,
    paginationTypes.id
  FROM
    sources, paginationTypes
  WHERE
    isActive = true
  AND
    paginationTypes.id = sources.paginationTypeId
  ORDER BY
    sources.lastScrapedTime ASC
  LIMIT 
    1
  ;
  `;

  db.run(query, (err, rows) => {
    console.log(JSON.stringify({ err, rows }));
    if (err) {
      console.log('/sources/getnexttoscrape -> an error occurred -> ', err);
      callback(err, rows);
      return;
    };

    console.log('getNextToScrpae results -> ', rows);
    // getSourceFieldsBySource(rows[0].id);
  });


  // for the selected one, get its sourceFields, and append that to an obj, and return.

  // if anything goes wrong along the way, return a 500.

}

function getSourceFieldsBySource(sourceId) {
  const db = getDb();
  //todo: add an 'isActive' field to the 'sourceFields' table. so that we can toggle whether a field can be scraped or not.
  const query = `
  SELECT
    sourceFields.id, 
    sourceFields.isRequired, 
    sourceFields.isAqivahField, 
    sourceFields.fieldId,
    fields.label,
    sourceFields.sourceId,
    fieldTypes.id,
    fieldTypes.label
  FROM
    sourceFields,
    fields,
    fieldTypes
  WHERE
    fieldTypes.id = sourceFields.typeId
  AND
    sourceFields.id = ?
  ;
  `;

  db.run(query, [sourceId], callback);
}

function create(data = {}, callback = () => { }) {
  const db = getDb();
  const { label, uri, isActive, paginationTypeId, sourceFields = [] } = data;
  const id = uuid();
  const createdAt = Date.now();

  const query = `
  INSERT INTO sources
    (id, label, uri, isActive, createdAt, paginationTypeId)
  VALUES
    (?,?,?,?,?,?)
  ;
  `;

  const augmentedSourceFields = sourceFields.map(each => ({ ...each, sourceId: id }));

  db.run(
    query,
    [id, label, uri, isActive, createdAt, paginationTypeId],
    SourceField.batchCreate(augmentedSourceFields, callback)
  );
  //creating a source involves creating the sourceFields, as well as the ff
  // label, uri (baseUrl), isActive, createdAt, lastScrapedTime

}

function remove(id, callback) {
  if (!id) throw new Error('No ID provided');

  const query = `
  DELETE FROM sources
  WHERE id = ?
  `;

  const db = getDb();
  db.run(query, [id], callback);
}


module.exports = {
  getNextToScrape,
  create,
  remove,
  list,
  getSourceFieldsBySource,
};