const otpGenerator = require("otp-generator");
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
        await UserModel.findByIdAndUpdate(userId, { emailOTP: OTP });
        return res.status(201).json({ OTP });
      } else if (isEmailVerified) {
        return res.status(200).json({ message: "Already Verified" });
      }
    } else {
      return res.status(404).json({ message: "User Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const sendEmail = async (req, res) => {
  const { code, userId } = req.body;

  try {
    const userExist = await UserModel.findById(userId);
    if (userExist) {
      const { email, isEmailVerified } = userExist;
      if (!isEmailVerified) {
        try {
          await sendEmail({
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
                  </style>
                </head>
                <body>
                  <div class="header">
                    <h1>Welcome to SwyftMarket</h1>
                  </div>
                  <div class="content">
                    <p>Thank you for registering with SwyftMarket. Please enter the below OTP to verify your account.</p>
                    <p>Your OTP is: ${code}</p>
                  </div>
                </body>
              </html>`,
          });
          res.status(200).json({ message: "Successful" });
        } catch (err) {
          res.status(400).json({ message: err });
        }
      } else if (isEmailVerified) {
        return res.status(200).json({ message: "Already Verified" });
      }
    } else {
      return res.status(404).json({ message: "User Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const verifyEmail = async (req, res) => {
  const { userId } = req.params;
  const { code } = req.body;
  try {
    const userExist = await UserModel.findById(userId);
    if (userExist) {
      const { emailOTP, isEmailVerified } = userExist;

      if (!isEmailVerified) {
        if (emailOTP === code) {
          await UserModel.findByIdAndUpdate(userId, { isEmailVerified: true });
          return res.status(200).json({ message: "Successfully Verified" });
        } else {
          return res.status(409).json({ message: "Invalid OTP" });
        }
      } else {
        return res.status(409).json({ message: "Already Verified" });
      }
    } else {
      return res.status(404).json({ message: "User Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { generateOTP, sendEmail, verifyEmail };
