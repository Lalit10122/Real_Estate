import React, { useState } from 'react'
import image from '../assets/Images/Gemini_Generated_Image_chqsg7chqsg7chqs.png'
import PropertyFilter from '../components/PropertyFilter'
const Home = () => {
 
  return (
    <div>
      {/* {/ * hero section */}
      <div className='flex px-2 py-5 justify-between gap-1'>
        {/* left side filter search section */}
        <div className=' w-1/2 bg-gray-100  flex flex-col md:max-h-[520px] px-2 '>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900">Search Properties Across India</h1>
          <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-neutral-600">Filter by location, property type, city, or area and explore the best real estate options near you.</p>
          <PropertyFilter/>
        </div>

        {/* right side image section */}
        <div className="relative w-1/2 h-[300px] md:h-[420px] lg:h-[520px]  overflow-hidden shadow-2xl">
          {/* Image */}
          <img
            src={image}
            alt="Real Estate Property"
            className="w-full h-full object-cover"
          />

          {/* Optional Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/10 to-transparent"></div>
        </div>

      </div>

      {/* Data */}
      <div>DATA</div>

      {/* properties ...s */}
    </div>
  )
}

export default Home
