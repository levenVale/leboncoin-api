const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: { type: String, unique: true, required: true },
  token: String,
  salt: String,
  hash: String,
  account: {
    username: { type: String, required: true },
    phone: String
  }
});

module.exports = User;
