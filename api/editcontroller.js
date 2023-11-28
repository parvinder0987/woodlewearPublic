const User = require('../models/usermodels')

module.exports ={
    editprofle:async(req,res)=>{
        try {
            const userId = req.params.id
            const editdata  = await User.update({
                Name:req.body.Name,
                yourEmail:req.body.yourEmail,
                phoneNumber:req.body.phoneNumber,
                Gender:req.body.Gender,
                role:req.body.role
            },{where:{id:userId}})
            console.log(editdata,"==================");
            return res.status(200).send({
                message:"data will be edit",
                data : editdata,
                success:true
            })
        } catch (error) {
            console.log(error,"please check data")
            return res.status(500).send({
                message:" invalid details",
                success:false
            })
        }
    }
}