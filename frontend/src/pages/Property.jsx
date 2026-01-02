import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Phone,
  Mail,
  CheckCircle,
  Shield,
  TrendingUp,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
  Wind,
  Sofa,
  AlertCircle,
  Building2,
  IndianRupee,
  Calendar,
  Car,
  Compass,
  Home as HomeIcon
} from 'lucide-react'
import propertyData from '../assets/Data/Property'

const Property = () => {
  const { propertyid } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showContactModal, setShowContactModal] = useState(false)

  useEffect(() => {
    const foundProperty = propertyData.find(p => p.id === parseInt(propertyid))
    setProperty(foundProperty)
    window.scrollTo(0, 0)
  }, [propertyid])

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Property Not Found</h2>
          <p className="text-gray-600 mb-6 text-lg">The property you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/search')}
            className="px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Browse Properties
          </button>
        </div>
      </div>
    )
  }

  const formatPrice = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
    return `₹${(amount / 1000).toFixed(0)} K`
  }

  const bedrooms = property.description?.match(/(\d+)BHK/)?.[1] || 'N/A'
  
  const allImages = property.images?.length > 0 
    ? property.images 
    : [{ url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", isPrimary: true }]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-700 hover:text-black font-medium mb-4 transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline">Back to Search</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Image Slider Section */}
        <div className="relative bg-gray-900 h-[300px] sm:h-[400px] lg:h-[550px] rounded-3xl  mb-4 mt-8   ">
          <img
            src={allImages[currentImageIndex]?.url}
            alt={allImages[currentImageIndex]?.caption || 'Property'}
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl"></div>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {property.isFeatured && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs sm:text-sm font-bold rounded-lg shadow-xl backdrop-blur-sm flex items-center gap-1">
                <TrendingUp size={14} />
                Featured
              </span>
            )}
            {property.isVerified && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs sm:text-sm font-bold rounded-lg shadow-xl backdrop-blur-sm flex items-center gap-1">
                <Shield size={14} />
                Verified
              </span>
            )}
            {property.availability?.immediatelyAvailable && (
              <span className="px-3 py-1.5 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-lg shadow-xl backdrop-blur-sm">
                Ready to Move
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl"
            >
              <Heart
                size={22}
                className={isSaved ? 'fill-red-500 text-red-500' : 'text-gray-700'}
              />
            </button>
            <button
              onClick={handleShare}
              className="w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl"
            >
              <Share2 size={22} className="text-gray-700" />
            </button>
          </div>

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl z-10"
              >
                <ChevronLeft size={24} className="text-gray-900" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl z-10"
              >
                <ChevronRight size={24} className="text-gray-900" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 right-4 px-4 py-2 gap-4 bg-black/80 backdrop-blur-md text-white text-sm font-bold rounded-lg shadow-xl z-10">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Property Type Badge */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="px-4 py-2.5 bg-white/95 backdrop-blur-md text-gray-900 text-sm font-bold rounded-xl shadow-xl capitalize flex items-center gap-2">
              <HomeIcon size={18} />
              {property.propertyType}
            </span>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {allImages.length > 1 && (
          <div className="mb-6">
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide z-20 p-6">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden transition-all ${
                    currentImageIndex === index 
                      ? 'ring-4 ring-black scale-105' 
                      : 'ring-2 ring-gray-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Price Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {bedrooms} BHK {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)} for {property.listingType === 'rent' ? 'Rent' : 'Sale'}
              </h1>

              <div className="flex items-start gap-2 text-gray-600 mb-6">
                <MapPin size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-base font-semibold text-gray-800">
                    {property.location.area}, {property.location.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    {property.location.state} - {property.location.pincode}
                  </p>
                  {property.location.landmark && (
                    <p className="text-sm text-gray-500 mt-1">
                       Near {property.location.landmark}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {property.listingType === 'rent' ? 'Monthly Rent' : 'Total Price'}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {formatPrice(property.listingType === 'rent' ? property.rental?.monthlyRent : property.price.amount)}
                    </span>
                    {property.price.negotiable && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
                        Negotiable
                      </span>
                    )}
                  </div>
                  {property.price.pricePerSqft && (
                    <p className="text-sm text-gray-500 mt-2">
                      ₹{property.price.pricePerSqft.toLocaleString()} per sq ft
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setShowContactModal(true)}
                  className="lg:hidden px-5 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 active:scale-95 transition-all"
                >
                  Contact
                </button>
              </div>

              {property.listingType === 'rent' && property.rental && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs text-blue-600 font-semibold mb-1">Security Deposit</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatPrice(property.rental.securityDeposit)}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                      <p className="text-xs text-purple-600 font-semibold mb-1">Lease Duration</p>
                      <p className="text-xl font-bold text-gray-900">
                        {property.rental.leaseDuration || '11 months'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Property Overview</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <Bed className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{bedrooms}</p>
                  <p className="text-xs text-gray-600 font-medium">Bedrooms</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200">
                  <Bath className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {(property.features?.parking?.covered || 0) + (property.features?.parking?.open || 0) || 2}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">Bathrooms</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <Maximize2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.area.value}</p>
                  <p className="text-xs text-gray-600 font-medium">{property.area.unit}</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <Car className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {(property.features?.parking?.covered || 0) + (property.features?.parking?.open || 0)}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">Parking</p>
                </div>
              </div>

              {/* Additional Features */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features?.furnished && (
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                    <Sofa className="text-orange-600 flex-shrink-0" size={22} />
                    <div>
                      <p className="text-xs text-gray-600">Furnishing</p>
                      <p className="font-bold text-gray-900 capitalize">{property.features.furnished}</p>
                    </div>
                  </div>
                )}

                {property.features?.floorNumber && (
                  <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                    <Layers className="text-indigo-600 flex-shrink-0" size={22} />
                    <div>
                      <p className="text-xs text-gray-600">Floor</p>
                      <p className="font-bold text-gray-900">
                        {property.features.floorNumber} of {property.features.totalFloors}
                      </p>
                    </div>
                  </div>
                )}

                {property.features?.facing && (
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                    <Wind className="text-teal-600 flex-shrink-0" size={22} />
                    <div>
                      <p className="text-xs text-gray-600">Facing</p>
                      <p className="font-bold text-gray-900 capitalize">{property.features.facing}</p>
                    </div>
                  </div>
                )}

                {property.features?.age && (
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl border border-pink-100">
                    <Calendar className="text-pink-600 flex-shrink-0" size={22} />
                    <div>
                      <p className="text-xs text-gray-600">Property Age</p>
                      <p className="font-bold text-gray-900">{property.features.age} years</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Property</h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {property.description || 'This is a beautiful property with modern amenities and excellent connectivity.'}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-100"
                    >
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        {amenity.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Building Info */}
            {property.apartment?.societyName && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Building Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <Building2 className="text-blue-600 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Society Name</p>
                      <p className="font-bold text-gray-900 text-lg">{property.apartment.societyName}</p>
                    </div>
                  </div>

                  {property.apartment.maintenanceCharges && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                      <IndianRupee className="text-green-600 flex-shrink-0" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Maintenance</p>
                        <p className="font-bold text-gray-900 text-lg">
                          ₹{property.apartment.maintenanceCharges.toLocaleString()}/{property.apartment.maintenanceFrequency}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Nearby Places */}
            {property.location.nearby && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">What's Nearby</h2>
                <div className="space-y-4">
                  {property.location.nearby.schools && property.location.nearby.schools.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-gray-700 mb-2">🏫 Schools</p>
                      <div className="space-y-1 ml-4">
                        {property.location.nearby.schools.map((school, index) => (
                          <p key={index} className="text-sm text-gray-600">• {school}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {property.location.nearby.hospitals && property.location.nearby.hospitals.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-gray-700 mb-2">🏥 Hospitals</p>
                      <div className="space-y-1 ml-4">
                        {property.location.nearby.hospitals.map((hospital, index) => (
                          <p key={index} className="text-sm text-gray-600">• {hospital}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {property.location.nearby.malls && property.location.nearby.malls.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-gray-700 mb-2">🛍️ Shopping</p>
                      <div className="space-y-1 ml-4">
                        {property.location.nearby.malls.map((mall, index) => (
                          <p key={index} className="text-sm text-gray-600">• {mall}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {property.location.nearby.metro && (
                    <div>
                      <p className="text-sm font-bold text-gray-700 mb-2">🚇 Metro</p>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">• {property.location.nearby.metro}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6 space-y-6">
              {/* Owner Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {property.owner.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{property.owner.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {property.owner.verified && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md font-bold flex items-center gap-1">
                          <CheckCircle size={12} />
                          Verified
                        </span>
                      )}
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-bold capitalize">
                        {property.owner.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-bold hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Contact Owner
                  </button>
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full py-3.5 bg-blue-100 text-blue-700 rounded-xl font-bold hover:bg-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={20} />
                    Send Email
                  </button>
                </div>
              </div>

              {/* Property Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Property Insights</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                      <Eye size={20} className="text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700">Views</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg">{property.metrics?.views || 0}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl border border-pink-200">
                    <div className="flex items-center gap-3">
                      <Heart size={20} className="text-pink-600" />
                      <span className="text-sm font-semibold text-gray-700">Favorites</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg">{property.metrics?.favorites || 0}</span>
                  </div>

                  {property.metrics?.trending && (
                    <div className="flex items-center justify-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-300">
                      <TrendingUp size={20} className="text-orange-600 mr-2" />
                      <span className="text-sm font-bold text-orange-700">🔥 Trending</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Property ID */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-5 border border-gray-300">
                <p className="text-xs text-gray-600 font-semibold mb-1.5">Property ID</p>
                <p className="font-mono font-bold text-gray-900 text-lg">#{property.id.toString().padStart(6, '0')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setShowContactModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 relative pointer-events-auto shadow-2xl">
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-6 pr-8">Contact Owner</h3>

              <div className="space-y-4">
                <a
                  href={`tel:${property.owner.phone}`}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Phone Number</p>
                    <p className="font-bold text-gray-900 text-lg">{property.owner.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${property.owner.email}`}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Email Address</p>
                    <p className="font-bold text-gray-900 text-lg break-all">{property.owner.email}</p>
                  </div>
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  By contacting, you agree to our Terms and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Property

// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { 
//   Heart, 
//   Share2, 
//   MapPin, 
//   Bed, 
//   Bath, 
//   Maximize2, 
//   Home,
//   Calendar,
//   Compass,
//   Car,
//   Phone,
//   Mail,
//   User,
//   Building2,
//   IndianRupee,
//   CheckCircle,
//   Shield,
//   TrendingUp,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Layers,
//   Wind,
//   Sofa,
//   AlertCircle
// } from 'lucide-react'
// import propertyData from '../assets/Data/Property'

// const Property = () => {
//   const { propertyid } = useParams()
//   const navigate = useNavigate()
//   const [property, setProperty] = useState(null)
//   const [isSaved, setIsSaved] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [showImageModal, setShowImageModal] = useState(false)
//   const [showContactModal, setShowContactModal] = useState(false)

//   useEffect(() => {
//     // Find property by ID
//     const foundProperty = propertyData.find(p => p.id === parseInt(propertyid))
//     setProperty(foundProperty)

//     // Scroll to top
//     window.scrollTo(0, 0)
//   }, [propertyid])

//   if (!property) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
//           <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
//           <button
//             onClick={() => navigate('/search')}
//             className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
//           >
//             Browse Properties
//           </button>
//         </div>
//       </div>
//     )
//   }

//   // Format price
//   const formatPrice = (amount) => {
//     if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
//     if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
//     return `₹${(amount / 1000).toFixed(0)} K`
//   }

//   // Extract bedrooms from description
//   const bedrooms = property.description?.match(/(\d+)BHK/)?.[1] || 'N/A'

//   // Get all images (if multiple)
//   const allImages = property.images?.length > 0 
//     ? property.images 
//     : [{ url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", isPrimary: true }]

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
//   }

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
//   }

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: property.description,
//         text: `Check out this ${property.propertyType} for ${property.listingType}`,
//         url: window.location.href
//       })
//     } else {
//       navigator.clipboard.writeText(window.location.href)
//       alert('Link copied to clipboard!')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Back Button - Mobile */}
//       <div className="lg:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={() => navigate(-1)}
//           className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
//         >
//           <ChevronLeft size={24} className="text-gray-900" />
//         </button>
//       </div>

//       {/* Main Container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
//         {/* Back Button - Desktop */}
//         <button
//           onClick={() => navigate(-1)}
//           className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-black font-medium mb-6 transition-colors"
//         >
//           <ChevronLeft size={20} />
//           Back to Search
//         </button>

//         {/* Image Gallery */}
//         <div className="mb-6 lg:mb-8">
//           <div className="relative rounded-3xl overflow-hidden bg-gray-900 h-[300px] sm:h-[400px] lg:h-[500px]">
//             {/* Main Image */}
//             <img
//               src={allImages[currentImageIndex]?.url}
//               alt={property.description}
//               className="w-full h-full object-cover cursor-pointer"
//               onClick={() => setShowImageModal(true)}
//             />

//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

//             {/* Top Badges */}
//             <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
//               {property.isFeatured && (
//                 <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
//                   <TrendingUp size={14} />
//                   Featured
//                 </span>
//               )}
//               {property.isVerified && (
//                 <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
//                   <Shield size={14} />
//                   Verified
//                 </span>
//               )}
//               {property.availability?.immediatelyAvailable && (
//                 <span className="px-3 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg">
//                   Ready to Move
//                 </span>
//               )}
//             </div>

//             {/* Action Buttons - Top Right */}
//             <div className="absolute top-4 right-4 flex gap-2 z-10">
//               <button
//                 onClick={() => setIsSaved(!isSaved)}
//                 className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
//               >
//                 <Heart
//                   size={20}
//                   className={isSaved ? 'fill-red-500 text-red-500' : 'text-gray-700'}
//                 />
//               </button>
//               <button
//                 onClick={handleShare}
//                 className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
//               >
//                 <Share2 size={20} className="text-gray-700" />
//               </button>
//             </div>

//             {/* Navigation Arrows */}
//             {allImages.length > 1 && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
//                 >
//                   <ChevronLeft size={20} className="text-gray-900" />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
//                 >
//                   <ChevronRight size={20} className="text-gray-900" />
//                 </button>
//               </>
//             )}

//             {/* Image Counter */}
//             {allImages.length > 1 && (
//               <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-sm font-semibold rounded-lg">
//                 {currentImageIndex + 1} / {allImages.length}
//               </div>
//             )}

//             {/* Property Type Badge */}
//             <div className="absolute bottom-4 left-4">
//               <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-bold rounded-lg shadow-lg capitalize">
//                 {property.propertyType}
//               </span>
//             </div>
//           </div>

//           {/* Thumbnail Gallery */}
//           {allImages.length > 1 && (
//             <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
//               {allImages.slice(0, 8).map((img, index) => (
//                 <div
//                   key={index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`relative rounded-lg overflow-hidden cursor-pointer h-16 sm:h-20 ${
//                     currentImageIndex === index ? 'ring-4 ring-black' : 'ring-2 ring-gray-200'
//                   }`}
//                 >
//                   <img
//                     src={img.url}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover hover:scale-110 transition-transform"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Title and Price */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex-1">
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
//                     {bedrooms} BHK {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)} for {property.listingType === 'rent' ? 'Rent' : 'Sale'}
//                   </h1>
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <MapPin size={18} className="text-red-500" />
//                     <span className="text-base font-medium">
//                       {property.location.area}, {property.location.city}, {property.location.state}
//                     </span>
//                   </div>
//                   {property.location.landmark && (
//                     <p className="text-sm text-gray-500 mt-1 ml-6">
//                       Near {property.location.landmark}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Price Section */}
//               <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">
//                     {property.listingType === 'rent' ? 'Monthly Rent' : 'Property Price'}
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <span className="text-3xl sm:text-4xl font-bold text-gray-900">
//                       {formatPrice(property.listingType === 'rent' ? property.rental?.monthlyRent : property.price.amount)}
//                     </span>
//                     {property.price.negotiable && (
//                       <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
//                         Negotiable
//                       </span>
//                     )}
//                   </div>
//                   {property.price.pricePerSqft && (
//                     <p className="text-sm text-gray-500 mt-1">
//                       ₹{property.price.pricePerSqft.toLocaleString()} per sq ft
//                     </p>
//                   )}
//                 </div>

//                 {/* Contact Button - Mobile */}
//                 <button
//                   onClick={() => setShowContactModal(true)}
//                   className="lg:hidden px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
//                 >
//                   Contact
//                 </button>
//               </div>

//               {/* Rental Info */}
//               {property.listingType === 'rent' && property.rental && (
//                 <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Security Deposit</p>
//                     <p className="text-xl font-bold text-gray-900">
//                       {formatPrice(property.rental.securityDeposit)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Lease Duration</p>
//                     <p className="text-xl font-bold text-gray-900">
//                       {property.rental.leaseDuration || '11 months'}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Key Features */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Property Features</h2>
              
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//                 <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
//                   <Bed className="w-8 h-8 text-blue-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold text-gray-900">{bedrooms}</p>
//                   <p className="text-sm text-gray-600">Bedrooms</p>
//                 </div>
//                 <div className="text-center p-4 bg-cyan-50 rounded-xl border border-cyan-100">
//                   <Bath className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold text-gray-900">{property.features?.parking?.covered || 2}</p>
//                   <p className="text-sm text-gray-600">Bathrooms</p>
//                 </div>
//                 <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
//                   <Maximize2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold text-gray-900">{property.area.value}</p>
//                   <p className="text-sm text-gray-600">{property.area.unit}</p>
//                 </div>
//                 <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
//                   <Car className="w-8 h-8 text-purple-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold text-gray-900">
//                     {property.features?.parking ? property.features.parking.covered + property.features.parking.open : 0}
//                   </p>
//                   <p className="text-sm text-gray-600">Parking</p>
//                 </div>
//               </div>

//               {/* Additional Features */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {property.features?.furnished && (
//                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                     <Sofa className="text-orange-600" size={20} />
//                     <div>
//                       <p className="text-xs text-gray-600">Furnishing</p>
//                       <p className="font-semibold text-gray-900 capitalize">{property.features.furnished}</p>
//                     </div>
//                   </div>
//                 )}
//                 {property.features?.floorNumber && (
//                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                     <Layers className="text-indigo-600" size={20} />
//                     <div>
//                       <p className="text-xs text-gray-600">Floor</p>
//                       <p className="font-semibold text-gray-900">
//                         {property.features.floorNumber}/{property.features.totalFloors}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//                 {property.features?.facing && (
//                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                     <Wind className="text-teal-600" size={20} />
//                     <div>
//                       <p className="text-xs text-gray-600">Facing</p>
//                       <p className="font-semibold text-gray-900 capitalize">{property.features.facing}</p>
//                     </div>
//                   </div>
//                 )}
//                 {property.features?.age && (
//                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                     <Calendar className="text-pink-600" size={20} />
//                     <div>
//                       <p className="text-xs text-gray-600">Property Age</p>
//                       <p className="font-semibold text-gray-900">{property.features.age} years</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Description */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">About This Property</h2>
//               <p className="text-gray-700 leading-relaxed">
//                 {property.description}
//               </p>
//             </div>

//             {/* Amenities */}
//             {property.amenities && property.amenities.length > 0 && (
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                   {property.amenities.map((amenity, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100"
//                     >
//                       <CheckCircle size={18} className="text-green-600" />
//                       <span className="text-sm font-medium text-gray-900 capitalize">
//                         {amenity.replace('-', ' ')}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Society/Building Info */}
//             {property.apartment?.societyName && (
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Building Information</h2>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <Building2 className="text-blue-600" size={20} />
//                     <div>
//                       <p className="text-sm text-gray-600">Society Name</p>
//                       <p className="font-semibold text-gray-900">{property.apartment.societyName}</p>
//                     </div>
//                   </div>
//                   {property.apartment.maintenanceCharges && (
//                     <div className="flex items-center gap-3">
//                       <IndianRupee className="text-green-600" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-600">Maintenance</p>
//                         <p className="font-semibold text-gray-900">
//                           ₹{property.apartment.maintenanceCharges.toLocaleString()}/{property.apartment.maintenanceFrequency}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Nearby Places */}
//             {property.location.nearby && (
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Landmarks</h2>
//                 <div className="space-y-4">
//                   {property.location.nearby.schools && property.location.nearby.schools.length > 0 && (
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700 mb-2">Schools</p>
//                       <div className="space-y-1">
//                         {property.location.nearby.schools.map((school, index) => (
//                           <p key={index} className="text-sm text-gray-600">• {school}</p>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {property.location.nearby.hospitals && property.location.nearby.hospitals.length > 0 && (
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700 mb-2">Hospitals</p>
//                       <div className="space-y-1">
//                         {property.location.nearby.hospitals.map((hospital, index) => (
//                           <p key={index} className="text-sm text-gray-600">• {hospital}</p>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {property.location.nearby.malls && property.location.nearby.malls.length > 0 && (
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700 mb-2">Shopping</p>
//                       <div className="space-y-1">
//                         {property.location.nearby.malls.map((mall, index) => (
//                           <p key={index} className="text-sm text-gray-600">• {mall}</p>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {property.location.nearby.metro && (
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700 mb-2">Metro</p>
//                       <p className="text-sm text-gray-600">• {property.location.nearby.metro}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Owner Card */}
//               <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
//                     {property.owner.name.charAt(0)}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-bold text-gray-900 text-lg">{property.owner.name}</h3>
//                     <div className="flex items-center gap-2">
//                       {property.owner.verified && (
//                         <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded font-semibold flex items-center gap-1">
//                           <CheckCircle size={12} />
//                           Verified
//                         </span>
//                       )}
//                       <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded font-semibold capitalize">
//                         {property.owner.type}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <button
//                     onClick={() => setShowContactModal(true)}
//                     className="w-full py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
//                   >
//                     <Phone size={20} />
//                     Contact Owner
//                   </button>
//                   <button
//                     onClick={() => setShowContactModal(true)}
//                     className="w-full py-3 bg-blue-100 text-blue-700 rounded-xl font-bold hover:bg-blue-200 transition-all flex items-center justify-center gap-2"
//                   >
//                     <Mail size={20} />
//                     Send Email
//                   </button>
//                 </div>
//               </div>

//               {/* Property Stats */}
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                 <h3 className="font-bold text-gray-900 mb-4">Property Statistics</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <Eye size={18} className="text-gray-600" />
//                       <span className="text-sm font-medium text-gray-700">Views</span>
//                     </div>
//                     <span className="font-bold text-gray-900">{property.metrics?.views || 0}</span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <Heart size={18} className="text-gray-600" />
//                       <span className="text-sm font-medium text-gray-700">Favorites</span>
//                     </div>
//                     <span className="font-bold text-gray-900">{property.metrics?.favorites || 0}</span>
//                   </div>
//                   {property.metrics?.trending && (
//                     <div className="flex items-center justify-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
//                       <TrendingUp size={18} className="text-orange-600 mr-2" />
//                       <span className="text-sm font-bold text-orange-700">Trending Property</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Property ID */}
//               <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200">
//                 <p className="text-xs text-gray-600 mb-1">Property ID</p>
//                 <p className="font-mono font-bold text-gray-900">#{property.id}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Contact Modal */}
//       {showContactModal && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
//             <button
//               onClick={() => setShowContactModal(false)}
//               className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
//             >
//               <X size={18} />
//             </button>

//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Owner</h3>

//             <div className="space-y-4">
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
//                 <Phone className="text-blue-600" size={24} />
//                 <div>
//                   <p className="text-sm text-gray-600">Phone Number</p>
//                   <p className="font-bold text-gray-900">{property.owner.phone}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
//                 <Mail className="text-green-600" size={24} />
//                 <div>
//                   <p className="text-sm text-gray-600">Email Address</p>
//                   <p className="font-bold text-gray-900">{property.owner.email}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <p className="text-xs text-gray-500 text-center">
//                 By contacting, you agree to our Terms of Service and Privacy Policy
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Image Modal */}
//       {showImageModal && (
//         <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
//           <button
//             onClick={() => setShowImageModal(false)}
//             className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
//           >
//             <X size={24} />
//           </button>

//           <img
//             src={allImages[currentImageIndex]?.url}
//             alt="Property"
//             className="max-w-full max-h-full object-contain"
//           />

//           {allImages.length > 1 && (
//             <>
//               <button
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
//               >
//                 <ChevronLeft size={24} />
//               </button>
//               <button
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
//               >
//                 <ChevronRight size={24} />
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Property