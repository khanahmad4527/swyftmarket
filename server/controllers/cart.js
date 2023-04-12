const { CartModel } = require("../models/cart.model");

const getCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const [cartProducts, totalCount] = await Promise.all([
      CartModel.find({ userId }),
      CartModel.countDocuments({ userId }),
    ]);
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("x-total-count", totalCount);

    return res.status(200).json(cartProducts);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const addCart = async (req, res) => {
  try {
    const newCart = new CartModel(req.body);
    await newCart.save();
    return res.status(200).json(newCart);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const updateCart = async (req, res) => {
  const { userId } = req.body;
  const { cartId } = req.params;

  try {
    const productExist = await CartModel.findById(cartId);
    if (productExist.userId === userId) {
      const cartProduct = await CartModel.findByIdAndUpdate(cartId, req.body, {
        new: true,
        strict: "throw",
      });
      return res.status(200).json(cartProduct);
    } else if (Object.keys(productExist).length > 0) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      return res.status(404).json({ message: "Product does not exists" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deleteCart = async (req, res) => {
  const { userId } = req.body;
  const { cartId } = req.params;

  try {
    const productExist = await CartModel.findById(cartId);
    if (productExist.userId === userId) {
      const cartProduct = await CartModel.findByIdAndDelete(cartId);
      return res.status(200).json(cartProduct);
    } else if (Object.keys(productExist).length > 0) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      return res.status(404).json({ message: "Product does not exists" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const emptyCart = async (req, res) => {
  const { userId } = req.body;

  try {
    await CartModel.deleteMany({ userId });
    return res.status(200);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = { getCart, addCart, updateCart, deleteCart, emptyCart };
