"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "staging";
// const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     username: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE,
//     host: process.env.DATABASE_HOST,
//     dialect: "postgres",
//     dialectOptions: {
//       connectionTimeout: 60000,
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   }
// );

const sequelize = new Sequelize(
  // "postgres://stephen:qwerty_1@localhost:5432/accertix?schema=scraper"
  "postgres://smflxxgjhdgdrh:2329c9f81115133e48e7e407435d58019146531d34625a3bf101895187d495a1@ec2-54-86-224-85.compute-1.amazonaws.com:5432/d2og4b9jvjmtii"
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
