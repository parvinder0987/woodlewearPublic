const User = require("../models/usermodels")
const helper = require("../middlewear/helper")
module.exports ={
    // details:async(req,res)=>{
    //     try {
            
    //             if(req.files && req.files.image){
    //                 var  image = req.files.image

    //                 if(image) {
    //                     image = await helper.fileUpload(image,"profile")
    //                 }
    //             }

    //             // if (!isValidDate(req.body.DOB)) {
    //             //   return res.status(400).json({
    //             //     status: "error",
    //             //     message: "Invalid date format for DOB",
    //             //   });
    //             // }
    //             let datas = await User.create({
    //                 _id: userId 
    //             },{
    //                 Name: req.body.Name,
    //                 YourEmail: req.body.YourEmail,
    //                 PhoneNumber: req.body.PhoneNumber,
    //                 gender:req.body.gender,
    //                 DOB:req.body.DOB,
    //                 about:req.body.about,
    //                 image:image
    //             })
    //             console.log
    //             res.status(201).json({
    //                 status:"success",
    //                 message:"Profile Updated Successfully!",
    //                 data:datas})
    //     } catch (error) {
    //         console.log(error,"invalid details")
    //         res.status(500).send("internal server error")
    //     }
    //     // function isValidDate(dateString) {
    //     // }
        
    // },
    updatedetails: async (req, res) => {
        try { if(req.files && req.files.image){
                          var  image = req.files.image
      
                          if(image) {
                              image = await helper.fileUpload(image)
                          }
                      }
                      const userId = req.params.id; 
                      console.log("userId============================>",userId)
                      console.log("req.body ==============================>", req.body);
                      console.log("888888888888888888888888888");
                      // const userData = await User.findOne({id: userId})
                      // const userData = await User.update(updatedFields, {
                        
                      // });
                      const userData = await User.update(
                        {
                          Gender: req.body.Gender,
                          DOB: req.body.DOB,
                          about: req.body.about,
                          image: image,
                        },
                        { where: { id: userId } }
                      );
          
    console.log(" ===================================================>",userData);
          return res.status(200).send({
            data: userData,
            message: "User get Successfully",
            success: true,
          });
        } catch (error) {
          return res.status(400).send({
            message: "Entrnal Server Error",
            success: false,
            error: error.message,
          });
        }
      },
}