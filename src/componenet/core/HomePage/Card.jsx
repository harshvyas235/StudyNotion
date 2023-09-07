import React from 'react'

export const Card = ({courses}) => {
  return (
    <div className='flex gap-5'>
         {
            courses.map(data=>{
                return(
                    <div>
                        {
                           
                           <div>
                           <p>{data.heading}</p>
                           <p>{data.description}</p>
                           <p>{data.level}</p>
                           </div>
                           
                        }
                    </div>
                )
            })
         }
    </div>
  )
}
