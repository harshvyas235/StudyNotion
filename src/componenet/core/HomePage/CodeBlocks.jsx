import React from 'react'
import { HIGHLIGHT } from './HIGHLIGHT'
import { BUTTON } from './BUTTON'

import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'


export const CodeBlocks = ({ position, heading, subheading, clickbtn1, clickbtn2, code, baground, codeColor,background }) => {
    return (
        <div className={`m-auto py-24 flex ${position} gap-[98px] w-11/12 font-inter`} >
            <div className='flex flex-col  max-w-[486px] '>
                <p className=' text-4xl'>{heading}</p>
                <p className=' py-3 text-[#838894]  text-base'>{subheading}</p>
                <div className=' flex gap-2 pt-14'>
                    <button>{<BUTTON link={clickbtn1.link} active={clickbtn1.active}  >{clickbtn1.children}</BUTTON>}</button>
                    <button>{<BUTTON link={clickbtn2.link} active={clickbtn2.active}  >{clickbtn2.children}</BUTTON>}</button>
                </div>

            </div>

            <div className=' w-[534px] relative code-border'>
            <div className=''>
             {background}
            </div>
                <div className='flex  py-2 px-2    '>
                    <div className='flex flex-col text-center text-richblack-400 font-inter font-bold w-[10%]'>
                        <p>0</p>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>

                    </div>
                    <div className={`flex flex-col font-mono font-bold gap-2 pr-2 ${codeColor} block w-[90%] `}>
                        <TypeAnimation
                            sequence={[code, 2000, ""]}
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                            style={
                                {
                                    whiteSpace: "pre-line",
                                    display: 'block'
                                }

                            }
                        />

                    </div>
                </div>
            </div>

        </div>
    )
}
