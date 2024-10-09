const { UserRepository } = require("../repositories");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken')


class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // Register user method
  async registerUser(userData) {
    try {
      console.log("userdata is ", userData);
      const user = await this.userRepository.createUser(userData); // Use instance method
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Match credentials to check if user exists by email or username
  async matchcreds(user) {
    try {
      // Check if a user with this email exists
      let userFromDb = await this.userRepository.findByEmail(user.email);
      if (userFromDb) {
        return userFromDb; // Return the user object if found
      }

      // Check if a user with this username exists
      userFromDb = await this.findByUsername(user.username)
      return null; // Return null if no user is found
    } catch (error) {
      throw new Error(error.message);
    }
  }
  findByUsername = async (username) => {
    try {
      let userFromDb = await this.userRepository.findByUsername(username);
      if (userFromDb) {
        return userFromDb; // Return the user object if found
      }else{
          return false;
      }
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

  comparePassword = async (passgiven, userpass) => {
    try {
      if (!passgiven || !userpass) {
        throw new Error("Password or hash missing.");
      }
      let password = await this.hashpassword(passgiven)
      console.log("password is now ", password, "user pass is", userpass, "and they are true or not", password == userpass)
      //const isMatch = await bcrypt.compare(passgiven, userpass);
      //console.log(isMatch, passgiven, userpass);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }

  }

  // Hash password
  async hashpassword(password) {
    try {
      const salt = await bcrypt.genSalt(10); // Async salt generation
      const hashkey = await bcrypt.hash(password, salt); // Async password hashing
      return hashkey;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  authtokenGen = async (user) => {
    try {
      const data = {
        user: {
          id: user.id
        }
      };
      const authtoken = await jwt.sign(data, JWT_SECRET);

      // Send response with the token
      return (authtoken);
    } catch (error) {
      throw new Error(error.message);
    }

  }

  // Method to get user by ID (placeholder)
  async getUserById(id) {
    try {
      let user = UserRepository.findById(id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
    // Implement logic to get user by ID if needed
  }

}

module.exports = UserService;
