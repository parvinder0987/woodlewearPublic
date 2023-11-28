const User = require("../models/usermodels");


module.exports ={
 experience:async(req,res)=>{
    try {
        
        const userId = req.params.id

        const  retaildata = await User.update({
            experience:req.body.experience,
            description:req.body.description,
            skills:req.body.skills
        },{
            where:{id:userId}
        })
     console.log(retaildata,"==========================");
     return res.status(200).send({
        message:"succesfully updated",
        data: retaildata,
        success:true
     })
    } catch (error) {
        console.log("error not responding");
        return res.status(500).send({
            message:"internal error",
            success:false
        })
    }
 }
}
