const User = require("../models/usermodels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Validator } = require("node-input-validator");
const helper = require("../middlewear/helper");
const Emailsend = require("../middlewear/sendmail");
// const auth = require("../middlewear/auth")
const db = require('../db/dbConfig');
// const { where } = require("sequelize");

module.exports = {
  create: async (req, res) => {
    const saltRounds = 10;

    try {
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

      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      const find_data = await User.findOne({
        where: {
          yourEmail: req.body.yourEmail,
        },
      });
      if (find_data) {
        return res.status(400).send({ message: "user already exist." })
      }
      // console.log('body =============>', req.body);
      const newUser = await User.create({
        Name: req.body.Name,
        yourEmail: req.body.yourEmail,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        role: req.body.role,
        OTP: otp
      });

      await Emailsend.sendOTP(ownerEmail, `Your OTP: ${otp}`);

      const secretKey = "testingEncryption123@";
      const userId = newUser.id;
      const token = jwt.sign({ id: userId }, secretKey, { expiresIn: "1h" });

      await newUser.save()
      return res.status(200).send({ data: newUser.dataValues, token: token, message: "usercreate succesfully" })
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal server error");
    }
  },

  verifyotp: async (req, res) => {
    try {
      const userId = req.body.id;
      const finddata = await User.findOne({ where: { id: userId }, raw: true });
      // console.log('data ==========>', finddata);
      if (!finddata) {
        return helper.failed(res, "User not found");
      }

      if (parseInt(req.body.OTP) != finddata.OTP) {
        return helper.failed(res, "Invalid OTP!");
      }

      const verify_otp = await User.update(
        {
          is_otp_verify: 1,
          OTP: 0,
        },
        {
          where: { id: userId },
        }
      );

      if (verify_otp) {
        return helper.success(res, "OTP matched successfully", finddata);
      } else {
        return helper.failed(res, "Error updating OTP");
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  resendotp: async (req, res) => {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000)
      let data = await User.findByPk(req.user.id)
      console.log(req.user)
      if (!data) {
        return res.status(401).json({ message: "User not found" });
      } else {
        await Emailsend.sendOTP(User.yourEmail, otp)
      }
      const update = User.update({
        OTP: otp
      }, {
        where: { id: data.id }
      })
      if (update == 0) {
        return res.status(404).json({ message: "User not found or OTP already up to date" });
      }
      return helper.success(res, "OTP resent successfully", data)

    } catch (error) {
      console.log(error)
      res.status(400).send("internal error")
    }
  },
  rolelistening: async (req, res) => {
    const userRole = req.body.role;
    try {


      const user = await User.findAll({ where: { role: userRole } })

      if (user) {
        res.status(200).json({ success: true, user })
      } else {
        res.status(406).json({ success: false, message: "No users are available for this role." });
      }


    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });

    }
  }

};
