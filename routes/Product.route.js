const express = require("express");
const { getinventoryItems } = require("../controllers/Inventory.controller");
const {
  getProducts,
  createProducts,
 

 
  updateProduct,
  bulkUpdateProduct,
  deleteProduct,
} = require("../controllers/Product.controller");
const { getSelectedItems, insertSelectedItems } = require("../controllers/SelectedItems.controller");
const router = express.Router();

router.route("/products").get(getProducts).post(createProducts);
router.route("/bulk-update").patch(bulkUpdateProduct)
router.route("/delete/:id").delete(deleteProduct)
router.route("/products/:id").patch(updateProduct);
router.route("/selectedItems").get(getSelectedItems).post(insertSelectedItems)
router.route("/inventories").get(getinventoryItems).post()

// router.route("/inventories/:id").update(updateInventoryItems)

module.exports = router;
