const express = require("express");
const app = express();

const formidableMiddleWare = require("express-formidable");
app.use(formidableMiddleWare());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/leboncoin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const UserRoutes = require("./routes/user");
app.use(UserRoutes);
const PostRoutes = require("./routes/post");
app.use(PostRoutes);

app.get("*", (req, res) => {
  res.json({ message: "Route not found" });
});

app.listen(3000, () => {
  console.log("Server started");
});
