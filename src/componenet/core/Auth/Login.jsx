import React, { useState } from 'react'
import { BUTTON } from '../HomePage/BUTTON'
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import {AiOutlineEye} from 'react-icons/ai'
import zigzag from '../../../assets/Images/frame.png';
import login from '../../../assets/Images/login.webp'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginData } from '../../../Services/operation/authAPI';

export const Login = () => {
 
    // const [formdata,setformdata]= useState[{email:"",password:""}]
    const [formData,setformdata]= useState({email:"", password:""})
    const [showpass, setShow]= useState(true);
    const dispatch= useDispatch()
    const navigate = useNavigate()
     
    const changeHandler =(event)=>{
        // const [name]=event.target.value
        const { name, type, value, checked, placeholder } = event.target
        setformdata((prev)=>{
          return {
            ...prev,
        [name]: event.target.value
            
          }
        })
    }
    const submitdata=(e)=>{
      e.preventDefault()
      dispatch(LoginData(formData.email,formData.password,navigate))

            console.log(formData);
    }

    

  return (
    <div className=' flex justify-center items-center mt-16  gap-36'>
        <div className='w-[508px] h-[]  flex flex-col gap-9 '>
        <div className='w-[444px]'>
        <div>
        <p className='text-[#F1F2FF] text-3xl font-semibold '>Welcome Back</p>
        <div><p className='text-[#AFB2BF]'>Discover your passions,</p>
        <p className='text-[#47A5C5]'> Be Unstoppable</p>
         </div>
        </div>
        

        </div>

        <form onSubmit={submitdata}>
              <div className='flex flex-col gap-5'>
              <div className=' w-[444px] flex flex-col gap-2'>
              <p className=' text-sm text-[#F1F2FF]  font-normal '>Email Address</p>
             
                 <input
                 required
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder='Enter your email'
                  style={{
                boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                
              }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                 />
               
              

            </div>
            <div className=' w-[444px] flex flex-col gap-2 relative'>
            <p className=' text-sm text-[#F1F2FF]  font-normal '>Password</p>
            <div>
            <input
              type={showpass?'password':'text'}
              name='password'
              placeholder='Enter Password'
              onChange={changeHandler}
              value={formData.password}
              style={{
                boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                
              }
              
              }
              className='bg-richblack-800 text-richblack-5 py-[12px] rounded-lg w-full  p-[12px] pr-12'
            />
              <div className=' w-[30px] h-[14px] absolute translate-x-[400px] bottom-11'  >
              {
                showpass?
                <AiOutlineEyeInvisible className='w-[38px] h-[30px] text-[#838894] ' onClick={()=>{setShow(!showpass)}} />:

                <AiOutlineEye  className='w-[38px] h-[30px] text-[#838894] ' onClick={()=>{setShow(!showpass)}}/>
              }
            </div>
            <Link to={'/forgot-password'}>
            <p className='text-[#47A5C5]  text-sm pt-[2px]'>Forgot password </p></Link>
            </div>
           
          
            </div>
              </div>
            
            
           <div className="w-[444px] h-[48px] mt-[36px] shadow-[inset_-2px_-33px_25px_4px_rgba(0,_0,_0,_0.12)]">
             <button className='w-[444px] h-[48px] bg-[#FFD60A] text-richblack-900 py-[12px] flex items-center justify-center rounded-lg '  >Sign in</button>
           </div>
        </form>

        </div>

        {/*//Image krne wake h apn */}
        <div className='relative'>
           <img src={zigzag} width={368} height={334} className=' translate-x-2 translate-y-2'/>
           <img src={login}  width={358} height={304} className='absolute bottom-[12px]'/>
        </div>
    </div>
  )
}

// import React, { useState } from 'react'

// export const Login = () => {
//    const [data, setdata]= useState({email:"",passwore})
//   return (
//     <div></div>
//   )
// }
