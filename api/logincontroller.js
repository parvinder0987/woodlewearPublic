const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Validator } = require("node-input-validator");
const User = require("../models/usermodels");
const helper = require("../middlewear/helper");
const Emailsend = require("../middlewear/sendmail")
// const auth = require("../middlewear/auth")

module.exports = {
  login1: async (req, res) => {
    try {
      const { yourEmail, password } = req.body;

      const v = new Validator(req.body, {
        yourEmail: 'required|email',
        password: 'required',
      });

      let errorsResponse = await helper.checkValidation(v);

      if (errorsResponse) {
        return helper.failed(res, { message: errorsResponse["YourEmail"] });
      }

      const isUserExist = await User.findOne({
        where: { yourEmail },
      });

      if (!isUserExist) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const isPasswordValid = await bcrypt.compare(password, isUserExist.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const jwtSecretKey = 'testingEncryption123@';
      const newToken = jwt.sign({ id: isUserExist.id }, jwtSecretKey);

      isUserExist.token = newToken;
      await isUserExist.save();

      res.json({ ...isUserExist?.dataValues, token: newToken });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },

  forgetpassword: async (req, res) => {
    try {
      const { yourEmail } = req.body;

      const v = new Validator(req.body, {
        yourEmail: 'required|email',
      });

      let errorsResponse = await helper.checkValidation(v);

      if (errorsResponse) {
        return helper.failed(res, { message: errorsResponse["YourEmail"] });
      }


      const otp = Math.floor(1000 + Math.random() * 9000);
      const ownerEmail = req.body.yourEmail;

      const user = await User.findOne({
        where: { yourEmail },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      await Emailsend.sendOTP(ownerEmail, `Your OTP: ${otp}`);

      res.json({ message: 'OTP sent successfully. Check your email.' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },
  changepassword: async (req, res) => {
    try {
      const { oldpassword, newpassword, confirmpassword } = req.body;

      const v = new Validator(req.body, {
        oldpassword: 'required',
        newpassword: 'required|min:6',
        confirmpassword: 'required|min:6',
      });

      if (newpassword !== confirmpassword) {
        return helper.failed(res, 'confirmpassword does not match');
      }

      let errorsResponse = await helper.checkValidation(v);

      if (errorsResponse) {
        return helper.failed(res, errorsResponse);
      }

      const isuserok = await User.findByPk(req.user.id);
      if (!isuserok) {
        return res.status(400).json({ error: 'User not found' });
      }

      const isoldpassword = await bcrypt.compare(oldpassword, isuserok.password);
      console.log("oldpassword", oldpassword);

      if (!isoldpassword) {
        return helper.failed(res, 'Old password is incorrect');
      }

      const hashedNewPassword = await bcrypt.hash(newpassword, 10);
      let update = await User.update({
        password: hashedNewPassword
      }, {
        where: {
          id: isuserok.id
        }
      })

      console.log(update, '-=-=--=updae')

      return res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
      console.log(error);
      console.log(error)
      res.status(500).send(error.message);
    }
  }

}
