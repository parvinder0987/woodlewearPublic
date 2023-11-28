const helper = require("../middlewear/helper");
const AddContent = require("../models/addcontentmodel")

module.exports={
    addcontent:async(req,res)=>{
        try {
            let file = null;
        
            if (req.files && req.files.file) {
              file = req.files.file;
              file = await helper.fileUpload(file);
            }
        
            const adddata = await AddContent.create({
              content_type: req.body.content_type,
              subject: req.body.subject,
              categoryId: req.body.categoryId,
              subcategoryId: req.body.subcategoryId,
              title: req.body.title,
              description: req.body.description,
              file: file,
            });
        
            console.log(adddata, "==========================");
        
            return res.status(200).send({
              message: "added successfully",
              data: adddata,
              success: true,
            });
        
          } catch (error) {
            console.log("error:", error.message);
            return res.status(500).send({
              message: "do not add",
              success: false,
              error: error.message,
            });
          }
}
}