import React, { useState, useEffect } from 'react'
import { Home, X, ChevronUp, ChevronDown, IndianRupee, MapPin, Grid2x2Plus, Ruler, SquarePlus, Trees, Search as SearchIcon, SlidersHorizontal } from 'lucide-react'
import PriceRangeSlider from '../components/PriceRangeSlider'
import LocationSelector from '../components/LocationSelector'
import BedroomBathroomSelector from '../components/BedroomBathroomSelector'
import AreaRangeSlider from '../components/AreaRangeSlider'
import AmenitiesSelector from '../components/AmenitiesSelector'
import FeaturesSelector from '../components/FeaturesSelector'
import PropertyToggles from '../components/PropertyToggles'
import PropertyCard from '../components/PropertyCard'

import propertyData from '../assets/Data/Property'
import SkeletonLoader from '../components/PropertyCardSkeleton'

const Search = () => {
  // Filter States
  const [isBuy, setisBuy] = useState(true)
  const [propertyType, setpropertyType] = useState("")
  const [startPriceRange, setstartPriceRange] = useState("")
  const [endPriceRange, setendPriceRange] = useState("")
  const [state, setstate] = useState("")
  const [city, setcity] = useState("")
  const [area, setarea] = useState("")
  const [pinCode, setpinCode] = useState("")
  const [bedRooms, setbedRooms] = useState([])
  const [bathRooms, setbathRooms] = useState([])
  const [startArea, setstartArea] = useState("")
  const [endArea, setendArea] = useState("")
  const [aminities, setaminities] = useState([])

  // Features
  const [furnishingStatus, setfurnishingStatus] = useState("")
  const [possessionStatus, setpossessionStatus] = useState("")
  const [propertyAge, setpropertyAge] = useState("")
  const [facingDirection, setfacingDirection] = useState("")

  // Toggles
  const [igVerifiedProperty, setigVerifiedProperty] = useState(false)
  const [isFeaturedProperty, setisFeaturedProperty] = useState(false)
  const [isParking, setisParking] = useState(false)
  const [immediatelyAvailable, setimmediatelyAvailable] = useState(false)

  // Shown States
  const [isPropertyTypeShowm, setisPropertyTypeShowm] = useState(false)
  const [isPriceRangeShown, setisPriceRangeShown] = useState(false)
  const [isLocationShown, setisLocationShown] = useState(false)
  const [isbedroomShown, setisbedroomShown] = useState(false)
  const [isAreaShown, setisAreaShown] = useState(false)
  const [isAminitiesShown, setisAminitiesShown] = useState(false)
  const [isFeaturesShown, setisFeaturesShown] = useState(false)

  // Search Results States
  const [filteredProperties, setFilteredProperties] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  // Filter Properties
  const filterProperties = () => {
    setIsLoading(true)

    setTimeout(() => {
      let results = [...propertyData]

      results = results.filter(property => 
        property.listingType === (isBuy ? 'sell' : 'rent')
      )

      if (propertyType) {
        results = results.filter(property => 
          property.propertyType === propertyType
        )
      }

      if (startPriceRange || endPriceRange) {
        results = results.filter(property => {
          const price = property.price.amount
          const minPrice = startPriceRange || 0
          const maxPrice = endPriceRange || Infinity
          return price >= minPrice && price <= maxPrice
        })
      }

      if (state) {
        results = results.filter(property => 
          property.location.state === state
        )
      }
      if (city) {
        results = results.filter(property => 
          property.location.city === city
        )
      }
      if (area) {
        results = results.filter(property => 
          property.location.area.toLowerCase().includes(area.toLowerCase())
        )
      }
      if (pinCode) {
        results = results.filter(property => 
          property.location.pincode === pinCode
        )
      }

      if (bedRooms.length > 0) {
        results = results.filter(property => {
          const bhk = property.description?.match(/(\d+)BHK/)?.[1]
          return bedRooms.includes(bhk) || bedRooms.includes(bhk + '+')
        })
      }

      if (startArea || endArea) {
        results = results.filter(property => {
          const propertyArea = property.area.value
          const minArea = startArea || 0
          const maxArea = endArea || Infinity
          return propertyArea >= minArea && propertyArea <= maxArea
        })
      }

      if (aminities.length > 0) {
        results = results.filter(property => 
          aminities.every(amenity => 
            property.amenities?.includes(amenity)
          )
        )
      }

      if (furnishingStatus) {
        results = results.filter(property => 
          property.features?.furnished === furnishingStatus
        )
      }

      if (possessionStatus) {
        results = results.filter(property => 
          property.features?.possession === possessionStatus
        )
      }

      if (propertyAge) {
        results = results.filter(property => 
          property.features?.age === propertyAge
        )
      }

      if (facingDirection) {
        results = results.filter(property => 
          property.features?.facing === facingDirection
        )
      }

      if (igVerifiedProperty) {
        results = results.filter(property => property.isVerified === true)
      }

      if (isFeaturedProperty) {
        results = results.filter(property => property.isFeatured === true)
      }

      if (isParking) {
        results = results.filter(property => 
          property.features?.parking && 
          (property.features.parking.covered > 0 || property.features.parking.open > 0)
        )
      }

      if (immediatelyAvailable) {
        results = results.filter(property => 
          property.availability?.immediatelyAvailable === true
        )
      }

      setFilteredProperties(results)
      setIsLoading(false)
    }, 800)
  }

  useEffect(() => {
    filterProperties()
  }, [
    isBuy, propertyType, startPriceRange, endPriceRange, 
    state, city, area, pinCode, bedRooms, bathRooms,
    startArea, endArea, aminities, furnishingStatus,
    possessionStatus, propertyAge, facingDirection,
    igVerifiedProperty, isFeaturedProperty, isParking, immediatelyAvailable
  ])

  const clearAllFilters = () => {
    setisBuy(true)
    setpropertyType("")
    setstartPriceRange("")
    setendPriceRange("")
    setstate("")
    setcity("")
    setarea("")
    setpinCode("")
    setbedRooms([])
    setbathRooms([])
    setstartArea("")
    setendArea("")
    setaminities([])
    setfurnishingStatus("")
    setpossessionStatus("")
    setpropertyAge("")
    setfacingDirection("")
    setigVerifiedProperty(false)
    setisFeaturedProperty(false)
    setisParking(false)
    setimmediatelyAvailable(false)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (propertyType) count++
    if (startPriceRange || endPriceRange) count++
    if (state || city || area || pinCode) count++
    if (bedRooms.length > 0) count++
    if (bathRooms.length > 0) count++
    if (startArea || endArea) count++
    if (aminities.length > 0) count++
    if (furnishingStatus) count++
    if (possessionStatus) count++
    if (propertyAge) count++
    if (facingDirection) count++
    if (igVerifiedProperty) count++
    if (isFeaturedProperty) count++
    if (isParking) count++
    if (immediatelyAvailable) count++
    return count
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Filter Sidebar */}
      <div className='w-1/3 bg-gray-100 hidden lg:block rounded-[10px] shadow-md m-2 pb-1.5 h-screen overflow-y-auto sticky top-2'>
        <div className='border-b-[1px] border-gray-300 bg-white rounded-t-[10px] sticky top-0 z-10'>
          <div className='flex justify-between mt-4 p-2 border-b-[1px] border-gray-300'>
            <h1 className='text-3xl m-2'>Property Filters</h1>
            <div 
              onClick={clearAllFilters}
              className='lg:m-2 lg:h-[40px] lg:px-4 py-1 flex justify-center bg-black text-white rounded-[10px] items-center gap-1 cursor-pointer hover:scale-110 duration-400 hover:shadow-2xl ease-in'
            >
              <X size={16} />
              <h4>Clear All</h4>
            </div>
          </div>

          <div className='flex justify-center gap-8 py-3 m-2'>
            <div 
              className={`lg:py-1.5 lg:px-12 lg:text-[20px] border-[1px] text-black border-gray-700 rounded-[10px] ${isBuy ? 'bg-black text-white' : ''} flex items-center justify-center cursor-pointer hover:scale-105 duration-500 ease-in-out`}
              onClick={() => setisBuy(true)}
            >
              <div>Buy</div>
            </div>
            <div 
              className={`lg:py-1.5 lg:px-12 lg:text-[20px] border-[1px] text-black border-gray-700 rounded-[10px] ${!isBuy ? 'bg-black text-white' : ''} flex items-center justify-center cursor-pointer hover:scale-105 duration-500 ease-in-out`}
              onClick={() => setisBuy(false)}
            >
              <div>Rent</div>
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className='bg-white shadow-sm m-2 rounded-[10px] py-4 p-2'>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <Home size={16} />
              <h3>Property Type</h3>
            </div>
            <div onClick={() => setisPropertyTypeShowm(!isPropertyTypeShowm)}>
              {isPropertyTypeShowm ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          <div className={`${isPropertyTypeShowm ? 'grid grid-cols-2 p-2 gap-4' : 'hidden'}`}>
            <div className={`hover:scale-105 duration-400 ease-in-out border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'flat' ? 'bg-black text-white' : ''} cursor-pointer`}
              onClick={() => setpropertyType(propertyType === 'flat' ? '' : 'flat')}><h2>Flat</h2></div>
            <div className={`hover:scale-105 duration-500 ease-in-out border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'villa' ? 'bg-black text-white' : ''} cursor-pointer`}
              onClick={() => setpropertyType(propertyType === 'villa' ? '' : 'villa')}><h2>Villa</h2></div>
            <div className={`hover:scale-105 duration-500 ease-in-out border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'plot' ? 'bg-black text-white' : ''} cursor-pointer`}
              onClick={() => setpropertyType(propertyType === 'plot' ? '' : 'plot')}><h2>Plot</h2></div>
            <div className={`hover:scale-105 duration-500 ease-in-out border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'commercial' ? 'bg-black text-white' : ''} cursor-pointer`}
              onClick={() => setpropertyType(propertyType === 'commercial' ? '' : 'commercial')}><h2>Commercial</h2></div>
          </div>
        </div>

        {/* Price Range */}
        <div className='bg-white shadow-sm m-2 rounded-[10px] py-4 p-2'>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <IndianRupee size={16} />
              <h3>Price Range</h3>
            </div>
            <div onClick={() => setisPriceRangeShown(!isPriceRangeShown)}>
              {isPriceRangeShown ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          <div className={`${isPriceRangeShown ? '' : 'hidden'}`}>
            <PriceRangeSlider startPriceRange={startPriceRange} endPriceRange={endPriceRange} setendPriceRange={setendPriceRange} setstartPriceRange={setstartPriceRange} />
          </div>
        </div>

        {/* Location */}
        <div className='bg-white shadow-sm m-2 rounded-[10px] py-4 p-2'>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <MapPin size={16} />
              <h3>Location</h3>
            </div>
            <div onClick={() => setisLocationShown(!isLocationShown)}>
              {isLocationShown ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          <div className={`${isLocationShown ? 'p-2' : 'hidden'}`}>
            <LocationSelector
              state={state}
              setstate={setstate}
              city={city}
              setcity={setcity}
              area={area}
              setarea={setarea}
              pinCode={pinCode}
              setpinCode={setpinCode}
            />
          </div>
        </div>

        {/* Bedrooms and Bathrooms */}
        <div className='bg-white shadow-sm m-2 rounded-[10px] py-4 p-2'>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <Grid2x2Plus size={16} />
              <h3>Bedrooms and Bathrooms</h3>
            </div>
            <div onClick={() => setisbedroomShown(!isbedroomShown)}>
              {isbedroomShown ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          <div className={`${isbedroomShown ? 'p-2' : 'hidden'}`}>
            <BedroomBathroomSelector
              bedrooms={bedRooms}
              setBedrooms={setbedRooms}
              bathrooms={bathRooms}
              setBathrooms={setbathRooms}
            />
          </div>
        </div>

        {/* Area */}
        <div className='bg-white shadow-sm m-2 rounded-[10px] py-4 p-2'>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <Ruler size={16} />
              <h3>Set Area</h3>
            </div>
            <div onClick={() => setisAreaShown(!isAreaShown)}>
              {isAreaShown ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          <div className={`${isAreaShown ? 'p-2' : 'hidden'}`}>
            <AreaRangeSlider setstartArea={setstartArea} setendArea={setendArea} startArea={startArea} endArea={endArea} />
          </div>
        </div>

        {/* Amenities */}
        <div className='bg-white shadow-sm m-2 rounded-[10px] py-4 p-2'>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <Trees size={16} />
              <h3>Select Amenities</h3>
            </div>
            <div onClick={() => setisAminitiesShown(!isAminitiesShown)}>
              {isAminitiesShown ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          <div className={`${isAminitiesShown ? 'p-2' : 'hidden'}`}>
            <AmenitiesSelector
              amenities={aminities}
              setAmenities={setaminities}
            />
          </div>
        </div>

        {/* Features */}
        <div className='bg-white shadow-sm m-2 rounded-[10px] py-4 p-2'>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <SquarePlus size={16} />
              <h3>Select Features</h3>
            </div>
            <div onClick={() => setisFeaturesShown(!isFeaturesShown)}>
              {isFeaturesShown ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          <div className={`${isFeaturesShown ? 'p-2' : 'hidden'}`}>
            <FeaturesSelector
              furnishingStatus={furnishingStatus}
              setfurnishingStatus={setfurnishingStatus}
              possessionStatus={possessionStatus}
              setpossessionStatus={setpossessionStatus}
              propertyAge={propertyAge}
              setpropertyAge={setpropertyAge}
              facingDirection={facingDirection}
              setfacingDirection={setfacingDirection}
            />
          </div>
        </div>

        {/* Toggles */}
        <div className='bg-white shadow-sm m-2 rounded-[10px] py-4 p-2'>
          <div className='p-2'>
            <PropertyToggles
              igVerifiedProperty={igVerifiedProperty}
              setigVerifiedProperty={setigVerifiedProperty}
              isFeaturedProperty={isFeaturedProperty}
              setisFeaturedProperty={setisFeaturedProperty}
              isParking={isParking}
              setisParking={setisParking}
              immediatelyAvailable={immediatelyAvailable}
              setimmediatelyAvailable={setimmediatelyAvailable}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilter(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
      >
        <SlidersHorizontal size={24} />
        {getActiveFilterCount() > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {getActiveFilterCount()}
          </span>
        )}
      </button>

      {/* Mobile Filter Sheet */}
      {showMobileFilter && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
            onClick={() => setShowMobileFilter(false)}
          />

          {/* Filter Sheet */}
          <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-gray-100 rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] flex flex-col">
            {/* Sheet Header */}
            <div className='border-b-[1px] border-gray-300 bg-white rounded-t-3xl sticky top-0 z-10'>
              <div className='flex justify-between items-center p-4 border-b-[1px] border-gray-300'>
                <h1 className='text-2xl font-bold'>Filters</h1>
                <button 
                  onClick={() => setShowMobileFilter(false)}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                  <X size={24} />
                </button>
              </div>

              {/* Buy/Rent Toggle */}
              <div className='flex justify-center gap-4 py-3 px-4'>
                <div 
                  className={`flex-1 py-2 px-6 text-base border-[1px] text-black border-gray-700 rounded-[10px] ${isBuy ? 'bg-black text-white' : ''} flex items-center justify-center cursor-pointer active:scale-95 transition-transform`}
                  onClick={() => setisBuy(true)}
                >
                  Buy
                </div>
                <div 
                  className={`flex-1 py-2 px-6 text-base border-[1px] text-black border-gray-700 rounded-[10px] ${!isBuy ? 'bg-black text-white' : ''} flex items-center justify-center cursor-pointer active:scale-95 transition-transform`}
                  onClick={() => setisBuy(false)}
                >
                  Rent
                </div>
              </div>
            </div>

            {/* Scrollable Filter Content */}
            <div className='flex-1 overflow-y-auto p-4'>
              {/* Property Type */}
              <div className='bg-white shadow-sm mb-3 rounded-[10px] py-3 px-3'>
                <div className='flex gap-2 items-center justify-between mb-2'>
                  <div className='flex gap-2 items-center'>
                    <Home size={16} />
                    <h3 className='text-sm font-semibold'>Property Type</h3>
                  </div>
                  <div onClick={() => setisPropertyTypeShowm(!isPropertyTypeShowm)}>
                    {isPropertyTypeShowm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                <div className={`${isPropertyTypeShowm ? 'grid grid-cols-2 gap-3 mt-3' : 'hidden'}`}>
                  <div className={`active:scale-95 transition-transform border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'flat' ? 'bg-black text-white' : ''} cursor-pointer`}
                    onClick={() => setpropertyType(propertyType === 'flat' ? '' : 'flat')}>Flat</div>
                  <div className={`active:scale-95 transition-transform border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'villa' ? 'bg-black text-white' : ''} cursor-pointer`}
                    onClick={() => setpropertyType(propertyType === 'villa' ? '' : 'villa')}>Villa</div>
                  <div className={`active:scale-95 transition-transform border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'plot' ? 'bg-black text-white' : ''} cursor-pointer`}
                    onClick={() => setpropertyType(propertyType === 'plot' ? '' : 'plot')}>Plot</div>
                  <div className={`active:scale-95 transition-transform border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'commercial' ? 'bg-black text-white' : ''} cursor-pointer`}
                    onClick={() => setpropertyType(propertyType === 'commercial' ? '' : 'commercial')}>Commercial</div>
                </div>
              </div>

              {/* Price Range */}
              <div className='bg-white shadow-sm mb-3 rounded-[10px] py-3 px-3'>
                <div className='flex gap-2 items-center justify-between mb-2'>
                  <div className='flex gap-2 items-center'>
                    <IndianRupee size={16} />
                    <h3 className='text-sm font-semibold'>Price Range</h3>
                  </div>
                  <div onClick={() => setisPriceRangeShown(!isPriceRangeShown)}>
                    {isPriceRangeShown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                <div className={`${isPriceRangeShown ? 'mt-2' : 'hidden'}`}>
                  <PriceRangeSlider startPriceRange={startPriceRange} endPriceRange={endPriceRange} setendPriceRange={setendPriceRange} setstartPriceRange={setstartPriceRange} />
                </div>
              </div>

              {/* Location */}
              <div className='bg-white shadow-sm mb-3 rounded-[10px] py-3 px-3'>
                <div className='flex gap-2 items-center justify-between mb-2'>
                  <div className='flex gap-2 items-center'>
                    <MapPin size={16} />
                    <h3 className='text-sm font-semibold'>Location</h3>
                  </div>
                  <div onClick={() => setisLocationShown(!isLocationShown)}>
                    {isLocationShown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                <div className={`${isLocationShown ? 'mt-2' : 'hidden'}`}>
                  <LocationSelector
                    state={state}
                    setstate={setstate}
                    city={city}
                    setcity={setcity}
                    area={area}
                    setarea={setarea}
                    pinCode={pinCode}
                    setpinCode={setpinCode}
                  />
                </div>
              </div>

              {/* Bedrooms and Bathrooms */}
              <div className='bg-white shadow-sm mb-3 rounded-[10px] py-3 px-3'>
                <div className='flex gap-2 items-center justify-between mb-2'>
                  <div className='flex gap-2 items-center'>
                    <Grid2x2Plus size={16} />
                    <h3 className='text-sm font-semibold'>Bedrooms & Bathrooms</h3>
                  </div>
                  <div onClick={() => setisbedroomShown(!isbedroomShown)}>
                    {isbedroomShown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                <div className={`${isbedroomShown ? 'mt-2' : 'hidden'}`}>
                  <BedroomBathroomSelector
                    bedrooms={bedRooms}
                    setBedrooms={setbedRooms}
                    bathrooms={bathRooms}
                    setBathrooms={setbathRooms}
                  />
                </div>
              </div>

              {/* Area */}
              <div className='bg-white shadow-sm mb-3 rounded-[10px] py-3 px-3'>
                <div className='flex gap-2 items-center justify-between mb-2'>
                  <div className='flex gap-2 items-center'>
                    <Ruler size={16} />
                    <h3 className='text-sm font-semibold'>Area</h3>
                  </div>
                  <div onClick={() => setisAreaShown(!isAreaShown)}>
                    {isAreaShown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                <div className={`${isAreaShown ? 'mt-2' : 'hidden'}`}>
                  <AreaRangeSlider setstartArea={setstartArea} setendArea={setendArea} startArea={startArea} endArea={endArea} />
                </div>
              </div>

              {/* Amenities */}
              <div className='bg-white shadow-sm mb-3 rounded-[10px] py-3 px-3'>
                <div className='flex gap-2 items-center justify-between mb-2'>
                  <div className='flex gap-2 items-center'>
                    <Trees size={16} />
                    <h3 className='text-sm font-semibold'>Amenities</h3>
                  </div>
                  <div onClick={() => setisAminitiesShown(!isAminitiesShown)}>
                    {isAminitiesShown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                <div className={`${isAminitiesShown ? 'mt-2' : 'hidden'}`}>
                  <AmenitiesSelector
                    amenities={aminities}
                    setAmenities={setaminities}
                  />
                </div>
              </div>

              {/* Features */}
              <div className='bg-white shadow-sm mb-3 rounded-[10px] py-3 px-3'>
                <div className='flex gap-2 items-center justify-between mb-2'>
                  <div className='flex gap-2 items-center'>
                    <SquarePlus size={16} />
                    <h3 className='text-sm font-semibold'>Features</h3>
                  </div>
                  <div onClick={() => setisFeaturesShown(!isFeaturesShown)}>
                    {isFeaturesShown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                <div className={`${isFeaturesShown ? 'mt-2' : 'hidden'}`}>
                  <FeaturesSelector
                    furnishingStatus={furnishingStatus}
                    setfurnishingStatus={setfurnishingStatus}
                    possessionStatus={possessionStatus}
                    setpossessionStatus={setpossessionStatus}
                    propertyAge={propertyAge}
                    setpropertyAge={setpropertyAge}
                    facingDirection={facingDirection}
                    setfacingDirection={setfacingDirection}
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className='bg-white shadow-sm mb-3 rounded-[10px] py-3 px-3'>
                <PropertyToggles
                  igVerifiedProperty={igVerifiedProperty}
                  setigVerifiedProperty={setigVerifiedProperty}
                  isFeaturedProperty={isFeaturedProperty}
                  setisFeaturedProperty={setisFeaturedProperty}
                  isParking={isParking}
                  setisParking={setisParking}
                  immediatelyAvailable={immediatelyAvailable}
                  setimmediatelyAvailable={setimmediatelyAvailable}
                />
              </div>
            </div>

            {/* Sheet Footer - Sticky */}
            <div className='border-t border-gray-300 bg-white p-4 flex gap-3'>
              {getActiveFilterCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className='flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold active:scale-95 transition-transform'
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setShowMobileFilter(false)}
                className='flex-1 py-3 bg-black text-white rounded-xl font-semibold active:scale-95 transition-transform flex items-center justify-center gap-2'
              >
                <SearchIcon size={20} />
                Show {filteredProperties.length} Results
              </button>
            </div>
          </div>
        </>
      )}

      {/* Results Section */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {isBuy ? 'Properties for Sale' : 'Properties for Rent'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {isLoading ? 'Searching...' : `${filteredProperties.length} properties found`}
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              {getActiveFilterCount() > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                  <span className="text-sm font-semibold">{getActiveFilterCount()} filters active</span>
                  <button onClick={clearAllFilters} className="text-blue-600 hover:text-blue-800">
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <SkeletonLoader count={6} />
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <PropertyCard 
                key={index} 
                property={property}
                onCardClick={(prop) => {
                  console.log('Property clicked:', prop)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <SearchIcon size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search