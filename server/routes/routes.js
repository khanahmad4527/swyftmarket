const express = require("express");
const router = express.Router();


/****************** controllers ***********************/
const { login, signup } = require("../controllers/user.auth");
const { getProducts, getSingleProduct } = require("../controllers/products");
const { getCart, addCart, updateCart, deleteCart, emptyCart } = require("../controllers/cart");
const { getAddress, addAddress, updateAddress, deleteAddress } = require("../controllers/address");
const { getOrders, addOrder } = require("../controllers/orders");
const { getCoupons } = require("../controllers/coupon");


/********************** middleware ***********************/
const { validator } = require("../middlewares/validator");


/********************** user routes *****************************/
router.post("/user/auth/register", signup);
router.post("/user/auth/login", login);


/********************** verify routes *****************************/
router.post("/user/auth/generate-otp", generateOTP);
router.post("/user/auth/send-email", sendEmail);
router.post("/user/auth/verify-email", verifyEmail);


/********************** product routes *****************************/
router.get("/product/:productId", getSingleProduct);
router.get("/products", getProducts);


/********************** coupon routes *****************************/
router.get("/coupons", getCoupons);


/********************** cart routes *****************************/
router.get("/cart", validator, getCart);
router.post("/cart/add", validator, addCart);
router.patch("/cart/update/:cartId", validator, updateCart);
router.delete("/cart/delete/:cartId", validator, deleteCart);
router.delete("/cart/emptycart", validator, emptyCart);


/********************** address routes *****************************/
router.get("/address", validator, getAddress);
router.post("/address/add", validator, addAddress);
router.patch("/address/update/:addressId", validator, updateAddress);
router.delete("/address/delete/:addressId", validator, deleteAddress);


/********************** order routes *****************************/
router.get("/orders", validator, getOrders);
router.post("/orders/add", validator, addOrder);


module.exports = { router };