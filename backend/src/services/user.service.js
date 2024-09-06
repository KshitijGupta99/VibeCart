const { UserRepository } = require("../repositories");
const logger = require("../utils/logger");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(id) {}

  async registerUser({
    first_name,
    last_name,
    email,
    password,
    address,
    contact,
  }) {
    try {
      const [createUserRes, createUserResErr] = this.userRepository.createUser({
        first_name,
        last_name,
        email,
        password,
        address,
        contact,
      });
      if (createUserResErr) {
        logger.error(
          `Failed to create user: ${createUserResErr.message}`,
          createUserResErr,
        );
        return [null, createUserResErr];
      }
      logger.info(
        `Successfully created user: ${createUserRes._id}`,
        createUserRes,
      );
      return [createUserRes, null];
    } catch (error) {
      logger.error(`Failed to create user: ${error.message}`, error);
      return [null, error];
    }
  }
}

module.exports = UserService;
