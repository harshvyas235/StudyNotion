import React, { useState } from 'react'
// import { HIGHLIGHT } from '../HomePage/HIGHLIGHT'
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import {AiOutlineEye} from 'react-icons/ai'
import { Tab } from './Tab'
import { Link } from 'react-router-dom';
import { BUTTON } from '../HomePage/BUTTON';
import zigzag from '../../../assets/Images/frame.png';
import signupImage from '../../../assets/Images/signup.webp'

export const SignUP = () => {
  
  const data=[{
    name:'Student'
  },{
    name:'Instructor'
  }]

  const [curr,change]= useState("Student")

  const [formData,setformdata]= useState({ lastName:"",firstName:"",email:"", password:"",confirm:""})
  const [showpass, setShow]= useState(true);

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


const submitdata=()=>{
  return 
}

  
  return (
    <div className=' flex justify-center items-center mt-10  gap-36'>
      <div className=' w-[508px]   flex flex-col   gap-7  items-center'>
          <div className='max-w-[444px]  '>
            <p className='text-3xl max-w-[424px] h-[114px] font-semibold text-[#F1F2FF] font-inter'>Join the millions learning to code with StudyNotion for free</p>
            <p className=' text-[#AFB2BF]  text-lg font-normal font-inter '>Build skills for today, tomorrow, and beyond.<span  className="font-edu-sa text-base font-bold text-[#47A5C5]"  >Education to future-proof your career</span> </p>
          </div>
            
            <div className='w-[444px]'>
            <div className='w-[230px] h-[44px]  bg-[#161D29]  rounded-3xl p-[4px]  '>
             <Tab data={data} curr={curr} change={change}/>  
             </div> 
            </div>
            
            

          

        <form className='w-[444px]'>
          <div className='flex flex-col gap-5'>
          <div className='flex gap-[6px] '>
          <div className='flex flex-col gap-[2px]'>
          <p className=' text-sm text-[#F1F2FF]  font-normal '>First Name</p>
            <input
              id='firstName'
              type='text'
              name='firstName'
              placeholder='Enter your Name'
              value={formData.firstName}
              onChange={changeHandler}
              style={{
                boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                
              }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"

            />

          </div>

          <div className='flex flex-col gap-[2px]'>
          <p className=' text-sm text-[#F1F2FF]  font-normal '>Last Name</p>
            <input
              
              type='text'
              name='lastName'
              placeholder='Enter your Name'
              value={formData.lastName}
              onChange={changeHandler}
              style={{
                boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                
              }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"

            />

          </div>
         
         
          </div>

          <div>
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


          <div className=' w-[444px] flex gap-[6px] '>
             <div className='flex-col gap-2 relative'>
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

             <div className=' w-[30px] h-[14px] absolute translate-x-[180px] bottom-6'  >
              {
                showpass?
                <AiOutlineEyeInvisible className='w-[38px] h-[30px] text-[#838894] ' onClick={()=>{setShow(!showpass)}} />:

                <AiOutlineEye  className='w-[38px] h-[30px] text-[#838894] ' onClick={()=>{setShow(!showpass)}}/>
              }
            </div>


            </div>
           
              
             </div>


             <div className='flex-col gap-2 relative'>
            <p className=' text-sm text-[#F1F2FF]  font-normal '>Confirm Password</p>
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

             <div className=' w-[30px] h-[14px] absolute translate-x-[180px] bottom-6'  >
              {
                showpass?
                <AiOutlineEyeInvisible className='w-[38px] h-[30px] text-[#838894] ' onClick={()=>{setShow(!showpass)}} />:

                <AiOutlineEye  className='w-[38px] h-[30px] text-[#838894] ' onClick={()=>{setShow(!showpass)}}/>
              }
            </div>


            </div>
           
              
             </div>

          </div>


          <div className='bg-[#FFD60A] text-[#000814] rounded-lg flex justify-center items-center  py-3 px-6 w-[444px]  h-auto'>Create Account</div>

          </div>

        </form>
           

       </div>

       <div className='relative'>
           <img src={zigzag} width={368} height={334} className=' translate-x-2 translate-y-2'/>
           <img src={signupImage}  width={358} height={304} className='absolute bottom-[12px]'/>
        </div>
    </div>
  )
}
