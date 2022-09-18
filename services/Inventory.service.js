const { Inventory } = require("../models/Inventory");

//Get Inventory Items
exports.getInventoryService = async () => {
    const inventory = await Inventory.find();
    return inventory;
  };
  