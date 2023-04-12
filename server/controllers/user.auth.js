const bcrypt = require("bcrypt");
require("dotenv").config();
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        message:
          "The email address you are trying to register is already in use. Please choose a different email address.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      role: "user",
      hashedPassword,
      isEmailVerified: false,
      OTP: "",
      expiry: Date.now(),
      session: false,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Registration successful.", userId: newUser._id });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      const {
        _id: id,
        firstname,
        lastname,
        email,
        role,
        hashedPassword,
        isEmailVerified,
      } = userExist;
      const isCorrect = await bcrypt.compare(password, hashedPassword);
      if (!isCorrect) {
        return res.status(401).json({
          message: "Incorrect Password",
          description: "Please enter correct password.",
        });
      } else if (!isEmailVerified) {
        return res.status(401).json({
          message: "Email verification needed",
          description: "Kindly verify you email account",
          id,
        });
      } else {
        jwt.sign(
          { id, firstname, lastname, email, role },
          process.env.JWT_SECRET,
          {
            expiresIn: "3d",
          },
          (error, token) => {
            if (error) {
              return res.status(500).json({ message: error });
            }
            res.status(200).json({
              message: "Login Successful",
              token,
              userData: { id, firstname, lastname, email, role },
            });
          }
        );
      }
    } else {
      return res.status(404).json({
        message: "User not found. Please check your email and try again.",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getUserDetail = async (req, res) => {
  const { userId } = req.body;
  try {
    let userExist = await UserModel.findById(userId);
    if (userExist) {
      return res.status(200).json(userExist);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateUserDetail = async (req, res) => {
  const { userId, password, email } = req.body;
  console.log("user", req.body);
  try {
    let userExist = await UserModel.findById(userId);
    if (userExist) {
      if (userExist._id.toString() === userId) {
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 12);

          await UserModel.findByIdAndUpdate(userId, { hashedPassword });
          return res.status(200).json({
            message: "successfully Updated",
            description: "We have successfully updated your password",
          });
        } else {
          if (userExist.email === email) {
            await UserModel.findByIdAndUpdate(userId, req.body);
            return res.status(200).json({
              message: "successfully Updated",
              description: "We have successfully updated your details",
            });
          } else {
            const isEmailExist = await UserModel.findOne({ email });
            if (isEmailExist) {
              return res.status(409).json({
                message: "Email not available",
                description:
                  "Email address is already in use. Please provide a different email address.",
              });
            } else {
              await UserModel.findByIdAndUpdate(userId, req.body);
              return res.status(200).json({
                message: "successfully Updated",
                description: "We have successfully updated your details",
              });
            }
          }
        }
      } else {
        return res.status(401).json({
          message: "Unauthorized",
          description: "You are not authorized to edit",
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found",
        description: "Kindly signup to create an account",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { login, signup, getUserDetail, updateUserDetail };
