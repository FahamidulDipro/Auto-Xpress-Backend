//Getting the selected items

const {
  getSelectedItemsService,
  insertSelectedItemsService,
  deleteSelectedItemService,
} = require("../services/SelectedItems.service");

exports.getSelectedItems = async (req, res, next) => {
  const selectedItems = await getSelectedItemsService();
  try {
    res.status(200).json({ status: "Success!", data: selectedItems });
  } catch (error) {
    res.status(400).json({ status: "Failed", error: error.message });
  }
};

//Inserting Selected Items
exports.insertSelectedItems = async (req, res, next) => {
  try {
    const insertedSelectedItem = await insertSelectedItemsService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Data inserted into Selected Items successfully!",
      data: insertedSelectedItem,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

//Deleting Selected Items
exports.deleteSelectedItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedSelectedItem = await deleteSelectedItemService(id);
    res.status(200).json({
      status: "Success",
      message: "Data deleted from Selected Items successfully!",
      data: deletedSelectedItem,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data is not deleted",
      error: error.message,
    });
  }
};
