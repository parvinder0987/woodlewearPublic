const nodemailer = require("nodemailer");
const User = require("../models/usermodels");
// const { userId } = require("./helper");

module.exports = {
  sendOTP: async (otpMessage) => {
    try {

      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "parvinder75289@gmail.com",
          pass: "xyjnmbfztxdxuyor"
        }
      });

      const mailOptions = {
        from: "parvinder75289@gmail.com",
        to: "sramandeepsingh7382@gmal.com",
        subject: "Your OTP",
        text: otpMessage
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      return true
      console.log("OTP email sent successfully");
    } catch (error) {
      console.error("Error sending OTP email:", error);
      console.log(error)
      throw error;
    }
  },

};
