const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false, required: true },
    OTP: { type: String, default: "" },
    expiry: { type: Number, default: Date.now() },
    session: { type: Boolean, default: false, required: true },
    role: {
      type: String,
      enum: ["admin", "user", "superadmin"],
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
