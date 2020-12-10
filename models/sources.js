const { getDb } = require('../db/db');


function getNextToScrape(callback = () => {}) {
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
    console.log(JSON.stringify({err, rows}))
    if (err) {
      console.log('/sources/getnexttoscrape -> an error occurred -> ', err);
      callback(err, rows);
      return;
    };

    console.log('getNextToScrpae results -> ', rows);
    getSourceFieldsBySource(rows[0].id);
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


module.exports = {
  getNextToScrape,
};