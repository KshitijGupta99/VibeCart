const { UserService } = require("../services")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;


class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async registerUser(req, res) {
    try {

      //const [createUserRes, createUserResErr] = this.userService.registerUser

      let user = await User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      });
      if (UserService.matchcreds(user)) {
        return res.status(401).json("User with this details already exsist")
      }

      const hashkey = UserService.hashpassword(user.password)
      user.password = hashkey;
      user = UserService.registerUser(data)

      const data = {
        user: {
          id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });

    } catch (error) {

      return res.send(error.message , "error in controller")

    }
  }

  async loginUser(req, res) {
    try {
      return res.send("hello")
    } catch (error) {
      return res.send(error.message)
    }
  }

  async getUser(req, res) {
    try {
      return res.send("user")
    } catch (error) {
      return res.send(error.message)
    }
  }
}

module.exports = UserController;