const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required:true,
    unique: true
  },
  email: {
    type: String,
    required:true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    min : [6, 'Must be at least 6, got {VALUE}']
  },
  order:{
    type: String
  },
  adress:{
    type: String
  },
  contact:{
    type: Number
  },
  
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('auth',userSchema)
// User.createIndexes();     A simple way to check for same entries for the part with prop unique eg. username
module.exports = User;