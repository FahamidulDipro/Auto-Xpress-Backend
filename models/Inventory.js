const mongoose = require("mongoose");

const inventoryItems = mongoose.Schema({}, { collection: "inventory" });

exports.Inventory = mongoose.model("Inventory", inventoryItems);
