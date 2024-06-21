import React, { useState } from "react";

export const Tab = (props) => {
   
    
    const {data,change,curr}= props
   
    const changeHandle=(data)=>{
      
        change(data)
    }
    

  return (
      <div className=" flex gap-[10px] items-center justify-center  h-[36px] text-base font-medium">
        {
            data.map((data)=>(
                <div className={`${data.name===curr ? "text-[#F1F2FF] bg-[#000814]   rounded-3xl py-[6px]  px-[18px] text-base font-medium" : "text-[#999DAA] px-[18px] cursor-pointer"}  `} onClick={()=>changeHandle(data.name)}>{data.name}</div>
            )
                
            )
        }
      </div>
  )
}
