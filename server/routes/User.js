// Import the required modules
const express = require("express")
const { login, signUp, optGen, changePasword } = require("../controller/Auth")
const { resetPasswordToken, resetPasswor } = require("../controller/ResetPassword")
const { auth } = require("../middleware/auth")
const router = express.Router()


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", optGen)

// Route for Changing the password
router.post("/changepassword", auth, changePasword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPasswor)

// Export the router for use in the main application
module.exports = router