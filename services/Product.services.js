const { Inventory } = require("../models/Inventory");
const { Product } = require("../models/Product");

exports.getProductsService = async () => {
  const product = await Product.find();
  return product;
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};
//Update selected Item
exports.updateProductService = async (dataId, data) => {
  const product = await Product.updateOne(
    { _id: dataId },
    { $set: data },
    { runValidators: true }
  );
  return product;
};
//Bulk Update Product service
exports.bulkUpdateProductService = async (data) => {
  // result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  const products = [];
  data.ids.forEach((p) => {
    products.push(Product.updateOne({ _id: p.id }, p.data));
  });
  const result = Promise.all(products);
  return result;
};

//Deleting Service
exports.deleteProductService = async (dataId) => {
  const result = await Product.deleteOne({ _id: dataId });
  return result;
};
