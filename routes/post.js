const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const User = require("../models/User");

router.post("/offer/publish", async (req, res) => {
  try {
    const newPost = await new Post({
      title: req.fields.title,
      description: req.fields.descrition,
      price: req.fields.price,
      created: Date(),
      creator: User.findOne({ token: req.headers.authorization })
    });
    res.json(newPost);
    // await newPost.save()
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
