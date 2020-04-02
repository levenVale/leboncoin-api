// import packages
require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const stripe = require("stripe")("sk_test_ubPwJpOzNRjLkK7PKmfEke6E00a485nHD7");

const formidableMiddleWare = require("express-formidable");
app.use(formidableMiddleWare({ multiples: true }));

// create MongoDB connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// import models
const UserRoutes = require("./routes/user");
app.use(UserRoutes);
const OfferRoutes = require("./routes/offer");
app.use(OfferRoutes);

// home route
app.get("/", (req, res) => {
  try {
    res.json({ message: "Welcome to leboncoin" });
  } catch (error) {
    res.status(404).json({ message: "Page not found" });
  }
});

// payment route
app.post("/payment", async (req, res) => {
  const stripeToken = req.fields.stripeToken;
  const price = req.fields.amount * 100;
  const description = req.fields.description;

  // create transaction
  const response = await stripe.charges.create({
    amount: price,
    currency: "eur",
    description: `Leboncoin - ${description}`,
    source: stripeToken
  });

  // TODO
  // save transaction in MongoDB
  res.json("Transaction done");
});

// all routes
app.get("*", (req, res) => {
  res.json({ message: "Route not found" });
});

// listen for server
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
