const { User } = require('../models');

class UserRepository {
  //create user{ User model se create}
  async createUser(userData) {
    try {
      console.log(userData);
      let user = await User.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  findByEmail = async (email) => {
    try {
      let user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  findByUsername = async (username) => {
    try {
      let user = await User.findOne({ username });
      return user;
    } catch (error) {
      throw error;
    }
  }

  findById = async (id)=>{
    try {
      let user = await User.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }


}

module.exports = UserRepository;