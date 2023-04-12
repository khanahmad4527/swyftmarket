const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const { sedngridSendEmail } = require("../utils/sendEmail");

const generateResetOTP = async (req, res) => {
  const { email, userId } = req.body;
  const OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  try {
    let userExist;
    if (userId) {
      userExist = await UserModel.findById(userId);
    } else if (email) {
      userExist = await UserModel.findOne({ email });
    }
    if (userExist) {
      const { _id, isEmailVerified } = userExist;
      if (isEmailVerified) {
        await UserModel.findByIdAndUpdate(_id, {
          OTP: OTP,
          expiry: Date.now(),
        });
        return res.status(201).json({ OTP, _id });
      } else if (!isEmailVerified) {
        return res.status(401).json({
          message: "Email verification needed",
          description: "Kindly verify you email account",
        });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const sendResetEmail = async (req, res) => {
  const { code, email, userId } = req.body;

  try {
    let userExist;
    if (userId) {
      userExist = await UserModel.findById(userId);
    } else if (email) {
      userExist = await UserModel.findOne({ email });
    }

    if (userExist) {
      const { email, _id, isEmailVerified } = userExist;
      if (isEmailVerified) {
        try {
          await sedngridSendEmail({
            to: email,
            from: "khanahmad4527@gmail.com",
            subject: "Reset your SwyftMarket password",
            text: "Thank you for registering with SwyftMarket",
            html: `<!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <title>Reset Your Password</title>
                  <style>
                    /* Add some styles here */
                    .header {
                      background-color: #ffd500;
                      padding: 10px;
                      color: #000000;
                      text-align: center;
                    }
              
                    .content {
                      margin: 30px;
                      font-size: 16px;
                    }

                    .button {
                        display: inline-block;
                        margin-top: 30px;
                        padding: 10px 20px;
                        background-color: #ffd500;
                        color: #000000;
                        text-decoration: none;
                        border-radius: 5px;
                      }
                  </style>
                </head>
                <body>
                  <div class="header">
                    <h1>Welcome to SwyftMarket</h1>
                  </div>
                  <div class="content">
                    <p>Thank you for registering with SwyftMarket. Please enter the below OTP to reset your password.</p>
                    <p>Your OTP is: ${code}</p>
                    <a href="${`http://localhost:3000/reset/${_id}/verifyotp`}" class="button">Reset Password</a>
                  </div>
                </body>
              </html>`,
          });
          res.status(200).json({ message: "Successful" });
        } catch (error) {
          res.status(400).json({ message: error });
        }
      } else if (!isEmailVerified) {
        return res.status(401).json({
          message: "Email verification needed",
          description: "Kindly verify you email account",
        });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const verifyResetOTP = async (req, res) => {
  const { code, userId } = req.body;
  try {
    const userExist = await UserModel.findById(userId);
    if (userExist) {
      const { expiry, OTP, isEmailVerified } = userExist;
      if (isEmailVerified) {
        if (code === OTP) {
          const timeDiff = Date.now() - expiry;
          if (timeDiff < 600000) {
            await UserModel.findByIdAndUpdate(userId, {
              OTP: "",
              session: true,
            });
            return res.status(201).json({
              message: "OTP Verified",
              description: "Your OTP has been successfully verified.",
            });
          } else {
            return res.status(409).json({
              message: "Invalid OTP",
              description:
                "Sorry, the OTP has expired. Please request a new OTP.",
            });
          }
        } else {
          return res.status(409).json({
            message: "Invalid OTP",
            description: "Please enter a valid 6-digit OTP.",
          });
        }
      } else if (!isEmailVerified) {
        return res.status(401).json({ message: "Kindly verify your email" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const resetPassword = async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;
  try {
    const userExist = await UserModel.findById(userId);
    if (userExist) {
      const { isEmailVerified, session } = userExist;
      if (session && isEmailVerified) {
        const hashedPassword = await bcrypt.hash(password, 12);
        await UserModel.findByIdAndUpdate(userId, {
          hashedPassword,
          session: false,
        });
        return res.status(200).json({ message: "Successfully reset" });
      } else if (!isEmailVerified) {
        return res.status(401).json({
          message: "Email verification needed",
          description: "Kindly verify you email account",
        });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  generateResetOTP,
  sendResetEmail,
  verifyResetOTP,
  resetPassword,
};
