// Import the required modules
const express = require("express")
const router = express.Router()

// const { capturePayment, verifySignature } = require("../controller/Payment")
const {cpaturePayment,verifySignature}= require("../controller/Payment")
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")
router.post("/capturePayment",auth,isStudent,cpaturePayment)
router.post("/verifySignature", verifySignature)

module.exports = router