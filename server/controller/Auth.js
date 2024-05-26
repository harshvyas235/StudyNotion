const Otp = require("../model/otp");
const otpGenrator= require("otp-generator")
// const user = require("../model/user");
const User = require("../model/user");
const bcrypt = require("bcrypt")
require("dotenv").config();
const jwt= require("jsonwebtoken")
const mailSender= require("../utils/mailSender")
const Profile= require("../model/profile")

exports.optGen= async (req,res)=>{
    try{
        const {email} = req.body
    const user =await User.findOne({email})
    if(user){
        res.status(401).json({
            success:"flase",
            message:"this email is already exist"
        })
    }
    var otp = otpGenrator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    })

    const result = await Otp.findOne({otp:otp})
    while(result){
        otp = otpGenrator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        result = await Otp.findOne({otp:otp})
    }
    const otpPayload={
        email,otp
    }

    const otpCreate = await Otp.create(otpPayload)
    console.log(otpCreate)

    res.status(200).json({
    success:"true",
    message:"otp create successfully",
    otpCreate

    })

    }catch(err){
console.log("error in otp creation ")
console.log(err)
res.status(500).json({
    success:false,
    message:"error aa gyi otp wale section m"
})

    }
}

exports.signUp=async(req,res)=>{

    try{
    const {firstName,lastName,email,password,confirPassword,role,otp}= req.body;
    if(!firstName||!lastName||!email||!password||!confirPassword||!otp){
        res.status(403).json({
            success:false,
            message:"fill all the detail"
        })
    }
    
    if(password!==confirPassword){
        res.status(403).json({
            success:false,
            message:"password and confirm password does not match plz re enter the password"
        })
    }
     const user= await User.findOne({email})
     if(user){
        res.status(500).json({
            success:false,
            message:"this user is already exist"
        })

     }
     let hashPassword

    
     try{
      hashPassword= await bcrypt.hash(password,10)
    //    hashpassword=await bcrypt.hash(password,10)
     }catch(err){
        return res.status(500).json({
            sucess: false,
            message:"error in hashing the pass",

        });

     }
     console.log(
        'otp find hoga ab'
     )
     const findOtp =await Otp.findOne({email}).sort({createdAt:-1}).limit(1)
     console.log("find otp ab aaega")
     console.log(findOtp)
     console.log("find otp aa gya")
     if(!findOtp){

        return res.status(400).json({
            success: false,
            message: "The OTP is not valid",
        });
     }
     else 
    if(otp!==findOtp.otp){
       return res.status(400).json({
            success:false,
            message:"otp is not valid"
        })
     }
     const profile= await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null
     })
     const addUser= await User.create({firstname:firstName,lastname:lastName,email,password:hashPassword,accountType:role,
    additionalDetails:profile._id,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
    })

res.status(200).json({
    success:"true",
    message:"account create successfull",
    addUser
})


      

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            sucess: false,
            message:"error in signUp",

        });

     }

}

exports.login=async(req,res)=>{
   try{
    const {email,password}= req.body
    if(!email||!password){
        console.log("plzz fill all the details")
        return res.status(500).json({
            success:false
,           message:"plz fill all the detail"
        })
    }
    const user= await User.findOne({email:email})
    console.log("user aa gya")
    console.log(user)
   
    if(!user){
       return res.status(404).json({
            success:false,
            message:"plz sing up your email first"
        })
    }
   const  payload={
    email: user.email,
    accountType:user.accountType,
    id:user._id
         
     }
  

  if( await bcrypt.compare(password,user.password)){
    console.log("password compare ho gya successfully")
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "24hr"
    })

    user.token=token
    console.log(user)
    user.password=undefined;
    const options = {
        expires : new Date(Date.now() + 1 * 60 * 1000),
        httpOnly: true,
    };
    res.cookie("token",token,options).status(200).json({
        success:true,
    message:"cookie created successfull",
    user,
    token
    })
  }
else{
   return res.status(500).json({
    
        success:false,
        message:"password does not match "
     })
}
   }catch(err){
     console.log("error in loginig")
     console.log(err)
     res.status(500).json({
        success:false,
        message:"error aayi h during the login"
     })


   }

    

}

exports.changePasword= async(req,res)=>{
try{
    const{oldPassword,newPassword,confirmPassword,email}=req.body
    const user= await User.findOne({email})
    

    if( await bcrypt.compare(oldPassword,user.password)){
        
         
        if(newPassword!==confirmPassword){
            
            res.status(500).json({
                success: false,
                message:"password and confirm password is not match "
            })
        }
        const hashPassword = bcrypt.hash(newPassword,10)
        const updatePassword= await User.findOneAndUpdate({email},
            {
                password:hashPassword
            },{new:true})
        try{
            const mailresponse= await mailSender(email,"PASSWORD CHANGE","PASSWORD CHANGE SUCESSFULLY");
            console.log("email send sucessfull");
    
        }
        catch(err){
            console.log("error in sending the email");
            throw err;
    
        }
       res.status(200).json({
        success:true,
        message:"Password created successfull"
       })

    }

   
    

}catch(err){
    console.log("error in changing the password")
    console.log(err)
    res.staus(500).json({
        success:false,
        message:"error in changing the password"
    })
}

}