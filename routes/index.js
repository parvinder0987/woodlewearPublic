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
const deletecontroller = require('../api/deletecontroller');
const viewpage = require('../api/viewpage');
// const { authenticateJWT } = require('../middlewear/auth');
const { resendotp } = require('../middlewear/sendmail');
const { authenticateJWT } = require('../middlewear/helper');
const customer = require('../api/payemnt/customer');
var router = express.Router();


router.post("/signup", signupcontroller.create)
router.post("/verifyotp", signupcontroller.verifyotp);
router.post("/resendotp", authenticateJWT, signupcontroller.resendotp)

router.post('/login', logincontroller.login1)

//..............category.................//

router.post('/categoryadd', categorycontroller.addCategory)
router.post('/subcategoryadd', categorycontroller.addSubcategory)

//..........details..................//
// router.post("/BasicDetails",basicdetailscontroller.details)
router.post("/updatedetails", basicdetailscontroller.updatedetails)
router.post("/education", educationcontroller.education)
router.post("/experience",authenticateJWT, experiencecontroller.experience)
router.put('/address/:id', addresscontroller.address)


router.post("/addcontent", addcontroller.addcontent)

//........frogetpassword....
router.post("/forgetpassword", logincontroller.forgetpassword)
// router.get("/otpfills", logincontroller.verifyotp)

//........changedpassword......
router.post("/changedpassowrd", authenticateJWT, logincontroller.changepassword)
router.post("/editprofile/:id", editcontroller.editprofle)


router.get("/getprofile", authenticateJWT, getprofile.getprofle)
router.post("/rolelistening", signupcontroller.rolelistening)

router.delete("/delete", deletecontroller.deleteuser)

router.post("/viewdata", viewpage.viewpage)
router.put("/statuschange", authenticateJWT, viewpage.statuschange)


router.post("/customerdetails",customer.cutomer)

module.exports = router;
