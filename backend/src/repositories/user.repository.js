const { User } = require('../models');

class UserRepository {
  constructor() {

  }
  //create user{ User model se create}
  async registerUser(userData) {
    try {
      let user = await User.create(userData);
      return user;
    } catch (error) {
      throw error;
    }

  }


}

module.exports = UserRepository;