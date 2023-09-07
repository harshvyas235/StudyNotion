const express = require("express")
const { auth } = require("../middleware/auth")
const { updateProfile, uploadProfilePicture, getUserDetails } = require("../controller/Profile")
const router = express.Router()


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
// router.delete("/deleteProfile", auth, )
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getUserDetails)
// // Get Enrolled Courses
// router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, uploadProfilePicture)

module.exports = router