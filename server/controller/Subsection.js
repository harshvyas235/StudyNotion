const Subsection = require("../model/subsection")
const Section = require("../model/section");
const { uploadImageToCloudinary } = require("../utils/uploadImageToCloudinary");

exports.createSubsection= async(req,res)=>{
    try{
        const {title,timeDuration,description,sectionId}=req.body
        const videoUrl=req.files.SubVideo;
        console.log(videoUrl)
   
        if(!title||!timeDuration||!description||!videoUrl||!sectionId){
           return res.status(400).json({
               success:false,
               message:"all details are require plz fill all the details"
           })
        }
   
       
        const uploadVideo= await uploadImageToCloudinary(videoUrl,process.env.FOLDER_NAME)
        const subSection= await Subsection.create({
            title:title,
            timeDuration: timeDuration,
            description:description,
            videoUrl:uploadVideo.secure_url,
    
         })

        const addSubsection = await Section.findByIdAndUpdate(sectionId,{
            $push:{

                subSection:subSection._id
            }
        },{new:true}).populate("subSection")
        
   
        res.status(200).json({
            success:true,
            message:"subsection creation successfully",
           addSubsection

        })

    }catch(err){
        console.log(err)
       res.status(500).json({
        success:false,
        message:"error in the creation of the subsection"
    });

    }

};

exports.updateSubsection=async(req,res)=>{
   try{
    const {subSectiotitle,SubsectionID,description}= req.body
    const video = req.file
    
    const uploadVideo= await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
    const subsection= await Subsection.findByIdAndUpdate(SubsectionID,{
        $push:{
            title:subSectiotitle,
            description:description,
            videoUrl:uploadVideo.secure_url,


        }
    },{new:true})

    return res.status(200).json({
        success:true,
        message: "subsection update successfully"
    })

   }catch(err){
      console.log("error in update the subsection")
      console.log(err)
       res.status(500).json({
        success:false,
        message:"error in the updation of the subsection"
    });

   }
}

exports.deleteSubsection= async(req,res)=>{
    try{
          const {subsectionId}=req.body
          const subSection = await Subsection.findByIdAndDelete(subsectionId)
          res.status(200).json({
			success: true,
			message: "subSection deleted",
		});
	} catch (error) {
		console.error("Error deleting Subsection:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
    
}