const { UserRepository } = require("../repositories");
const bcrypt = require("bcryptjs");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // Register user method
  async registerUser(userData) {
    try {
      const user = await this.userRepository.register(userData); // Use instance method
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
      userFromDb = await this.userRepository.findByUsername(user.username);
      if (userFromDb) {
        return userFromDb; // Return the user object if found
      }

      return null; // Return null if no user is found
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

  // Method to get user by ID (placeholder)
  async getUserById(id) {
    // Implement logic to get user by ID if needed
  }
}

module.exports = UserService;
