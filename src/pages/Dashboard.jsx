import React from 'react'
import { Sidebar } from '../componenet/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

export const Dashboard = () => {
  return (
    <div className='flex'>
       <Sidebar/>
       <div>
         <Outlet/>
       </div>

    </div>
  )
}
