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


router.post("/signup",signupcontroller.create)
router.post("/verifyotp",signupcontroller.verifyotp);

router.post('/login',logincontroller.login1)

//..............category.................//

router.post('/categoryadd',categorycontroller.addCategory)
router.post('/subcategoryadd',categorycontroller.addSubcategory)

//..........details..................//
// router.post("/BasicDetails",basicdetailscontroller.details)
router.put("/updatedetails/:id",basicdetailscontroller.updatedetails)
router.put("/education/:id",educationcontroller.education)
router.put("/expereince/:id",experiencecontroller.experience)
router.put('/address/:id',addresscontroller.address)


router.post("/addcontent",addcontroller.addcontent)

//........frogetpassword....
router.post("/forgetpassword",logincontroller.forgetpassword)

//........changedpassword......
router.post("/changedpassowrd/:id",logincontroller.changepassword)
router.post("/editprofile/:id",editcontroller.editprofle)


router.get("/getprofile/:id",getprofile.getprofle)

module.exports = router;
