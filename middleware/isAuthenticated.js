// import User model
const User = require("../models/User");

// function to authenticate request from client
const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  //   console.log(token);
  if (token) {
    const user = await User.findOne({ token: token.replace("Bearer ", "") });
    if (!user) {
      res.json({ error: "Unauthorized" });
    } else {
      req.user = user; // creates a "user" key in req. In route, one can call req.user
      next(); // allows to go back into route (needed otherwise there would never be a res in route)
    }
  } else {
    res.json({ error: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
