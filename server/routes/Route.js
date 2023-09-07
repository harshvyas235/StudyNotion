const express = require("express");
const { signUp, optGen, login, changePasword } = require("../controller/Auth");
const { auth, isInstructor } = require("../middleware/auth");
const { updateProfile } = require("../controller/Profile");
const { createCategory, showallCategories, categoryPageDetails } = require("../controller/Category");
const { sigleCourseDetail, createCourse, showAllCourse } = require("../controller/Course");
const { createSection, updateSection, deleteSection } = require("../controller/Section");
const { createSubsection, updateSubsection, deleteSubsection } = require("../controller/Subsection");
const { resetPasswordToken, resetPasswor } = require("../controller/ResetPassword");
const router = express.Router();

// const {localFileUpload, imageUpload,videoUpload, imageSizeReducer, imageupload} = require("../controllers/fileUpload");

// //api route
// router.post("/localFileUpload",localFileUpload );
// router.post("/imageupload",imageupload );

router.post("/signup",signUp)
router.get("/getOtp",optGen)
router.post("/login",login)
router.post("/changePassword",auth,changePasword)
router.post("/updateProfile",auth,updateProfile)
router.post("/categoryCreate",createCategory)
router.get("/showAllCategory",showallCategories)
router.get("/categoryCourses",categoryPageDetails)
router.post("/createCourese",auth,isInstructor,createCourse)
router.get("/showAllcourse",showAllCourse)
router.get("/showCourseDetail",sigleCourseDetail)
router.post("/createSection",createSection)
router.post("/updateSection",updateSection)
router.post("/deleteSection",deleteSection)
router.post("/createSubsection",createSubsection)
router.post("/updateSubsection",updateSubsection)
router.post("/deleteSubsection",deleteSubsection)
router.post("/reset-password-token",resetPasswordToken)
router.post("/resetPassword",resetPasswor)






module.exports = router;