const helper = require("../middlewear/helper");
const User = require("../models/usermodels");

module.exports={
    address:async(req,res)=>{
        try {

            let uploadproof = null;

            if (req.files && req.files.uploadproof) {
                uploadproof = req.files.uploadproof;
                uploadproof = await helper.fileUpload(uploadproof);
            }
            console.log(uploadproof);

            const userId = req.params.id
            const olddata = await User.update({
                address:req.body.address,   
                idproof:req.body.idproof,
                uploadproof:uploadproof

            },{where:{id:userId}})
            console.log(olddata,"============");
            return res.status(200).send({
                message:"succesfuly updated",
                data:olddata,
                success:true
            })
        } catch (error) {
            console.log("error");
            return res.status(500).send({
                message:"internal server  error ",
                success:false
            })
        }
    }
}