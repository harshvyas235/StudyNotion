import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { HIGHLIGHT } from '../componenet/core/HomePage/HIGHLIGHT'
import { BUTTON } from '../componenet/core/HomePage/BUTTON'
import banner from '../assets/Images/banner.mp4'
import { CodeBlocks } from '../componenet/core/HomePage/CodeBlocks'
import img from '../assets/Images/bghome.svg'
import logo1 from '../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../assets/TimeLineLogo/Logo4.svg'
import timelineImg from '../assets/Images/TimelineImage.png'
import { Filtercard } from '../componenet/core/HomePage/Filtercard'
import { Card } from '../componenet/core/HomePage/Card'
import { HomePageExplore } from '../data/homepage-explore'
import instructor from '../assets/Images/Instructor.png'
import Plan_your from '../assets/Images/Plan_your_lessons.png'
import Know_your from '../assets/Images/Know_your_progress.png'
import compare_your from '../assets/Images/Compare_with_others.png'




const HomeData = [
    {
        img: logo1,
        heading: "Leadership",
        text: "Fully committed to the success company"
    },
    {
        img: logo2,
        heading: "Responsibility",
        text: "Students will always be our top priority"
    },
    {
        img: logo3,
        heading: "Flexibility",
        text: "The ability to switch is an important skills"
    },
    {
        img: logo4,
        heading: "Leadership",
        text: "Code your way to a solution"
    },
]
export const HOME = () => {
    const [categoury, setCat]= useState("free")
    const [course,setCourse]= useState([])

    console.log(course)
    console.log("ye categoury")
    console.log(categoury)
    return (
        <div className='flex flex-col' >




            {/* section first*/}
            <div className=' flex flex-col relative w-11/12 items-center  text-white justify-between mt-9 m-auto '>
                <Link to={'/signUp'}>
                    <div className=' flex flex-row   border-1 rounded-full items-center justify-center gap-[10px] py-[6px] px-[18px] bg-richblack-800 text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                        <p className=' '>Become an Instructor</p>

                        <FaArrowRight className='w-[16px] h-[16px]' />
                    </div>

                </Link>

                <div className='flex flex-col gap-[16px]  items-center my-9'>
                    <div className=' text-3xl  lg:text-[36px] font-semibold '>Empower Your Future With <HIGHLIGHT text={"Coding Skills"}></HIGHLIGHT></div>

                    <div className='max-w-[358px] lg:max-w-[913px] font-medium  text-base text-[#838894]'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</div>
                </div>

                <div className='flex  gap-6'>
                    <BUTTON link={"/signUp"} active={true}>
                        Learn More
                    </BUTTON>
                    <BUTTON link={"/login"} active={false} >Book a Demo</BUTTON>
                </div>

                <div className='mx-3 my-7 shadow-[20px_20px_0px_0px_#F5F5F5] '>

                    <video loop autoPlay width={1035} height={515} muted className='shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.2),_10px_10px_30px_4px_rgba(45,78,255,0.15)]' >
                        <source src={banner} type='video/mp4' />
                    </video>
                </div>

                <div>
                    <CodeBlocks
                        position={"flex-row"} heading={
                            <div>
                                <p>Unlock your <HIGHLIGHT text={"coding potential"}></HIGHLIGHT> with our online courses.</p>
                            </div>
                        }
                        Fchange={true}
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        clickbtn1={
                            {
                                link: "/signUp",
                                active: true,
                                children: <div className='flex items-center gap-2'>
                                    <p>Try it Yourself</p>
                                    <FaArrowRight />
                                </div>
                            }

                        }
                        clickbtn2={
                            {
                                link: "/login",
                                active: false,
                                children: "Learn More"
                            }
                        }
                        code={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.\ncss">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>\n`}
                        codeColor={"text-[#0C6A87]"}
                        background={<div className="codeblock1 absolute"></div>}
                    ></CodeBlocks>

                    <CodeBlocks
                        position={"flex-row-reverse"} heading={
                            <div>
                                <p>Start<HIGHLIGHT text={` coding`}></HIGHLIGHT><br></br> <HIGHLIGHT text={"is seconds"} /> </p>
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        clickbtn1={
                            {
                                link: "/signUp",
                                active: true,
                                children: <div className='flex items-center gap-2'>
                                    <p>Continue Lesson</p>
                                    <FaArrowRight />
                                </div>
                            }

                        }
                        clickbtn2={
                            {
                                link: "/login",
                                active: false,
                                children: "Learn More"
                            }
                        }
                        code={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>\n`}
                        codeColor={"text-[#0C6A87]"}
                        background={<div className="codeblock2 absolute"></div>}
                    ></CodeBlocks>

                </div>

            </div>

            <div className='bg-white' >

                <div className={`bg-[url('http://localhost:3000/static/media/bghome.de04eae287ff1d29f0b1f000c15252a2.svg')] w-full h-[254px] flex justify-center items-center gap-6 `}>
                    <div className='pt-8 '>
                        <BUTTON link={"/signUp"} active={true} className="" >
                            <div className='flex gap-2 items-center w-fit'>
                                <p>Explore Full Catalog </p>
                                <FaArrowRight />
                            </div>

                        </BUTTON>

                    </div>
                    <div className='pt-8'>

                        <BUTTON link={"/login"} active={false}><div className='text-white'>Learn More</div>\</BUTTON>

                    </div>



                </div>


                <div className='w-11/12 m-auto flex flex-col py-[120px]  items-center gap-[54px]'>
                    <div className='flex gap-3'>
                        <div className='w-[594px] text-4xl'>
                            <p className=' max-w-[550px]'>Get the skills you need for a <HIGHLIGHT text={"job that is in demand."} /></p>
                        </div>
                        <div className='flex flex-col w-[594px] gap-9 items-start'>
                            <div className=' max-w-[500px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <div>
                                <BUTTON link={"/signUp"} active={true} ><p>Learn More</p></BUTTON>
                            </div>
                        </div>
                    </div>

                    <div className='  flex flex-row  h-[545px]  m-auto justify-center gap-[76px]  '>
                    <div className='w-[410px]   '>
                    <div className='w-[410px] h-[84px] py-[100px] '>
                            {
                                HomeData.map((data, Index) => {
                                    return (
                                        <div className='flex flex-row w-[420px] gap-[24px]  px-[12px]' key={Index}>
                                            <div className='flex flex-col  items-center py-[4px] gap-4'>
                                                <img src={data.img} className=' bg-white  border-pure-greys-50  shadow-md rounded-[100%]  w-[24px] h-[24px] p-[4px]' />
                                                <div>
                                                    {
                                                        Index != 3 &&
                                                        <div className='borderline'></div>
                                                    }
                                                </div>
                                            </div>

                                            <div>
                                                <p className='text-[18px] text-[#161D29]'>{data.heading}</p>
                                                <p className='text-[14px] text-[#2C333F]'>{data.text}</p>
                                            </div>
                                        </div>
                                    )

                                })

                            }
                        </div>
                    </div>
                       
                        <div className=' relative'>
                           <img src={timelineImg} className='w-[714px]'/>
                           <div className='w-[511px] h-[128px] bg-[#014A32] absolute  top-[460px] left-[100px] flex items-center justify-center gap-[52px]  p-[42px]' >
                                  <div className='flex gap-[24px] border-r border-[#037957] px-7 '>
                                     <p className=' text-4xl text-white font-bold'>10</p>
                                     <div className='text-[#05A77B] text-[14px] font-medium uppercase flex justify-center'>
                                             Year<br></br>
                                         experience
                                     </div>
                                  </div>


                                  <div className='flex gap-[24px]'>
                                  <p className=' text-4xl text-white font-bold'>250</p>
                                  <div className='text-[#05A77B] text-[14px] font-medium uppercase flex justify-center items-center'>
                                            type of courses<br></br>
                                        
                                     </div>


                                  </div>
                                 
                            <div>

                            </div>
                           </div>
                        </div>

                    </div>

                </div>


                {/* <Filtercard  categories={setCat} courses={setCourse}></Filtercard><Card courses={course} ></Card> */}

                <div className='w-11/12 m-auto flex flex-col justify-center items-center gap-[52px] my-[90px] '>
                <div className='flex flex-col items-center w-[60%]  gap-4'>
                    <p className='text-4xl font-bold'>Your swiss knife for <span><HIGHLIGHT text={"learning any language"}/></span></p>
                    <p className=' max-w-[80%]'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
                </div>

                <div className=' flex   relative w-[1000px] h-[360px] justify-center '>
                    <img src={Know_your} className='h-[330px] absolute left-20 top-5 '/>
                    <img src={compare_your} className='h-[370px] absolute'/>
                    <img src={Plan_your} className='h-[340px] absolute right-24' />
                </div>
               <div className='mt-[36px]'>
                <BUTTON active={true} link={'/signup'}>Learn more</BUTTON>
               </div>
                </div>

             
                


            </div>


             {/* third section  */}

            <div className='flex w w-11/12 m-auto justify-center my-[90px] gap-24'>
                    <div className=' w-[500px]   shadow-[-20px_-20px_0px_0px_#F5F5F5] h-fit'>
                       <img src={instructor}  />
                    </div>


                    <div className='flex  flex-col  items-start justify-center w-[500px] text-white gap-2 max-w-[486px]'>
                    <div className='text-4xl font-inter '>
                    <p>Become an</p>
                    <HIGHLIGHT text={"instructor"}/>
                    </div>
                    <div></div>
                    <p className='text-base text-[#838894] font-inter'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    <div className=' pt-[56px]'>
                        <BUTTON active={true} link={'/signup'} >{
                            <div className='flex items-center '>
                            <p>Start teaching Today</p>
                            <FaArrowRight/>
                            </div>
                        }</BUTTON>
                    </div>
                    

                    

                    </div>
                </div>
                




        </div>
    )
}
