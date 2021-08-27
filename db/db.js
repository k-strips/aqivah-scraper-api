const sqlite = require("sqlite3");
const { Sequelize } = require("sequelize");

const postgres = "postgres://postgres:postgres@localhost:5432/aqivah-scraper";
const sequelize = new Sequelize(postgres);

let db = null;

async function initialize() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  db = new sqlite.Database("./db/data.db", (error) => {
    if (error) console.log("failed to connect to db;");
    console.log("Connected to database");
  });

  return db;
}

function getDb() {
  if (db === null) initialize();
  return db;
}

module.exports = {
  getDb,
  initialize,
};
