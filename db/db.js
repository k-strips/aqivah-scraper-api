const sqlite = require('sqlite3');

let db = null;

function initialize() {
  db = new sqlite.Database('./db/data.db',
    (error) => {

      if (error) console.log('failed to connect to db;');
      console.log('Connected to database');
    });

  return db;

}

function getDb() {
  if (db === null) initialize();
  return db;
}


module.exports = {
  getDb, initialize,
};