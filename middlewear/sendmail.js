const nodemailer = require("nodemailer");

module.exports = {
  sendOTP: async (recipientEmail, otpMessage) => {
    try {
      var transporter = nodemailer.createTransport({
        // host: "sandbox.smtp.mailtrap.io",
        // port: 2525,
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: "parvinder75289@gmail.com",
          pass: "xyjnmbfztxdxuyor",
        },
      });

     
      const mailOptions = {
        from: "singhparvinder@gmail.com",
        to: recipientEmail,
        subject: "Your OTP",
        text: otpMessage,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log("OTP email sent successfully");
    } catch (error) {
      console.error("Error sending OTP email:", error);
      throw error; // You may want to rethrow the error to handle it in the calling code
    }
  },
};
// const nodemailer = require('nodemailer');

// // Create a transporter using your email service's SMTP settings
// var transporter = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "16dffb1e220d53",
//     pass: "88df9024f9b019"
//   }
// });

// // Function to send OTP via email
// async function sendOTP(email, otp) {
//   try {
//     // Define email data
//     const mailOptions = {
//       from: 'your-email@gmail.com',
//       to: email,
//       subject: 'Your OTP',
//       text: `Your OTP: ${otp}`,
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.error('Error sending email: ' + error);
//   }
// }

// // Usage
// const ownerEmail = 'recipient@example.com'; // Replace with the recipient's email address
// const otp = Math.floor(1000 + Math.random() * 9000); // Generate OTP

// // Call the sendOTP function
// sendOTP(ownerEmail, otp);
