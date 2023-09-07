import React from 'react'
import { Link } from 'react-router-dom'

export const BUTTON = ({link , active,children}) => {
  return (
    <div>
    <Link to={link}>
    <button className={` rounded-lg flex justify-center items-center  py-3 px-6 w-fit  h-auto  ${active ? "bg-[#FFD60A] text-[#000814]":"bg-[#161D29]"}`}>
    {children}

    </button>
    </Link>
    

    </div>
  )
}
