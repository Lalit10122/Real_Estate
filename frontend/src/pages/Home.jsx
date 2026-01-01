import React from 'react'
import { ArrowRight, TrendingUp, Award, Shield, Users } from 'lucide-react'

import StatsSection from '../components/StatusSection'
import propertyData from '../assets/Data/Property'
import PropertySlider from '../components/PropertySlider'
import { useNavigate } from 'react-router-dom'
import HomeFilter from '../components/HomeFIlter'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className='relative overflow-hidden bg-white'>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
          <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch'>
            
            {/* Left side - Content & Filter */}
            <div className='w-full lg:w-1/2 flex flex-col justify-between space-y-6'>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full w-fit">
                <TrendingUp size={16} className="text-black" />
                <span className="text-sm font-semibold text-gray-700">India's #1 Property Platform</span>
              </div>

              {/* Heading */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900">
                  Find Your
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                    Dream Home
                  </span>
                </h1>
                <p className="mt-4 text-base lg:text-lg text-gray-600 leading-relaxed">
                  Discover 1000+ verified properties across India. Your perfect home is just a search away.
                </p>
              </div>

              {/* Filter Component - Desktop */}
              <div className="hidden lg:block flex-1">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 h-full flex flex-col">
                  <HomeFilter />
                </div>
              </div>

              {/* Trust Indicators - Desktop */}
              <div className="hidden lg:grid grid-cols-3 gap-4 pt-2">
                <div className="flex flex-col items-center text-center p-3 bg-green-50 rounded-xl border border-green-100">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Shield className="text-green-600" size={20} />
                  </div>
                  <div className="text-sm font-bold text-gray-900">100%</div>
                  <div className="text-xs text-gray-600">Verified</div>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Award className="text-blue-600" size={20} />
                  </div>
                  <div className="text-sm font-bold text-gray-900">Award</div>
                  <div className="text-xs text-gray-600">Winning</div>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <Users className="text-purple-600" size={20} />
                  </div>
                  <div className="text-sm font-bold text-gray-900">50K+</div>
                  <div className="text-xs text-gray-600">Users</div>
                </div>
              </div>
            </div>

            {/* Right side - Hero Image */}
            <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center">
              <div className="relative w-full h-full min-h-[700px]">
                {/* Main Image Container */}
                <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                    alt="Modern Luxury Villa"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Image Content Overlay */}
                  <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg mb-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold">Available Now</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">Luxury Villa in Prime Location</h3>
                    <p className="text-white/90 text-lg mb-4">Starting from ₹2.5 Cr</p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold">4</span>
                        </div>
                        <span className="text-sm">Bedrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold">5</span>
                        </div>
                        <span className="text-sm">Bathrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold">3200</span>
                        </div>
                        <span className="text-sm">Sq Ft</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Stats Card - Top Right */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-2xl p-5 animate-float z-20 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="text-white" size={28} />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">99%</div>
                      <div className="text-sm text-gray-600 whitespace-nowrap">Success Rate</div>
                    </div>
                  </div>
                </div>

                {/* Floating Stats Card - Bottom Left */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-5 animate-float-delayed z-20 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                      <Award className="text-white" size={28} />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">1000+</div>
                      <div className="text-sm text-gray-600 whitespace-nowrap">Properties</div>
                    </div>
                  </div>
                </div>

                {/* Decorative Blobs */}
                <div className="absolute -z-10 top-20 -right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                <div className="absolute -z-10 bottom-20 -left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute -z-10 top-1/2 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Section */}
      <div className="lg:hidden px-4 sm:px-6 py-8 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <HomeFilter />
        </div>
      </div>

      {/* Mobile Trust Indicators */}
      <div className="lg:hidden px-4 sm:px-6 py-6 bg-white">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="text-green-600" size={24} />
            </div>
            <div className="text-xs font-bold text-gray-900">100%</div>
            <div className="text-xs text-gray-600">Verified</div>
          </div>
          <div className="text-center bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="text-blue-600" size={24} />
            </div>
            <div className="text-xs font-bold text-gray-900">Award</div>
            <div className="text-xs text-gray-600">Winning</div>
          </div>
          <div className="text-center bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="text-purple-600" size={24} />
            </div>
            <div className="text-xs font-bold text-gray-900">50K+</div>
            <div className="text-xs text-gray-600">Users</div>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Featured Properties
              </h2>
              <p className="text-gray-600">
                Handpicked properties just for you
              </p>
            </div>
            <button 
              onClick={() => navigate('/search')}
              className="hidden sm:flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              View All
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Property Slider */}
          <PropertySlider propertyData={propertyData?.slice(0, 8) || []} />

          {/* Mobile View All Button */}
          <button 
            onClick={() => navigate('/search')}
            className="sm:hidden w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-xl font-semibold active:scale-95 transition-transform"
          >
            View All Properties
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 lg:py-16">
        <StatsSection />
      </div>

      {/* Why Choose Us Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best real estate experience with verified properties and trusted services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Verified</h3>
              <p className="text-gray-600 leading-relaxed">
                Every property is thoroughly verified by our expert team to ensure authenticity and quality.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Award Winning</h3>
              <p className="text-gray-600 leading-relaxed">
                Recognized as India's best property platform with multiple industry awards and accolades.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted by Thousands</h3>
              <p className="text-gray-600 leading-relaxed">
                Join 50,000+ happy customers who found their dream homes through our platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-white">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-grid-pattern"></div>
            </div>

            {/* Animated Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Start your property search today and discover thousands of verified listings
              </p>
              <button 
                onClick={() => navigate('/search')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-transform shadow-xl"
              >
                Start Exploring
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  )
}

export default Home

// import React, { useState } from 'react'
// import image from '../assets/Images/Gemini_Generated_Image_chqsg7chqsg7chqs.png'
// import PropertyFilter from '../components/PropertyFilter'
// import StatsSection from '../components/StatusSection'
// import propertyData from '../assets/Data/Property'
// import PropertyCard from '../components/PropertyCard'
// import PropertySlider from '../components/PropertySlider'

// const Home = () => {

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <div className='flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-6 lg:py-10 gap-6 lg:gap-8 min-h-screen lg:h-screen'>
 
//         {/* Left side - Filter search section */}
//         <div className='w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex flex-col p-4 sm:p-6 lg:p-8 lg:max-h-[600] shadow-sm'>
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-neutral-900">
//             Search Properties Across India
//           </h1>
//           <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600">
//             Filter by location, property type, city, or area and explore the best real estate options near you.
//           </p>

