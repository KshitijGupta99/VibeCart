const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  user_id: String,
  username: String,
  email: String,
  password: String,
  address: String,
  contact: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
