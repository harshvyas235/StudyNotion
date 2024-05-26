const jwt =  require("jsonwebtoken")

require("dotenv").config()

exports.auth= async(req,res,next)=>{

    try{
        const token = req.cookies.token 
        || req.body.token 
        || req.header("Authorisation").replace("Bearer ", "");
        if(token==undefined||!token){
           return res.status(500).json({
                success:false,
                message:"token is undefine"
            })

        }
          try{
            const payload =jwt.verify(token,process.env.JWT_SECRET)
            console.log(payload)
            req.user=payload
          }catch (error) {
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });

        }

        next()
    }catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            
            error:error.message,
        });
    }

    
}

exports.isStudent=async (req,res,next)=>{
    try{
       const role=req.user.accountType

       if(role!="Student"){
        res.status(401).json({
            success: false,
            message: "role is protected for the student"
        })
        

       }
       next()
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

exports.isAdmin=async (req,res,next)=>{
    try{
       const role=req.user.accountType
       if(role!="Admin"){
        res.status(401).json({
            success: false,
            message: "role is protected for the Admin"
        })
        

       }
       next()
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

exports.isInstructor=async (req,res,next)=>{
    try{
        
       const role=req.user.accountType
       if(role!="instructor"){
        res.status(401).json({
            success: false,
            message: "role is protected for the instructor"
        })
        

       }
       next()
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}