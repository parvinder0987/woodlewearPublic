verifyotp: async (req, res) => {
    try {

      const userId = req.params.id

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