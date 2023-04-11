const express = require("express");
const router = express.Router();


/****************** controllers ***********************/
const { login, signup, checkEmailVerification } = require("../controllers/user.auth");
const { getProducts, getSingleProduct } = require("../controllers/products");
const { getCart, addCart, updateCart, deleteCart, emptyCart } = require("../controllers/cart");
const { getAddress, addAddress, updateAddress, deleteAddress } = require("../controllers/address");
const { getOrders, addOrder } = require("../controllers/orders");
const { getCoupons } = require("../controllers/coupon");
const { generateOTP, sendEmail, verifyOTP } = require("../controllers/verify.otp")
const { generateResetOTP, sendResetEmail, resetPassword } = require("../controllers/reset.password");


/********************** middleware ***********************/
const { validator } = require("../middlewares/validator");


/********************** user routes *****************************/
router.post("/user/auth/register", signup);
router.post("/user/auth/login", login);
router.post("/user/auth/detail", checkEmailVerification);


/********************** verify routes *****************************/
router.post("/user/verify/generateotp", generateOTP);
router.post("/user/verify/sendemail", sendEmail);
router.post("/user/verify/verifyemail/:userId", verifyOTP);


/********************** reset routes *****************************/
router.post("/user/reset/generateotp", generateResetOTP);
router.post("/user/reset/sendemail", sendResetEmail);
router.post("/user/reset/resetpassword/:userId", resetPassword);


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