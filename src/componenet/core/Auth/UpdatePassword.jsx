import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdatePasswordChange } from '../../../Services/operation/authAPI'

export const UpdatePassword = () => {
  const navigate = useNavigate()


  const [data,setdata]=useState({newpassword:"",confirmpassword:""})

  const{password, confirmPassword}= data

  const changehandler=(event)=>{
    // const {name}= event.target.value
    setdata((prev)=>{
      return {
        ...prev,[event.target.name]:event.target.value
      }
    })
  }
  const dispatch= useDispatch()
  const {id}= useParams()
  console.log("password dekho " ,password,confirmPassword)
  
  console.log("token dekh lo ",id)

  const onSubmitdata=(event)=>{
    event.preventDefault()

    dispatch(UpdatePasswordChange(data.newpassword,data.confirmpassword,id,navigate))

    
    

  }

  return (
    <div>
       {/* headhing and paragraph */}
      <div>
        <p></p>
        <p></p>
      </div>

      <form onSubmit={onSubmitdata}>
        <div>
        <p></p>
        <input
          name='newpassword'
          required
          value={data.newpassword}
          placeholder='enter password'
          onChange={changehandler}
        />
        </div>

        <div>
        <p></p>
        <input
          name='confirmpassword'
          value={data.confirmpassword}
          placeholder='confir the password'
          on onChange={changehandler}
        />
        </div>
         

        <div className="w-[444px] h-[48px] mt-[6px] shadow-[inset_-2px_-33px_25px_4px_rgba(0,_0,_0,_0.12)]">
             <button className='w-[444px] h-[48px] bg-[#FFD60A] text-richblack-900 py-[12px] flex items-center justify-center rounded-lg '  >Reset Password</button>
           </div>

      </form>
      
    </div>
  )
}
