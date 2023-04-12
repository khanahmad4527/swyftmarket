const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const validator = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        return res.status(400).json({ message: error });
      }

      const userExist = await UserModel.findById(decoded.id);

      if (userExist) {
        req.body.userId = decoded.id;
        next();
      } else {
        return res.status(404).json({ message: "Not Found" });
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = { validator };
