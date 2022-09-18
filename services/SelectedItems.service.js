const { SelectedItems } = require("../models/SelectedItems");

//Get Selected Items
exports.getSelectedItemsService = async () => {
  const selectedItems = await SelectedItems.find();
  return selectedItems;
};

//Insert Selected Items
exports.insertSelectedItemsService = async (data) => {
  const item = await SelectedItems.collection.save(data);
  console.log(data);
  console.log(item);
  return item;
};
