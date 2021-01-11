const { getDb } = require("../db/db");
const { checkForId } = require("./helpers");

function list(callback = () => { }) {
  const query = `SELECT * FROM scrapers`;

  const db = getDb();
  db.all(query, callback);

}

function get(id, callback = () => { }) {
  checkForId('models/scrapers.get', id);

  const query = `SELECT * FROM scrapers WHERE id = ?`;

  const db = getDb();
  db.all(query, [id], callback);
}

function remove(id, callback = () => { }) {
  checkForId('models/scrapers.remove', id);

  const query = `DELETE FROM scrapers WHERE id = ?`;

  const db = getDb();
  db.run(query, [id], callback);
}

function update(data, callback = () => { }) {
  const { id, label } = data;
  checkForId('models/scrapers.update', data.id);

  const query = `UPDATE scrapers SET label=? WHERE id = ?`;

  const db = getDb();
  db.run(query, [label, id], callback);
}

module.exports = {
  list,
  get,
  remove,
  update,
};