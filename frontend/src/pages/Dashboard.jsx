import React, { useEffect, useState } from 'react'
import MapComponent from '../components/MapComponent'
import propertyData from '../assets/Data/Property'

const Dashboard = () => {
  const [property, setProperty] = useState(null)
  const propertyid =2
  useEffect(() => {
    const foundProperty = propertyData.find(p => p.id === parseInt(propertyid))
    setProperty(foundProperty)
    window.scrollTo(0, 0)
  }, [propertyid])
  return (
    <div>


      <MapComponent
        latitude={property.location.coordinates.lat}
        longitude={property.location.coordinates.lng}
        propertyName={`${bedrooms} BHK ${property.propertyType}`}
        address={`${property.location.area}, ${property.location.city}, ${property.location.state}`}
      />

    </div>
  )
}

export default Dashboard
