const { User } = require("../models");
const logger = require("../utils/logger");

class UserRepository {
  constructor() {}

  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      logger.info(`User created successfully with id ${user._id}`);
      return [user, null];
    } catch (error) {
      logger.error(`error while creating user in db ${error.message}`, error);
      return [null, error];
    }
  }
}

module.exports = UserRepository;
