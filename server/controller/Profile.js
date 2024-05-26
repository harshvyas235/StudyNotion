const User= require("../model/user")
const Profile= require("../model/profile")
const { uploadImageToCloudinary } = require("../utils/uploadImageToCloudinary")
const { findById } = require("../model/otp")

exports.updateProfile= async(req,res)=>{
try{
    const {dateOfBirth,about,contact,gender}= req.body
    const userId= req.user.id

    if(!dateOfBirth||!about||!contact||!gender||!userId){
        return res.status(400).json({
            success:false,
            message:"all details are require plz fill all the details"
        })
    }
    const userDetail = await User.findById(userId)

    const profileID= userDetail.additionalDetails;
    
    const profileDetail = await Profile.findById(profileID)

    profileDetail.dateofbirth=dateOfBirth
    // profileDetail.about= about
    profileDetail.gender=gender
    profileDetail.contactNumber=contact
    await profileDetail.save();
    res.status(200).json({
        success:true,
        message:"profile update successfully"

    })

}catch(err){
    res.status(500).json({
        success:false,
        message:"problem in the updation of the profile"
    })
}
}


exports.uploadProfilePicture=async(req,res)=>{
    try{
        const picture = req.files.displayPicture;
    const user= req.user.id;
    const image = await uploadImageToCloudinary(
        picture,
        process.env.FOLDER_NAME,
        1000,1000
    )
    const updateProfile= await User.findByIdAndUpdate({_id:user},{
        image:image.secure_url
    },{new:true})
    if(!updateProfile){
        return res.status(404).json({
            success:false,
            message:"USer is not found"

        })
    }
    res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updateProfile,
      })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
        }
}

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getUserDetails= async(req,res)=>{
try{
    const user = req.user.id;
    const detail = await User.findById(user).populate({
        path:"additionalDetails"
    }).exec()
    if(!detail){
        return res.status(500).json({
            success:false,
            message:"this user id is not found"
        })
    }
    res.status(400).json({
        success:true,
        message:"user found",
        data:detail,
    })

} catch(err){
return res.status(500).json({
    success:false,
    message:message.err
})
}
}


exports.DeleteUSer= async(req,res)=>{
    try{

        const id = req.user.id;
        const user= await User.findById({id:id});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user is not found"
            })
        }

        const profileID = user.additionalDetails;
        const deleteProfile= Profile.findByIdAndDelete({id:profileID});

        // todo delete from the course enrolled 
        // cron job , task sheduling 

        await User.findByIdAndDelete({id:id});
        return res.status(200).json({
            success:true,
            message:"user delete successfully"
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:message.err,
            errror:"user can not be deleted"
        })
        }
}