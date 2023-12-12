const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Validator } = require("node-input-validator");
const User = require("../models/usermodels");
const helper = require("../middlewear/helper");
const Emailsend = require("../middlewear/sendmail")

module.exports = {
  login1: async (req, res) => {
    try {
      const { yourEmail, password } = req.body;

      const v = new Validator(req.body, {
        yourEmail: 'required|email',
        password: 'required',
      });

      let errorsResponse = await helper.checkValidation(v);

      if (errorsResponse) {
        return helper.failed(res, { message: errorsResponse["YourEmail"] });
      }

      const isUserExist = await User.findOne({
        where: {yourEmail},
      });

      if (!isUserExist) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const isPasswordValid = await bcrypt.compareSync(password, isUserExist.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const jwtSecretKey = 'your-secret-key'; 
      const newToken = jwt.sign({ id: isUserExist.id }, jwtSecretKey);

      isUserExist.token = newToken;
      await isUserExist.save();

      res.json({ token: newToken }); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },
  
    forgetpassword: async (req, res) => {
      try {
        const { yourEmail } = req.body;
  
        const v = new Validator(req.body, {
          yourEmail: 'required|email',
        });
  
        let errorsResponse = await helper.checkValidation(v);
  
        if (errorsResponse) {
          return helper.failed(res, { message: errorsResponse["YourEmail"] });
        }


      const otp = Math.floor(1000 + Math.random() * 9000);
      const ownerEmail = req.body.yourEmail;
  
        const user = await User.findOne({
          where: { yourEmail },         
        });
  
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }

        await Emailsend.sendOTP(ownerEmail, `Your OTP: ${otp}`);

        res.json({ message: 'OTP sent successfully. Check your email.' });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
    },
    changepassword:async(req,res)=>{
      try {
        const { oldpassword, newpassword, confirmpassword } = req.body;

        const userId = req.params.id
          const v = new Validator(req.body,{
            oldpassword:"required",
            newpassword:"required|minLength:6|maxLength:6",
            confirmpassword:"required|minLength:6|maxLength:6"
          })  

          if(newpassword !== confirmpassword){
            return helper.failed(res,"confirmpassword not match")
          }
           let errorsResponse= await helper.checkValidation(v);


           if(errorsResponse){
            return helper.failed(res.errorsResponse)
           }
           const isuserok = await User.findOne({
            where:{id:userId}
           }) 

          if(!isuserok){
            return res.status(400).json({error:"user not find"})
          }

          console.log("oldPassword ===========================> ",oldpassword);
          console.log("isokpass ===========================> ",isuserok.password);


          const isoldpassword = await bcrypt.compareSync(oldpassword, isuserok.password)

          if(isoldpassword){
            const hashedNewPassword = await bcrypt.hash(newpassword, 10)
            
          isuserok.password = hashedNewPassword;
          await isuserok.save();

          res.json({message:"password changed succesfully"})
          }
          

      } catch (error) {
        console.log(error);
        res.status(500).send("internal error")
      }
    }
    
  }
