var express = require('express');
const signupcontroller = require('../api/signupcontroller');
const logincontroller = require('../api/logincontroller');
const categorycontroller = require('../api/categorycontroller');
const basicdetailscontroller = require('../api/basicdetailscontroller');
const educationcontroller = require('../api/educationcontroller');
const experiencecontroller = require('../api/experiencecontroller');
const addresscontroller = require('../api/addresscontroller');
const addcontroller = require('../api/addcontroller');
const editcontroller = require('../api/editcontroller');
const getprofile = require('../api/getprofile');
var router = express.Router();


router.post("/signup", signupcontroller.create)
router.post("/verifyotp", signupcontroller.verifyotp);

router.post('/login', logincontroller.login1)

//..............category.................//

router.post('/categoryadd', categorycontroller.addCategory)
router.post('/subcategoryadd', categorycontroller.addSubcategory)

//..........details..................//
// router.post("/BasicDetails",basicdetailscontroller.details)
router.post("/updatedetails", basicdetailscontroller.updatedetails)
router.post("/education", educationcontroller.education)
router.post("/experience", experiencecontroller.experience)
router.put('/address/:id', addresscontroller.address)


router.post("/addcontent", addcontroller.addcontent)

//........frogetpassword....
router.post("/forgetpassword", logincontroller.forgetpassword)
// router.get("/otpfills", logincontroller.verifyotp)

//........changedpassword......
router.post("/changedpassowrd/:id", logincontroller.changepassword)
router.post("/editprofile/:id", editcontroller.editprofle)


router.get("/getprofile/:id", getprofile.getprofle)
router.post("/rolelistening",signupcontroller.rolelistening)

module.exports = router;
