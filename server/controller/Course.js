const User = require("../model/user")
const Category= require("../model/category")
const Courses= require("../model/courses")
const{uploadImageToCloudinary}= require("../utils/uploadImageToCloudinary")


exports.createCourse= async(req,res)=>{
   try{
    let{courseName,courseDescription,whatYouWillLearn,price,tag,category,status,instructions}= req.body;
    const userID = req.user.id;
    console.log(userID)
    const thumbnail= req.files.thumbnailImage;
    if(!courseName|| !courseDescription || !whatYouWillLearn ||!price || !tag || !thumbnail||!category){
        return res.status(404).json({
            success:false,
            message:"plz fill all the details ",
        })
    }

    if (!status || status === undefined) {
        status = "Draft";
    }
    
    const categorydetail = await Category.findById(category);
    if (!categorydetail) {
        return res.status(404).json({
            success: false,
            message: "Category Details Not Found",
        });
    }

    // if(!tagdetail){
    //     res.status(404).json({
    //         success:false,
    //         message:"plz select the valid tag that tag is not fetch ",
    //     })
    // }

    const instructorDetails= await User.findById(userID,{
        accountType:"instructor"
    });
    if(!instructorDetails){
        return res.status(404).json({
            success:false,
            message:"instructor details not found "
        })
    }

    const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)
    console.log(thumbnailImage)

    const createCourse= await Courses.create({
        // courseName,
        name:courseName,
       discription:courseDescription,
        instructor:instructorDetails._id,
        whatYouWillLearn:whatYouWillLearn,
        price,
        tag:tag,
        category: categorydetail._id,
        status:status,
     



    });

    const updateUser = await User.findByIdAndUpdate(
        {_id:instructorDetails._id},{
        
            $push:{
                courses:createCourse._id
            }
        },{
            new:true
        }
    )

    await Category.findByIdAndUpdate({_id:category},{
        $push:{
            courses:createCourse._id
        }
    },{
        next:true
    })


    return res.status(200).json({
        success:true,
        message:"course create successfully"
    })

   }
   catch(err){
    return res.status(500).json({
        success:false,
        message:"error in creating the course",
        error:err.message
    })
   }



}

exports.showAllCourse=async(res,req)=>{
   try{
    const allCourse = await Courses.find({},
        {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnroled: true,
        }
    )
        .populate("instructor")
        .exec();
    return res.status(200).json({
        success:true,
        message:"all courses fetch successfull"
    })
   } catch(err){
    return res.status(500).json({
        success:false,
        message:"error in fetching all the courses"
    })
   }
   
}

//cron job ,shedule req


exports.sigleCourseDetail = async (req,res)=>{
    try{
        const {courseId}= req.body;
        const course = await Courses.findById({_id:courseId})
                .populate({
           
                   path:'instructor',
                   populate:{
                    path:'additionalDetails'
                      },
                    })
                .populate({
                    path:'ratingAndReview'
                })
                .populate({
                    path:'category'
                })
                .populate({
                    path:'courseContent',
                    populate:{
                        path:'subSection'
                    }
                }).exec()
        console.log("ye kuch aa rha h")
        if(!course){
            return res.status(400).json({
                success:false,
                message:`could not find the course with that id ${courseId}`
            })
         

        }
        return res.status(200).json({
            success:true,
            message:"fetch detail success",
            course
        })

    }catch(err){
        console.log("error in geting course details")
        return res.status(500).json({
            success:false,
            message:"error in fetching the course details"
        })
    }

}
