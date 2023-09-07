const User = require("../model/user")
const Course= require("../model/courses")
const mailSender = require("../utils/mailSender")
const { default: mongoose } = require("mongoose")
const {instance}= require("../config/razorpay")
const { json } = require("express")

exports.cpaturePayment=async(req,res)=>{
        const {courseId}= req.body
        const UserId= req.User.id
        
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"plz enter the valid course Id"
            })
        }
       let course

        try{
             course = await Course.findById(courseId)
            if(!course){
                return res.status(500).json({
                    success:false,
                    message:"course is not found "
                })
            }

            const uid= new mongoose.Types.ObjectId
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"student is already enrolled in the course"
                })
            }
        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
            
        }

        const amount = course.price
        const currency= "INR"

        const option={
            amount,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseId,
                UserId
            }
        }
        try{
            //initiate the payement using razo pay
            const payementResponse= await instance.orders.create(option)
            console.log(payementResponse)
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription : course.courseDescription,
                orderId:payementResponse.id,
                currency:payementResponse.currency,
                thumbnail:course.thumbnail,
                amount: payementResponse.amount

                

            })
        }catch(err){

        }
        
}

exports.verifySignature= async(req,res)=>{
    const webhookSecret ="12345678";
    const signature= req.headers["x-razopay-signature"];

    const shasum =crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.sringify(req.body));
    const digest = shasum.digest("hex")

    if(signature==digest){
        console.log("payment varify successfull ")
        
        const {courseId,UserId}=req.body.payload.payment.entity.notes;
        

        try{
            const enrolledCourse= await Course.findByIdAndUpdate({courseId},{
                $push:{
                    studentsEnrolled:UserId
                }
            },{new:true})
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"course not found",
                })
            }
            console.log(enrolledCourse)

            const erolledStudent =await User.findByIdAndUpdate({_id:UserId},{
                $push:{
                    courses:courseId
                }
            },{new:true})
            console.log(erolledStudent)

            const emailsender= await mailSender(erolledStudent,
                "codehelp congratulation",
                "congratulation your are onboarded to the codehelp new course")

                console.log(emailsender)
                return res.status(200).json({
                    success:true,
                    message:"email send successfull to your  signature verify successfull"
                })

        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"error in sending the email"
    

            })
           
        }

      
    }
    else{
        return res.status(500).json({
            success:false,
            message:"signature id not match envalid request"
        })
    }
}
