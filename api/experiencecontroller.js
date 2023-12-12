const User = require("../models/usermodels");


module.exports ={
 experience:async(req,res)=>{
    try {
        const userId = req.body.id;
        const user = await User.findOne({ where: { id: userId } });
    
        if (!user) {
          return res.status(404).send({
            message: "User not found",
            success: false,
          });
        }
    
        const experiencedata = await user.update({
          experience: req.body.experience,
          description: req.body.description,
          skills: req.body.skills,
        });
    
        console.log("experience updated:", experiencedata);
    
        return res.status(200).send({
          message: "Successfully updated",
          data: experiencedata,
          success: true,
        });
      } catch (error) {
        console.error("Error updating experience:", error);
    
        return res.status(500).send({
          message: "Internal error",
          success: false,
        });
      }
 }
}
