const { CouponModel } = require("../models/coupon.model");

const getCoupons = async (req, res) => {
  try {
    const [coupons, totalCount] = await Promise.all([
      CouponModel.find(),
      CouponModel.countDocuments(),
    ]);
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("x-total-count", totalCount);

    return res.status(200).json(coupons);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const addCoupon = async (req, res) => {
  try {
    const newCoupon = new CouponModel(req.body);
    await newCoupon.save();
    return res.status(200).json(newCoupon);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = { getCoupons, addCoupon };
