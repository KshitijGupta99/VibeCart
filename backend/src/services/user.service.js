const { UserRepository } = require("../repositories")

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(userData){
    try {
      //userRep[ository.create 
      let user = UserRepository.register(data);
      return user;
      
    } catch (error) {
      throw error.message;
    }
  }

  async getUserById(id) {
  }

  async matchcreds(user){
    try {
      const userFromDb = await UserRepository.findByEmail(user.email);
      if(userFromDb){
        return false;
      }
      userFromDb = await UserRepository.findByUsername(user.username);
      if(userFromDb){
        return false;
      }
      

      return userFromDb;
    } catch (error) {
      throw error.message;
    }
  }

  async hashpassword(password){
    const salt = await bcrypt.genSaltSync(10);
    const hashkey = await bcrypt.hashSync(password, salt);
    return hashkey;
  }




}

module.exports = UserService;