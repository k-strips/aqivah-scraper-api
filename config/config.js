module.exports = {
  staging: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    dialectOptions: {
      connectionTimeout: 60000,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
