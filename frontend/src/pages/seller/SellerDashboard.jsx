import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { Building2, TrendingUp, Eye, Heart, MessageSquare, PlusCircle } from 'lucide-react'

const SellerDashboard = () => {
  const { getAuthHeader } = useContext(AuthContext)
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8081/api/properties/user/profile',
        { headers: getAuthHeader() }
      )
      if (response.data.success) {
        setProfileData(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const stats = profileData?.stats || {}

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
        <p className="text-gray-600">Welcome back, {profileData?.user?.name}!</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <Link
          to="/seller/add-property"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          Add New Property
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Properties */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold">{stats.totalProperties || 0}</span>
          </div>
          <p className="text-gray-600 text-sm">Total Properties</p>
        </div>

        {/* Active Properties */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <span className="text-2xl font-bold">{stats.activeProperties || 0}</span>
          </div>
          <p className="text-gray-600 text-sm">Active Listings</p>
        </div>

        {/* Total Views */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Eye className="text-purple-600" size={24} />
            </div>
            <span className="text-2xl font-bold">{stats.totalViews || 0}</span>
          </div>
          <p className="text-gray-600 text-sm">Total Views</p>
        </div>

        {/* Total Inquiries */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <MessageSquare className="text-orange-600" size={24} />
            </div>
            <span className="text-2xl font-bold">{stats.totalInquiries || 0}</span>
          </div>
          <p className="text-gray-600 text-sm">Total Inquiries</p>
        </div>
      </div>

      {/* Property Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="font-semibold mb-2">Sold Properties</h3>
          <p className="text-3xl font-bold text-green-600">{stats.soldProperties || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="font-semibold mb-2">Rented Properties</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.rentedProperties || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="font-semibold mb-2">Total Favorites</h3>
          <p className="text-3xl font-bold text-red-600">{stats.totalFavorites || 0}</p>
        </div>
      </div>

      {/* Recent Properties */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recent Properties</h2>
          <Link
            to="/seller/my-properties"
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            View All →
          </Link>
        </div>

        {profileData?.properties && profileData.properties.length > 0 ? (
          <div className="space-y-4">
            {profileData.properties.slice(0, 5).map((property) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                {property.images && property.images[0] && (
                  <img
                    src={property.images[0].url}
                    alt={property.description}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{property.description.substring(0, 50)}...</h3>
                  <p className="text-sm text-gray-600">
                    {property.location.area}, {property.location.city}
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    ₹{property.price.display || property.price.amount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      property.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : property.status === 'sold'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {property.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    {property.metrics.views} views
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Building2 size={48} className="mx-auto mb-4 text-gray-400" />
            <p>No properties yet</p>
            <Link
              to="/seller/add-property"
              className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
            >
              Add your first property
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default SellerDashboard