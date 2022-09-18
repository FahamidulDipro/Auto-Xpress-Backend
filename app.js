const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const router = require("./routes/Product.route");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

//Posting to database
app.use("/api/v1", router);

module.exports = app;
