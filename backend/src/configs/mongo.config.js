const mongoose = require("mongoose");

const ENV_CONFIG = require("./env.config.js");

const { Logger } = require("../utils");

class MongoConfig {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(ENV_CONFIG.MONGO_URI, {
        dbName: ENV_CONFIG.MONGO_DB_NAME,
      })
      .then(() => {})
      .catch((err) => {
        Logger.error(err);
      });
  }

  close() {
    mongoose.connection.close();
  }

  get connection() {
    return mongoose.connection;
  }
}

module.exports = new MongoConfig();
