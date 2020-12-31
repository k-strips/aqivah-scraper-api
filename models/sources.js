// const db = require('../db/db');
const { getDb } = require('../db/db');
const { v4: uuid } = require('uuid');
const SourceField = require('./sourceFields');


function list(callback = () => { }) {
  const db = getDb();
  const query = `SELECT id, label, uri, isActive, createdAt, lastScrapedTime, paginationTypeId
  FROM sources;`;
  console.log('query for listing sources -> ', query);

  db.all(query, callback);
}

function getNextToScrape(callback = () => { }) {
  // select them, ordered by timestamp (least recent first), then select the first from the list, 
  const db = getDb();
  const query = `
  SELECT 
    *
  FROM
    sources
  WHERE
    isActive = true
  ORDER BY
    sources.lastScrapedTime ASC
  LIMIT 1
  ;
  `;
  // const query = `
  // SELECT 
  //   sources.id, 
  //   sources.label, 
  //   sources.uri, 
  //   sources.lastScrapedTime, 
  //   sources.paginationTypeId,
  //   paginationTypes.label AS paginationTypeLabel,
  //   paginationTypes.id
  // FROM
  //   sources, paginationTypes
  // WHERE
  //   isActive = true
  // AND
  //   paginationTypes.id = sources.paginationTypeId
  // ORDER BY
  //   sources.lastScrapedTime ASC
  // LIMIT 
  //   1
  // ;
  // `;

  db.all(query, callback);
};


// for the selected one, get its sourceFields, and append that to an obj, and return.

// if anything goes wrong along the way, return a 500.



function getSourceFieldsBySource(sourceId, callback = () => { }) {
  const db = getDb();
  //todo: add an 'isActive' field to the 'sourceFields' table. so that we can toggle whether a field can be scraped or not.

  //todo: there should be a 'isRequired' field. those fields should be present on every property that's scraped, even if the value is null or something.

  const query = `
  SELECT *
  FROM
    sourceFields
  WHERE
   sourceFields.sourceId = ?
  
  ;
  `;

  db.all(query, [sourceId], callback);
}

function create(data = {}, callback = () => { }) {
  const db = getDb();
  const { name, url, startScraping = true, paginationTypeId, sourceFields = [], singlePropertyQuerySelector = null } = data;
  const id = uuid();
  const createdAt = Date.now();

  const query = `
  INSERT INTO sources
    (id, label, uri, isActive, createdAt, paginationTypeId, singlePropertyQuerySelector)
  VALUES
    (?,?,?,?,?,?,?)
  ;
  `;

  const augmentedSourceFields = sourceFields.map(each => ({ ...each, sourceId: id }));

  db.run(
    query,
    [id, name, url, startScraping, createdAt, paginationTypeId, singlePropertyQuerySelector],
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