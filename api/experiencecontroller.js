// const { where } = require("sequelize");
const User = require("../models/usermodels");

module.exports = {
  experience: async (req, res) => {
    try {
      const userId = req.body.id;
  
      const [rowCount] = await User.update(
        {
          experience: req.body.experience,
          description: req.body.description,
          skills: req.body.skills,
        },
        {
          where: { id: userId },
        }
      );
  
      if (rowCount > 0) {
        // Fetch the updated row
        const updatedUser = await User.findOne({ where: { id: userId } });
  
        console.log("Experience updated:", updatedUser);
  
        return res.status(200).send({
          message: "Successfully updated",
          data: updatedUser,
          success: true,
        });
      } else {
        console.log("No rows updated for user with id:", userId);
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      return res.status(500).send({
        message: "Internal error",
        success: false,
      });
    }
  }
  
};
