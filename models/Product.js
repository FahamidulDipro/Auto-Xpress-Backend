const mongoose = require("mongoose");

//Schema design
const productSchema = mongoose.Schema(
  {
  
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique!"],
      minLength: [3, "Name must be at least three characters"],
      maxLength: [100, "Too large name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for this product"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price for this product"],
      min: [0, "Price can't be negative"],
    },
  
    quantity: {
      type: Number,
      required: [true, "Please provide a quantity for this product"],
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "Quantity must be an integer",
      },
    },
  },
  { timestamps: true }
);

exports.Product = mongoose.model("Product", productSchema);

