require("dotenv").config();

const defaultConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
  url: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};

module.exports = {
  development: {
    ...defaultConfig,
    logging: console.log,
  },
  production: {
    ...defaultConfig,
    logging: false,
  },
};
