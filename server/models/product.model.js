const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    realPrice: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    image: { type: String, required: true },
    images: { type: [String], required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
