// import React, { useState } from 'react'
// import OTPInput from 'react-otp-input'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'
// import { SignUOper, signUp, SignUpOperation } from '../../../Services/operation/authAPI';


// export const Otp = () => {
  
// const navigate = useNavigate();

//     const dispatch = useDispatch();
//     const {signupData}= useSelector((state)=>state.auth);
//     const [otp,setOtp]=useState("");
  
//     const onsubmitHandler = (e) => {
//       e.preventDefault()
//       console.log("otp wale m sign up data dekho " ,signupData)
//       const { confirmPassword, email, firstName, lastName, password, role  } = signupData
    
//       dispatch(signUp(confirmPassword, email, firstName, lastName, password, otp,role))
//     }
//     const renderInput = (inputProps) => (
//       <input {...inputProps} className="w-12 h-12 text-3xl border-2 border-green-500 rounded-lg text-center focus:outline-none focus:border-green-400" />
//     );



//   return (
//     <div>
      
//       <div className="bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full flex flex-col items-center">
//         <h2 className="text-center text-2xl text-green-500 mb-6">Verify OTP</h2>
//         <form onSubmit={onsubmitHandler} className="space-y-4 w-full">
//           <OTPInput
//             value={otp}
//             onChange={setOtp}
//             numInputs={6}
//             separator={<span className="mx-2 text-green-500">-</span>}
//             renderInput={renderInput}
//             containerStyle="flex justify-center"
//           />
//           <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">Verify OTP</button>
//         </form>
//       </div>

//     </div>
//   )
// }



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { OtpSignUp, Signup_Call } from "../../../Services/operation/authAPI";

export const Otp = () => {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);
  // firstName,lastName,email,password,confirPassword,role,otp

  const handleVerifyAndSignup = (e) => {
    console.log(signupData)
    e.preventDefault();
    const {
      role,
      firstName,
      lastName,
      email,
      password,
      confirPassword,
    } = signupData;

    dispatch(
      Signup_Call(
        role,
        firstName,
        lastName,
        email,
        password,
        confirPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(OtpSignUp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};





