const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const User= require("../model/user")
const mailSender= require("../utils/mailSender")
const bcrypt = require("bcrypt");
const crypto= require("crypto")

exports.resetPasswordToken= async (req,res)=>{
   try{
    const email = req.body.email;
    const user= await User.findOne({email});
    if(!user){
       return res.status(500).json({
            success:false,
            message:"this email is not register with us"
        })
    }
    const token = crypto.randomUUID();

    const updateDetail= await User.findOneAndUpdate({email},{
        token:token,
        resetPasswordExpires:(Date.now()+2*60*1000)

    },{new:true})

    const url = `http://localhost:3000/update-password/${token}`
    await mailSender(
        email,
        "password reset link",
        passwordUpdated(email,url)
    )
    return res.status(200).json({
        success:true,
        message:"password change link send successfully" ,

        updateDetail
    })
   }catch(err){
    console.log("error in reset password")
    console.log(err)
  return  res.status(500).json({
        success:false,
        message:"error in reset password",
        
    })
   }

}

exports.resetPasswor= async(req, res)=>{
try{
    const {password, confirmPassword, token}=req.body
    const userfind = await User.findOne({token})
    if(!userfind){
        res.status(500).json({
            success: false,
            message:"invalid token "
        })
    }

    if(userfind.resetPasswordExpires<Date.now()){
        res.status(500).json({
            success: false,
            message:"token time is expire now plz try again",
            
        })
    }
    
   if(password!==confirmPassword){
    res.status(500).json({
        success: false,
        message:"password and confirm password is not match "
    })
   }
    const hashpassword = await bcrypt.hash(password,10)

    const user = await User.findOneAndUpdate({token},
        {
            password:hashpassword,

        },{new:true})


        res.status(200).json({
            success: true,
            message:"password reset successfully",
            user
        })



}catch(err){
res.status(500).json({
    success:false,
    message:"error in reset the password"
})
}
}