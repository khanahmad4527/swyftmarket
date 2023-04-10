const express = require("express");
const productsRouter = express.Router();
const singleProductRouter = express.Router();
const cartRouter = express.Router();
const addressRouter = express.Router();
const orderRouter = express.Router();
const couponRouter = express.Router();

const { getProducts, getSingleProduct } = require("../controllers/products");
const {
  getCart,
  addCart,
  updateCart,
  deleteCart,
  emptyCart,
} = require("../controllers/cart");
const {
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/address");
const { getOrders, addOrder } = require("../controllers/orders");
const { getCoupons } = require("../controllers/coupon");
const { validator } = require("../middlewares/validator");

singleProductRouter.get("/:productId", getSingleProduct);

productsRouter.get("/", getProducts);

couponRouter.get("/", getCoupons);

cartRouter.get("/", validator, getCart);

cartRouter.post("/add", validator, addCart);

cartRouter.patch("/update/:cartId", validator, updateCart);

cartRouter.delete("/delete/:cartId", validator, deleteCart);

cartRouter.delete("/emptycart", validator, emptyCart);

addressRouter.get("/", validator, getAddress);

addressRouter.post("/add", validator, addAddress);

addressRouter.patch("/update/:addressId", validator, updateAddress);

addressRouter.delete("/delete/:addressId", validator, deleteAddress);

orderRouter.get("/", validator, getOrders);

orderRouter.post("/add", validator, addOrder);

module.exports = {
  singleProductRouter,
  productsRouter,
  cartRouter,
  addressRouter,
  orderRouter,
  couponRouter,
};
