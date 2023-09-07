const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")
const otpmail= require("../mail/templates/emailVerificationTemplate")

const OTPSchema= new mongoose.Schema({

    email:{
        type:String
        , required: true,
    },
    otp:{
        type :String,
        require:true,

    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60 *5,

    }
});

async function sendVerificationEmail(email,otp){
    try{
        const mailresponse= await mailSender(email,"verification email",otpmail(otp));
        console.log("email send sucessfull");

    }
    catch(err){
        console.log("error in sending the email");
        throw err;

    }
}

OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})
const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;