

exports.getNextSource = db => {
  //get the source with the earliest 'lastScraped' date
  const query = `
  SELECT sources.id, sources.url, sources.paginationTypeId, paginationTypes.id,  MIN(sources.lastScrapedTime), sourceFields.sourceId 
  
  FROM sources, sourceFields, paginationTypes 
  
  WHERE paginationTypes.id = sources.paginationTypeId
  AND sources.id = sourceFields.sourceId 
  ;`;

  const params = [];
  const result = db.all(query, params, (err, rows) => {
    console.log(rows);
  });
};