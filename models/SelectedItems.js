const mongoose = require("mongoose");

const selectedItems = mongoose.Schema({}, { collection: "selected-items" },  { timestamps: true });

exports.SelectedItems = mongoose.model("SelectedItems", selectedItems);
