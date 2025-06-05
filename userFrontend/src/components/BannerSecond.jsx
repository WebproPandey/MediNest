import React from 'react'
import first from "../assets/Banner/mother.png"
import second from "../assets/Banner/NitricBoost.png" // Add your image
import third from "../assets/Banner/babyproduct.png" // Add your image

const BannerSecond = () => {
  return (
    <div className='min-h-[50vh] w-full px-2 md:px-10 py-4'>
      <div className='w-full h-full grid grid-cols-1 md:grid-cols-3 gap-3'>
        
        <div className='lifeside h-full w-full rounded-md relative bg-purple-300 p-4 flex items-end justify-end'>
          <div className='h-full absolute top-0 left-0 z-[7]'>
            <img src={first} className='h-full w-full object-center' alt="Maternal" />
          </div>
          <div className='h-full w-[70%] md:w-[60%] z-[9] relative flex flex-col items-end justify-between'>
            <div className='text-xl md:text-3xl tracking-tighter font-semibold text-[#333] text-end'>Maternal Health and Comfort</div>
            <div>
              <h1 className='text-xl md:text-3xl font-semibold text-[#333]'>5%</h1>
              <h1 className='text-xl md:text-3xl font-semibold text-[#333]'>CashBack</h1>
            </div>
          </div>
        </div>

        <div className='rightside h-full w-full rounded-md relative bg-cyan-200 p-4 flex items-end justify-end'>
          <div className='h-full absolute top-0 left-0 z-[7]'>
            <img src={second} className='h-full w-full object-center' alt="Immunity" />
          </div>
          <div className='h-full w-[70%] md:w-[60%] z-[9] relative flex flex-col items-end justify-between'>
            <div className='text-xl md:text-3xl tracking-tighter font-semibold text-[#333] text-end'>Immunity Boost Essentials</div>
            <div>
              <h1 className='text-xl md:text-3xl font-semibold text-[#333]'>Flat 10%</h1>
              <h1 className='text-xl md:text-3xl font-semibold text-[#333]'>Off Today</h1>
            </div>
          </div>
        </div>

        <div className='rightside h-full w-full rounded-md relative bg-orange-400 p-4 flex items-end justify-end'>
          <div className='h-full absolute top-0 left-0 z-[7]'>
            <img src={third} className='h-full w-full object-center' alt="Baby Care" />
          </div>
          <div className='h-full w-[70%] md:w-[60%] z-[9] relative flex flex-col items-end justify-between'>
            <div className='text-xl md:text-3xl tracking-tighter font-semibold text-[#333] text-end'>Child Care & Baby Needs</div>
            <div>
              <h1 className='text-xl md:text-3xl font-semibold text-[#333]'>Upto 15%</h1>
              <h1 className='text-xl md:text-3xl font-semibold text-[#333]'>Discount</h1>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BannerSecond
