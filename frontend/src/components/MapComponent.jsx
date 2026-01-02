import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Navigation, Maximize2, ExternalLink, Building2, Home } from 'lucide-react'
import L from 'leaflet'

// Fix for default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom red marker icon
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EF4444" stroke="#DC2626" stroke-width="1">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

// Component to recenter map
function RecenterMap({ lat, lng }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView([lat, lng], 15, { animate: true, duration: 1 })
  }, [lat, lng, map])
  
  return null
}

// Fullscreen control component
function FullscreenButton() {
  const map = useMap()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    const container = map.getContainer().parentElement
    if (!document.fullscreenElement) {
      container.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <button
      onClick={toggleFullscreen}
      className="absolute top-4 right-4 z-[1000] w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200"
      title="Toggle fullscreen"
    >
      <Maximize2 size={18} className="text-gray-700" />
    </button>
  )
}

const MapComponent = ({ latitude, longitude, propertyName, address, propertyType }) => {
  const position = [latitude, longitude]
  const [mapType, setMapType] = useState('streets')

  const mapTypes = {
    streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-200">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <MapPin size={20} className="text-white" />
            </div>
            Location & Map
          </h2>
          
          {/* Map Type Selector */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMapType('streets')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mapType === 'streets' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Street
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mapType === 'satellite' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('terrain')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mapType === 'terrain' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Terrain
            </button>
          </div>
        </div>

        {/* Location Details Card */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 size={20} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium mb-0.5">Property Address</p>
              <p className="font-bold text-gray-900 text-base leading-tight">{address}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md">
                  <Home size={12} className="text-gray-600" />
                  <span className="text-xs font-semibold text-gray-700 capitalize">{propertyType}</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-md">
                  <MapPin size={12} className="text-green-600" />
                  <span className="text-xs font-semibold text-green-700">
                    {latitude.toFixed(4)}, {longitude.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative rounded-2xl overflow-hidden border-4 border-gray-200 shadow-xl h-[350px] sm:h-[450px] lg:h-[500px] bg-gray-100">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={mapTypes[mapType]}
          />
          
          {/* Red circle to show approximate area */}
          <Circle
            center={position}
            radius={200}
            pathOptions={{
              color: '#EF4444',
              fillColor: '#FEE2E2',
              fillOpacity: 0.3,
              weight: 2
            }}
          />
          
          {/* Property marker */}
          <Marker position={position} icon={customIcon}>
            <Popup className="custom-popup">
              <div className="p-3 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <Home size={16} className="text-red-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm leading-tight">{propertyName}</p>
                    <p className="text-xs text-gray-500 capitalize">{propertyType}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600 leading-relaxed">{address}</p>
                </div>
              </div>
            </Popup>
          </Marker>
          
          <RecenterMap lat={latitude} lng={longitude} />
          <FullscreenButton />
        </MapContainer>

        {/* Zoom hint overlay */}
        <div className="absolute bottom-4 left-4 z-[999] bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg font-medium">
          📍 Scroll to zoom • Click marker for details
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group py-3.5 px-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
        >
          <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
          <span>Open in Google Maps</span>
        </a>
        
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group py-3.5 px-5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-800 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
        >
          <Navigation size={20} className="group-hover:rotate-45 transition-transform" />
          <span>Get Directions</span>
        </a>
      </div>

      {/* Quick Info Footer */}
      <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
        <p className="text-sm text-amber-900 font-medium text-center">
          💡 <span className="font-bold">Tip:</span> Click the map marker to see property details or use the buttons above to navigate
        </p>
      </div>
    </div>
  )
}

export default MapComponent