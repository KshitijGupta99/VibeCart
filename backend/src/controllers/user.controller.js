const { UserService } = require("../services");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async registerUser(req, res) {
    try {
      return res.send("hii");
    } catch (error) {
      return res.send(error.message);
    }
  }
}

module.exports = UserController;
