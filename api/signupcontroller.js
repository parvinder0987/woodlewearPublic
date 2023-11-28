const User = require("../models/usermodels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Validator } = require("node-input-validator");
const helper = require("../middlewear/helper");
const Emailsend = require("../middlewear/sendmail");
const db = require('../db/dbConfig')

module.exports = {
  create: async (req, res) => {
    const saltRounds = 10;

    try {
      // Input validation
      const v = new Validator(req.body, {
        Name: "required",
        yourEmail: "required|email",
        phoneNumber: "required|integer|minLength:10|maxLength:15",
        password: "required|minLength:6|maxLength:6",
        ConfirmPassword: "required|minLength:6|maxLength:6",
      }); 
      if (req.body.password !== req.body.ConfirmPassword) {
        return helper.failed(res, "Confirm password not match");
      }
        let errorsResponse = await helper.checkValidation(v);

        if (errorsResponse) {
          return helper.failed(res, errorsResponse);
        }

      const otp = Math.floor(1000 + Math.random() * 9000);
      const ownerEmail = req.body.yourEmail;


      // Hash password
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      //.......email//////
      const find_data = await User.findOne({
        where: {
          yourEmail: req.body.yourEmail,
          Role:1
        },
      });
      if (find_data) {
        console.log("user already exist");
        return;
      }
      // Create a new user
      const newUser = User.create({
        Name: req.body.Name,
        yourEmail: req.body.yourEmail,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        Role: req.body.Role,
        OTP: otp
      });

      await Emailsend.sendOTP(ownerEmail, `Your OTP: ${otp}`);

      // Generate a JWT token
      const secretKey = "your-secret-key";
      const userId = newUser._id;
      const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });

      return res.status(200).json({ data:newUser,token:token,message:"usercreate succesfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal server error");
    }
  },

  verifyotp: async (req, res) => {
    try {

      const finddata = await User.findOne({
        where: {
          yourEmail: req.body.yourEmail,
        },
      });

      if (!finddata) {
        return helper.failed(res, "User not found");
      }

      if (req.body.otp != finddata.otp) {
        return helper.failed(res, "Invalid OTP!");
      }

      const verify_otp = await User.update(
        {
          is_otp_verify: 1,
          OTP: 0,
        },
        {
          where: {
            yourEmail: req.body.yourEmail,
          },
        }
      );

      if (verify_otp) {
        return helper.success(res, "OTP matched successfully");
      } else {
        return helper.failed(res, "Error updating OTP");
      }
      // res.json({finddata})
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
