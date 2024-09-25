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
      // Check if user already exists
      if (await this.userService.matchcreds(req.body)) {
        return res.status(401).json("User with these details already exists");
      }

      // Create the new user object
      let user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      });

      // Hash the password before saving the user
      const hashKey = await this.userService.hashpassword(user.password);
      user.password = hashKey;

      // Save the user in the database
      await user.save();

      // Prepare JWT token
      const data = {
        user: {
          id: user.id
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // Send response with the token
      res.json({ authtoken });

    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Error in controller", error: error.message });
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