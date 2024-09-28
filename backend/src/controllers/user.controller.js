const { UserService } = require("../services")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;


class UserController {

  constructor() {
    this.userService = new UserService();
  }

  registerUser = async (req, res) => {
    try {
      // Check if user already exists
      if (await this.userService.matchcreds(req.body)) {
        return res.status(401).json("User with these details already exists");
      }

      // Create the new user object matching your schema
      let user = {
        username: req.body.username,  
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,  // Assuming you also want to accept address
        contact: req.body.contact,  // Assuming you also want to accept contact
      };

      // Hash the password before saving the user
      const hashKey = await this.userService.hashpassword(user.password);
      user.password = hashKey;

      // Save the user to the database using UserService
      const savedUser = await this.userService.registerUser(user);

      // Prepare JWT token
      let token = await this.userService.authtokenGen(savedUser);
      res.json({ token });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error in controller", error: error.message });
    }
  }




  loginUser = async (req, res) => {

    try {
      const { username, password } = req.body;

      let user = await this.userService.findByUsername(username);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });
      console.log("user opassword is" , user);
      if (!user.password) return res.status(400).json({ message: "No password found for this user" });

      let userValid = await this.userService.comparePassword(password, user.password);     //matching password 
      if (!userValid) return res.status(401).json({ error: "Invalid credentials" });

      let token = await this.userService.authtokenGen(user);
      res.json({ token });

    } catch (error) {
      return res.send(error.message)
    }
  }

  getUser = async (req, res)=> {
    try {
      const {id} = req.body;
      let user = await this.userService.getUserById(id)
      return res.send("user")

    } catch (error) {
      return res.send(error.message)
    }
  }
}

module.exports = UserController;