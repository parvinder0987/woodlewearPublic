const User = require("../models/usermodels")
const helper = require("../middlewear/helper")
module.exports = {

  updatedetails: async (req, res) => {
    try {
      if (req.files && req.files.image) {
        var image = req.files.image

        if (image) {
          image = await helper.fileUpload(image)
        }
      }
      console.log(image);
      const userId = req.body.id;
      const { Gender, DOB, about } = req?.body;
      const daatForUpdate = {
        Gender, DOB, about, image
      }
      const userData = await User.update(
        daatForUpdate,
        { where: { id: userId } }
      );

      console.log(" ===================================================>", userData);
      return res.status(200).send({
        data: userData.dataValues,
        message: "User get Successfully",
        success: true,
      });
    } catch (error) {
      console.log('error =========>', error);
      return res.status(400).send({
        message: "Entrnal Server Error",
        success: false,
        error: error.message,
      });
    }
  },
}