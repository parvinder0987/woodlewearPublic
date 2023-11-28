const User = require("../models/usermodels")


module.exports ={
    getprofle:async(req,res)=>{
        try {
             const userId = req.params.id

             const user = await User.findByPk(userId)

             if(!user){
                return res.status(404).json({message:"user not found"}
                
                )
             }
             res.json({user})
        } catch (error) {
        console.log(error,"error");
        res.status(500).json({message:"internal error"})
        }
    }
}