const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: { type: String, unique: true },
  token: String,
  salt: String,
  hash: String,
  account: {
    username: String,
    phone: String
  }
});

module.exports = User;
