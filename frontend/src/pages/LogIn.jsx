import React, { useState } from 'react'
import { Home, X, ChevronUp, ChevronDown, IndianRupee, MapPin, Grid2x2Plus, Ruler } from 'lucide-react'
import PriceRangeSlider from '../components/PriceRangeSlider'
import LocationSelector from '../components/LocationSelector'
import BedroomBathroomSelector from '../components/BedroomBathroomSelector'
import AreaRangeSlider from '../components/AreaRangeSlider'
import AmenitiesSelector from '../components/AmenitiesSelector'
import FeaturesSelector from '../components/FeaturesSelector'

const LogIn = () => {
  // make default
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
  const [aminities, setaminities] = useState([]) // in startting all selected



  // features
  const [furnishingStatus, setfurnishingStatus] = useState("")
  const [possessionStatus, setpossessionStatus] = useState("")
  const [propertyAge, setpropertyAge] = useState("")
  const [facingDirection, setfacingDirection] = useState("")

  // Buttons
  const [igVerifiedProperty, setigVerifiedProperty] = useState(false)
  const [isFeaturedProperty, setisFeaturedProperty] = useState(false)
  const [isParking, setisParking] = useState(false)
  const [immediatelyAvailable, setimmediatelyAvailable] = useState(false)

  // shown
  const [isPropertyTypeShowm, setisPropertyTypeShowm] = useState(false)
  const [isPriceRangeShown, setisPriceRangeShown] = useState(false)
  const [isLocationShown, setisLocationShown] = useState(false)
  const [isbedroomShown, setisbedroomShown] = useState(false)
  const [isAreaShown, setisAreaShown] = useState(false)
  const [isAminitiesShown, setisAminitiesShown] = useState(false)
  const [isFeaturesShown, setisFeaturesShown] = useState(false)

  return (
    <div>
      <div className=' w-1/3 bg-gray-100 hidden sm:block rounded-[10px] shadow-md m-2'>



        {/* top section */}
        <div className='border-b-[1px] border-gray-300 bg-white rounded-t-[10px] '>
          <div className='flex justify-between mt-4 p-2 border-b-[1px] border-gray-300'>
            <h1 className='text-3xl m-2'>Property FIlters</h1>

            {/* button */}
            <div className=' m-2 h-[40px] px-2 py-1 flex justify-center bg-black text-white rounded-[10px] items-center gap-1 cursor-pointer'>
              <X size={16} />
              <h4 className=''>Clear All</h4>
            </div>
          </div>

          {/* Buy or rent button */}
          <div className='flex justify-center gap-8 py-3 m-2 '>
            <div className={` lg:py-1.5 lg:px-12 lg:text-[20px] sm:py-1 sm:px-8 sm:text-[15px] border-[1px] text-black border-gray-700 rounded-[10px] ${isBuy ? 'bg-black text-white' : ''} flex items-center justify-center cursor-pointer hover:scale-105 duration-500 ease-in-out`}
              onClick={() => setisBuy(true)}

            >
              <div>Buy</div>
            </div>
            <div className={`lg:py-1.5 lg:px-12 lg:text-[20px] sm:py-1 sm:px-8 sm:text-[15px] border-[1px] text-black border-gray-700 rounded-[10px] ${!isBuy ? 'bg-black text-white' : ''} flex items-center justify-center cursor-pointer hover:scale-105 duration-500 ease-in-out`}
              onClick={() => setisBuy(false)}
            >
              <div>Rent</div>
            </div>
          </div>
        </div>

        {/* features section */}

        {/* property type */}
        <div className='bg-white shadow-sm m-2 rounded-[10px]  py-4 p-2 '>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <Home size={16} />
              <h3>Property Type</h3>
            </div>

            <div onClick={() => setisPropertyTypeShowm(!isPropertyTypeShowm)}>
              {
                isPropertyTypeShowm ?
                  <ChevronUp />
                  : <ChevronDown />
              }
            </div>
          </div>

          <div className={`${isPropertyTypeShowm ? 'grid grid-cols-2 p-2 gap-4' : 'hidden'}`}>
            <div className={`hover:scale-105 duration-400 ease-in-out border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'flat' ? 'bg-black text-white' : ''} cursor-pointer`}
              onClick={() => setpropertyType('flat')}><h2>Flat</h2></div>

            <div className={`hover:scale-105 duration-500 ease-in-out border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'villa' ? 'bg-black text-white' : ''} cursor-pointer`}
              onClick={() => setpropertyType('villa')}><h2>Villa</h2></div>

            <div className={`hover:scale-105 duration-500 ease-in-out border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'plot' ? 'bg-black text-white' : ''} cursor-pointer`}
              onClick={() => setpropertyType('plot')}><h2>Plot</h2></div>

            <div className={`hover:scale-105 duration-500 ease-in-out border-[1px] text-black flex items-center justify-center p-2 border-gray-700 rounded-[10px] ${propertyType === 'commercial' ? 'bg-black text-white' : ''} cursor-pointer`}
              onClick={() => setpropertyType('commercial')}><h2>Commercial</h2></div>
          </div>
        </div>

        {/* Price Range */}
        <div className='bg-white shadow-sm m-2 rounded-[10px]  py-4 p-2 '>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <IndianRupee size={16} />
              <h3>Price Range</h3>
            </div>

            <div onClick={() => setisPriceRangeShown(!isPriceRangeShown)}>
              {
                isPriceRangeShown ?
                  <ChevronUp />
                  : <ChevronDown />
              }
            </div>
          </div>

          <div className={`${isPriceRangeShown ? '' : 'hidden'}`}>
            <PriceRangeSlider startPriceRange={startPriceRange} endPriceRange={endPriceRange} setendPriceRange={setendPriceRange} setstartPriceRange={setstartPriceRange} />
          </div>
        </div>

        {/* Loactoin */}
        <div className='bg-white shadow-sm m-2 rounded-[10px]  py-4 p-2 '>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <MapPin size={16} />
              <h3>Location</h3>
            </div>

            <div onClick={() => setisLocationShown(!isLocationShown)}>
              {
                isLocationShown ?
                  <ChevronUp />
                  : <ChevronDown />
              }
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


        {/* Set bed rooms and bathrooms */}
        <div className='bg-white shadow-sm m-2 rounded-[10px]  py-4 p-2 '>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <Grid2x2Plus size={16} />
              <h3>Bedrooms and Bathrooms</h3>
            </div>

            <div onClick={() => setisbedroomShown(!isbedroomShown)}>
              {
                isbedroomShown ?
                  <ChevronUp />
                  : <ChevronDown />
              }
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

        {/* Set Areas */}
        <div className='bg-white shadow-sm m-2 rounded-[10px]  py-4 p-2 '>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <Ruler size={16} />
              <h3>Set Area</h3>
            </div>

            <div onClick={() => setisAreaShown(!isAreaShown)}>
              {
                isAreaShown ?
                  <ChevronUp />
                  : <ChevronDown />
              }
            </div>
          </div>

          <div className={`${isAreaShown ? 'p-2' : 'hidden'}`}>
            <AreaRangeSlider setstartArea={setstartArea} setendArea={setendArea} startArea={startArea} endArea={endArea} />
          </div>
        </div>


        {/* AmenitiesSelector */}
        <div className='bg-white shadow-sm m-2 rounded-[10px]  py-4 p-2 '>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <Ruler size={16} />
              <h3>Select Amenities</h3>
            </div>

            <div onClick={() => setisAminitiesShown(!isAminitiesShown)}>
              {
                isAminitiesShown ?
                  <ChevronUp />
                  : <ChevronDown />
              }
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
        <div className='bg-white shadow-sm m-2 rounded-[10px]  py-4 p-2 '>
          <div className='flex gap-2 items-center justify-between p-3'>
            <div className='flex gap-2 items-center justify-center'>
              <Ruler size={16} />
              <h3>Select Features</h3>
            </div>

            <div onClick={() => setisFeaturesShown(!isFeaturesShown)}>
              {
                isFeaturesShown ?
                  <ChevronUp />
                  : <ChevronDown />
              }
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





      </div>
    </div>
  )
}

export default LogIn
