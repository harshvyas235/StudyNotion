import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-hot-toast"
import { setLoading, setToken } from '../../Slice/authSlice';
import { apiconnector } from '../apiconnector';
import { Auth } from '../apis';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../Slice/profileSlice';
// import { response } from 'express';
// import { resetPasswordToken } from '../../../server/controller/ResetPassword';








export const getemail = (email,setemail)=>{

   return async(dispatch)=>{
    dispatch(setLoading(true))
    try{

       const response = await apiconnector("POST","http://localhost:4000/api/v1/auth/reset-password-token",{email});
       console.log("response dekh le",response)
      //   console.log("jkfhshfskhffsfhashdjhs")
       if(response.data.success==false){
        throw new Error("error mesage h ye",response.data.message)
       }
       toast.success()
       setemail(true);
        

    }catch(err){
        console.log(err)
      toast.error("error aayi h ")

    }
    dispatch(setLoading(false))
   }
}

export const UpdatePasswordChange=(password, confirmPassword, token,navigate)=>{
   return async(dispatch)=>{
      try{
          const response= await apiconnector("POST","http://localhost:4000/api/v1/auth/reset-password",{
            password, confirmPassword, token
          })

          
          if(response.data && response.data.success==false){
            throw new Error("error mesage h ye",response.data.message)
           }

           toast.success("change successfully")
           
           navigate('/login')

      }
      catch(err){
           toast.error(err.message)
           console.log(err)

      }
   }
}

// export const OtpSignUp = (email,navigate)=>{
//    return async(dispatch)=>{
//      try{
//      const response = await apiconnector("Post",'http://localhost:4000/api/v1/auth/sendotp',{
//          email
//       })
//       if(response.data.success===false){
//          throw new Error("error in send the otp resposnse",response.data.message)
//          toast.error("error in send otp")
//       }
//       // navigate('/verify-email')

      
//      }
//      catch(err){
//       console.log("error in the sending otp ",err);
//       toast.error("error in send otp ")

//      }
      
//    }
// }
export const LoginData=(email,password,navigate)=>{
   return async(dispatch)=>{
      dispatch(setLoading(true))
      try{

         const response = await apiconnector("POST","http://localhost:4000/api/v1/auth/login",{
            email,password
         })
         console.log("login ka response dekh lo ...",response)
        
         if(response.data && response.data.success===false){
            throw new Error("error mesage h ye",response.data.message)
         }

         toast.success("login successFull")
         dispatch(setToken(response.data.token))
         
         const userImage =`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
         dispatch(setUser({...response.data.user,image:userImage}))
         localStorage.setItem("token",JSON.stringify(response.data.token))

         navigate("/")

      }
      catch(err){
         console.log("LOGIN API ERROR............", err)
         toast.error("Login Failed")
      }
      dispatch(setLoading(false))
   }
}



// export const SignUpOperation=async (firstName
// ,lastName
// ,email
// ,password
// ,confirPassword
// ,role
// ,otp)=>{

//    return async(dispatch)=>{
          
//       setLoading(true)
   
   
//    try{
      


//    const response = await apiconnector("Post","http://localhost:4000/api/v1/auth/signup",{
//             firstName
//             ,lastName
//             ,email
//             ,password
//             ,confirPassword
//             ,role
//             ,otp})

//             if(response.data && response.data.success===false){
//                throw new Error("error mesage h ye sign up proccess mai",response.data.message)
//             }
            
//             toast.success("SignUp complete")
//             // navigate('/login')
         
   

//    }catch(err){
//       console.log("SIGNUP API ERROR............", err)
//       toast.error("signup Failed")
//    }
//    }
   
// }