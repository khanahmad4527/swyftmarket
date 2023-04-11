const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");

const generateResetOTP = async (req, res) => {
  const { userId } = req.body;
  const OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  try {
    const userExist = await UserModel.findById(userId);
    if (userExist) {
      const { isEmailVerified } = userExist;
      if (isEmailVerified) {
        await UserModel.findByIdAndUpdate(userId, {
          OTP: OTP,
          expiry: Date.now(),
          session: true,
        });
        return res.status(201).json({ OTP });
      } else if (!isEmailVerified) {
        return res.status(401).json({ message: "Kindly verify your email" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const sendResetEmail = async (req, res) => {
  const { code, userId } = req.body;

  try {
    const userExist = await UserModel.findById(userId);
    if (userExist) {
      const { email, isEmailVerified } = userExist;
      if (isEmailVerified) {
        try {
          await sendEmail({
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
                    <a href="#" class="button">Reset Password</a>
                  </div>
                </body>
              </html>`,
          });
          res.status(200).json({ message: "Successful" });
        } catch (err) {
          res.status(400).json({ message: err });
        }
      } else if (!isEmailVerified) {
        return res.status(401).json({ message: "Kindly verify your email" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const resetPassword = async (req, res) => {
  const { userId } = req.params;
  const { code, password } = req.body;
  try {
    const userExist = await UserModel.findById(userId);
    if (userExist) {
      const { OTP, isEmailVerified, session } = userExist;
      if (session && isEmailVerified) {
        if (OTP === code) {
          const hashedPassword = await bcrypt.hash(password, 12);
          await UserModel.findByIdAndUpdate(userId, {
            hashedPassword,
            session: false,
            OTP: "",
          });
          return res.status(201).json({ message: "Successfully reset" });
        } else {
          return res.status(409).json({ message: "Invalid OTP" });
        }
      } else if (!isEmailVerified) {
        return res.status(401).json({ message: "Kindly verify your email" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { generateResetOTP, sendResetEmail, resetPassword };
