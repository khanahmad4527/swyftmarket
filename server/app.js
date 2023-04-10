const express = require("express");
const cors = require("cors");
const { connection } = require("./config/database.js");
const {
  singleProductRouter,
  productsRouter,
  cartRouter,
  addressRouter,
  orderRouter,
  couponRouter,
} = require("./routes/user.route");
const { userAuthRoute } = require("./routes/user.auth.route");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/user/auth", userAuthRoute);

/** single product route */
app.use("/product", singleProductRouter);

/** products route */
app.use("/products", productsRouter);

/** cart route */
app.use("/cart", cartRouter);

/** address route */
app.use("/address", addressRouter);

/** orders route */
app.use("/orders", orderRouter);

/** coupons route */
app.use("/coupons", couponRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  console.log(`Listening to server on PORT ${PORT}`);
});
