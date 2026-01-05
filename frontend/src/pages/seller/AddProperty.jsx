import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { Upload, X } from 'lucide-react'

const AddProperty = () => {
  const { getAuthHeader, user, isBuyer, isSeller, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkingSeller, setCheckingSeller] = useState(true)

  // Verify user is actually a seller from the server
  useEffect(() => {
    const verifySellerStatus = async () => {
      if (!isAuthenticated) {
        navigate('/login')
        return
      }

      try {
        const response = await axios.get('http://localhost:8081/api/users/verify-token', {
          headers: getAuthHeader()
        })

        if (response.data.success && response.data.user) {
          // Check if user is actually a seller
          if (response.data.user.isBuyer === true) {
            setError('You must register as a seller to add properties. Please register as a seller.')
            setTimeout(() => {
              navigate('/register')
            }, 3000)
          }
        }
      } catch (error) {
        console.error('Failed to verify seller status:', error)
        setError('Failed to verify your account status. Please try again.')
      } finally {
        setCheckingSeller(false)
      }
    }

    verifySellerStatus()
  }, [isAuthenticated, navigate, getAuthHeader])
  const [images, setImages] = useState([])
  const [formData, setFormData] = useState({
    description: '',
    propertyType: 'flat',
    listingType: 'sell',
    areaValue: '',
    areaUnit: 'sqft',
    priceAmount: '',
    priceDisplay: '',
    negotiable: false,
    ownerName: user?.name || '',
    ownerPhone: '',
    ownerEmail: user?.email || '',
    address: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    furnished: 'unfurnished',
    facing: 'north',
    floorNumber: '',
    totalFloors: '',
    parking: { covered: 0, open: 0 },
    balconies: 0,
    amenities: [],
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleAmenityChange = (amenity) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenity)
        ? formData.amenities.filter((a) => a !== amenity)
        : [...formData.amenities, amenity],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check if user is actually a seller (not just toggled in UI)
    if (isBuyer || !isSeller) {
      setError('You must register as a seller to add properties. Please register as a seller or contact support.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = new FormData()

      // Append text fields
      data.append('description', formData.description)
      data.append('propertyType', formData.propertyType)
      data.append('listingType', formData.listingType)
      data.append('area[value]', formData.areaValue)
      data.append('area[unit]', formData.areaUnit)
      data.append('price[amount]', formData.priceAmount)
      data.append('price[display]', formData.priceDisplay)
      data.append('price[negotiable]', formData.negotiable)
      data.append('owner[name]', formData.ownerName)
      data.append('owner[phone]', formData.ownerPhone)
      data.append('owner[email]', formData.ownerEmail)
      data.append('owner[type]', 'owner')
      data.append('location[address]', formData.address)
      data.append('location[area]', formData.area)
      data.append('location[city]', formData.city)
      data.append('location[state]', formData.state)
      data.append('location[pincode]', formData.pincode)
      data.append('features[furnished]', formData.furnished)
      data.append('features[facing]', formData.facing)
      data.append('features[floorNumber]', formData.floorNumber)
      data.append('features[totalFloors]', formData.totalFloors)
      data.append('features[parking][covered]', formData.parking.covered)
      data.append('features[parking][open]', formData.parking.open)
      data.append('features[balconies]', formData.balconies)
      
      // Append amenities
      formData.amenities.forEach((amenity, index) => {
        data.append(`amenities[${index}]`, amenity)
      })

      // Append images
      images.forEach((image) => {
        data.append('images', image)
      })

      const response = await axios.post(
        'http://localhost:8081/api/properties',
        data,
        {
          headers: {
            ...getAuthHeader(),
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response.data.success) {
        alert('Property added successfully!')
        navigate('/seller/my-properties')
      }
    } catch (error) {
      console.error('Failed to add property:', error)
      const errorMessage = error.response?.data?.message || 'Failed to add property'
      setError(errorMessage)
      
      // If user is not a seller, redirect to registration
      if (error.response?.status === 403 && errorMessage.includes('seller')) {
        setTimeout(() => {
          if (window.confirm('You need to register as a seller. Would you like to register now?')) {
            navigate('/register')
          }
        }, 2000)
      }
    } finally {
      setLoading(false)
    }
  }

  const amenitiesList = [
    'parking',
    'gym',
    'swimming-pool',
    'garden',
    'security',
    'power-backup',
    'lift',
    'club-house',
  ]

  if (checkingSeller) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Verifying seller status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Add New Property</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
          {error.includes('register as a seller') && (
            <a 
              href="/register" 
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Go to Registration →
            </a>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your property..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Property Type *</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="flat">Flat</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Listing Type *</label>
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="sell">Sell</option>
                  <option value="rent">Rent</option>
                  <option value="lease">Lease</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price Amount *</label>
              <input
                type="number"
                name="priceAmount"
                value={formData.priceAmount}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Display (e.g., 75L)</label>
              <input
                type="text"
                name="priceDisplay"
                value={formData.priceDisplay}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="75L, 1Cr"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="negotiable"
                checked={formData.negotiable}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>Price Negotiable</span>
            </label>
          </div>
        </div>

        {/* Area */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Area</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Area Size *</label>
              <input
                type="number"
                name="areaValue"
                value={formData.areaValue}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="1450"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Unit *</label>
              <select
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="sqft">Square Feet</option>
                <option value="sqm">Square Meter</option>
                <option value="sqyd">Square Yard</option>
                <option value="acre">Acre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Location</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Full address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Area *</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Vaishali Nagar"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Jaipur"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Rajasthan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="302021"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Furnished</label>
              <select
                name="furnished"
                value={formData.furnished}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Facing</label>
              <select
                name="facing"
                value={formData.facing}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Floor Number</label>
              <input
                type="number"
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total Floors</label>
              <input
                type="number"
                name="totalFloors"
                value={formData.totalFloors}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Balconies</label>
              <input
                type="number"
                name="balconies"
                value={formData.balconies}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="2"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="w-4 h-4"
                />
                <span className="capitalize">{amenity.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Images</h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <label className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-700">Upload images</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">
              PNG, JPG, GIF up to 5MB (Max 20 images)
            </p>
          </div>

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={16} />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Adding Property...' : 'Add Property'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/seller/my-properties')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProperty