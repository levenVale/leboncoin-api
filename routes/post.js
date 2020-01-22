const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

const isAuthenticated = require("../middleware/isAuthenticated");

// CREATE
router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    const newPost = await new Post({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      created: new Date(),
      creator: req.user.populate("account")
    });

    if (req.fields.description.length > 500) {
      return res
        .status(400)
        .json({ message: "Description must be 500 characters or less" });
    }
    if (req.fields.title.length > 50) {
      return res
        .status(400)
        .json({ error: "Title must be 50 characters or less" });
    }
    if (req.fields.price > 100000) {
      return res.status(400).json({ error: "Price must be 100 000 or less" });
    } else {
      res.json({
        _id: newPost._id,
        title: newPost.title,
        price: newPost.price,
        created: newPost.created,
        creator: {
          account: { username: newPost.creator.account.username },
          _id: newPost.creator.id
        }
      });
      await newPost.save();
    }
  } catch (error) {
    res.json(error.message);
  }
});

// READ
router.get("/offer/with-count", async (req, res) => {
  try {
    let allPosts = await Post.find();
    let count = allPosts.length;
    const resPerPage = req.query.limit;
    let page = req.query.skip / resPerPage + 1;

    res.json(page);
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
