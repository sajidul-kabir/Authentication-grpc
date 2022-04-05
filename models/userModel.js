const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  occupation: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
