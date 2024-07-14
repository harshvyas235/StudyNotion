import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Sidedata } from './Sidedata'
import { logout } from '../../../Services/operation/authAPI'
import {VscSignOut}  from "react-icons/vsc"
import {ConfirmationModal} from '../../common/ConfirmationModal'

export const Sidebar = () => {

  // const {user}= useSelector((state)=>state.profileSlice)
  const {user, loading: profileLoading} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

  if(user===null) return null
  return (


    <div className='w-[222px] bg-[#161D29] h-[996px] pt-[30px] flex flex-col gap-[10px] '>
       {
        sidebarLinks.map((link)=>{
              if(link?.type && user.accountType!==link?.type) return null;
              
             return (
                
                  <Sidedata key={link.id} data={link} />
                 
             ) 

        }
         )
       }
      
      <div className='w-[190px] h-[1px] bg-[#424854] mx-[16px] '></div>

      <div>
      <Sidedata 
              data={{name:"Settings", path:"dashboard/settings",icon:"VscSettingsGear"}}
                        
                    />
           <button 
                        onClick={ () => setConfirmationModal({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text:"Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                        })}
                        className='text-sm font-medium text-richblack-300'
                        >

                        <div className='flex items-center gap-x-2 text-sm py-[8px] px-[24px] text-[#838894]'>
                            <VscSignOut className='text-lg'/>
                            <span>Logout</span>
                        </div>

                    </button>



                    
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
             
           

    </div>
  )
}
