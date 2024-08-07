import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-hot-toast"
import { setLoading, setToken } from '../../Slice/authSlice';
import { apiconnector } from '../apiconnector';
import { Auth } from '../apis';

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

export const OtpSignUp = (email,navigate)=>{
   return async(dispatch)=>{
     try{
     const response = await apiconnector("Post",'http://localhost:4000/api/v1/auth/sendotp',{
         email
      })
      console.log("yha tk koi error nhi aayi h ")

      if(response.data.success===false){
         throw new Error("error in send the otp resposnse",response.data.message)
         toast.error(response.data.message)

      }
      navigate('/otp_verify')

      
     }
     catch(err){
      console.log("error in the sending otp ",err);
      toast.error(err.response.data.message)
      navigate('/login')

     }
      
   }
}
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
         localStorage.setItem("user",JSON.stringify(response.data.user))


         navigate("/dashboard/my-profile")

      }
      catch(err){
         console.log("LOGIN API ERROR............", err)
         toast.error("Login Failed")
      }
      dispatch(setLoading(false))
   }
}






// export function signUp(
//    confirmPassword, email, firstName, lastName, password, navigate, otp,role
   
//  ) {
//    return async (dispatch) => {
//      const toastId = toast.loading("Loading...")
     
//      dispatch(setLoading(true))
//      try {
//        const response = await apiconnector("POST", "http://localhost:4000/api/v1/auth/signup", {
//          firstName,lastName,email,password,confirmPassword,role,otp,navigate
//        })
 
//        console.log("SIGNUP API RESPONSE............", response)
 
//        if (!response.data.success) {
//          throw new Error(response.data.message)
//        }
//        toast.success("Signup Successful")
//        navigate("/login")
//      } catch (error) {
//        console.log("SIGNUP API ERROR............", error)
//        toast.error("Signup Failed")
//        navigate("/signup")
//      }
//      dispatch(setLoading(false))
//      toast.dismiss(toastId)
//    }
//  }



export const Signup_Call = (  role,
   firstName,
   lastName,
   email,
   password,
   confirPassword,
   otp,
   navigate) => {
   return async (dispatch) => {
     try {
       dispatch(setLoading(true));
       
       const response = await apiconnector("Post", "http://localhost:4000/api/v1/auth/signup", {
         role,
         firstName,
         lastName,
         email,
         password,
         confirPassword,
         otp,
         navigate
       });
 
       if (response.data && response.data.success) {
         toast.success("Signup successful. You can now login.");
         navigate('/login');
       } else {
         throw new Error(response.data.message || "Signup failed. Please try again later.");
       }
     } catch (err) {
       console.error("Signup API ERROR:", err);
       toast.error("Signup failed. Please try again later.");
     } finally {
       dispatch(setLoading(false));
     }
   };
 };

 export const logout =(navigate)=>{
   return async(dispatch)=>{
      try{
        localStorage.clear();
        dispatch(setToken(null))
        dispatch(setUser(null))
        toast.success("logged Out")
        navigate('/')
      }
      catch(err){
         toast.error("error in logut")
      }
   }
 }