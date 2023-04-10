const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  type: { type: String, required: true },
  minimumSpend: { type: Number, required: true },
  expires: { type: Date, required: true },
  description: { type: String, required: true },
});

const CouponModel = mongoose.model("coupon", couponSchema);

module.exports = { CouponModel };
