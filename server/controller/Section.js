const { default: mongoose } = require("mongoose");
const Course = require("../model/courses")
const Section = require("../model/section")
exports.createSection= async(req,res)=>{
    try{
        const{sectionName,courseId}= req.body;
    if(!sectionName||!courseId){
        return res.status(400).json({
            success:false,
            message:"all details are require plz fill all the details"
        })
    }

    const newSection = await Section.create({sectionName:sectionName})
    const courseDetail = await Course.findByIdAndUpdate({_id:courseId},{
        
            $push:{
                courseContent:newSection._id
                }
        
    },{new:true }).populate({
        path:"courseContent",
        populate:{
            path:"subSection",
        }
    }).exec();

    res.status(200).json({
        success:true,
        message:"section created successfully"
    })

    }catch(err){
     console.log(err)
      return res.status(500).json({
        success:false,
        message:"error in the creation of the section"
    })
    }

}

exports.updateSection = async(req,res)=>{
    try{
        const {sectionName,sectionId}= req.body
        if(!sectionName||!sectionId){
            return res.status(400).json({
                success:false,
                message:"all details are require plz fill all the details"
            })
        }

        const updateData = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})

        res.status(200).json({
            success:true,
            message:"updation successfully",
            updateData

        })

    }catch(err){
        console.log(err)
       res.status(500).json({
        success:false,
        message:"error in the updation of the section"
    })

    }
}


exports.deleteSection = async(req,res)=>{
    try{
       const {sectionId,courseId}= req.body;
       console.log(sectionId)
       console.log(courseId)
       const sID= new mongoose.Types.ObjectId(sectionId)
       const updateSection = await Section.findByIdAndDelete({_id:sectionId})

       const update= await Course.findOneAndUpdate({_id:courseId},{
        $pull:{
            courseContent:sectionId
        }
       },{new:true})
        res.status(200).json({
            sectionId,courseId,update
        })


     
    }catch(err){
        console.log(err)
       res.status(500).json({
        success:false,
        message:"error in the delete of the section",
        error:err.message
    })

    }
}