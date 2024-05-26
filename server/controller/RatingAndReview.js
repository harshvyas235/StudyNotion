const User = require("../model/user")
const Course= require("../model/courses")
const RatingAndReview = require("../model/RatingAndReview")
const user = require("../model/user")
const { mongo, default: mongoose } = require("mongoose")
const { json } = require("express")

exports.addRatingAndReview = async(req,res)=>{
     try{
        const {Rating,Review,courseID}= req.body

     const userId = req.user.id;
       const course= await Course.find(courseID)

       if(!course.studentsEnrolled.includes(userId))
       {
         return res.status(400).json({
            success:false,
            message:"this student is not enrolled in that course"
         })
       }
       
       const checkRating =await RatingAndReview.findOne({user:userId,
      course:courseID})

       if(checkRating){
         return res.status(403).json({
            success:false,
            message:"this user already rated this course"

         })
       }


       
     const addRating = await RatingAndReview.create({
        user:userId,
        rating:Rating,
        review:Review,
        course:courseID
       
     })
     const addToCourse= await Course.findById(courseID,{
        $push:{
            ratingAndReview:addRating._id
        }
     },{new:true})

     return res.status(200).json({
      success:true,
      message:"rating and review added successfully",
      addRating
     })



     

     }catch(err){
      return res.status(500).json({
         success:false,
         message:"error in adding rating and review"
      })

     }
}


exports.gettingAverageRating= async(req,res)=>{

try
{

   const {courseId}= req.body
   const result  = await RatingAndReview.aggregate([
      {
         $match:{
            course: new mongoose.Schema.Types.ObjectId(courseId),
         },
      }
        , 
       {
           $group:{
            _id:null,
            averageRating : {$avg :"$rating"}
           } 
       }
         
      
     ])

     if(result.length>0){
      return res.status(200).json(
         {
            success:true,
            averageRating:result[0].averageRating,

         }
      )


     }

     else
     {
      return res.status(200).json({
          success:true,
          message:"there is no rating for that course "
      })
     }
   

}
    catch(err){
         console.log(err)
         return res.status(500).json({
            success:false,
            message:err.message,
         })
     }
}

exports.getallrating= async(req,res)=>{
   const getdata= await RatingAndReview.find({}).
                      sort({rating :'desc'})
                      .populate({
                        path:"user",
                        select:"firstName lastName email image"
                      })
                      .populate({
                        path:"course",
                        select:"courseName"
                      }).exec();

}

exports.getRatingCourse=async(req,res)=>{
   const courseID= req.body.courseID;

   const review = await RatingAndReview.findById({course : courseID}).populate({path:"user"}).populate({path :"course"})
}