const otpGenerator = require("otp-generator");
const { sedngridSendEmail } = require("../utils/sendEmail");
const { UserModel } = require("../models/user.model");

const generateOTP = async (req, res) => {
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
      if (!isEmailVerified) {
        await UserModel.findByIdAndUpdate(userId, {
          OTP,
          expiry: Date.now(),
        });
        return res.status(201).json({ OTP });
      } else if (isEmailVerified) {
        return res.status(200).json({ message: "Already Verified" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const sendEmail = async (req, res) => {
  const { code, userId } = req.body;

  try {
    const userExist = await UserModel.findById(userId);
    if (userExist) {
      const { _id, email, isEmailVerified } = userExist;
      if (!isEmailVerified) {
        try {
          await sedngridSendEmail({
            to: email,
            from: "khanahmad4527@gmail.com",
            subject: "Verify your SwyftMarket Account",
            text: "Thank you for registering with SwyftMarket",
            html: `<!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <title>Verify Your Account</title>
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
                    <p>Thank you for registering with SwyftMarket. Please enter the below OTP to verify your account.</p>
                    <p>Your OTP is: ${code}</p>
                    <a href="${`http://localhost:3000/verify/${_id}`}" class="button">Verify Account</a>
                  </div>
                </body>
              </html>`,
          });
          res.status(200).json({ message: "Successful" });
        } catch (error) {
          res.status(400).json({ message: error });
        }
      } else if (isEmailVerified) {
        return res.status(200).json({ message: "Already Verified" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const verifyOTP = async (req, res) => {
  const { userId } = req.params;
  const { code } = req.body;
  try {
    const userExist = await UserModel.findById(userId);
    if (userExist) {
      const { expiry, OTP, isEmailVerified } = userExist;
      if (!isEmailVerified) {
        if (OTP === code) {
          const timeDiff = Date.now() - expiry;
          if (timeDiff < 600000) {
            await UserModel.findByIdAndUpdate(userId, {
              isEmailVerified: true,
              OTP: "",
            });
            return res.status(201).json({
              message: "Account Verified",
              description: "Your account has been successfully verified.",
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
      } else {
        return res.status(200).json({ message: "Already Verified" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { generateOTP, sendEmail, verifyOTP };
