import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { Link ,matchPath} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {AiOutlineShoppingCart} from "react-icons/ai"
import {apiconnector} from "../../Services/apiconnector"
import { categoriesApI } from '../../Services/apis'



export const Navbar = () => {

  const {token}= useSelector((state)=> state.auth);
  const {user}= useSelector((state)=> state.profile)
  const {cart}= useSelector((state)=> state.cart);
  const location = useLocation();
  const [cat_api, setApi]= useState([]);
  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
}

  const fethApi = async()=>{
         try{
          const result = await apiconnector("GET","http://localhost:4000/api/v1/course/showAllCategories")
          console.log("printing the result of the api ", result.data.data);
          setApi(result.data.data)
         

         }
         catch(err){
          console.log("error in geting the all type of the categories")
         }
  }
  
  useEffect(()=>{
    fethApi();
  },[])

  console.log("ek bar data dekh lo cat_api ka",cat_api)


  return (
    <div className=' flex max-w-full px-[120px] py-[12px] border-b bg-richblack-800 m-auto border-richblack-700 border-solid '>
    <div className='w-[160px] h-[32px]'>
      <img src={logo}></img>
    </div>
    <div className=' text-[white] flex items-center justify-center w-[816px]'>
      {
        NavbarLinks.map((link,index)=>(
          
          <div >{link.title==="Catalog"? (
            <div className=' px-[12px] flex items-center gap-1 relative group'>
              <p>{link.title}</p>
              <IoIosArrowDropdownCircle/>
              <div className=' rounded-md bg-white w-[300px] h-24 absolute top-[33px] z-30 translate-x-[-90px]  invisible group-hover:visible transition-all duration-1000 '>
              <div className=' rounded bg-white w-[30px] h-[30px] absolute translate-x-[140px] top-[-10px] rotate-45'>
               
              </div>
               
             

              
              <div className=' '>
              {
              
                cat_api.length ? (
                                            cat_api.map( (subLink, index) => (
                                                <Link to={"/login"} key={index}>
                                                    <p className='text-black'>{subLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
             }
             
              </div> 

              </div>
              

            </div>
          )
          :(<div className=' px-[12px]'>
            <Link to={link.path}>
            <p className={`${matchRoute(link?.path)? "text-yellow-25" : "text-white}"}`}>{link.title}</p>
              
            </Link>
          </div>)
          }</div>
          
        ))


      }
    </div>

    
    <div className=' text-white flex gap-3'>
    {
      token===null && 
      <div className='bg-richblack-700 rounded-lg border-richblack-800 text-richblack-100 flex justify-center items-center'>
        <Link to="/login" className='py-2 px-4'>
           Login
        </Link>
      </div>
      
    }{
      
      user && user?.accountType !="Instructor"&&(
        <div>
        <Link to="/dashboard/cart" >
           <AiOutlineShoppingCart />
        </Link>
        </div>
       
      )
    }

    {

       token===null && (
        <div className='bg-richblack-700  bottom-8 border-richblack-900 rounded-lg py-[8px] px-[8px] text-richblack-100'>
        <Link to="/signUp">
            Sign Up
        </Link>
        </div>
       
       )

    }




    </div>
 
        
    </div>
  )
}
