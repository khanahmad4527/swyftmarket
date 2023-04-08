const { OrderModel } = require("../models/order.model");

const getOrders = async (req, res) => {
  const { userId } = req.body;

  try {
    const [userOrders, totalCount] = await Promise.all([
      OrderModel.find({ userId }),
      OrderModel.countDocuments({ userId }),
    ]);
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("x-total-count", totalCount);
    return res.status(200).json(userOrders);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const addOrder = async (req, res) => {
  try {
    const newOrder = new OrderModel(req.body);
    await newOrder.save();
    return res.status(200).json(newOrder);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports = { getOrders, addOrder };
