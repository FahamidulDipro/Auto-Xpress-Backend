//Getting the inventory items

const { getInventoryService } = require("../services/Inventory.service");

exports.getinventoryItems = async (req, res, next) => {
    const inventoryItems = await getInventoryService();
    try {
      res.status(200).json({ status: "Success!", data: inventoryItems });
    } catch (error) {
      res.status(400).json({ status: "Failed", error: error.message });
    }
  };

  //Updating Inventory Items
// exports.updateInventoryItems = async(req,res,next)=>{
//   const updatedInventory = await updatedInventoryService();
//   try {
//     res.status(200).json({status:"Update Success!",data:updatedInventory})
//   } catch (error) {
//     res.status(400).json({ status: "Failed To Update", error: error.message });
//   }
// }