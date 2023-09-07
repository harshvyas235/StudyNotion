 import React, { useState } from 'react'
 import {HomePageExplore} from '../../../data/homepage-explore'
 
 export const Filtercard = ({categories,courses}) => {
  const[active,setactive]= useState(false)
    function setcatogery(data,course){
        
           categories(data)
           courses(course)
          
           

    }
 
   return (
     <div className=' '>
          <div className='flex gap-5'>
            {
                HomePageExplore.map((data,index)=>{
                    return(
                        <button onClick={()=>setcatogery(data.tag,data.courses)}  className={active? "bg-blue-50 ": " " }>
                            {data.tag}
                        </button>
                       
                    )
                })
            }
          </div>
     </div>
   )
 }
 