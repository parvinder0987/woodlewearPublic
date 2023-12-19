const User = require("../models/usermodels")

module.exports={
    deleteuser:async(req,res)=>{
        try {
            const userID = req.body.id

            const user = await User.destroy({where:{id:userID}})
            
            if(user){
                res.status(200).send("data will be deleted")
            }else{
                res.status(500).send("internal error")
            }
        } catch (error) {
            
        }
    }
}