//           {/* Filter Component */}
//           <div className="mt-2 sm:mt-2 overflow-y-auto flex-1">
//             <PropertyFilter />
//           </div>
//         </div>

//         {/* Right side - Image section */}
//         <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[450px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
//           {/* Image */}
//           <img
//             src={image}
//             alt="Real Estate Property"
//             className="w-full h-full object-cover"
//           />

//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black/40 via-black/20 to-transparent"></div>

//           {/* Optional Text Overlay for Mobile */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:hidden">
//             <h2 className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
//               Find Your Dream Property
//             </h2>
//             <p className="text-white/90 text-sm sm:text-base mt-2 drop-shadow">
//               Thousands of properties waiting for you
//             </p>
//           </div>
//         </div>

//       </div>

//       {/* Stats Section */}
//       <div className="mt-0 lg:-mt-16">
//         <StatsSection />
//       </div>

//       {/* Properties Section Placeholder */}
//       <PropertySlider propertyData={propertyData}/>
      
//     </div>
//   )
// }

// export default Home

// import React, { useState } from 'react'
// import image from '../assets/Images/Gemini_Generated_Image_chqsg7chqsg7chqs.png'
// import PropertyFilter from '../components/PropertyFilter'
// import StatsSection from '../components/StatusSection'
// import propertyData from '../assets/Data/Property'
// import PropertyCard from '../components/PropertyCard'
// import PropertySlider from '../components/PropertySlider'

// const Home = () => {

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <div className='flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-6 lg:py-10 gap-6 lg:gap-8 lg:min-h-screen lg:h-screen'>
 
//         {/* Left side - Filter search section */}
//         <div className='w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex flex-col p-4 sm:p-6 lg:p-8 lg:max-h-[600px] shadow-sm'>
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-neutral-900">
//             Search Properties Across India
//           </h1>
//           <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600">
//             Filter by location, property type, city, or area and explore the best real estate options near you.
//           </p>

//           {/* Filter Component */}
//           <div className="mt-2 sm:mt-2 overflow-y-auto flex-1">
//             <PropertyFilter />
//           </div>
//         </div>

//         {/* Right side - Image section (Hidden on Mobile) */}
//         <div className="hidden lg:block relative w-full lg:w-1/2 h-[600px] rounded-2xl overflow-hidden shadow-2xl">
//           {/* Image */}
//           <img
//             src={image}
//             alt="Real Estate Property"
//             className="w-full h-full object-cover"
//           />

//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/20 to-transparent"></div>
//         </div>

//       </div>

//       {/* Properties Section - Shows right after filter on mobile */}
//       <div className="lg:hidden px-4 sm:px-6 py-8">
//         <div className="mb-6">
//           <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
//             Featured Properties
//           </h2>
//           <p className="text-sm text-neutral-600">
//             Discover the best properties available
//           </p>
//         </div>
//         <PropertySlider propertyData={propertyData}/>
//       </div>

//       {/* Stats Section */}
//       <div className="mt-8 lg:-mt-16">
//         <StatsSection />
//       </div>

//       {/* Properties Section for Desktop */}
//       <div className="hidden lg:block px-4 sm:px-6 lg:px-8 py-12">
//         <PropertySlider propertyData={propertyData}/>
//       </div>
      
//     </div>
//   )
// }

// export default Home