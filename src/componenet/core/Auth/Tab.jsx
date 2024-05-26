import React, { useState } from "react";

export const Tab = (props) => {
   
    
    const {data,change,curr}= props
   
    const changeHandle=(data)=>{
      
        change(data)
    }
    

  return (
      <div className=" flex gap-2">
        {
            data.map((data)=>(
                <div className={`${data.name===curr ? "text-caribbeangreen-200" : "text-white"} cursor-pointer`} onClick={()=>changeHandle(data.name)}>{data.name}</div>
            )
                
            )
        }
      </div>
  )
}
