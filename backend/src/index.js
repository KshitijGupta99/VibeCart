// require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const MongoConfig = require("./configs/mongo.config.js");

const { Logger } = require("./utils");
const { TryCatch } = require("./utils");

const http = require("http");
const app = require("./app");

const BACKEND_PORT = process.env.BACKEND_PORT;
// const ENVIRONMENT = process.env.NODE_ENV;

const server = http.createServer(app);

// if mongo connected start server
MongoConfig.connection.on("connected", () => {
  Logger.info(`MONGO_DB connected on ${MongoConfig.connection?.client.s.url}`);
  server.listen(BACKEND_PORT, () => {
    Logger.info(`SERVER running on port ${BACKEND_PORT}`);
  });
});
