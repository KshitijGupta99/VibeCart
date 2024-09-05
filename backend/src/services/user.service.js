const { UserRepository } = require("../repositories")

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(id) {
  }
}

module.exports = UserService;