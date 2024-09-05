require("dotenv").config();

const ENV_CONFIG = {
  BACKEND_PORT: process.env.BACKEND_PORT,
  ENVIRONMENT: process.env.ENVIRONMENT,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  MONGO_PORT: process.env.MONGO_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY || '30d',
  JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY || '7d',
  LOG_TAIL_TOKEN: process.env.LOG_TAIL_TOKEN,
};

module.exports = ENV_CONFIG;
