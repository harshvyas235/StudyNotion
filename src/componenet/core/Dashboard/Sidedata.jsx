import React from 'react'
import * as Icons from "react-icons/vsc"
import { matchPath, NavLink, useLocation } from 'react-router-dom';



export const Sidedata = ({data}) => {
    const Icon = Icons[data.icon];
    const location= useLocation()
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
     }
  return (
    <div>
        <div className='' >
           <NavLink to={data.path}
           className={` flex items-center gap-x-2 text-sm py-[8px] px-[24px] text-[#838894] ${matchRoute(data?.path)? "text-yellow-25" : "text-[#838894]}"} `} >
                

                    <Icon className=' h-[16px] w-[16px]'/>
                    <span className=' '>{data.name}</span>
                

           </NavLink>
        </div>
    </div>
  )
}
