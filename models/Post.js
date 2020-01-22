const mongoose = require("mongoose");

const Post = mongoose.model("Post", {
  title: String,
  description: String,
  price: Number,
  created: String,
  creator: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  }
});

module.exports = Post;
