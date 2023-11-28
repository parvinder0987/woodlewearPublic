const jwt = require("jsonwebtoken");
const User  = require("../models/usermodels")
const secretKey = "your-secret-key";
module.exports = {
  authenticateJWT: async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, secretKey, async (err, user) => {
        
        if (err) {
          return res.sendStatus(403);
        }

        let userInfo = await User.findOne({
          _id: user.userId,
        });
        if (userInfo) {
          userInfo = JSON.parse(JSON.stringify(userInfo));
          req.user = userInfo;
          console.log(req.user);
          next();
        } else {
         
        }
      });
    } else {
      res.sendStatus(401);  
    }
  },
//  fileUpload:  async(files, folder = "users")=>{
//     const file_name_string = files.name;
//     const file_name_array = file_name_string.split(".");
//     const file_ext = file_name_array[file_name_array.length - 1];

//     const letters = "ABCDE1234567890FGHJK1234567890MNPQRSTUXY";
//     let result = "";

//     while (result.length < 28) {
//       const rand_int = Math.floor(Math.random() * 19 + 1);
//       const rand_chr = letters[rand_int];
//       if (result.substr(-1, 1) !== rand_chr) result += rand_chr;
//     }

//     const resultExt = `${result}.${file_ext}`;

//     console.log("🚀  file: file.js:2--1  fileUpload ~ resultExt:", resultExt);
//     await files.mv(`public/images/${folder}/${resultExt}`, function (err) {
//       if (err) {
//         throw err;
//       }
//     });

//     return `/images/${folder}/${resultExt}`;
//   },
};
