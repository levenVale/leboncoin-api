require("dotenv").config();

const cors = require("cors");
app.use(cors());

const express = require("express");
const app = express();

const formidableMiddleWare = require("express-formidable");
app.use(formidableMiddleWare());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const UserRoutes = require("./routes/user");
app.use(UserRoutes);
const OfferRoutes = require("./routes/offer");
app.use(OfferRoutes);

app.get("/", (req, res) => {
  try {
    res.json({ message: "Welcome to leboncoin" });
  } catch (error) {
    res.status(404).json({ message: "Page not found" });
  }
});

app.get("*", (req, res) => {
  res.json({ message: "Route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
