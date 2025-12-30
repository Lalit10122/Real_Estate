import React, { useState } from 'react'
import image from '../assets/Images/Gemini_Generated_Image_chqsg7chqsg7chqs.png'
import PropertyFilter from '../components/PropertyFilter'
import StatsSection from '../components/StatusSection'

const Home = () => {
 
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className='flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-6 lg:py-10 gap-6 lg:gap-8 min-h-screen lg:h-screen'>
        
        {/* Left side - Filter search section */}
        <div className='w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex flex-col p-4 sm:p-6 lg:p-8 lg:max-h-[520px] shadow-sm'>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-neutral-900">
            Search Properties Across India
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600">
            Filter by location, property type, city, or area and explore the best real estate options near you.
          </p>
          
          {/* Filter Component */}
          <div className="mt-2 sm:mt-2 overflow-y-auto flex-1">
            <PropertyFilter/>
          </div>
        </div>

        {/* Right side - Image section */}
        <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
          {/* Image */}
          <img
            src={image}
            alt="Real Estate Property"
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black/40 via-black/20 to-transparent"></div>

          {/* Optional Text Overlay for Mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:hidden">
            <h2 className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
              Find Your Dream Property
            </h2>
            <p className="text-white/90 text-sm sm:text-base mt-2 drop-shadow">
              Thousands of properties waiting for you
            </p>
          </div>
        </div>

      </div>

      {/* Stats Section */}
      <div className="mt-0 lg:-mt-16">
        <StatsSection/>
      </div>

      {/* Properties Section Placeholder */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg">
            Browse our handpicked selection of premium properties
          </p>
          {/* Add your property cards here */}


        </div>
      </div>
    </div>
  )
}

export default Home