import React from 'react'
import secrum from "../assets/Banner/vaseline.jpg";

const Banner = () => {
  return (
    <div className='h-[40vh] md:h-[60vh] w-full px-2 md:px-10 py-3 md:py-[10vh] relative '>
        <div className='h-[80%]  absolute  bottom-5 md:top-0 left-[5%] w-[30vw] md:w-[25vw]'> 
          <img src={secrum} className='h-full   w-full object-cover' alt="" />
        </div>
        <div className='w-full h-full  bg-blue-600 rounded-md flex items-center  justify-end'>
            <div className='w-[60%] h-full  flex flex-col  justify-evenly items-start '>
                <button className="rounded-full bg-yellow-500 text-white font-medium py-2 px-8 text-[2vw] md:text-sm">Save 35%</button>
  
                <div className="w-[80%] text-sm md:text-2xl font-medium text-white leading-none tracking-tight">
                  Save up to 10%. Limited-time offer. Free delivery with PLANS Membership.
               </div>
               <button className="rounded-full bg-yellow-500 text-white font-medium py-2 px-8 text-[2vw] md:text-sm">Join Now</button>
           </div>
          </div> 
    </div>
  )
}

export default Banner