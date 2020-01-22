const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const isAuthenticated = require("../middleware/isAuthenticated");

// SIGN UP
router.post("/user/sign_up", async (req, res) => {
  try {
    const token = uid2(64);
    const salt = uid2(64);
    const hash = SHA256(req.fields.password + salt).toString(encBase64);

    const newUser = new User({
      email: req.fields.email,
      token: token,
      salt: salt,
      hash: hash,
      account: {
        username: req.fields.username,
        phone: req.fields.phone
      }
    });
    if (!newUSer.password || !newUser.account.username || !newUser.email) {
      res.status(400).json("User information missing");
    } else {
      await newUser.save();
      res.json({
        _id: newUser._id,
        token: newUser.token,
        account: newUser.account
      });
    }
  } catch (error) {
    res.json(error.message);
  }
});

// LOG IN
router.post("/user/log_in", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    if (user) {
      if (
        SHA256(req.fields.password + user.salt).toString(encBase64) ===
        user.hash
      ) {
        res.json({
          _id: req.fields._id,
          token: user.token,
          account: user.account
        });
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.status(400).json("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: "An error has occurred" });
  }
});

// test to see if user is logged in
router.post("/user/test", isAuthenticated, async (req, res) => {
  console.log(req.user);
  res.json({ message: "test route" });
});

module.exports = router;
