require("dotenv").config();
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DATABASE, DATABASE_URI } =
  process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: DB_HOST,
    port: 5432,
    ssl: true,
    dialect: "postgres",
    dialectOptions: {
      connectionTimeout: 60000,
      ssl: { require: true },
    },
  },
  production: {
    // username: DB_USERNAME,
    // password: DB_PASSWORD,
    // database: DATABASE,
    // host: DB_HOST,
    // port: 5432,
    // ssl: true,
    use_env_variable: DATABASE_URI,
    dialect: "postgres",
    dialectOptions: {
      connectionTimeout: 60000,
      // ssl: { require: true },
    },
  },
};
