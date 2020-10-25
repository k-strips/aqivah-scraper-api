-- SQLite
CREATE TABLE IF NOT EXISTS resultTypes(
   id TEXT PRIMARY KEY
  ,label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fieldTypes(
   id TEXT PRIMARY KEY
  ,label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS paginationTypes(
   id TEXT PRIMARY KEY
  ,label TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS sources(
   id TEXT PRIMARY KEY
  ,label TEXT
  ,uri TEXT
  ,isActive BOOLEAN
  ,createdAt TEXT
  ,lastScrapedTime TEXT
  ,paginationTypeId TEXT

  ,FOREIGN KEY (paginationTypeId) REFERENCES paginationTypes (id)
);


CREATE TABLE IF NOT EXISTS scraperSessions(
   id TEXT PRIMARY KEY
  ,startedAt TEXT NOT NULL
  ,endedAt TEXT
  ,scraperId TEXT
  ,resultId TEXT
  ,resultMessage TEXT

  ,FOREIGN KEY (scraperId) REFERENCES scrapers (id)
  ,FOREIGN KEY (resultId) REFERENCES results (id)
);


-- CREATE TABLE IF NOT EXISTS scraperSessions(
--    id TEXT PRIMARY KEY
--   ,sourceId TEXT
--   ,resultId TEXT
--   ,resultMessage TEXT

--   ,FOREIGN KEY (sourceId) REFERENCES sources(id)
--   ,FOREIGN KEY (resultId) REFERENCES resultTypes(id)
-- );

CREATE TABLE IF NOT EXISTS properties(
   id TEXT PRIMARY KEY
  ,uri TEXT UNIQUE
  ,scraperSessionId TEXT NOT NULL

  ,FOREIGN KEY (scraperSessionId) REFERENCES scraperSessions (id)
);

CREATE TABLE IF NOT EXISTS fields(
   id TEXT PRIMARY KEY
  ,label TEXT UNIQUE
  ,isRequired BOOLEAN NOT NULL
  ,isAqivahField BOOLEAN NOT NULL
);


CREATE TABLE IF NOT EXISTS sourceFields(
   id TEXT PRIMARY KEY
  ,fieldId TEXT
  ,sourceId TEXT
  ,typeId TEXT
  ,selector TEXT

  ,FOREIGN KEY (fieldId) REFERENCES fields (id)
  ,FOREIGN KEY (sourceId) REFERENCES sources (id)
  ,FOREIGN KEY (typeId) REFERENCES fieldTypes (id)
);

CREATE TABLE IF NOT EXISTS propertyDetails(
   id TEXT PRIMARY KEY
  ,propertyId TEXT
  ,sourceFieldId TEXT NOT NULL
  ,details TEXT
  ,isDeleted BOOLEAN

  ,FOREIGN KEY (sourceFieldId) REFERENCES sourceFields (id)
  ,FOREIGN KEY (propertyId) REFERENCES properties (id)
);


CREATE TABLE IF NOT EXISTS scrapers(
   id TEXT PRIMARY KEY
  ,label TEXT
);



-- SEED THE DATABASE WITH RELEVANT INFO

INSERT INTO resultTypes 
  (id, label)
VALUES 
  (1, 'Success'),
  (2, 'Error');


INSERT INTO fieldTypes
  (id, label)
VALUES
  (1, 'Image'),
  (2, 'Text');


INSERT INTO paginationTypes
  (id, label)
VALUES
  (1, 'paged'),
  (2, 'infinite-scroll');


INSERT INTO sources
  (id, label, uri, isActive)
VALUES
  (1, 'Business Ghana', 'https://www.businessghana.com/site/real-estates', 1);


INSERT INTO fields
  (id, label, isRequired, isAqivahField)
VALUES
  (1, 'Title', 1, 1),
  (2,'Description',1,1);


INSERT INTO scrapers
  (id, label)
VALUES
  (1, 'New Properties Scraper'),
  (2, 'Update Properties Scraper');


INSERT INTO sourceFields
  (id, fieldId, sourceId, typeId, )