const stripe = require("stripe");

module.exports ={
cutomer:async(req,res)=>{
    try {
        
    } catch (error) {
        console.log("error",error)
        return res.status(400).send("internal error ",error)
    }
}
}
