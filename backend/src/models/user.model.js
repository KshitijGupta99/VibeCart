const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  address: String,
  contact: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
