// Import the required modules
const express = require("express")
const { auth, isInstructor, isAdmin, isStudent } = require("../middleware/auth")
const { createCourse, showAllCourse, sigleCourseDetail } = require("../controller/Course")
const { createSection, updateSection, deleteSection } = require("../controller/Section")
const { updateSubsection, deleteSubsection, createSubsection } = require("../controller/Subsection")
const { createCategory, showallCategories, categoryPageDetails } = require("../controller/Category")
const { addRatingAndReview, gettingAverageRating, getallrating } = require("../controller/RatingAndReview")
const router = express.Router()

// Import the Controllers


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse",auth,isInstructor,createCourse )
//Add a subsection
router.post("/addSubSection", auth, isInstructor, createSubsection)

//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubsection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubsection)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourse)
// Get Details for a Specific Courses
router.post("/getCourseDetails", sigleCourseDetail)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showallCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, addRatingAndReview)
router.get("/getAverageRating", gettingAverageRating)
router.get("/getReviews", getallrating)

module.exports = router